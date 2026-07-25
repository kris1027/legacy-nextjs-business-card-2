import Link from 'next/link';

type BaseProps = {
  variant?: 'primary' | 'ghost' | 'card';
  size?: 'sm' | 'md' | 'lg';
  arrow?: '→' | '↗' | false;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = BaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps | 'href'
  > & {
    href: string;
  };

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type CosmicButtonProps = LinkProps | ButtonProps;

const BASE_KEYS = [
  'variant',
  'size',
  'arrow',
  'className',
  'children',
  'href',
] as const;

function omitBase<T extends object>(
  props: T
): Omit<T, (typeof BASE_KEYS)[number]> {
  const result = { ...props } as Record<string, unknown>;
  for (const key of BASE_KEYS) delete result[key];
  return result as Omit<T, (typeof BASE_KEYS)[number]>;
}

function buildClass(variant: string, size: string, className?: string): string {
  return ['btn', `btn--${variant}`, size !== 'md' && `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');
}

function ArrowSlot({
  variant,
  arrow,
}: {
  variant: string;
  arrow: '→' | '↗' | false;
}) {
  if (!arrow) return null;
  if (variant === 'card') {
    return (
      <span className='arr-track'>
        <span className='arr real'>{arrow}</span>
        <span className='arr ghost'>{arrow}</span>
      </span>
    );
  }
  return (
    <span className={arrow === '↗' ? 'arr arr--ne' : 'arr arr--right'}>
      {arrow}
    </span>
  );
}

export function CosmicButton(props: CosmicButtonProps) {
  const {
    variant = 'ghost',
    size = 'md',
    arrow = '→',
    className,
    children,
  } = props;
  const cls = buildClass(variant, size, className);

  if ('href' in props && props.href) {
    const { href } = props as LinkProps;
    const linkRest = omitBase(props as LinkProps);
    const isExternal =
      href.startsWith('http://') || href.startsWith('https://');
    const isProtocol = href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal || isProtocol) {
      return (
        <a
          href={href}
          className={cls}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...(linkRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
          <ArrowSlot variant={variant} arrow={arrow} />
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cls}
        {...(linkRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        <ArrowSlot variant={variant} arrow={arrow} />
      </Link>
    );
  }

  const buttonRest = omitBase(props as ButtonProps);
  return (
    <button
      type='button'
      className={cls}
      {...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      <ArrowSlot variant={variant} arrow={arrow} />
    </button>
  );
}
