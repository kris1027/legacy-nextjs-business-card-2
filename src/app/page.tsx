import PrebuildImage from '@public/prebuild-1.webp';
import { services } from '@/lib/services/data';
import { homeContent } from '@/lib/content/home';
import { SectionLabel } from '@/components/ui/section-label';
import { GlowFrame } from '@/components/ui/glow-frame';
import { HomeCarousel } from '@/components/sections/carousel';
import { ServiceCards } from '@/components/sections/service-cards';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { HeroSection } from '@/components/sections/hero-section';
import { CosmicButton } from '@/components/ui/cosmic-button';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className='cs-page cs-fade-in'>
      <HeroSection />

      <section>
        <ScrollReveal>
          <SectionLabel
            code={homeContent.carousel.code}
            title={homeContent.carousel.title}
            kicker={homeContent.carousel.kicker}
          />
        </ScrollReveal>
        <ScrollReveal>
          <HomeCarousel />
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={homeContent.oferta.code}
            title={homeContent.oferta.title}
            kicker={homeContent.oferta.kicker}
          />
        </ScrollReveal>
        <ServiceCards services={services} />
      </section>

      <section className={styles.callout}>
        <ScrollReveal>
          <GlowFrame
            src={PrebuildImage}
            alt={homeContent.callout.imageAlt}
            ratio='var(--frame-ratio)'
            designation='WARNING-001'
            label='Pre-built risk'
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className={styles.calloutBody}>
            <h2>
              {homeContent.callout.heading.before}{' '}
              <em>{homeContent.callout.heading.em}</em>.
            </h2>
            <p>{homeContent.callout.body1}</p>
            <p>{homeContent.callout.body2}</p>
            <div className={styles.calloutCta}>
              <CosmicButton href='/kontakt' variant='primary'>
                {homeContent.callout.cta}
              </CosmicButton>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
