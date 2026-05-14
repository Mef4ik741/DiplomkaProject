"use client";

import { useEffect } from "react";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for nav links is no longer needed globally as we use Next.js Links
    // We only keep it for any anchor links that might remain on the same page
    const handleSmoothScroll = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const targetId = a.getAttribute("href");
      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <Search />
      <Stats />
      <Testimonials />
    </>
  );
}
