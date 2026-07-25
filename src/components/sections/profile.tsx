'use client';

import Image from 'next/image';
import ProfileImage from '@public/profile-1.webp';
import { useInView } from '@/hooks/use-in-view';
import { githubUrl, linkedinUrl } from '@/lib/config';
import { aboutContent } from '@/lib/content/about';
import { sharedContent } from '@/lib/content/shared';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { CosmicButton } from '@/components/ui/cosmic-button';
import { SocialLink } from '@/components/ui/social-link';
import styles from './profile.module.css';

export function AboutProfile() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${styles.aboutGrid}${inView ? ` ${styles.inView}` : ''}`}
    >
      <div className={styles.portrait}>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.photo}>
          <Image
            src={ProfileImage}
            alt={aboutContent.profile.imageAlt}
            fill
            sizes='240px'
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.role}>{aboutContent.profile.role}</div>
        <div className={styles.name}>{aboutContent.profile.name}</div>
        <div className={styles.socialLinks}>
          <SocialLink
            href={githubUrl}
            icon={<GithubIcon />}
            label='GitHub'
            showLabel
            className={styles.socialBtn}
          />
          <SocialLink
            href={linkedinUrl}
            icon={<LinkedinIcon />}
            label='LinkedIn'
            showLabel
            className={styles.socialBtn}
          />
        </div>
        <p className={styles.bio}>{aboutContent.profile.bio}</p>
        <div className={styles.bodyBtns}>
          <CosmicButton href='/oferta'>
            {sharedContent.cta.seeOffer}
          </CosmicButton>
          <CosmicButton href='/kontakt' arrow='↗'>
            {aboutContent.profile.btnKontakt}
          </CosmicButton>
        </div>
      </div>
    </div>
  );
}
