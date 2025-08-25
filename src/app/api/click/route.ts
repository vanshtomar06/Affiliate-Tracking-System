import { NextResponse } from 'next/server';
import { addClick } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const affiliate_id = searchParams.get('affiliate_id');
  const campaign_id = searchParams.get('campaign_id');
  const click_id = searchParams.get('click_id');

  if (!affiliate_id || !campaign_id || !click_id) {
    return NextResponse.json({ status: 'error', message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const newClick = await addClick({
      affiliate_id: parseInt(affiliate_id, 10),
      campaign_id: parseInt(campaign_id, 10),
      click_id,
    });
    return NextResponse.json({ status: 'success', message: 'Click tracked', data: newClick });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ status: 'error', message: 'Failed to track click', error: errorMessage }, { status: 500 });
  }
}
