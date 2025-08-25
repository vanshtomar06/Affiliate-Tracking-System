# Affiliate Tracking System

This is a Next.js application for tracking affiliate clicks and conversions, built in Firebase Studio.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## API Endpoints

The application provides several API endpoints to track clicks and conversions.

### Health Check

Checks if the backend service is running.

- **URL:** `/api/health`
- **Method:** `GET`

**Example Request:**

```bash
curl http://localhost:9002/api/health
```

**Example Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Track a Click

Records a new click for an affiliate and campaign.

- **URL:** `/api/click`
- **Method:** `GET`
- **Query Parameters:**
  - `affiliate_id` (integer, required): The ID of the affiliate.
  - `campaign_id` (integer, required): The ID of the campaign.
  - `click_id` (string, required): A unique ID for the click provided by the affiliate.

**Example Request:**

```bash
curl "http://localhost:9002/api/click?affiliate_id=1&campaign_id=10&click_id=xyz789"
```

**Example Response:**

```json
{
    "status": "success",
    "message": "Click tracked",
    "data": {
        "affiliate_id": 1,
        "campaign_id": 10,
        "click_id": "xyz789",
        "id": 6,
        "timestamp": "2024-01-01T12:00:00.000Z"
    }
}
```

### Track a Conversion (Postback)

Records a new conversion associated with a previously tracked click.

- **URL:** `/api/postback`
- **Method:** `GET`
- **Query Parameters:**
  - `affiliate_id` (integer, required): The ID of the affiliate.
  - `click_id` (string, required): The unique click ID that led to this conversion.
  - `amount` (float, required): The monetary value of the conversion.
  - `currency` (string, required): The currency of the amount (e.g., "USD").

**Example Request:**

```bash
curl "http://localhost:9002/api/postback?affiliate_id=1&click_id=xyz789&amount=99.99&currency=USD"
```

**Example Response:**

```json
{
    "status": "success",
    "message": "Conversion tracked",
    "data": {
        "click_id": 6,
        "amount": 99.99,
        "currency": "USD",
        "id": 4,
        "timestamp": "2024-01-01T12:01:00.000Z"
    }
}
```

### Get Clicks for an Affiliate

Retrieves all recorded clicks for a specific affiliate.

- **URL:** `/api/clicks`
- **Method:** `GET`
- **Query Parameters:**
  - `affiliate_id` (integer, required): The ID of the affiliate.

**Example Request:**

```bash
curl "http://localhost:9002/api/clicks?affiliate_id=1"
```

### Get Conversions for an Affiliate

Retrieves all recorded conversions for a specific affiliate.

- **URL:** `/api/conversions`
- **Method:** `GET`
- **Query Parameters:**
  - `affiliate_id` (integer, required): The ID of the affiliate.

**Example Request:**

```bash
curl "http://localhost:9002/api/conversions?affiliate_id=1"
```
