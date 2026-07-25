'use client';

import { useEffect, useState } from 'react';
import { TYPING_PHRASES } from './boot-data';
import styles from './typing-prompt.module.css';

type Phase = 'type' | 'hold' | 'erase';

type TypingPromptProps = {
  active: boolean;
};

export function TypingPrompt({ active }: TypingPromptProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('type');

  useEffect(() => {
    if (!active) return;

    const target = TYPING_PHRASES[phraseIndex];
    let id: ReturnType<typeof setTimeout>;

    if (phase === 'type') {
      if (text.length < target.length) {
        id = setTimeout(() => setText(target.slice(0, text.length + 1)), 65);
      } else {
        id = setTimeout(() => setPhase('hold'), 1000);
      }
    } else if (phase === 'hold') {
      id = setTimeout(() => setPhase('erase'), 800);
    } else {
      if (text.length > 0) {
        id = setTimeout(() => setText(text.slice(0, -1)), 30);
      } else {
        id = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
          setPhase('type');
        }, 0);
      }
    }

    return () => clearTimeout(id);
  }, [active, text, phase, phraseIndex]);

  return (
    <span className={styles.prompt} aria-hidden='true'>
      <span className={styles.dollar}>$</span>
      <span className={styles.text}>{text}</span>
      <span className={styles.cursor} />
    </span>
  );
}
