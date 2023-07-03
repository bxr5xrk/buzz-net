'use client';

import { useRouter } from 'next/navigation';

export function CloseBackground() {
  const router = useRouter();

  return <div className="absolute inset-0" onClick={() => router.back()}></div>;
}
