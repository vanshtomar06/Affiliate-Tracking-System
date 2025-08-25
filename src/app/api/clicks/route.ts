import { NextResponse } from 'next/server';
import { getClicksForAffiliate } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const affiliate_id = searchParams.get('affiliate_id');

  if (!affiliate_id) {
    return NextResponse.json({ status: 'error', message: 'Missing affiliate_id parameter' }, { status: 400 });
  }

  try {
    const clicks = await getClicksForAffiliate(parseInt(affiliate_id, 10));
    return NextResponse.json({ status: 'success', data: clicks });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ status: 'error', message: 'Failed to get clicks', error: errorMessage }, { status: 500 });
  }
}
