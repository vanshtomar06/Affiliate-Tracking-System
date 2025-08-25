module.exports = {

"[project]/.next-internal/server/app/api/conversions/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addClick": (()=>addClick),
    "addConversion": (()=>addConversion),
    "findClick": (()=>findClick),
    "getAffiliates": (()=>getAffiliates),
    "getCampaigns": (()=>getCampaigns),
    "getClicksForAffiliate": (()=>getClicksForAffiliate),
    "getConversionsForAffiliate": (()=>getConversionsForAffiliate)
});
// In-memory store to simulate a database
let affiliates = [
    {
        id: 1,
        name: 'Super Affiliates Inc.'
    },
    {
        id: 2,
        name: 'Marketing Gurus'
    },
    {
        id: 3,
        name: 'Top Converters'
    }
];
let campaigns = [
    {
        id: 10,
        name: 'Summer Sale 2024'
    },
    {
        id: 20,
        name: 'Winter Deals'
    },
    {
        id: 30,
        name: 'Black Friday Special'
    }
];
let clicks = [];
let conversions = [];
let nextClickId = 1;
let nextConversionId = 1;
// Seed some initial data for demonstration if the stores are empty
const seedData = ()=>{
    if (clicks.length === 0) {
        const now = Date.now();
        clicks.push({
            id: nextClickId++,
            affiliate_id: 1,
            campaign_id: 10,
            click_id: 'abc123',
            timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000)
        });
        clicks.push({
            id: nextClickId++,
            affiliate_id: 1,
            campaign_id: 10,
            click_id: 'def456',
            timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000)
        });
        clicks.push({
            id: nextClickId++,
            affiliate_id: 2,
            campaign_id: 20,
            click_id: 'ghi789',
            timestamp: new Date(now - 12 * 60 * 60 * 1000)
        });
        clicks.push({
            id: nextClickId++,
            affiliate_id: 1,
            campaign_id: 20,
            click_id: 'jkl012',
            timestamp: new Date(now - 6 * 60 * 60 * 1000)
        });
        clicks.push({
            id: nextClickId++,
            affiliate_id: 3,
            campaign_id: 30,
            click_id: 'mno345',
            timestamp: new Date(now - 2 * 60 * 60 * 1000)
        });
    }
    if (conversions.length === 0) {
        const now = Date.now();
        conversions.push({
            id: nextConversionId++,
            click_id: 1,
            amount: 100,
            currency: 'USD',
            timestamp: new Date(now - 47 * 60 * 60 * 1000)
        });
        conversions.push({
            id: nextConversionId++,
            click_id: 3,
            amount: 75.50,
            currency: 'EUR',
            timestamp: new Date(now - 10 * 60 * 60 * 1000)
        });
        conversions.push({
            id: nextConversionId++,
            click_id: 4,
            amount: 120.00,
            currency: 'USD',
            timestamp: new Date(now - 4 * 60 * 60 * 1000)
        });
    }
};
seedData();
async function getAffiliates() {
    return Promise.resolve(affiliates);
}
async function getCampaigns() {
    return Promise.resolve(campaigns);
}
async function getClicksForAffiliate(affiliateId) {
    const affiliateClicks = clicks.filter((c)=>c.affiliate_id === affiliateId);
    return Promise.resolve(affiliateClicks);
}
async function getConversionsForAffiliate(affiliateId) {
    const affiliateClicks = clicks.filter((c)=>c.affiliate_id === affiliateId);
    const affiliateClickIds = affiliateClicks.map((c)=>c.id);
    const affiliateConversions = conversions.filter((conv)=>affiliateClickIds.includes(conv.click_id)).map((conv)=>({
            ...conv,
            click: clicks.find((c)=>c.id === conv.click_id)
        }));
    return Promise.resolve(affiliateConversions);
}
async function addClick(data) {
    const newClick = {
        ...data,
        id: nextClickId++,
        timestamp: new Date()
    };
    clicks.push(newClick);
    return Promise.resolve(newClick);
}
async function findClick(click_id, affiliate_id) {
    const foundClick = clicks.find((c)=>c.click_id === click_id && c.affiliate_id === affiliate_id);
    return Promise.resolve(foundClick);
}
async function addConversion(data) {
    // Check if conversion for this click already exists
    const existingConversion = conversions.find((c)=>c.click_id === data.click_id);
    if (existingConversion) {
        throw new Error("Conversion for this click already exists.");
    }
    const newConversion = {
        ...data,
        id: nextConversionId++,
        timestamp: new Date()
    };
    conversions.push(newConversion);
    return Promise.resolve(newConversion);
}
}}),
"[project]/src/app/api/conversions/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const affiliate_id = searchParams.get('affiliate_id');
    if (!affiliate_id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: 'error',
            message: 'Missing affiliate_id parameter'
        }, {
            status: 400
        });
    }
    try {
        const conversions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConversionsForAffiliate"])(parseInt(affiliate_id, 10));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: 'success',
            data: conversions
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: 'error',
            message: 'Failed to get conversions',
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c38f45a3._.js.map