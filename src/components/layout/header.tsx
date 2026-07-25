'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandMark } from '@/components/ui/brand-mark';
import { navLinks } from '@/lib/nav';
import { layoutContent } from '@/lib/content/layout';
import { MobileNav } from './mobile-nav/mobile-nav';
import styles from './header.module.css';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

type NavLinkProps = {
  href: string;
  code: string;
  label: string;
  active: boolean;
};

function NavLink({ href, code, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${styles.navLink}${active ? ` ${styles.navLinkActive}` : ''}`}
    >
      <span className={styles.navCode}>{code}</span>
      <span className={styles.navLabel}>{label}</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href='/' className={styles.brand}>
          <BrandMark size={52} animated />
          <span className={styles.brandText}>
            <span className={styles.brandName}>
              {layoutContent.header.brandName}
              <span className={styles.brandAccent}>
                {layoutContent.header.brandAccent}
              </span>
            </span>
            <span className={styles.brandSub}>
              {layoutContent.header.brandSub}
            </span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={layoutContent.header.navLabel}>
          <span aria-hidden='true' className={styles.navPrefix}>
            $
          </span>
          {navLinks.map((l, i) => (
            <Fragment key={l.href}>
              <NavLink {...l} active={isActive(pathname, l.href)} />
              {i < navLinks.length - 1 && (
                <span aria-hidden='true' className={styles.navSep}>
                  /
                </span>
              )}
            </Fragment>
          ))}
          <span aria-hidden='true' className={styles.navCursor} />
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
