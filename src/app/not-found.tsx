'use client';

import { usePathname } from 'next/navigation';
import styles from './not-found.module.css';
import { CosmicButton } from '@/components/ui/cosmic-button';

export default function NotFound() {
  const path = usePathname() ?? '/';
  return (
    <div className={styles.err}>
      <div aria-hidden='true' className={`${styles.stars} ${styles.starsL1}`} />
      <div aria-hidden='true' className={styles.nebula} />

      <div
        aria-hidden='true'
        className={`${styles.bracket} ${styles.bracketTl}`}
      />
      <div
        aria-hidden='true'
        className={`${styles.bracket} ${styles.bracketTr}`}
      />
      <div
        aria-hidden='true'
        className={`${styles.bracket} ${styles.bracketBl}`}
      />
      <div
        aria-hidden='true'
        className={`${styles.bracket} ${styles.bracketBr}`}
      />

      <div aria-hidden='true' className={styles.head}>
        <span className={styles.dot} />
        <b>zaruszaj.pl</b>
        <span className={styles.sep}>/</span>
        <span>system</span>
        <span className={styles.sep}>·</span>
        <span className={styles.pink}>err</span>
        <span className={styles.right}>PID 0421 · uptime 02:14:08</span>
      </div>

      <div className={styles.hero}>
        <div aria-hidden='true' className={styles.tag}>
          <span className={styles.tagDot} />
          error_404
        </div>

        <div aria-label='404' className={styles.fourOhFour}>
          <span aria-hidden='true' className={styles.num} data-text='4'>
            4
          </span>
          <span aria-hidden='true' className={styles.zero}>
            <span className={styles.num} data-text='0'>
              0
            </span>
            <span className={styles.ring} />
            <span className={`${styles.ring} ${styles.ringR2}`} />
          </span>
          <span aria-hidden='true' className={styles.num} data-text='4'>
            4
          </span>
        </div>

        <div className={styles.msg}>
          <h1 className={styles.msgH1}>
            Sygnał <span className={styles.acc}>utracony</span> w kosmosie.
          </h1>
          <p className={styles.msgP}>
            Strona, której szukasz, opuściła orbitę — albo nigdy tu nie była.
          </p>
          <div
            className={styles.term}
            role='img'
            aria-label={`Terminal: cat ${path} — ENOENT, nie znaleziono trasy`}
          >
            <span aria-hidden='true' className={styles.termP}>
              $
            </span>{' '}
            <span aria-hidden='true'>cat </span>
            <span aria-hidden='true' className={styles.termPath}>
              {path}
            </span>
            <br />
            <span aria-hidden='true' className={styles.termC}>
              ›{' '}
            </span>
            <span aria-hidden='true' className={styles.termG}>
              resolve:
            </span>{' '}
            <span aria-hidden='true' className={styles.termE}>
              ENOENT
            </span>
            <span aria-hidden='true'> · no such route</span>
            <span aria-hidden='true' className={styles.cur} />
          </div>
        </div>

        <nav aria-label='Nawigacja błędu' className={styles.actions}>
          <CosmicButton href='/' variant='primary' arrow={false}>
            Wróć na stronę główną
          </CosmicButton>
          <CosmicButton href='/oferta' arrow='↗'>
            Zobacz ofertę
          </CosmicButton>
        </nav>
      </div>

      <div aria-hidden='true' className={styles.diag}>
        <div className={styles.diagBar}>
          <span>{'// stack trace'}</span>
          <span className={styles.diagBarRight}>
            trace.id <span className={styles.diagId}>0xCAFE_404</span>
          </span>
        </div>
        <div className={styles.diagBody}>
          <div className={styles.diagRow}>
            <span className={styles.diagT}>[0.001]</span>
            <span className={styles.diagL}>
              router.resolve(
              <span className={styles.diagE}>&quot;{path}&quot;</span>)
            </span>
          </div>
          <div className={styles.diagRow}>
            <span className={styles.diagT}>[0.012]</span>
            <span className={styles.diagL}>
              ↳ <span className={styles.diagE}>RouteNotFound</span>: no match
              found
            </span>
          </div>
          <div className={styles.diagRow}>
            <span className={styles.diagT}>[0.014]</span>
            <span className={styles.diagL}>
              ↳ fallback → <span className={styles.diagOk}>not-found.tsx</span>
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden='true' className={styles.foot}>
        <span className={styles.footLeft}>
          <span className={styles.footDot} />
          online · awaiting input
        </span>
        <span>KRK · 50.06°N · 19.94°E</span>
      </div>
    </div>
  );
}
