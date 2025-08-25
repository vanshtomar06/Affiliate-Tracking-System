import type { Affiliate, Campaign, Click, Conversion } from './types';

// In-memory store to simulate a database
let affiliates: Affiliate[] = [
  { id: 1, name: 'Super Affiliates Inc.' },
  { id: 2, name: 'Marketing Gurus' },
  { id: 3, name: 'Top Converters' },
];

let campaigns: Campaign[] = [
  { id: 10, name: 'Summer Sale 2024' },
  { id: 20, name: 'Winter Deals' },
  { id: 30, name: 'Black Friday Special' },
];

let clicks: Click[] = [];
let conversions: Conversion[] = [];

let nextClickId = 1;
let nextConversionId = 1;

// Seed some initial data for demonstration if the stores are empty
const seedData = () => {
  if (clicks.length === 0) {
    const now = Date.now();
    clicks.push({ id: nextClickId++, affiliate_id: 1, campaign_id: 10, click_id: 'abc123', timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000) });
    clicks.push({ id: nextClickId++, affiliate_id: 1, campaign_id: 10, click_id: 'def456', timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000) });
    clicks.push({ id: nextClickId++, affiliate_id: 2, campaign_id: 20, click_id: 'ghi789', timestamp: new Date(now - 12 * 60 * 60 * 1000) });
    clicks.push({ id: nextClickId++, affiliate_id: 1, campaign_id: 20, click_id: 'jkl012', timestamp: new Date(now - 6 * 60 * 60 * 1000) });
    clicks.push({ id: nextClickId++, affiliate_id: 3, campaign_id: 30, click_id: 'mno345', timestamp: new Date(now - 2 * 60 * 60 * 1000) });
  }

  if (conversions.length === 0) {
    const now = Date.now();
    conversions.push({ id: nextConversionId++, click_id: 1, amount: 100, currency: 'USD', timestamp: new Date(now - 47 * 60 * 60 * 1000) });
    conversions.push({ id: nextConversionId++, click_id: 3, amount: 75.50, currency: 'EUR', timestamp: new Date(now - 10 * 60 * 60 * 1000) });
    conversions.push({ id: nextConversionId++, click_id: 4, amount: 120.00, currency: 'USD', timestamp: new Date(now - 4 * 60 * 60 * 1000) });
  }
};

seedData();

// --- API Functions ---

export async function getAffiliates(): Promise<Affiliate[]> {
  return Promise.resolve(affiliates);
}

export async function getCampaigns(): Promise<Campaign[]> {
  return Promise.resolve(campaigns);
}

export async function getClicksForAffiliate(affiliateId: number): Promise<Click[]> {
  const affiliateClicks = clicks.filter(c => c.affiliate_id === affiliateId);
  return Promise.resolve(affiliateClicks);
}

export async function getConversionsForAffiliate(affiliateId: number): Promise<(Conversion & { click: Click | undefined })[]> {
  const affiliateClicks = clicks.filter(c => c.affiliate_id === affiliateId);
  const affiliateClickIds = affiliateClicks.map(c => c.id);
  const affiliateConversions = conversions
    .filter(conv => affiliateClickIds.includes(conv.click_id))
    .map(conv => ({
      ...conv,
      click: clicks.find(c => c.id === conv.click_id)
    }));
  return Promise.resolve(affiliateConversions);
}

export async function addClick(data: { affiliate_id: number; campaign_id: number; click_id: string }): Promise<Click> {
  const newClick: Click = {
    ...data,
    id: nextClickId++,
    timestamp: new Date(),
  };
  clicks.push(newClick);
  return Promise.resolve(newClick);
}

export async function findClick(click_id: string, affiliate_id: number): Promise<Click | undefined> {
  const foundClick = clicks.find(c => c.click_id === click_id && c.affiliate_id === affiliate_id);
  return Promise.resolve(foundClick);
}

export async function addConversion(data: { click_id: number; amount: number; currency: string }): Promise<Conversion> {
  // Check if conversion for this click already exists
  const existingConversion = conversions.find(c => c.click_id === data.click_id);
  if (existingConversion) {
    throw new Error("Conversion for this click already exists.");
  }
  
  const newConversion: Conversion = {
    ...data,
    id: nextConversionId++,
    timestamp: new Date(),
  };
  conversions.push(newConversion);
  return Promise.resolve(newConversion);
}
