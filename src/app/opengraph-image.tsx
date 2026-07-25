import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { siteCoords } from '@/lib/config';

export const alt =
  'zaruszaj.pl - składanie komputerów i strony internetowe Kraków';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fontBold = await readFile(
    join(process.cwd(), 'src/assets/fonts/jetbrains-mono-latin-700.woff')
  );

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#04020a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 72px',
        fontFamily: '"JetBrains Mono", monospace',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bottom-left glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -160,
          left: -160,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(62,207,142,0.18) 0%, transparent 65%)',
          display: 'flex',
        }}
      />
      {/* Top-right glow */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 65%)',
          display: 'flex',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: 'rgba(240,250,246,0.28)',
            fontSize: 13,
            letterSpacing: '0.12em',
          }}
        >
          SYS-001 · PORTFOLIO
        </span>
        <span
          style={{
            color: '#3ecf8e',
            fontSize: 13,
            letterSpacing: '0.1em',
          }}
        >
          {siteCoords}
        </span>
      </div>

      {/* Center content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <span
          style={{
            color: 'rgba(240,250,246,0.35)',
            fontSize: 15,
            letterSpacing: '0.16em',
          }}
        >
          {'// web developer · kraków'}
        </span>
        <span
          style={{
            color: '#f0faf6',
            fontSize: 100,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          zaruszaj.pl
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginTop: 4,
          }}
        >
          {['składanie komputerów', 'strony internetowe', 'Kraków'].map(
            (label, i, arr) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'center', gap: 20 }}
              >
                <span
                  style={{
                    color: 'rgba(240,250,246,0.5)',
                    fontSize: 19,
                    letterSpacing: '0.03em',
                  }}
                >
                  {label}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: '#3ecf8e', fontSize: 19 }}>·</span>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 36,
            height: 1,
            background: '#3ecf8e',
            display: 'flex',
          }}
        />
        <span
          style={{
            color: 'rgba(240,250,246,0.22)',
            fontSize: 13,
            letterSpacing: '0.1em',
          }}
        >
          zaruszaj.pl
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
