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
   <Hero />
   <ScrollingSection />
   <Collaborations />
   <Videos />
   <Story/>
   <Portfolio/>
   <Contact />
   
  
   </>
  );
}
