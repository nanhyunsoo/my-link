"use client";

import { useAuth } from "@/components/auth-provider";
import { useLinks } from "@/hooks/use-links";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Loader2, BarChart3, MousePointer2, Trophy, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Cell, Pie, PieChart } from "recharts";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "white",
  },
} satisfies ChartConfig;

export default function StatsPage() {
  const { user, loading: authLoading } = useAuth();
  const { data: links = [], isLoading: linksLoading } = useLinks(user?.uid);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const stats = useMemo(() => {
    const total = links.reduce((acc, link) => acc + (link.clicks || 0), 0);
    const sorted = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    
    // Find all links tied for 1st place
    const topClicks = sorted[0]?.clicks || 0;
    const topLinks = topClicks > 0 ? sorted.filter(l => l.clicks === topClicks) : [];
    const topLink = topLinks[0] || null;
    const tieCount = topLinks.length > 1 ? topLinks.length - 1 : 0;

    // Bar chart data - limit to top 10
    const barData = sorted.slice(0, 10).map(link => ({
      name: link.title,
      clicks: link.clicks || 0,
    }));

    // Pie chart data - top 5 for distribution
    const pieData = sorted.slice(0, 5).map((link, index) => ({
      name: link.title,
      clicks: link.clicks || 0,
      fill: index === 0 ? "white" : `rgba(255, 255, 255, ${0.85 - index * 0.1})`,
    }));

    return { total, topLink, tieCount, barData, pieData, sorted };
    }, [links]);

  if (authLoading || (user && linksLoading)) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-white selection:text-black dark">
      <main className="max-w-5xl mx-auto pt-32 pb-24 px-6 flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-black uppercase tracking-tighter italic text-white">Analytics Dashboard</h1>
          </div>
          <p className="text-white/70 font-bold uppercase tracking-widest text-sm">
            Insights and performance of your shared links
          </p>
        </header>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Clicks Card */}
          <Card className="bg-[#0D0D0D] border-2 border-white rounded-none md:col-span-2 text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-white/70">Total Clicks</CardDescription>
              <CardTitle className="text-6xl font-black tracking-tighter flex items-center gap-4 text-white">
                {stats.total.toLocaleString()}
                <MousePointer2 className="w-8 h-8 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-bold text-white/90">Aggregated traffic across all {links.length} links</p>
            </CardContent>
          </Card>

          {/* Top Link Card */}
          <Card className="bg-[#0D0D0D] border-2 border-white rounded-none md:col-span-2 text-white">
            <CardHeader className="pb-1">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-white/70">
                {stats.tieCount > 0 ? "Top Performing (Tied)" : "Top Performing"}
              </CardDescription>
              <CardTitle className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-[1.1] flex flex-wrap items-baseline gap-x-3">
                <span className="pr-2">{stats.topLink?.title || "No links yet"}</span>
                {stats.tieCount > 0 && (
                  <span className="text-xl md:text-2xl italic text-white/40 tracking-normal shrink-0">
                    & {stats.tieCount} more
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-2xl font-black tracking-tighter text-white">
                  {stats.topLink?.clicks.toLocaleString() || 0}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Total Clicks</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Bar Chart - Performance */}
          <Card className="bg-[#0D0D0D] border-2 border-white rounded-none lg:col-span-3 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-white">Top 10 Links</CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-white/70">Click comparison by link</CardDescription>
            </CardHeader>
            <CardContent>
              {links.length > 0 ? (
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart 
                    data={stats.barData} 
                    margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      stroke="#DDD" 
                      fontSize={10} 
                      fontWeight="bold"
                      tick={{ fill: '#DDD' }}
                      tickFormatter={(value) => value.length > 8 ? `${value.slice(0, 8)}...` : value}
                    />
                    <YAxis 
                      stroke="#DDD" 
                      fontSize={10} 
                      fontWeight="bold"
                      tick={{ fill: '#DDD' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent className="bg-black border-white/40 text-white" />} />
                    <Bar 
                      dataKey="clicks" 
                      radius={[2, 2, 0, 0]}
                      maxBarSize={40} 
                    >
                      {stats.barData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? "hsl(var(--primary))" : "#FFFFFF"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-white/30 opacity-60">
                  <p className="font-bold uppercase tracking-widest text-white/70">No data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Donut Chart - Distribution */}
          <Card className="bg-[#0D0D0D] border-2 border-white rounded-none lg:col-span-2 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-black uppercase tracking-tighter italic text-white">Share</CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-white/70">Click distribution (Top 5)</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {links.length > 0 ? (
                <>
                  <ChartContainer config={chartConfig} className="h-[220px] w-full">
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent hideLabel className="bg-black border-white/20 text-white" />} />
                      <Pie
                        data={stats.pieData}
                        dataKey="clicks"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={80}
                        stroke="none"
                      />
                    </PieChart>
                  </ChartContainer>
                  <div className="mt-4 w-full grid grid-cols-1 gap-2">
                    {stats.pieData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <div className="w-2 h-2 shrink-0" style={{ backgroundColor: item.fill }}></div>
                          <span className="truncate text-white/90">{item.name}</span>
                        </div>
                        <span className="text-white/60 shrink-0">
                          {((item.clicks / stats.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-[220px] w-full flex items-center justify-center border-2 border-dashed border-white/30 opacity-60">
                   <PieChartIcon className="w-8 h-8 opacity-20" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed List */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white">Link Performance List</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total {links.length} items</span>
          </div>
          <div className="grid gap-3">
            {stats.sorted.map((link) => (
              <div key={link.id} className="group relative block w-full">
                <div className="absolute inset-0 bg-white/10 translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></div>
                <div className="relative bg-black border-2 border-white/40 p-4 flex items-center justify-between transition-colors group-hover:border-white">
                  <div className="flex flex-col min-w-0 pr-4">
                    <span className="text-lg font-bold uppercase tracking-tight text-white truncate">{link.title}</span>
                    <span className="text-[10px] font-mono text-white/70 truncate">{link.url}</span>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-black tracking-tighter text-primary">{link.clicks || 0}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/80">Clicks</span>
                    </div>
                    <div className="flex flex-col items-end border-l-2 border-white/10 pl-6">
                      <span className="text-xl font-black tracking-tighter text-white/90">
                        {stats.total > 0 ? ((link.clicks / stats.total) * 100).toFixed(0) : 0}%
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/80">Share</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
