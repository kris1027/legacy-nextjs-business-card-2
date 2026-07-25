'use client';

import { useEffect, useRef, useState } from 'react';
import type { Service } from '@/lib/services/types';
import { servicesContent } from '@/lib/content/services';
import { CosmicButton } from '@/components/ui/cosmic-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import styles from './service-cards.module.css';

type ServiceCardsProps = {
  services: Service[];
  variant?: 'preview' | 'detail';
};

export function ServiceCards({
  services,
  variant = 'preview',
}: ServiceCardsProps) {
  const detail = variant === 'detail';
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [observed, setObserved] = useState(false);
  const inView = reduced || observed;

  useEffect(() => {
    if (reduced) return;
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObserved(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const equalize = () => {
      grid.style.removeProperty('--card-height');
      const cards = grid.querySelectorAll<HTMLElement>(`.${styles.card}`);
      if (cards.length === 0) return;
      const max = Math.max(...Array.from(cards).map((c) => c.offsetHeight));
      grid.style.setProperty('--card-height', `${max}px`);
    };
    equalize();
    const ro = new ResizeObserver(equalize);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={styles.grid}>
      {services.map((s, i) => (
        <div
          key={s.slug}
          className={`${styles.card}${inView ? ` ${styles.cardVisible}` : ''}${detail ? ` ${styles.cardDetail}` : ''}`}
          data-interactive
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <span
            aria-hidden='true'
            className={`${styles.corner} ${styles.cornerTL}`}
          />
          <span
            aria-hidden='true'
            className={`${styles.corner} ${styles.cornerTR}`}
          />
          <span
            aria-hidden='true'
            className={`${styles.corner} ${styles.cornerBL}`}
          />
          <span
            aria-hidden='true'
            className={`${styles.corner} ${styles.cornerBR}`}
          />

          <div aria-hidden='true' className={styles.rail}>
            <div className={styles.railFill} />
          </div>

          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.glyph}>{s.glyph}</span>
              <div>
                <div className={styles.missionLabel}>
                  MISSION_{String(i + 1).padStart(2, '0')}
                </div>
                <div className={styles.desig}>{s.designation}</div>
              </div>
            </div>
            <div aria-hidden='true' className={styles.readyBadge}>
              <span className={styles.pingWrap}>
                <span className={styles.pingCore} />
                <span className={styles.pingRing} />
              </span>
              READY
            </div>
          </div>

          <h3>{s.title}</h3>
          <p>{detail ? s.description : s.shortDescription}</p>

          <ul className={styles.features}>
            {(detail ? s.features : s.features.slice(0, 4)).map((f, fi) => (
              <li key={f}>
                <span className={styles.featureNum}>
                  {String(fi + 1).padStart(2, '0')}
                </span>
                <span className={styles.featureArrow}>›</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className={styles.cardFooter}>
            <CosmicButton href={`/oferta/${s.slug}`} variant='card' size='sm'>
              {detail
                ? servicesContent.cards.ctaDetail
                : servicesContent.cards.ctaPreview}
            </CosmicButton>
          </div>
        </div>
      ))}
    </div>
  );
}
