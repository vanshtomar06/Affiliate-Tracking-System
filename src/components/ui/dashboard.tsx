"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Affiliate, Campaign, Click, Conversion } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClicksTable } from './clicks-table';
import { ConversionsTable } from './conversions-table';
import { PostbackUrlDisplay } from './postback-url-display';
import { OverviewStats } from './overview-stats';

type EnrichedConversion = Conversion & { click: Click | undefined };

interface DashboardProps {
  initialAffiliates: Affiliate[];
  initialCampaigns: Campaign[];
}

export function Dashboard({ initialAffiliates, initialCampaigns }: DashboardProps) {
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string | undefined>(
    initialAffiliates[0]?.id.toString()
  );
  const [clicks, setClicks] = useState<Click[]>([]);
  const [conversions, setConversions] = useState<EnrichedConversion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedAffiliateId) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [clicksRes, conversionsRes] = await Promise.all([
            fetch(`/api/clicks?affiliate_id=${selectedAffiliateId}`),
            fetch(`/api/conversions?affiliate_id=${selectedAffiliateId}`),
          ]);
          const clicksData = await clicksRes.json();
          const conversionsData = await conversionsRes.json();
          setClicks(clicksData.data || []);
          setConversions(conversionsData.data || []);
        } catch (error) {
          console.error("Failed to fetch affiliate data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedAffiliateId]);

  const selectedAffiliate = useMemo(() => {
    return initialAffiliates.find(a => a.id.toString() === selectedAffiliateId);
  }, [selectedAffiliateId, initialAffiliates]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Affiliate View</h2>
        <Select value={selectedAffiliateId} onValueChange={setSelectedAffiliateId}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select an Affiliate" />
          </SelectTrigger>
          <SelectContent>
            {initialAffiliates.map((affiliate) => (
              <SelectItem key={affiliate.id} value={affiliate.id.toString()}>
                {affiliate.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedAffiliate ? (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="postback_url">Postback URL</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewStats clicks={clicks} conversions={conversions} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="clicks">
            <ClicksTable clicks={clicks} campaigns={initialCampaigns} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="conversions">
            <ConversionsTable conversions={conversions} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="postback_url">
            <PostbackUrlDisplay affiliateId={selectedAffiliate.id} />
          </TabsContent>
        </Tabs>
      ) : (
        <p>Select an affiliate to view their data.</p>
      )}
    </div>
  );
}
