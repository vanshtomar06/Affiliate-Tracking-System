import type { Click, Conversion } from '@/lib/types';
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

type EnrichedConversion = Conversion & { click: Click | undefined };

interface ConversionsTableProps {
  conversions: EnrichedConversion[];
  isLoading: boolean;
}

export function ConversionsTable({ conversions, isLoading }: ConversionsTableProps) {
    if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversions</CardTitle>
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
        <CardTitle>Conversions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Associated Click ID</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversions.length > 0 ? conversions.map((conversion) => (
              <TableRow key={conversion.id}>
                <TableCell>
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: conversion.currency }).format(conversion.amount)}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{conversion.click?.click_id || 'N/A'}</TableCell>
                <TableCell>{new Date(conversion.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No conversions found for this affiliate.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
