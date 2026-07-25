'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { BOOT_LOG, type BootLogTone } from './boot-data';
import styles from './boot-log.module.css';

type BootLogProps = {
  active: boolean;
};

const TOTAL = BOOT_LOG.length;
const LAST_LENGTH = BOOT_LOG[TOTAL - 1].m.length;

const TONE_SPEED: Record<BootLogTone, number> = {
  accent: 14,
  dim: 5,
  highlight: 22,
};

const LINE_GAP_MS = 60;

export function BootLog({ active }: BootLogProps) {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      if (lineIndex < TOTAL - 1 || charCount < LAST_LENGTH) {
        const id = setTimeout(() => {
          setLineIndex(TOTAL - 1);
          setCharCount(LAST_LENGTH);
        }, 0);
        return () => clearTimeout(id);
      }
      return;
    }

    const line = BOOT_LOG[lineIndex];
    if (!line) return;

    if (charCount < line.m.length) {
      const id = setTimeout(
        () => setCharCount((c) => c + 1),
        TONE_SPEED[line.tone]
      );
      return () => clearTimeout(id);
    }

    if (lineIndex < TOTAL - 1) {
      const id = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharCount(0);
      }, LINE_GAP_MS);
      return () => clearTimeout(id);
    }
  }, [active, lineIndex, charCount, reduced]);

  return (
    <div className={styles.log} aria-hidden='true'>
      {BOOT_LOG.map((line, i) => {
        const isPast = i < lineIndex;
        const isCurrent = i === lineIndex;
        const started = i <= lineIndex;
        const text = isPast
          ? line.m
          : isCurrent
            ? line.m.slice(0, charCount)
            : '';
        const showCaret = isCurrent && charCount < line.m.length;
        return (
          <div
            key={i}
            className={`${styles.line} ${styles[line.tone]} ${started ? '' : styles.pending}`}
          >
            <span className={styles.timestamp}>[{line.t}]</span>
            <span className={styles.message}>
              {text}
              {showCaret && (
                <span className={styles.caret} aria-hidden='true' />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
