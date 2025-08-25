import { NextResponse } from 'next/server';
import { findClick, addConversion } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const affiliate_id = searchParams.get('affiliate_id');
  const click_id = searchParams.get('click_id');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');

  if (!affiliate_id || !click_id || !amount || !currency) {
    return NextResponse.json({ status: 'error', message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const affiliateIdNum = parseInt(affiliate_id, 10);
    const amountNum = parseFloat(amount);

    const existingClick = await findClick(click_id, affiliateIdNum);

    if (!existingClick) {
      return NextResponse.json({ status: 'error', message: 'Invalid click_id or affiliate_id' }, { status: 404 });
    }

    const newConversion = await addConversion({
      click_id: existingClick.id,
      amount: amountNum,
      currency,
    });

    return NextResponse.json({ status: 'success', message: 'Conversion tracked', data: newConversion });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ status: 'error', message: 'Failed to track conversion', error: errorMessage }, { status: 500 });
  }
}
