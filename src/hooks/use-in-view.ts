import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './use-reduced-motion';

export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.35
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const [observed, setObserved] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObserved(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  return { ref, inView: reduced || observed };
}
