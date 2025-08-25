# Affiliate Tracking System

This is a **Next.js application** for tracking **affiliate clicks and conversions**.  
The system records affiliate clicks, associates conversions with tracked clicks, and provides endpoints for retrieving click and conversion data.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

By default, the application runs on **[http://localhost:9002](http://localhost:9002)**.

---

## 📡 API Endpoints

The system exposes several REST API endpoints to track and retrieve data.  

---

### ✅ Health Check

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

---

### 👆 Track a Click

Records a new click for an affiliate and campaign.

- **URL:** `/api/click`  
- **Method:** `GET`  
- **Query Parameters:**
  - `affiliate_id` (integer, required)  
  - `campaign_id` (integer, required)  
  - `click_id` (string, required, must be unique)  

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

---

### 💰 Track a Conversion (Postback)

Records a new conversion tied to a previously tracked click.

- **URL:** `/api/postback`  
- **Method:** `GET`  
- **Query Parameters:**
  - `affiliate_id` (integer, required)  
  - `click_id` (string, required)  
  - `amount` (float, required)  
  - `currency` (string, required, e.g., `"USD"`)  

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

---

### 📊 Get Clicks for an Affiliate

Retrieves all recorded clicks for a specific affiliate.

- **URL:** `/api/clicks`  
- **Method:** `GET`  
- **Query Parameters:**
  - `affiliate_id` (integer, required)  

**Example Request:**
```bash
curl "http://localhost:9002/api/clicks?affiliate_id=1"
```

---

### 📈 Get Conversions for an Affiliate

Retrieves all recorded conversions for a specific affiliate.

- **URL:** `/api/conversions`  
- **Method:** `GET`  
- **Query Parameters:**
  - `affiliate_id` (integer, required)  

**Example Request:**
```bash
curl "http://localhost:9002/api/conversions?affiliate_id=1"
```

---

## 📝 Understanding the System

This project simulates a **basic affiliate tracking system** similar to those used in ad networks.  

- **Click Tracking (`/api/click`)** – When a user clicks an affiliate link, the system records the click with details such as affiliate ID, campaign ID, and unique click ID.  
- **Conversion Tracking (`/api/postback`)** – When a conversion (sale/lead) occurs, the advertiser sends a postback with the affiliate’s click ID. The system then links this conversion back to the original click.  
- **Analytics (`/api/clicks` & `/api/conversions`)** – Affiliates (or admins) can query the system to see all clicks and conversions tied to an affiliate ID.  

In short, this system connects **affiliate links → clicks → conversions** and provides visibility for affiliates and advertisers.
