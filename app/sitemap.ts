import { MetadataRoute } from 'next';
import { getAllUserIds } from '@/lib/user';

const baseUrl = 'https://my-link-bay-one.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const routes = [
    '',
    // Add other static routes if they exist and should be indexed
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (user profiles)
  const userIds = await getAllUserIds();
  const userRoutes = userIds.map((id) => ({
    url: `${baseUrl}/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...userRoutes];
}
