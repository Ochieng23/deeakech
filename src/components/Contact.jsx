"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Contact() {
  const imageUrl = "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742548811/1f63ed_78667903e95542149e06c60a394454c1_mv2_1_qol1do.avif";

  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px -100px 0px" });
  const scrollY = useMotionValue(0);
  const [sectionBounds, setSectionBounds] = useState({ top: 0, bottom: 0 });
  const [imageContainerBounds, setImageContainerBounds] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient, scrollY]);

  useEffect(() => {
    if (!isClient) return;

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
  }, [isClient]);

  const fadeStartTop = sectionBounds.top + 200;
  const fadeEndTop = sectionBounds.top + 400;
  const fadeStartBottom = sectionBounds.bottom - 400;
  const fadeEndBottom = sectionBounds.bottom - 200;

  const opacityTop = useTransform(scrollY, [fadeStartTop, fadeEndTop], [1, 0]);
  const opacityBottom = useTransform(
    scrollY,
    [fadeStartBottom, fadeEndBottom],
    [1, 0]
  );
  const combinedOpacity = useTransform(
    [opacityTop, opacityBottom],
    ([top, bottom]) => Math.min(top, bottom)
  );

  const clipPath = useTransform(scrollY, (scrollYValue) => {
    const rect = imageContainerBounds;
    const viewportHeight = isClient ? window.innerHeight : 0;
    return `inset(${rect.top - scrollYValue}px 0px ${
      viewportHeight - (rect.top - scrollYValue + rect.height)
    }px 0px)`;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", e.target.elements);
  };

  return (
    <div ref={sectionRef} className="bg-black text-black ">
      {/* Image Container - Full Width */}
      <div ref={imageContainerRef} className="relative h-[400px] w-full">
        {isClient && (
          <motion.div
            className="w-full h-[400px] overflow-hidden"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "800px",
              display: isInView ? "block" : "none",
              opacity: combinedOpacity,
              clipPath,
            }}
          >
            <Image
              src={imageUrl}
              alt="Contact Background"
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Contact Form Container */}
      <div className="max-w-8xl mx-auto px-4 relative -mt-[100px] py-10">
        {/* Negative margin of 80px (20% of 400px image height) */}
        <div className="max-w-lg mx-auto bg-sky-100 shadow-lg p-6 rounded-lg">
          <h2 className="text-5xl font-bold mb-4 text-center">
            TOUCH BASE
          </h2>
          <p className="text-lg italic mb-4 text-center">
            I’D LOVE TO HEAR FROM YOU
          </p>
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
              aria-label="TikTok"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
          </div>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                required
                className="w-full p-2 bg-black text-white placeholder-white border-none focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                className="w-full p-2 bg-black text-white placeholder-white border-none focus:outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-2 bg-black text-white placeholder-white border-none focus:outline-none"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                className="w-full p-2 bg-black text-white placeholder-white border-none focus:outline-none resize-none"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="text-black hover:underline focus:outline-none"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}