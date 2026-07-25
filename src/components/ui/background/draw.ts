import type { Nebula, Star, Shooting, Dust } from './simulation';

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  vignetteGrad: CanvasGradient | null
) {
  ctx.fillStyle = '#04020a';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = vignetteGrad!;
  ctx.fillRect(0, 0, w, h);
}

export function drawNebulae(
  ctx: CanvasRenderingContext2D,
  nebulae: Nebula[],
  scroll: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const n of nebulae) {
    const pulse = 0.85 + Math.sin(n.pulsePhase) * 0.15;
    const py = n.y - scroll * 0.05;
    const grad = ctx.createRadialGradient(
      n.x,
      py,
      0,
      n.x,
      py,
      Math.max(n.rx, n.ry)
    );
    grad.addColorStop(0, `oklch(0.65 0.28 ${n.hue} / ${n.alpha * pulse})`);
    grad.addColorStop(0.4, `oklch(0.45 0.22 ${n.hue + 20} / ${n.alpha * 0.5})`);
    grad.addColorStop(1, 'oklch(0.1 0 0 / 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(n.x, py, n.rx, n.ry, n.rot, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  hue: number,
  h: number,
  scroll: number
) {
  for (const s of stars) {
    const tw = 0.55 + Math.sin(s.twinklePhase) * 0.45;
    const py = (s.y - scroll * (0.05 + s.z * 0.08)) % (h * 2);
    const yy = py < 0 ? py + h * 2 : py;
    if (yy > h + 4) continue;
    const a = s.baseAlpha * tw;
    const starHue = hue + s.hueShift;
    ctx.fillStyle = `oklch(${0.85 + s.z * 0.04} 0.05 ${starHue} / ${a})`;
    ctx.beginPath();
    ctx.arc(s.x, yy, s.r * (0.6 + s.z * 0.25), 0, Math.PI * 2);
    ctx.fill();
    if (s.r > 1.0) {
      ctx.fillStyle = `oklch(0.7 0.12 ${starHue} / ${a * 0.18})`;
      ctx.beginPath();
      ctx.arc(s.x, yy, s.r * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function drawShooting(
  ctx: CanvasRenderingContext2D,
  shooting: Shooting[],
  hue: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const sh of shooting) {
    const grad = ctx.createLinearGradient(
      sh.x,
      sh.y,
      sh.x - (sh.vx * 80) / 6,
      sh.y - (sh.vy * 80) / 6
    );
    grad.addColorStop(0, `oklch(0.95 0.05 ${hue} / ${sh.life})`);
    grad.addColorStop(1, `oklch(0.95 0.05 ${hue} / 0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.x - (sh.vx * 80) / 6, sh.y - (sh.vy * 80) / 6);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawDust(
  ctx: CanvasRenderingContext2D,
  dust: Dust[],
  dustSprite: OffscreenCanvas
) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const d of dust) {
    const size = d.r * 16;
    ctx.globalAlpha = d.life * 0.9;
    ctx.drawImage(dustSprite, d.x - size / 2, d.y - size / 2, size, size);
    ctx.globalAlpha = d.life;
    ctx.fillStyle = `oklch(0.95 0.08 ${d.hue} / 1)`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
