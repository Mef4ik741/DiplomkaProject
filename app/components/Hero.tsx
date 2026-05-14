"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    let current = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".dot");

    function goSlide(n: number) {
      if (!slides.length || !dots.length) return;
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = n;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    const handleDotClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      goSlide(+(target.dataset.slide || 0));
    };

    dots.forEach((d) => d.addEventListener("click", handleDotClick));
    const slideInterval = setInterval(
      () => goSlide((current + 1) % slides.length),
      5000
    );

    return () => {
      clearInterval(slideInterval);
      dots.forEach((d) => d.removeEventListener("click", handleDotClick));
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-slides">
        <div className="hero-slide active"></div>
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
      </div>
      <div className="hero-content">
        <p className="hero-tag">Откройте мир с Voyager</p>
        <h1>
          Путешествия, которые <em>остаются</em> в душе
        </h1>
        <p className="hero-sub">
          Мы создаём не просто туры — мы создаём воспоминания на всю жизнь.
          Индивидуальный подход к каждому маршруту.
        </p>
        <div className="hero-btns">
          <a href="#tours" className="btn-primary">
            Смотреть туры
          </a>
          <a href="#contact" className="btn-ghost">
            Бесплатная консультация
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-dots" id="hero-dots">
        <div className="dot active" data-slide="0"></div>
        <div className="dot" data-slide="1"></div>
        <div className="dot" data-slide="2"></div>
        <div className="dot" data-slide="3"></div>
      </div>
    </section>
  );
}
