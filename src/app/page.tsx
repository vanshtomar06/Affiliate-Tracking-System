import { Dashboard } from '@/components/dashboard';
import { getAffiliates, getCampaigns } from '@/lib/db';

export default async function Home() {
  const affiliates = await getAffiliates();
  const campaigns = await getCampaigns();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-xl font-bold tracking-tight">Affiliate Tracker</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Dashboard initialAffiliates={affiliates} initialCampaigns={campaigns} />
      </main>
    </div>
  );
}
