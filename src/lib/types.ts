export interface Affiliate {
  id: number;
  name: string;
}

export interface Campaign {
  id: number;
  name: string;
}

export interface Click {
  id: number;
  affiliate_id: number;
  campaign_id: number;
  click_id: string;
  timestamp: Date;
}

export interface Conversion {
  id: number;
  click_id: number; // Foreign key to clicks.id
  amount: number;
  currency: string;
  timestamp: Date;
}
