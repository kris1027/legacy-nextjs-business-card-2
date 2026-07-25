'use client';

import { useState } from 'react';
import { siteEmail, sitePhone } from '@/lib/config';
import { contactContent } from '@/lib/content/contact';
import { CosmicButton } from '@/components/ui/cosmic-button';
import { SiteLocation } from '@/components/ui/site-location';
import styles from './contact-channels.module.css';

function LocationIcon() {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      width='1em'
      height='1em'
      aria-hidden='true'
    >
      <path d='M8 0C5.24 0 3 2.24 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 7.5C6.62 7.5 5.5 6.38 5.5 5S6.62 2.5 8 2.5 10.5 3.62 10.5 5 9.38 7.5 8 7.5z' />
    </svg>
  );
}

const CONTACTS = [
  {
    label: contactContent.channels.email.label,
    value: siteEmail,
    copyValue: undefined,
    href: `mailto:${siteEmail}`,
    glyph: '✉',
    actionLabel: contactContent.channels.email.actionLabel,
    whatsappHref: undefined,
  },
  {
    label: contactContent.channels.phone.label,
    value: sitePhone,
    copyValue: sitePhone.replace(/\s/g, ''),
    href: `tel:${sitePhone.replace(/\s/g, '')}`,
    glyph: '☎',
    actionLabel: contactContent.channels.phone.actionLabel,
    whatsappHref: `https://wa.me/${sitePhone.replace(/[\s+]/g, '')}`,
  },
];

export function ContactChannels() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (k: string, v: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(v).catch(() => {});
    // Clear first so older screen readers see an empty -> full transition on
    // each successive copy and reliably announce the change.
    setCopiedKey(null);
    requestAnimationFrame(() => setCopiedKey(k));
    setTimeout(() => setCopiedKey(null), 1600);
  };

  return (
    <>
      <div className={styles.list}>
        {CONTACTS.map((it) => (
          <div key={it.label} className={styles.item}>
            <span className={styles.icon}>{it.glyph}</span>
            <span className={styles.label}>{it.label}</span>
            <span className={styles.value}>{it.value}</span>
            <div className={styles.actions}>
              {it.whatsappHref && (
                <CosmicButton
                  href={it.whatsappHref}
                  size='sm'
                  variant='ghost'
                  arrow='↗'
                >
                  {contactContent.channels.phone.whatsappLabel}
                </CosmicButton>
              )}
              {it.href && it.actionLabel && (
                <CosmicButton
                  href={it.href}
                  size='sm'
                  variant='ghost'
                  arrow='↗'
                >
                  {it.actionLabel}
                </CosmicButton>
              )}
              <CosmicButton
                size='sm'
                variant='ghost'
                arrow={false}
                aria-label={`${contactContent.channels.copy} ${it.label.toLowerCase()}`}
                onClick={() => copy(it.label, it.copyValue ?? it.value)}
              >
                {copiedKey === it.label
                  ? contactContent.channels.copied
                  : contactContent.channels.copy}
              </CosmicButton>
            </div>
          </div>
        ))}
        <span className='cs-sr-only' role='status' aria-live='polite'>
          {copiedKey
            ? `${contactContent.channels.copied} ${copiedKey.toLowerCase()}`
            : ''}
        </span>
      </div>

      <div className={styles.location}>
        <LocationIcon />
        <div className={styles.locationCode}>
          {contactContent.channels.location.code}
        </div>
        <div className={styles.locationCity}>
          {contactContent.channels.location.city}
        </div>
        <SiteLocation className={styles.locationCoords} />
      </div>
    </>
  );
}
