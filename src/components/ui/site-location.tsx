import { siteCoords } from '@/lib/config';

type Props = { className?: string };

export function SiteLocation({ className }: Props) {
  return <div className={className}>{siteCoords}</div>;
}
