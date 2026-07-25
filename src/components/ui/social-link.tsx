type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  showLabel?: boolean;
  className?: string;
};

export function SocialLink({
  href,
  icon,
  label,
  showLabel = false,
  className,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      aria-label={showLabel ? undefined : label}
    >
      {icon}
      {showLabel && label}
    </a>
  );
}
