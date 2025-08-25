# **App Name**: Affiliate Tracker

## Core Features:

- Click Tracking: Simulate clicks via a `/click` endpoint that records affiliate_id, campaign_id, and click_id in a database.
- Postback Endpoint: Implement a `/postback` endpoint to record conversion data (click_id, amount, currency) if a valid click_id is found.
- Affiliate Dashboard: Affiliate dashboard displaying clicks and conversions with relevant details (amount, currency, timestamp).
- Postback URL Generation: Generate a unique postback URL for each affiliate, showing the required parameters. e.g., https://affiliate-system.com/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to inspire trust and professionalism in the data displayed.
- Background color: Light gray (#F5F5F5), almost white, for a clean, analytical environment.
- Accent color: Soft green (#8BC34A), used for highlighting successful conversions and positive metrics.
- Body and headline font: 'Inter' (sans-serif) for a clean, readable, modern appearance.
- Use minimalist icons to represent different campaigns and conversion metrics, maintaining clarity and simplicity.
- Dashboard layout should be clean and data-focused, with clear sections for clicks and conversions. Use tables and charts to visualize data effectively.