import { notFound } from "next/navigation";
import { getMergedPackage } from "@/data/safariPackages";
import SafariHero from "@/components/safari-details/SafariHero";
import SafariDescription from "@/components/safari-details/SafariDescription";
import SafariEssentials from "@/components/safari-details/SafariEssentials";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:5000/api/packages");
    if (res.ok) {
      const data = await res.json();
      return data.map((pkg: any) => ({
        id: pkg.id,
      }));
    }
  } catch (e) {
    console.error("Failed to generate static params from backend", e);
  }
  return [
    { id: "leopard-tracker-elite" },
    { id: "gentle-giants-expedition" },
    { id: "block-5-wilderness" }
  ];
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { id } = await params;

  let pkg = null;
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages/${id}`;
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (res.ok) {
      const dbPkg = await res.json();
      pkg = getMergedPackage(dbPkg);
    }
  } catch (err) {
    console.error("Error fetching package details from backend:", err);
  }

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
