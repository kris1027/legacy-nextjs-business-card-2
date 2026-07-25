import Link from 'next/link';
import type { CSSProperties, Ref } from 'react';
import { navLinks } from '@/lib/nav';
import { NAV_DESC } from './boot-data';
import styles from './menu-items.module.css';

type MenuItemsProps = {
  pathname: string;
  onSelect: () => void;
  firstLinkRef: Ref<HTMLAnchorElement>;
};

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function MenuItems({
  pathname,
  onSelect,
  firstLinkRef,
}: MenuItemsProps) {
  const total = navLinks.length;

  return (
    <ul className={styles.list}>
      {navLinks.map((link, i) => {
        const active = isActive(pathname, link.href);
        return (
          <li
            key={link.href}
            className={styles.item}
            style={
              {
                '--idx': i,
                '--total': total,
              } as CSSProperties
            }
          >
            <Link
              ref={i === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={onSelect}
              className={`${styles.link} ${active ? styles.active : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {active && <span className={styles.beam} aria-hidden='true' />}
              <span className={styles.code}>{link.code}</span>
              <span className={styles.caret} aria-hidden='true'>
                &gt;
              </span>
              <span className={styles.label}>{link.label}</span>
              <span className={styles.desc} aria-hidden='true'>
                {NAV_DESC[link.href] ?? ''}
              </span>
              {active && <span className={styles.cursor} aria-hidden='true' />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
