"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

interface PostbackUrlDisplayProps {
  affiliateId: number;
}

export function PostbackUrlDisplay({ affiliateId }: PostbackUrlDisplayProps) {
  const postbackUrl = `https://affiliate-system.com/postback?affiliate_id=${affiliateId}&click_id={click_id}&amount={amount}&currency={currency}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Postback URL</CardTitle>
        <CardDescription>
          Provide this URL to advertisers to track conversions. Replace the bracketed placeholders with dynamic values.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock value={postbackUrl} />
        <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">affiliate_id</span>: Your unique affiliate ID (pre-filled).</p>
          <p><span className="font-semibold text-foreground">{`{click_id}`}</span>: The unique ID you generate for each click.</p>
          <p><span className="font-semibold text-foreground">{`{amount}`}</span>: The conversion amount (e.g., 100.00).</p>
          <p><span className="font-semibold text-foreground">{`{currency}`}</span>: The currency of the conversion (e.g., USD).</p>
        </div>
      </CardContent>
    </Card>
  );
}
