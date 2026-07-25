// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MobileNav } from './mobile-nav';

let mockPathname = '/';
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

// CosmosBackground touches canvas APIs jsdom doesn't implement.
vi.mock('@/components/ui/background/background', () => ({
  CosmosBackground: () => null,
}));

describe('MobileNav', () => {
  beforeEach(() => {
    mockPathname = '/';
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
  });

  it('starts closed with the dialog inert', () => {
    render(<MobileNav />);
    const toggle = screen.getByRole('button', { name: /otwórz menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAttribute('inert');
  });

  it('opens on toggle click and exposes the dialog', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole('button', { name: /otwórz menu/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('inert');
    expect(dialog.className).toMatch(/is-open/);
  });

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    const toggle = screen.getByRole('button', { name: /otwórz menu/i });
    await user.click(toggle);
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
      'inert'
    );
    expect(toggle).toHaveFocus();
  });

  it('traps Tab from the last focusable back to the toggle', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    const toggle = screen.getByRole('button', { name: /otwórz menu/i });
    await user.click(toggle);

    const dialog = screen.getByRole('dialog');
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    expect(focusable.length).toBeGreaterThan(0);
    const last = focusable[focusable.length - 1];
    last.focus();
    expect(last).toHaveFocus();

    await user.tab();
    expect(toggle).toHaveFocus();
  });

  it('auto-closes when the pathname changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<MobileNav />);
    await user.click(screen.getByRole('button', { name: /otwórz menu/i }));
    expect(screen.getByRole('dialog')).not.toHaveAttribute('inert');

    mockPathname = '/oferta';
    rerender(<MobileNav />);

    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
      'inert'
    );
  });
});
