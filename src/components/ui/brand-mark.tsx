'use client';

import { useId } from 'react';
import styles from './brand-mark.module.css';

type Props = { size?: number; animated?: boolean };

export function BrandMark({ size = 52, animated = true }: Props) {
  const uid = useId();
  const gradId = `bm-grad-${uid}`;
  const glowId = `bm-glow-${uid}`;

  return (
    <svg
      className={`${styles.brandmark}${animated ? ` ${styles.brandmarkAnimated}` : ''}`}
      width={size}
      height={size}
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <defs>
        <linearGradient
          id={gradId}
          x1='0'
          y1='0'
          x2='64'
          y2='64'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            offset='0%'
            stopColor='oklch(0.85 0.18 var(--theme-hue, 160))'
          />
          <stop
            offset='60%'
            stopColor='oklch(0.7 0.24 var(--theme-acc-hue, 165))'
          />
          <stop
            offset='100%'
            stopColor='oklch(0.55 0.2 var(--theme-hue, 160))'
          />
        </linearGradient>
        <radialGradient id={glowId} cx='0.5' cy='0.5' r='0.5'>
          <stop
            offset='0%'
            stopColor='oklch(0.7 0.24 var(--theme-acc-hue, 165) / 0.5)'
          />
          <stop
            offset='100%'
            stopColor='oklch(0.7 0.24 var(--theme-acc-hue, 165) / 0)'
          />
        </radialGradient>
      </defs>

      <circle cx='32' cy='32' r='30' fill={`url(#${glowId})`} />

      <g className='bm-orbit'>
        <ellipse
          cx='32'
          cy='32'
          rx='28'
          ry='11'
          stroke={`url(#${gradId})`}
          strokeWidth='1.2'
          strokeDasharray='2 3'
          transform='rotate(-22 32 32)'
          opacity='0.55'
        />
        <circle
          className='bm-sat'
          cx='60'
          cy='32'
          r='1.6'
          fill={`url(#${gradId})`}
        />
      </g>

      <g className='bm-monitor'>
        <rect
          x='12'
          y='16'
          width='40'
          height='26'
          rx='2'
          stroke={`url(#${gradId})`}
          strokeWidth='1.6'
          fill='oklch(0.06 0.04 var(--theme-hue, 160) / 0.4)'
        />
        <rect
          x='14'
          y='18'
          width='36'
          height='22'
          rx='1'
          fill='oklch(0.5 0.22 var(--theme-acc-hue, 165) / 0.08)'
        />
        <path
          d='M 26 42 L 24 48 L 40 48 L 38 42 Z'
          stroke={`url(#${gradId})`}
          strokeWidth='1.4'
          fill='none'
          strokeLinejoin='round'
        />
        <line
          x1='20'
          y1='48'
          x2='44'
          y2='48'
          stroke={`url(#${gradId})`}
          strokeWidth='1.4'
          strokeLinecap='round'
        />
      </g>

      <g className='bm-code'>
        <path
          d='M 22 24 L 18 29 L 22 34'
          stroke='oklch(0.95 0.04 var(--theme-hue, 160))'
          strokeWidth='1.6'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M 42 24 L 46 29 L 42 34'
          stroke='oklch(0.95 0.04 var(--theme-hue, 160))'
          strokeWidth='1.6'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <line
          x1='36'
          y1='22'
          x2='28'
          y2='36'
          stroke={`url(#${gradId})`}
          strokeWidth='1.6'
          strokeLinecap='round'
        />
      </g>

      <g stroke={`url(#${gradId})`} strokeWidth='1' opacity='0.7'>
        <path d='M 4 12 L 4 4 L 12 4' fill='none' />
        <path d='M 60 12 L 60 4 L 52 4' fill='none' />
        <path d='M 4 52 L 4 60 L 12 60' fill='none' />
        <path d='M 60 52 L 60 60 L 52 60' fill='none' />
      </g>
    </svg>
  );
}
