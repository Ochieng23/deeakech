"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Story() {
  const imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px -200px 0px" });
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  const bounds = useRef({ top: 0, bottom: 0, imageHeight: 0 });

  const updateBounds = () => {
    if (sectionRef.current && imageRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();
      bounds.current = {
        top: window.scrollY + sectionRect.top,
        bottom: window.scrollY + sectionRect.bottom,
        imageHeight: imageRect.height,
      };
    }
  };

  useEffect(() => {
    setIsMounted(true); // Mark as mounted on client-side
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Only calculate transforms after mounting to avoid window access during SSR
  const fadeStartTop = isMounted ? bounds.current.top : 0;
  const fadeEndTop = isMounted ? bounds.current.top + window.innerHeight * 0.5 : 0;
  const fadeStartBottom = isMounted ? bounds.current.bottom - window.innerHeight : 0;
  const fadeEndBottom = isMounted ? bounds.current.bottom - window.innerHeight * 0.3 : 0;

  const opacity = useTransform(
    scrollY,
    [fadeStartTop, fadeEndTop, fadeStartBottom, fadeEndBottom],
    [1, 0, 1, 0]
  );

  const clipPath = useTransform(scrollY, (value) => {
    if (!isMounted) return "inset(0px 0px 0px 0px)"; // Default during SSR
    const top = bounds.current.top - value;
    return `inset(${top}px 0px ${window.innerHeight - (top + bounds.current.imageHeight)}px 0px)`;
  });

  return (
    <div ref={sectionRef} className="bg-black text-white">
      <div ref={imageRef} className="relative h-[600px] w-full">
        <motion.div
          className="w-full h-[500px]"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            opacity,
            clipPath,
            display: isInView ? "block" : "none",
          }}
        >
          <Image
            src={imageUrl}
            alt="Kristina Smolyar in city"
            fill
            className="object-cover rounded-lg" // Soften border radius
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-2 pb-16 py-16 -mt-[250px] text-center">
        <h2 className="text-5xl font-bold mb-6">THIS IS MY STORY</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          Diana Akech fell head over heels for the fashion world after winning a local pageant, which gave her modeling career the perfect runway takeoff. Now splitting her time between the New York, Philly and Orlando scene, she works her magic as a model, specializing in beauty, fashion editorials, and commercial gigs.
          <br /><br />
          But modeling isn’t her only hustle. Nyasego also creates content for her own channels and partners with brands that vibe with her values—think animal welfare, ecoconsciousness, and body positivity.
          <br /><br />
          She’s built a community of creative souls who share her love for art, beauty, and unapologetic self-expression. Always following her heart (and a little bit of fate), Kristina is all about leveling up her career and continuing her deep dive into the ever-glamorous world of fashion and beauty.
        </p>
      </div>
    </div>
  );
}