"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

export default function Portfolio() {
  const images = [
    {
      src: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742551006/pretty-black-woman-s-portrait-wears-braids-pony-tail_633478-1392_z2am70.avif",
      alt: "Portrait with braids",
    },
    {
      src: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742551006/pexels-photo-1757281_b540mx.jpg",
      alt: "Studio portrait",
    },
    {
      src: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742551007/5d34207c4f45b48179d0e2df49fb9345_xlugqj.jpg",
      alt: "Fashion pose",
    },
    {
      src: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742551007/british-top-model-naomi-campbell-displays-a-black-off-the-news-photo-1676490203_hkr0pc.avif",
      alt: "Naomi Campbell in black",
    },
    {
      src: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742551008/naomi_selects19_evbbib.jpg",
      alt: "Naomi Campbell portrait",
    },
  ];

  const duplicatedImages = [...images, ...images]; // Duplicate for seamless looping
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="py-20 bg-sky-100 text-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-8 text-center">PORTFOLIO</h2>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className={`flex ${isPaused ? "" : "animate-slide-right"} will-change-transform`}
          >
            {duplicatedImages.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-64 h-96 relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}