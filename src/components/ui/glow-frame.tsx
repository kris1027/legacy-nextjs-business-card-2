import Image, { type StaticImageData } from 'next/image';
import styles from './glow-frame.module.css';

type GlowFrameProps = {
  src: StaticImageData | string;
  alt: string;
  ratio?: string;
  label?: string;
  designation?: string;
  priority?: boolean;
  large?: boolean;
};

export function GlowFrame({
  src,
  alt,
  ratio = '16/9',
  label,
  designation,
  priority,
  large,
}: GlowFrameProps) {
  return (
    <div className={styles.frame} style={{ aspectRatio: ratio }}>
      <div className={styles.corners}>
        <span />
        <span />
        <span />
        <span />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='(max-width: 800px) 100vw, 50vw'
        priority={priority}
      />
      <div className={styles.scan} />
      {(label || designation) && (
        <div className={`${styles.meta}${large ? ` ${styles.metaLarge}` : ''}`}>
          {designation && <span className={styles.desig}>{designation}</span>}
          {label && <span>{label}</span>}
        </div>
      )}
    </div>
  );
}
