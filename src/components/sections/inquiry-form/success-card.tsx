import { contactContent } from '@/lib/content/contact';
import styles from './inquiry-form.module.css';

export function SuccessCard() {
  return (
    <div className={styles.success}>
      <div className={styles.successCode}>
        {contactContent.successCard.code}
      </div>
      <div className={styles.successTitle}>
        {contactContent.successCard.title}
      </div>
      <div className={styles.successBody}>
        {contactContent.successCard.body}
      </div>
    </div>
  );
}
