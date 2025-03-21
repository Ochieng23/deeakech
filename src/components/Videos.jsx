"use client";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Videos() {
  const videos = [
    {
      id: "jjunrrWOx5E",
      title: "White pants➡️4 tops✨💖 #whatiworetowork #ootd #outfitideas",
    },
    {
      id: "o_EXbmNC_qQ",
      title: "Loved these🥰 #fashion #ootd #sheinhaul",
    },
    {
      id: "TyoMJa6cwSc",
      title: "✨Styling Midi Red Sweater Dress🤗✨#ootd #styling #outfitideas",
    },
    {
      id: "LYLfdBOfuqI",
      title:
        "I got the most beautiful and perfect dress from Windsor✨💐#spring #dresstoimpress #springfashion",
    },
    {
      id: "Qk1xsJxztnE",
      title: "SHEIN Haul Part 1 #favorite #shein #purse",
    },
  ];

  const duplicatedVideos = [...videos, ...videos];
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handlePlay = (index) => {
    setPlayingVideoIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeaveVideo = () => {
    setPlayingVideoIndex(null);
  };

  return (
    <div className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-8 text-center">LATEST VIDEOS</h2>
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (playingVideoIndex === null) setIsPaused(false);
          }}
        >
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10"
            aria-label="Scroll Left"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10"
            aria-label="Scroll Right"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className={`flex ${isPaused ? "" : "animate-slide-left"} will-change-transform`}
            >
              {duplicatedVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-64 mx-2 relative"
                  onMouseLeave={() => handleMouseLeaveVideo(index)}
                >
                  <div className="relative aspect-[9/16]">
                    {playingVideoIndex === index ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0&showinfo=0&rel=0`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      />
                    ) : (
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-lg cursor-pointer brightness-125 contrast-110"
                        onClick={() => handlePlay(index)}
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}