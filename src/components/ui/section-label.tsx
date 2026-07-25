import styles from './section-label.module.css';

type SectionLabelProps = {
  code: string;
  title: string;
  kicker?: string;
  as?: 'h1' | 'h2';
};

export function SectionLabel({
  code,
  title,
  kicker,
  as: Heading = 'h2',
}: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <div className={styles.code}>{code}</div>
      <div className={styles.titleBlock}>
        <Heading>{title}</Heading>
        {kicker && <div className={styles.kicker}>{kicker}</div>}
      </div>
    </div>
  );
}
