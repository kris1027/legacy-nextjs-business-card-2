export const siteUrl = 'https://zaruszaj.pl';
export const siteVersion = 'v.1.01';
export const siteEmail = 'kris1027.dev@gmail.com';
export const sitePhone = '+48 792 542 841';
export const githubUrl = 'https://github.com/Kris1027';
export const linkedinUrl = 'https://www.linkedin.com/in/krzysztof-obarzanek';
export const siteCoords = '50.0647° N · 19.9450° E';

const ogImage = {
  url: '/opengraph-image',
  alt: 'zaruszaj.pl - składanie komputerów i strony internetowe Kraków',
  width: 1200,
  height: 630,
};

export const ogDefaults = {
  type: 'website' as const,
  locale: 'pl_PL',
  siteName: 'zaruszaj.pl',
  images: [ogImage],
};

export const twitterDefaults = {
  card: 'summary_large_image' as const,
  images: [ogImage],
};
