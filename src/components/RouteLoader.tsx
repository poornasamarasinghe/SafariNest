'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    if (previousPathRef.current && previousPathRef.current !== currentPath) {
      setIsLoading(true);

      const timer = window.setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => window.clearTimeout(timer);
    }

    previousPathRef.current = currentPath;
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#F4F6F4]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="relative h-24 w-24 md:h-32 md:w-32">
          <Image src="/Logo.png" alt="SafariNest logo" fill className="object-contain" priority />
        </div>
        <div className="h-3 w-48 rounded-full bg-[#C4CDC4]/70" />
        <div className="flex gap-3">
          <div className="h-3 w-20 rounded-full bg-[#C4CDC4]/70" />
          <div className="h-3 w-24 rounded-full bg-[#C4CDC4]/70" />
          <div className="h-3 w-16 rounded-full bg-[#C4CDC4]/70" />
        </div>
      </div>
    </div>
  );
}
