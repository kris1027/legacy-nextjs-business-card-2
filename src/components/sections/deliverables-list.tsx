'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import styles from './deliverables-list.module.css';

type Props = { items: readonly string[] };

export function DeliverablesList({ items }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    let io: IntersectionObserver | undefined;
    if (!reduced) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            io!.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      io.observe(grid);
    }

    const equalize = () => {
      const cards = Array.from(grid.children) as HTMLElement[];
      if (cards.length === 0) return;
      cards.forEach((c) => c.style.removeProperty('min-height'));
      const max = Math.max(...cards.map((c) => c.offsetHeight));
      cards.forEach((c) => (c.style.minHeight = `${max}px`));
    };

    equalize();
    const ro = new ResizeObserver(equalize);
    ro.observe(grid);
    return () => {
      io?.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  const visible = reduced || inView;

  return (
    <div ref={ref} className={styles.grid}>
      {items.map((d, i) => (
        <div
          key={i}
          className={`${styles.item}${visible ? ` ${styles.itemVisible}` : ''}`}
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          <span aria-hidden='true' className={styles.mark}>
            ◇
          </span>
          <span>{d}</span>
        </div>
      ))}
    </div>
  );
}
