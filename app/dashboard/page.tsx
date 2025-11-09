'use client';

import { useEffect, useState } from 'react';
import { generateInitialDataset } from '@/lib/dataGenerator';
import { DataProvider } from '@/components/providers/DataProvider';
import DashboardClient from './DashboardClient';

// Client Component - generates data on client to avoid hydration issues
export default function DashboardPage() {
  const [initialData, setInitialData] = useState<ReturnType<typeof generateInitialDataset> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate initial dataset on client only
    setInitialData(generateInitialDataset(1000));
    setMounted(true);
  }, []);

  if (!mounted || !initialData) {
    return <DashboardLoading />;
  }

  return (
    <DataProvider initialData={initialData}>
      <DashboardClient />
    </DataProvider>
  );
}

function DashboardLoading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)',
        color: '#67e8f9',
      }}
    >
      Loading Analytics Control Center...
    </div>
  );
}

