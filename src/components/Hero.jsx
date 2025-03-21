import { Suspense } from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeroContent />
    </Suspense>
  );
}

function HeroContent() {
  const imageUrl = "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742452098/1f63ed_ed71b284262e42f48dfc0ad2876b2604_mv2_cxl1sn.avif";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={imageUrl}
        alt="Hero Background"
        fill
        className="object-cover filter blur-sm"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl text-white-400 sm:text-6xl md:text-7xl font-extrabold mb-4">
          Diana Akech
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light">
          Model. Creator. Influencer
        </p>
      </div>
    </div>
  );
}