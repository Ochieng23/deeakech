// app/components/ScrollingSection.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollingSection() {
  const imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  // Ref to track the section
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Detect when the section is in view
  const isInView = useInView(sectionRef, { margin: "0px 0px -100px 0px" });

  // Track scroll position
  const { scrollY } = useScroll();

  // State to store section bounds and image container bounds
  const [sectionBounds, setSectionBounds] = useState({ top: 0, bottom: 0 });
  const [imageContainerBounds, setImageContainerBounds] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // Update section boundaries on mount and resize (client-side only)
  useEffect(() => {
    const updateBounds = () => {
      if (sectionRef.current && imageContainerRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const containerRect = imageContainerRef.current.getBoundingClientRect();
        setSectionBounds({
          top: window.scrollY + sectionRect.top,
          bottom: window.scrollY + sectionRect.bottom,
        });
        setImageContainerBounds({
          top: window.scrollY + containerRect.top,
          left: containerRect.left,
          width: containerRect.width,
          height: containerRect.height,
        });
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Calculate fade-out ranges
  const fadeStartTop = sectionBounds.top + 200;
  const fadeEndTop = sectionBounds.top + 400;
  const fadeStartBottom = sectionBounds.bottom - 400;
  const fadeEndBottom = sectionBounds.bottom - 200;

  // Transform opacity based on scroll position (top fade)
  const opacityTop = useTransform(scrollY, [fadeStartTop, fadeEndTop], [1, 0]);

  // Transform opacity based on scroll position (bottom fade)
  const opacityBottom = useTransform(scrollY, [fadeStartBottom, fadeEndBottom], [1, 0]);

  // Combine opacities (use the minimum of the two)
  const combinedOpacity = useTransform(
    [opacityTop, opacityBottom],
    ([top, bottom]) => Math.min(top, bottom)
  );

  // Dynamically calculate clip-path to clip the image to the image container's bounds
  const clipPath = useTransform(scrollY, (scrollYValue) => {
    const rect = imageContainerBounds;
    // Fallback values during SSR
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    return `inset(${rect.top - scrollYValue}px ${viewportWidth - (rect.left + rect.width)}px ${viewportHeight - (rect.top - scrollYValue + rect.height)}px ${rect.left}px)`;
  });

  return (
    <div ref={sectionRef} className="py-16 bg-sky-100 text-black">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Side: Heading and Text */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-5xl font-bold mb-6">About Diana Akech</h2>
          <p className="text-lg leading-relaxed">
            Diana Akech is a renowned model, creator, and influencer, passionate about inspiring others through her work. With a strong presence in the fashion and digital space, she collaborates with top brands and creators to bring innovative ideas to life.
          </p>
        </div>
        {/* Right Side: Image Container */}
        <div ref={imageContainerRef} className="md:w-1/2 relative h-[500px]">
          <motion.div
            className="w-full h-[500px] rounded-lg overflow-hidden"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh", // Full viewport height to mimic background-attachment: fixed
              display: isInView ? "block" : "none", // Show/hide based on section visibility
              opacity: combinedOpacity, // Apply fade effect
              clipPath, // Clip the image to the container's bounds
              borderRadius:"20px",
            }}
          >
            <Image
              src={imageUrl}
              alt="Diana Akech"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}