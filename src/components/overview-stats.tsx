"use client"

import type { Click, Conversion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from './ui/skeleton';
import { useMemo } from 'react';
import { DollarSign, MousePointerClick, CheckCircle } from 'lucide-react';

type EnrichedConversion = Conversion & { click: Click | undefined };

interface OverviewStatsProps {
  clicks: Click[];
  conversions: EnrichedConversion[];
  isLoading: boolean;
}

export function OverviewStats({ clicks, conversions, isLoading }: OverviewStatsProps) {
  const { totalRevenue, totalConversions, conversionRate, chartData } = useMemo(() => {
    const totalRevenue = conversions.reduce((sum, conv) => {
      // Simple currency conversion for aggregation, assuming EUR is ~1.1 USD
      const rate = conv.currency === 'EUR' ? 1.1 : 1;
      return sum + conv.amount * rate;
    }, 0);

    const totalConversions = conversions.length;
    const totalClicks = clicks.length;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    const dailyConversions: { [key: string]: number } = {};
    conversions.forEach(c => {
      const date = new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyConversions[date] = (dailyConversions[date] || 0) + 1;
    });

    const chartData = Object.entries(dailyConversions)
      .map(([date, count]) => ({ date, conversions: count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return { totalRevenue, totalConversions, conversionRate, chartData };
  }, [clicks, conversions]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-80 col-span-full" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Total revenue from all conversions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <MousePointerClick className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clicks.length}</div>
           <p className="text-xs text-muted-foreground">Total clicks recorded</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversions</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalConversions}</div>
           <p className="text-xs text-muted-foreground">Successful conversions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">%</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversionRate.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">From clicks to conversions</p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Conversions Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="conversions" fill="var(--color-primary)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
