import styles from './inquiry-form.module.css';

type FieldIds = { errorId: string | undefined; invalid: boolean };

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  error?: string;
  /** Stable id base used to derive the error span id (`${idBase}-error`).
   *  Defaults to `htmlFor` for label-bound fields. Required when `htmlFor`
   *  is omitted (e.g. the custom service dropdown). */
  idBase?: string;
  children: React.ReactNode | ((ids: FieldIds) => React.ReactNode);
};

export function FormField({
  label,
  htmlFor,
  className,
  error,
  idBase,
  children,
}: FormFieldProps) {
  const base = idBase ?? htmlFor;
  const errorId = error && base ? `${base}-error` : undefined;
  const ids: FieldIds = { errorId, invalid: !!error };
  const rendered = typeof children === 'function' ? children(ids) : children;

  return (
    <div className={`${styles.field}${className ? ` ${className}` : ''}`}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {rendered}
      {error && (
        <span id={errorId} className={styles.fieldError} role='alert'>
          {error}
        </span>
      )}
    </div>
  );
}
