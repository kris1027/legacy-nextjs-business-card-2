export type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  hueShift: number;
};

export type Nebula = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rot: number;
  hue: number;
  alpha: number;
  driftX: number;
  driftY: number;
  pulsePhase: number;
};

export type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

export type Dust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  r: number;
  hue: number;
};

export type Mouse = { x: number; y: number; vx: number; vy: number };

export type State = {
  stars: Star[];
  nebulae: Nebula[];
  shooting: Shooting[];
  dust: Dust[];
  mouse: Mouse;
  scroll: number;
  time: number;
  shootTimer: number;
};

export type SimOpts = { hue: number; isFirefox: boolean };

export function createStars(w: number, h: number, isFirefox: boolean): Star[] {
  const count = Math.floor((w * h) / (isFirefox ? 7500 : 4500));
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 2,
    z: Math.random() * 3 + 0.3,
    r: Math.random() * 1.4 + 0.2,
    baseAlpha: Math.random() * 0.6 + 0.3,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.3 + Math.random() * 1.2,
    hueShift: (Math.random() - 0.5) * 30,
  }));
}

export function createNebulae(
  w: number,
  h: number,
  hue: number,
  isFirefox: boolean
): Nebula[] {
  if (isFirefox) return [];
  const count = Math.max(3, Math.floor((w * h) / 380000));
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    rx: 200 + Math.random() * 400,
    ry: 180 + Math.random() * 380,
    rot: Math.random() * Math.PI,
    hue: hue + (Math.random() - 0.5) * 60,
    alpha: 0.07 + Math.random() * 0.1,
    driftX: (Math.random() - 0.5) * 0.04,
    driftY: (Math.random() - 0.5) * 0.04,
    pulsePhase: Math.random() * Math.PI * 2,
  }));
}

export function spawnDust(mouse: Mouse, hue: number): Dust[] {
  const speed = Math.hypot(mouse.vx, mouse.vy);
  const count = Math.min(3, Math.floor(speed / 8));
  if (count === 0) return [];
  return Array.from({ length: count }, () => ({
    x: mouse.x + (Math.random() - 0.5) * 6,
    y: mouse.y + (Math.random() - 0.5) * 6,
    vx: -mouse.vx * 0.05 + (Math.random() - 0.5) * 0.6,
    vy: -mouse.vy * 0.05 + (Math.random() - 0.5) * 0.6,
    life: 1,
    decay: 0.012 + Math.random() * 0.02,
    r: Math.random() * 1.6 + 0.3,
    hue: hue + (Math.random() - 0.5) * 80,
  }));
}

export function updateStars(stars: Star[], dt: number): void {
  for (const s of stars) {
    s.twinklePhase += s.twinkleSpeed * 0.02 * dt;
  }
}

export function updateNebulae(
  nebulae: Nebula[],
  dt: number,
  w: number,
  h: number
): void {
  for (const n of nebulae) {
    n.x += n.driftX * dt;
    n.y += n.driftY * dt;
    if (n.x < -n.rx) n.x = w + n.rx;
    if (n.x > w + n.rx) n.x = -n.rx;
    if (n.y < -n.ry) n.y = h + n.ry;
    if (n.y > h + n.ry) n.y = -n.ry;
    n.pulsePhase += 0.003 * dt;
  }
}

export function updateShooting(
  shooting: Shooting[],
  shootTimer: number,
  dt: number,
  w: number,
  h: number
): number {
  shootTimer += dt;
  if (shootTimer > 240 && Math.random() < 0.008) {
    shootTimer = 0;
    shooting.push({
      x: Math.random() * w * 0.7,
      y: Math.random() * h * 0.5,
      vx: 6 + Math.random() * 4,
      vy: 2 + Math.random() * 2,
      life: 1,
    });
  }
  for (let i = shooting.length - 1; i >= 0; i--) {
    const sh = shooting[i];
    sh.x += sh.vx * dt;
    sh.y += sh.vy * dt;
    sh.life -= 0.012 * dt;
    if (sh.life <= 0 || sh.x > w + 100 || sh.y > h + 100) shooting.splice(i, 1);
  }
  return shootTimer;
}

export function updateDust(dust: Dust[], dt: number): void {
  for (let i = dust.length - 1; i >= 0; i--) {
    const d = dust[i];
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.vy -= 0.015 * dt;
    d.life -= d.decay * dt;
    if (d.life <= 0) dust.splice(i, 1);
  }
}

export function simulate(
  state: State,
  input: { width: number; height: number },
  dt: number,
  opts: SimOpts
): void {
  state.time += dt;
  updateStars(state.stars, dt);
  if (!opts.isFirefox) {
    updateNebulae(state.nebulae, dt, input.width, input.height);
    state.shootTimer = updateShooting(
      state.shooting,
      state.shootTimer,
      dt,
      input.width,
      input.height
    );
  }
  updateDust(state.dust, dt);
}
