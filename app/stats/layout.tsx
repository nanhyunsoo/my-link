import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Monitor your link performance, click counts, and distribution with our real-time analytics dashboard.",
  robots: {
    index: false, // Stats page should probably not be indexed as it's private/personal
    follow: false,
  },
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
