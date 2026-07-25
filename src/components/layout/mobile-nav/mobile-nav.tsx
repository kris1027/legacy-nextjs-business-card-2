'use client';

import { usePathname } from 'next/navigation';
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { CosmosBackground } from '@/components/ui/background/background';
import { BootLog } from './boot-log';
import { MenuItems } from './menu-items';
import { TypingPrompt } from './typing-prompt';
import styles from './mobile-nav.module.css';

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSeq, setOpenSeq] = useState(0);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );
  const overlayId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Auto-close on route change so navigations from anywhere (including the
  // header brand link, which sits outside this component) don't leave the
  // overlay stuck open. Syncing local UI state to router state is a
  // legitimate use of setState-in-effect - there's no subscribe API for
  // Next's pathname.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Body scroll lock + Esc + Tab focus trap while open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const overlay = overlayRef.current;
      const button = buttonRef.current;
      if (!overlay || !button) return;

      const overlayFocusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      // Include the toggle so [Shift+]Tab cycles through it instead of
      // escaping into the (still mounted) page content behind the overlay.
      const focusable = [button, ...overlayFocusable];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Focus management: first link on open, toggle on close (ARIA APG pattern).
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      // Wait for the open transition to start; focusing immediately can cause
      // the browser to scroll the link into view before the overlay paints.
      const id = window.setTimeout(() => firstLinkRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
    // Skip the initial render (before the user has ever opened the menu)
    // so we don't steal focus on page load.
    if (!wasOpenRef.current) return;
    buttonRef.current?.focus({ preventScroll: true });
  }, [open]);

  const overlay = (
    <div
      ref={overlayRef}
      id={overlayId}
      role='dialog'
      aria-modal='true'
      aria-label='Menu'
      inert={!open}
      className={`${styles.overlay} ${open ? 'is-open' : ''}`}
    >
      {open && (
        <div className={styles.cosmos} aria-hidden='true'>
          <CosmosBackground />
        </div>
      )}

      <BootLog key={openSeq} active={open} />

      <div className={styles.commandLine} aria-hidden='true'>
        <span className={styles.dollar}>$</span> nav.exec{' '}
        <span className={styles.flag}>--list</span>
        <span className={styles.flagDim}> --verbose</span>
      </div>

      <MenuItems
        pathname={pathname}
        onSelect={() => setOpen(false)}
        firstLinkRef={firstLinkRef}
      />

      <div className={styles.tail}>
        <TypingPrompt active={open} />
      </div>
    </div>
  );

  return (
    <div className={styles.root}>
      <button
        ref={buttonRef}
        type='button'
        className={styles.toggle}
        data-open={open}
        aria-expanded={open}
        aria-controls={overlayId}
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        onClick={() => {
          if (!open) setOpenSeq((s) => s + 1);
          setOpen((o) => !o);
        }}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {mounted ? createPortal(overlay, document.body) : overlay}
    </div>
  );
}
