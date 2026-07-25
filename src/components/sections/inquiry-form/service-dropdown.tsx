'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { contactContent } from '@/lib/content/contact';
import styles from './inquiry-form.module.css';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  errorId?: string;
  invalid?: boolean;
};

export function ServiceDropdown({
  options,
  value,
  onChange,
  onBlur,
  errorId,
  invalid,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
        onBlur?.();
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [onBlur, isOpen]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      listRef.current?.children[focusedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [focusedIndex, isOpen]);

  const selected = options.find((o) => o.value === value);
  const selectedIndex = options.findIndex((o) => o.value === value);

  function openDropdown(initialIndex = selectedIndex >= 0 ? selectedIndex : 0) {
    setIsOpen(true);
    setFocusedIndex(initialIndex);
  }

  function closeDropdown(blur = true) {
    setIsOpen(false);
    setFocusedIndex(-1);
    if (blur) onBlur?.();
  }

  function selectOption(index: number) {
    onChange(options[index].value);
    closeDropdown(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          openDropdown(options.length - 1);
        } else {
          setFocusedIndex((i) => Math.max(i - 1, 0));
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else if (focusedIndex >= 0) {
          selectOption(focusedIndex);
        }
        break;
      case 'Escape':
        if (isOpen) {
          closeDropdown();
        }
        break;
    }
  }

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <button
        type='button'
        role='combobox'
        className={`${styles.selectTrigger}${isOpen ? ` ${styles.selectTriggerOpen}` : ''}${!selected ? ` ${styles.selectPlaceholder}` : ''}${invalid ? ` ${styles.inputError}` : ''}`}
        onClick={() => (isOpen ? closeDropdown(false) : openDropdown())}
        onKeyDown={handleKeyDown}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={errorId}
      >
        {selected ? selected.label : contactContent.form.dropdown.placeholder}
        <span
          className={`${styles.selectArrow}${isOpen ? ` ${styles.selectArrowOpen}` : ''}`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <ul
          id={listboxId}
          className={styles.selectDropdown}
          role='listbox'
          ref={listRef}
        >
          {options.map((o, i) => (
            // Keyboard navigation lives on the trigger button (handleKeyDown above)
            // per APG listbox pattern - the option itself is mouse-only.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={o.value}
              className={`${styles.selectOption}${value === o.value ? ` ${styles.selectOptionSelected}` : ''}${focusedIndex === i ? ` ${styles.selectOptionFocused}` : ''}`}
              role='option'
              aria-selected={value === o.value}
              data-interactive
              onClick={() => selectOption(i)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
