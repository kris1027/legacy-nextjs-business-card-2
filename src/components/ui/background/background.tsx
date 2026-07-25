'use client';

import { useEffect, useRef } from 'react';
import {
  type State,
  type SimOpts,
  createStars,
  createNebulae,
  spawnDust,
  simulate,
} from './simulation';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import {
  drawBackground,
  drawNebulae,
  drawStars,
  drawShooting,
  drawDust,
} from './draw';
import styles from './background.module.css';

export function CosmosBackground() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State>({
    stars: [],
    nebulae: [],
    shooting: [],
    dust: [],
    mouse: { x: 0, y: 0, vx: 0, vy: 0 },
    scroll: 0,
    time: 0,
    shootTimer: 0,
  });

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = stateRef.current;
    const HUE = 160;
    const isFirefox = CSS.supports('-moz-appearance', 'none');
    const opts: SimOpts = { hue: HUE, isFirefox };

    // Pre-render dust glow sprite once - eliminates ~560 createRadialGradient calls/frame
    const dustSprite = new OffscreenCanvas(128, 128);
    const dCtx = dustSprite.getContext('2d')!;
    const dGrad = dCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    dGrad.addColorStop(0, `oklch(0.85 0.22 ${HUE} / 0.9)`);
    dGrad.addColorStop(0.5, `oklch(0.6 0.2 ${HUE} / 0.36)`);
    dGrad.addColorStop(1, 'oklch(0.6 0.2 0 / 0)');
    dCtx.fillStyle = dGrad;
    dCtx.beginPath();
    dCtx.arc(64, 64, 64, 0, Math.PI * 2);
    dCtx.fill();

    let vignetteGrad: CanvasGradient | null = null;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Cache vignette gradient - only w/h change on resize, no need to recreate per frame
      const vg = ctx.createRadialGradient(
        w / 2,
        h * 0.4,
        0,
        w / 2,
        h * 0.5,
        Math.max(w, h) * 0.8
      );
      vg.addColorStop(0, `oklch(0.18 0.12 ${HUE} / 0.18)`);
      vg.addColorStop(0.6, `oklch(0.08 0.06 ${HUE} / 0.05)`);
      vg.addColorStop(1, 'oklch(0.02 0 0 / 0)');
      vignetteGrad = vg;

      state.stars = createStars(w, h, isFirefox);
      state.nebulae = createNebulae(w, h, HUE, isFirefox);
    };

    resize();
    window.addEventListener('resize', resize);

    const dustCap = isFirefox ? 100 : 280;

    const onMouse = (e: MouseEvent) => {
      const m = state.mouse;
      const nx = e.clientX;
      const ny = e.clientY;
      m.vx = nx - m.x;
      m.vy = ny - m.y;
      m.x = nx;
      m.y = ny;
      const newDust = spawnDust(m, HUE);
      state.dust.push(...newDust);
      if (state.dust.length > dustCap)
        state.dust.splice(0, state.dust.length - dustCap);
    };
    window.addEventListener('mousemove', onMouse);

    const onScroll = () => {
      state.scroll = window.scrollY || 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf: number;
    let last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(48, t - last) / 16.667;
      last = t;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      simulate(state, { width: w, height: h }, dt, opts);

      drawBackground(ctx, w, h, vignetteGrad);
      if (!isFirefox) drawNebulae(ctx, state.nebulae, state.scroll);
      drawStars(ctx, state.stars, HUE, h, state.scroll);
      if (!isFirefox) drawShooting(ctx, state.shooting, HUE);
      drawDust(ctx, state.dust, dustSprite);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced]);

  if (reduced) {
    return <div className={styles.canvasStatic} role='presentation' />;
  }

  return (
    <canvas ref={canvasRef} className={styles.canvas} role='presentation' />
  );
}
