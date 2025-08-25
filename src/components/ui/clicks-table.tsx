import type { Click, Campaign } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

interface ClicksTableProps {
  clicks: Click[];
  campaigns: Campaign[];
  isLoading: boolean;
}

export function ClicksTable({ clicks, campaigns, isLoading }: ClicksTableProps) {
  const getCampaignName = (campaignId: number) => {
    return campaigns.find(c => c.id === campaignId)?.name || 'Unknown Campaign';
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clicks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Click ID</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clicks.length > 0 ? clicks.map((click) => (
              <TableRow key={click.id}>
                <TableCell className="font-mono">{click.click_id}</TableCell>
                <TableCell>
                    <Badge variant="outline">{getCampaignName(click.campaign_id)}</Badge>
                </TableCell>
                <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No clicks found for this affiliate.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
