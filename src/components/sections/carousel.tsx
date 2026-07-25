'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlowFrame } from '@/components/ui/glow-frame';
import { services } from '@/lib/services/data';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { homeContent } from '@/lib/content/home';
import styles from './carousel.module.css';

const ITEMS = services.map((s) => ({
  src: s.image,
  label: s.title,
  code: s.designation,
  slug: s.slug,
}));

export function HomeCarousel() {
  const [idx, setIdx] = useState(0);
  const [observed, setObserved] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const gridRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const inView = reduced || observed;
  const autoRotating = !reduced && !paused && !hovering && !focused;

  useEffect(() => {
    if (!autoRotating) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % ITEMS.length), 4500);
    return () => clearInterval(t);
  }, [autoRotating]);

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const cur = ITEMS[idx];
  const total = ITEMS.length;
  const {
    controls: controlLabels,
    label: carouselLabel,
    slideOf,
  } = homeContent.carousel;

  const goPrev = () => setIdx((i) => (i - 1 + total) % total);
  const goNext = () => setIdx((i) => (i + 1) % total);

  return (
    // APG carousel pattern: the container groups the slides and tracks
    // pointer/focus to suspend auto-rotation. Listeners are on the section
    // itself per spec, not on a wrapping interactive element.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      ref={gridRef}
      className={styles.carousel}
      role='group'
      aria-roledescription='carousel'
      aria-label={carouselLabel}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      <div
        className={styles.mainWrap}
        aria-live={autoRotating ? 'off' : 'polite'}
        aria-atomic='true'
      >
        <Link
          href={`/oferta/${cur.slug}`}
          className={`${styles.main}${inView ? ` ${styles.itemVisible}` : ''}`}
          style={{ animationDelay: '0s' }}
          aria-label={slideOf(idx + 1, total, cur.label)}
        >
          <GlowFrame
            key={cur.code}
            src={cur.src}
            alt={cur.label}
            ratio='var(--carousel-ratio)'
            designation={cur.code}
            label={cur.label}
            priority
            large
          />
        </Link>

        {!reduced && (
          <div className={styles.controls}>
            <button
              type='button'
              className={styles.controlBtn}
              onClick={goPrev}
              aria-label={controlLabels.prev}
            >
              ‹
            </button>
            <button
              type='button'
              className={styles.controlBtn}
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? controlLabels.play : controlLabels.pause}
              aria-pressed={paused}
            >
              {paused ? '▶' : '❚❚'}
            </button>
            <button
              type='button'
              className={styles.controlBtn}
              onClick={goNext}
              aria-label={controlLabels.next}
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className={styles.thumbs}>
        {ITEMS.map((it, i) => (
          <button
            key={it.code}
            type='button'
            className={`${styles.thumb}${i === idx ? ` ${styles.thumbActive}` : ''}${inView ? ` ${styles.itemVisible}` : ''}`}
            data-interactive
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            onClick={() => setIdx(i)}
            onFocus={() => setIdx(i)}
            aria-label={slideOf(i + 1, total, it.label)}
            aria-pressed={i === idx}
          >
            <Image src={it.src} alt={it.label} fill sizes='200px' />
            {i === idx && autoRotating && (
              <div key={idx} className={styles.progressBar} />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
