import { SectionLabel } from '@/components/ui/section-label';
import { InquiryForm } from '@/components/sections/inquiry-form/inquiry-form';
import { ContactChannels } from '@/components/sections/contact-channels';
import { services } from '@/lib/services/data';
import { contactContent } from '@/lib/content/contact';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Kontakt - składanie komputerów i strony www Kraków',
  description:
    'Skontaktuj się z zaruszaj.pl - składanie komputerów i strony internetowe Kraków. Napisz, zadzwoń lub wypełnij formularz zapytania.',
  path: '/kontakt',
});

type Props = { searchParams: Promise<{ service?: string }> };

export default async function KontaktPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const knownSlugs = services.map((s) => s.slug);
  const defaultService = service && knownSlugs.includes(service) ? service : '';

  return (
    <div className='cs-page cs-fade-in'>
      <section className={styles.inquirySection}>
        <ScrollReveal>
          <SectionLabel
            as='h1'
            code={contactContent.page.inquiry.code}
            title={contactContent.page.inquiry.title}
            kicker={contactContent.page.inquiry.kicker}
          />
        </ScrollReveal>
        <div className={styles.inquiryWrap}>
          <InquiryForm defaultService={defaultService} />
        </div>
      </section>

      <section>
        <ScrollReveal>
          <SectionLabel
            code={contactContent.page.contact.code}
            title={contactContent.page.contact.title}
            kicker={contactContent.page.contact.kicker}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ContactChannels />
        </ScrollReveal>
      </section>
    </div>
  );
}
