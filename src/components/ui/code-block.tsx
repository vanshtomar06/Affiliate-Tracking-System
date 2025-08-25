"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  value: string;
}

export function CodeBlock({ value, className, ...props }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
        console.warn('Clipboard API not available');
        return;
    }
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    toast({
        title: "Copied to clipboard!",
        description: "The postback URL has been copied.",
    });
  };

  return (
    <div className="relative">
      <pre
        className={cn(
          'rounded-lg border bg-muted p-4 pr-12 font-mono text-sm text-muted-foreground overflow-x-auto',
          className
        )}
        {...props}
      >
        <code>{value}</code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
        onClick={copyToClipboard}
        aria-label="Copy to clipboard"
      >
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
