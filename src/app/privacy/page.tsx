import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — SafariNest',
  description: 'Learn how SafariNest collects, uses, and protects your personal information.',
};

const sections = [
  {
    title: '1. Information We Collect',
    body: `When you book a safari or contact us, we collect information you provide directly — such as your name, email address, phone number, and payment details. We also automatically collect certain usage data including your IP address, browser type, and pages visited on our website to improve your experience.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your personal information to process bookings and payments, send booking confirmations and updates, respond to your inquiries, improve our services, and send you relevant offers (only with your consent). We do not sell your personal information to third parties.`,
  },
  {
    title: '3. Sharing of Information',
    body: `We may share your information with trusted service providers who assist in operating our website and conducting our business (e.g., payment processors, email platforms). These parties are obligated to keep your information confidential. We may also disclose information if required by law.`,
  },
  {
    title: '4. Cookies',
    body: `Our website uses cookies to enhance functionality and analyse traffic. You may choose to disable cookies through your browser settings, though some features of the website may not function correctly as a result.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Booking records are typically retained for a period of five years for accounting and legal compliance purposes.`,
  },
  {
    title: '6. Your Rights',
    body: `You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us at expeditions@safarinest.lk. We will respond to all valid requests within 30 days.`,
  },
  {
    title: '7. Security',
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. However, no internet transmission is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this page periodically.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="w-full min-h-screen" style={{ background: 'linear-gradient(180deg, #080f08 0%, #0c1a0c 100%)' }}>

      {/* Top accent */}
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,176,128,0.5) 50%, transparent)' }} />

      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(255,176,128,0.05) 0%, transparent 65%)' }} />
      <div className="fixed bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(80,180,60,0.04) 0%, transparent 65%)' }} />

      <div className="relative w-full max-w-[760px] mx-auto px-6 md:px-10 py-20 md:py-28">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12 font-sans text-[12px] tracking-[0.08em] uppercase transition-colors duration-200 text-white/35 hover:text-[#FFB080]/80"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          SafariNest
        </Link>

        {/* Header */}
        <div className="mb-14">
          <p className="font-jetbrains text-[10px] tracking-[0.18em] uppercase mb-4" style={{ color: '#FFB080' }}>Legal</p>
          <h1
            className="font-jetbrains font-bold text-[38px] md:text-[48px] tracking-[-0.03em] leading-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #FFD5A8 50%, #FFB080 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Privacy Policy
          </h1>
          <p className="font-sans text-[14px] leading-[24px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Effective date: <span style={{ color: 'rgba(255,255,255,0.6)' }}>1 January 2026</span>
          </p>
          <p className="font-sans text-[14px] leading-[26px] mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
            SafariNest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This policy explains how we handle your personal information when you use our website and services.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] mb-12" style={{ background: 'linear-gradient(90deg, rgba(255,176,128,0.2), transparent)' }} />

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-jetbrains font-bold text-[15px] tracking-[-0.01em] mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {s.title}
              </h2>
              <p className="font-sans text-[14px] leading-[26px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div
          className="mt-16 rounded-2xl p-6"
          style={{ background: 'rgba(255,176,128,0.04)', border: '1px solid rgba(255,176,128,0.1)' }}
        >
          <p className="font-jetbrains text-[10px] tracking-[0.14em] uppercase mb-2" style={{ color: '#FFB080' }}>Questions?</p>
          <p className="font-sans text-[14px] leading-[24px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:expeditions@safarinest.lk" className="underline underline-offset-2" style={{ color: '#FFB080' }}>
              expeditions@safarinest.lk
            </a>{' '}
            or call <a href="tel:+94711654050" className="underline underline-offset-2" style={{ color: '#FFB080' }}>+94 711 654 050</a>.
          </p>
        </div>

        {/* Footer nav */}
        <div className="mt-12 flex items-center gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/terms" className="font-sans text-[12px] transition-colors duration-200 text-white/30 hover:text-[#FFB080]/80">
            Terms of Service →
          </Link>
        </div>

      </div>
    </main>
  );
}
