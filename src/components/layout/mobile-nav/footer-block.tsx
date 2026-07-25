import Link from 'next/link';
import type { CSSProperties } from 'react';
import { services } from '@/lib/services/data';
import { navLinks } from '@/lib/nav';
import { NAV_DESC } from './boot-data';
import styles from './footer-block.module.css';

type FooterBlockProps = {
  pathname: string;
  onSelect: () => void;
};

function activeNavHref(pathname: string): string {
  if (pathname === '/') return '/';
  const match = navLinks.find(
    (l) => l.href !== '/' && pathname.startsWith(l.href)
  );
  return match?.href ?? '/';
}

export function FooterBlock({ pathname, onSelect }: FooterBlockProps) {
  const linkCount = services.length;
  // We want bottom link to rise first, then up the stack, then `// oferta` last.
  // Stagger index 0 = last (bottom) link, index linkCount = `// oferta` heading.
  const total = linkCount + 1;
  const headingIdx = total - 1;
  const activeDesc = NAV_DESC[activeNavHref(pathname)] ?? '';

  return (
    <div className={styles.footer}>
      <div
        className={styles.heading}
        style={
          {
            '--idx': headingIdx,
            '--total': total,
          } as CSSProperties
        }
      >
        {'// oferta'}
      </div>

      <ul className={styles.links}>
        {services.map((service, i) => {
          // Reverse: last service (bottom) rises first → idx 0
          const idx = linkCount - 1 - i;
          return (
            <li
              key={service.slug}
              style={
                {
                  '--idx': idx,
                  '--total': total,
                } as CSSProperties
              }
              className={styles.linkItem}
            >
              <Link
                href={`/oferta/${service.slug}`}
                onClick={onSelect}
                className={styles.link}
              >
                <span className={styles.arrow} aria-hidden='true'>
                  ↗
                </span>
                <span>{service.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={styles.status} aria-hidden='true'>
        <span className={styles.dot} />
        <span>online · {activeDesc}</span>
      </div>
    </div>
  );
}
