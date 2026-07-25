import { services } from '@/lib/services/data';
import { servicesContent } from '@/lib/content/services';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/section-label';
import { GlowFrame } from '@/components/ui/glow-frame';
import { CosmicButton } from '@/components/ui/cosmic-button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { DeliverablesList } from '@/components/sections/deliverables-list';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.seoTitle ?? s.title} Kraków`,
    description: s.seoDescription ?? s.description,
    path: `/oferta/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];

  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <ScrollReveal>
          <Link
            href='/oferta'
            className={styles.breadcrumb}
            aria-label='Wróć do oferty'
          >
            ← <span>{servicesContent.detail.breadcrumb}</span> /{' '}
            <span className={styles.breadcrumbCurrent}>{s.designation}</span>
          </Link>
        </ScrollReveal>

        <div className={styles.hero}>
          <ScrollReveal>
            <div>
              <div className={styles.glyphRow}>
                <span className={styles.glyphIcon}>{s.glyph}</span>
                <span className={styles.glyphLabel}>{s.designation}</span>
              </div>
              <h1 className={styles.title}>{s.title}</h1>
              <p className={styles.lead}>{s.shortDescription}</p>
              <div className={styles.meta}>
                <div>
                  <div className={styles.metaKey}>
                    {servicesContent.detail.meta.timeKey}
                  </div>
                  <div className={styles.metaVal}>{s.timeNote}</div>
                </div>
                <div>
                  <div className={styles.metaKey}>
                    {servicesContent.detail.meta.pricingKey}
                  </div>
                  <div className={styles.metaVal}>{s.pricingNote}</div>
                </div>
              </div>
              <div className={styles.heroBtns}>
                <CosmicButton
                  href={`/kontakt?service=${s.slug}`}
                  variant='primary'
                >
                  {servicesContent.detail.btns.inquire}
                </CosmicButton>
                <CosmicButton href='/oferta' arrow='↗'>
                  {servicesContent.detail.btns.allServices}
                </CosmicButton>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className={styles.heroImg}>
            <GlowFrame
              src={s.image}
              alt={s.imageAlt}
              ratio='var(--frame-ratio)'
              designation={s.designation}
              label={s.title}
              priority
            />
          </ScrollReveal>
        </div>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={servicesContent.detail.sections.opis.code}
            title={servicesContent.detail.sections.opis.title}
            kicker={servicesContent.detail.sections.opis.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className={styles.longDescription}>{s.longDescription}</p>
        </ScrollReveal>
        <ul className={styles.features}>
          {s.features.map((f, i) => (
            <ScrollReveal key={f} delay={i * 0.07}>
              <li>{f}</li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={servicesContent.detail.sections.proces.code}
            title={servicesContent.detail.sections.proces.title}
            kicker={servicesContent.detail.sections.proces.kicker}
          />
        </ScrollReveal>
        <ol className={styles.process}>
          {s.process.map(([n, t, d], i) => (
            <ScrollReveal key={n} delay={i * 0.08}>
              <li className={styles.processStep}>
                <div className={styles.processNum}>{n}</div>
                <div>
                  <div className={styles.processTitle}>{t}</div>
                  <div className={styles.processDesc}>{d}</div>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={servicesContent.detail.sections.efekt.code}
            title={servicesContent.detail.sections.efekt.title}
            kicker={servicesContent.detail.sections.efekt.kicker}
          />
        </ScrollReveal>
        <DeliverablesList items={s.deliverables} />
      </section>

      <section className={styles.cta}>
        <ScrollReveal>
          <div>
            <div className={styles.ctaKicker}>
              {servicesContent.detail.cta.kicker}
            </div>
            <h2>{servicesContent.detail.cta.heading}</h2>
            <p>{servicesContent.detail.cta.body}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className={styles.ctaBtns}>
            <CosmicButton
              href={`/kontakt?service=${s.slug}`}
              variant='primary'
              size='lg'
            >
              {servicesContent.detail.cta.primary}
            </CosmicButton>
            <CosmicButton href={`/oferta/${next.slug}`} arrow='↗'>
              {servicesContent.detail.cta.next} {next.designation}
            </CosmicButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
