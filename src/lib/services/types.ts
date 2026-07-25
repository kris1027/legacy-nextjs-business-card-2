import type { StaticImageData } from 'next/image';

export type Service = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  features: string[];
  process: [string, string, string][];
  deliverables: string[];
  pricingNote: string;
  timeNote: string;
  designation: string;
  glyph: string;
  image: StaticImageData;
  imageAlt: string;
};
