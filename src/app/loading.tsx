import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F4] px-6">
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
