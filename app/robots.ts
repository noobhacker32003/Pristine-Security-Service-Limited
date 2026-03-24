import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/report/'],
    },
    sitemap: 'https://www.pristinesecurity.org/sitemap.xml',
  };
}
