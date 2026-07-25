import type { Metadata } from 'next';
import { ogDefaults, twitterDefaults } from './config';

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = `${title} | zaruszaj.pl`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...ogDefaults,
      title: ogTitle,
      description,
      url: path,
    },
    twitter: {
      ...twitterDefaults,
      title: ogTitle,
      description,
    },
  };
}
