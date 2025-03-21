// app/components/Collaborations.jsx
"use client";
import React, { useRef, useState } from 'react';

function Collaborations() {
  const brands = [
    {
      name: "Maybelline",
      logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742463072/Maybelline-logo_q62bbg.png",
    },
    {
      name: "Gucci",
      logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742463030/Gucci-Logo.wine_dt8kzk.png",
    },
    {
      name: "Fashion Nova",
      logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462987/fashion_nova-logo_brandlogos.net_aqcdr_qcrmuh.png",
    },
    {
      name: "L'Oréal",
      logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462924/LOreal-Logo_eezhos.png",
    },
    {
      name: "Equity Group",
      logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462923/Equity_Group_Logo_dkhhwx.png",
    },
    {
      name: "SAF",
      logo: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742462859/SAF-MAIN-LOGO_tgxefr.png",
    },
  ];

  // Duplicate the brands array to create a seamless loop
  const duplicatedBrands = [...brands, ...brands];

  // Ref for the slider track to control manual scrolling
  const sliderRef = useRef(null);

  // State to track if the slider should be paused
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="py-16 bg-sky-100 text-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-8 text-center">COLLABORATIONS WITH</h2>
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)} // Pause sliding on hover
          onMouseLeave={() => setIsPaused(false)} // Resume sliding on mouse leave
        >
          {/* Slider container with overflow hidden */}
          <div className="overflow-hidden">
            {/* Slider track with flexbox and animation */}
            <div
              ref={sliderRef}
              className={`flex ${isPaused ? '' : 'animate-slide-left'}`}
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 sm:w-40 mx-4 flex items-center justify-center"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 sm:h-16 object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborations;