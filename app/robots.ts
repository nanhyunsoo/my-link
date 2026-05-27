import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/stats', '/api/'],
    },
    sitemap: 'https://my-link-bay-one.vercel.app/sitemap.xml',
  };
}
