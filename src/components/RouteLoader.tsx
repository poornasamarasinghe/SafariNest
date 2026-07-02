'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    if (previousPathRef.current && previousPathRef.current !== currentPath) {
      setIsLoading(true);
      setIsVisible(true);

      const hideTimer = window.setTimeout(() => {
        setIsVisible(false);
      }, 600);

      const removeTimer = window.setTimeout(() => {
        setIsLoading(false);
      }, 900);

      return () => {
        window.clearTimeout(hideTimer);
        window.clearTimeout(removeTimer);
      };
    }

    previousPathRef.current = currentPath;
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(244, 246, 244, 0.97)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: isVisible ? 'all' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          animation: 'safariFadeUp 0.4s ease forwards',
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: 'relative',
            width: '96px',
            height: '96px',
            animation: 'safariPulse 1.6s ease-in-out infinite',
          }}
        >
          <Image
            src="/Logo.png"
            alt="SafariNest"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Brand name */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#2D5016',
              letterSpacing: '0.04em',
              margin: 0,
              fontFamily: 'var(--font-geist-sans), sans-serif',
            }}
          >
            SafariNest
          </p>
        </div>

        {/* Loading dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#5A8A3C',
                animation: `safariDotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: '8px',
              fontSize: '13px',
              color: '#6B7C6B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-sans), sans-serif',
            }}
          >
            Loading
          </span>
        </div>
      </div>

      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes safariFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes safariPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 4px 16px rgba(90,138,60,0.15)); }
          50%       { transform: scale(1.06); filter: drop-shadow(0 8px 24px rgba(90,138,60,0.30)); }
        }
        @keyframes safariDotBounce {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.4; }
          40%            { transform: translateY(-8px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
