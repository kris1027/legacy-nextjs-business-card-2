'use client';

import { useInView } from '@/hooks/use-in-view';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function ScrollReveal({ children, delay = 0, className }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`scroll-reveal${inView ? ' in-view' : ''}${className ? ` ${className}` : ''}`}
      style={
        delay
          ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
