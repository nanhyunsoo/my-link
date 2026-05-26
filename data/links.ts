export interface Link {
  id: string;
  title: string;
  url: string;
  faviconUrl?: string;
  createdAt?: any;
  updatedAt?: any;
}

export const DUMMY_LINKS: Link[] = [
  {
    id: "1",
    title: "Instagram",
    url: "https://www.instagram.com/user",
    faviconUrl: "https://www.google.com/s2/favicons?domain=instagram.com&sz=64",
  },
  {
    id: "2",
    title: "YouTube",
    url: "https://www.youtube.com/@user",
    faviconUrl: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
  },
  {
    id: "3",
    title: "Blog",
    url: "https://velog.io/@user",
    faviconUrl: "https://www.google.com/s2/favicons?domain=velog.io&sz=64",
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com/user",
    faviconUrl: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
  },
  {
    id: "5",
    title: "Portfolio",
    url: "https://user.dev",
    faviconUrl: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
  },
];
