import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollingSection from "@/components/ScrollingSection";
import Videos from "@/components/Videos";
import Collaborations from "@/components/Partnerships";
import Story from "@/components/About";
import Contact from "@/components/Contact";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="scrolling-section">
        <ScrollingSection />
      </div>
      <div id="collabs">
        <Collaborations />
      </div>
      <div id="videos">
        <Videos />
      </div>
      <div id="about">
        <Story />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}