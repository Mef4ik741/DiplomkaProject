"use client";

import { useEffect } from "react";

export default function Stats() {
  useEffect(() => {
    function animateCount(el: Element) {
      const target = +(el.getAttribute("data-count") || 0);
      const dur = 2000;
      const step = dur / 60;
      let cur = 0;
      const inc = target / (dur / step);
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= target) {
          cur = target;
          clearInterval(timer);
        }
        el.textContent =
          target >= 1000
            ? Math.floor(cur).toLocaleString("ru") + "+"
            : Math.floor(cur) + (target === 98 ? "%" : "");
      }, step);
    }

    const statObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            statObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-count]").forEach((el) => statObs.observe(el));

    return () => {
      statObs.disconnect();
    };
  }, []);

  return (
    <div className="stats">
      <div className="stat-item reveal">
        <div className="stat-num" data-count="12">
          0
        </div>
        <p className="stat-label">Лет на рынке</p>
        <p className="stat-desc">Основаны в 2012 году с командой из 3 человек</p>
      </div>
      <div className="stat-item reveal reveal-delay-1">
        <div className="stat-num" data-count="48000">
          0
        </div>
        <p className="stat-label">Довольных клиентов</p>
        <p className="stat-desc">Возвращаются снова и снова</p>
      </div>
      <div className="stat-item reveal reveal-delay-2">
        <div className="stat-num" data-count="80">
          0
        </div>
        <p className="stat-label">Стран мира</p>
        <p className="stat-desc">В каждой — проверенные партнёры</p>
      </div>
      <div className="stat-item reveal reveal-delay-3">
        <div className="stat-num" data-count="98">
          0
        </div>
        <p className="stat-label">% положительных отзывов</p>
        <p className="stat-desc">На всех платформах и агрегаторах</p>
      </div>
    </div>
  );
}
