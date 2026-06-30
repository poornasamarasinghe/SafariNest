import { notFound } from "next/navigation";
import { getPackageById, ALL_PACKAGES } from "@/data/safariPackages";
import SafariHero from "@/components/safari-details/SafariHero";
import SafariDescription from "@/components/safari-details/SafariDescription";
import SafariEssentials from "@/components/safari-details/SafariEssentials";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_PACKAGES.map((pkg) => ({
    id: pkg.id,
  }));
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pkg = getPackageById(id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <main className="flex-grow pb-12">
        {/* Hero Section */}
        <SafariHero packageData={pkg} />

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Description (Left) */}
            <div className="lg:col-span-7">
              <SafariDescription packageData={pkg} />
            </div>

            {/* Sidebar Essentials (Right) */}
            <div className="lg:col-span-5">
              <SafariEssentials packageData={pkg} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
