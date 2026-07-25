export type BootLogTone = 'accent' | 'dim' | 'highlight';

export type BootLogLine = {
  t: string;
  m: string;
  tone: BootLogTone;
};

export const BOOT_LOG: readonly BootLogLine[] = [
  { t: '0.000', m: 'init.zaruszaj - kernel v1.01', tone: 'accent' },
  { t: '0.012', m: 'mounting /pages ........... ok', tone: 'dim' },
  { t: '0.024', m: 'starting compositor ....... ok', tone: 'dim' },
  { t: '0.041', m: 'fetching routes [4/4] ..... ok', tone: 'dim' },
  { t: '0.063', m: 'menu.exec --list', tone: 'highlight' },
] as const;

export const TYPING_PHRASES: readonly string[] = [
  'cd ./offer',
  'cat ./about.md',
  'curl /contact',
  'open /home',
] as const;

export const NAV_DESC: Record<string, string> = {
  '/': 'index.tsx',
  '/o-mnie': 'whoami',
  '/oferta': 'ls ./services',
  '/kontakt': 'mail to:',
};
