"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const nav = document.getElementById("nav");
    
    if (!isHome) {
      nav?.classList.add("scrolled");
      return;
    }

    const handleScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 80);
    };
    
    // Set initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav id="nav">
      <Link href="/" className="logo">
        Voy<span>a</span>ger
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="/destinations">Направления</Link>
        </li>
        <li>
          <Link href="/tours">Туры</Link>
        </li>
        <li>
          <Link href="/about">О нас</Link>
        </li>
        <li>
          <Link href="/contact">Контакты</Link>
        </li>
      </ul>
      <Link href="/contact" className="nav-cta">
        Связаться
      </Link>
      <div className="burger" id="burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
