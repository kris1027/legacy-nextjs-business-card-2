import Link from 'next/link';
import { services } from '@/lib/services/data';
import {
  siteEmail,
  sitePhone,
  siteVersion,
  githubUrl,
  linkedinUrl,
} from '@/lib/config';
import { navLinks } from '@/lib/nav';
import { layoutContent } from '@/lib/content/layout';
import { BrandMark } from '@/components/ui/brand-mark';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { SocialLink } from '@/components/ui/social-link';
import { SiteLocation } from '@/components/ui/site-location';
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <nav aria-label={layoutContent.footer.navLabel}>
          <div className={styles.heading}>{layoutContent.footer.nav}</div>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              <span className={styles.arrow}>↗</span> {l.label}
            </Link>
          ))}
        </nav>
        <nav aria-label={layoutContent.footer.ofertaLabel}>
          <div className={styles.heading}>{layoutContent.footer.oferta}</div>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/oferta/${s.slug}`}
              className={styles.link}
            >
              <span className={styles.arrow}>↗</span> {s.title}
            </Link>
          ))}
        </nav>
        <div>
          <div className={styles.heading}>{layoutContent.footer.kontakt}</div>
          <a className={styles.link} href={`mailto:${siteEmail}`}>
            <span className={styles.arrow}>↗</span> {siteEmail}
          </a>
          <a
            className={styles.link}
            href={`tel:${sitePhone.replace(/\s/g, '')}`}
          >
            <span className={styles.arrow}>↗</span> {sitePhone}
          </a>
          <div className={styles.socials}>
            <SocialLink
              href={githubUrl}
              icon={<GithubIcon />}
              label='GitHub'
              className={styles.socialIcon}
            />
            <SocialLink
              href={linkedinUrl}
              icon={<LinkedinIcon />}
              label='LinkedIn'
              className={styles.socialIcon}
            />
          </div>
          <div className={styles.coord}>
            <SiteLocation />
            <div className={styles.coordSub}>
              {layoutContent.footer.location}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <BrandMark size={20} animated={false} />
        <span>
          © {new Date().getFullYear()} {layoutContent.footer.copyright}
        </span>
        <span className={styles.blink}>●</span>
        <span>{layoutContent.footer.status}</span>
        <span className={styles.spacer} />
        <span>{siteVersion}</span>
      </div>
    </footer>
  );
}
