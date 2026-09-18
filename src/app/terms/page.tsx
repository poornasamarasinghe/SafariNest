import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — SafariNest',
  description: 'Read the terms and conditions governing your use of SafariNest safari booking services.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing our website or making a booking with SafariNest, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services. These terms apply to all visitors, users, and customers.`,
  },
  {
    title: '2. Booking & Reservations',
    body: `All safari bookings are subject to availability. A reservation is confirmed only upon receipt of full payment and issuance of a booking confirmation email. SafariNest reserves the right to decline any booking at its discretion. Your booking confirmation email constitutes the agreement between you and SafariNest.`,
  },
  {
    title: '3. Cancellation & Refund Policy',
    body: `Cancellations made more than 72 hours before the scheduled safari may receive a full refund. Cancellations within 72 hours of the safari are non-refundable. In the event SafariNest must cancel a safari due to weather, park closures, or unforeseen circumstances, a full refund or rescheduling option will be offered.`,
  },
  {
    title: '4. Conduct & Safety',
    body: `All guests are expected to follow the instructions of their safari guide at all times. Yala National Park has strict regulations regarding wildlife interaction. SafariNest will not be held liable for any incidents arising from a guest's failure to follow guide instructions or park rules. Guests must remain in the safari vehicle unless instructed otherwise.`,
  },
  {
    title: '5. Wildlife Disclaimer',
    body: `Wildlife sightings, including leopard encounters, are never guaranteed. Yala National Park is a wild ecosystem and animal behaviour is inherently unpredictable. Our AI-tracking tools significantly improve sighting probability, but no specific sighting can be promised. No refund or compensation will be issued for missed sightings.`,
  },
  {
    title: '6. Liability Limitation',
    body: `SafariNest is not liable for any loss, damage, injury, or expense (direct or indirect) arising from participation in safari activities. Guests participate at their own risk. We strongly recommend that all guests obtain adequate travel and medical insurance prior to their safari.`,
  },
  {
    title: '7. Intellectual Property',
    body: `All content on the SafariNest website — including text, images, logos, and software — is the property of SafariNest or its licensors and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without prior written permission.`,
  },
  {
    title: '8. Governing Law',
    body: `These terms are governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.`,
  },
  {
    title: '9. Changes to Terms',
    body: `We reserve the right to modify these Terms of Service at any time. Changes take effect immediately upon posting to this page. Continued use of our services following any changes constitutes acceptance of the revised terms.`,
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="font-sans text-[14px] leading-[24px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Effective date: <span style={{ color: 'rgba(255,255,255,0.6)' }}>1 January 2026</span>
          </p>
          <p className="font-sans text-[14px] leading-[26px] mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Please read these Terms of Service carefully before using SafariNest. These terms govern your access to and use of our website, safari booking services, and related offerings.
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
          <p className="font-jetbrains text-[10px] tracking-[0.14em] uppercase mb-2" style={{ color: '#FFB080' }}>Contact Us</p>
          <p className="font-sans text-[14px] leading-[24px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            For any questions about these Terms, please reach out at{' '}
            <a href="mailto:expeditions@safarinest.lk" className="underline underline-offset-2" style={{ color: '#FFB080' }}>
              expeditions@safarinest.lk
            </a>{' '}
            or call <a href="tel:+94711654050" className="underline underline-offset-2" style={{ color: '#FFB080' }}>+94 711 654 050</a>.
          </p>
        </div>

        {/* Footer nav */}
        <div className="mt-12 flex items-center gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/privacy" className="font-sans text-[12px] transition-colors duration-200 text-white/30 hover:text-[#FFB080]/80">
            ← Privacy Policy
          </Link>
        </div>

      </div>
    </main>
  );
}
