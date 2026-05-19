"use client";

import { openModal } from "../utils/ui";

interface TourData {
  id: string;
  name: string;
  location: string;
  price: number;
  duration: string;
  type: string;
  badge: string | null;
  description: string;
  image: string;
}

export default function Tours({ tours = [] }: { tours: TourData[] }) {
  return (
    <section id="tours">
      <p className="section-label reveal">Наши предложения</p>
      <h2 className="section-title reveal reveal-delay-1">
        Горящие <em>туры</em>
      </h2>
      <div className="tours-grid">
        {tours.length === 0 ? (
          <p className="reveal" style={{ gridColumn: "span 3", textAlign: "center", color: "var(--ink-light)", padding: "4rem 0", fontFamily: "var(--sans)" }}>
            На данный момент нет доступных предложений. Пожалуйста, обратитесь к менеджеру или зайдите позже.
          </p>
        ) : (
          tours.map((tour, index) => (
            <div key={tour.id} className={`tour-card reveal reveal-delay-${index % 3}`}>
              <div className="tour-img-wrap">
                <img
                  className="tour-img"
                  src={tour.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80"}
                  alt={tour.name}
                />
                {tour.badge && (
                  <span 
                    className="tour-badge" 
                    style={{ background: tour.badge === "Успей!" ? "var(--sea)" : "var(--gold)" }}
                  >
                    {tour.badge}
                  </span>
                )}
              </div>
              <div className="tour-body">
                <div className="tour-meta">
                  <span className="tour-meta-item">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="3" width="12" height="11" rx="1" />
                      <path d="M5 1v4M11 1v4M2 7h12" />
                    </svg>
                    {tour.duration}
                  </span>
                  <span className="tour-meta-item">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 5v3l2 2" />
                    </svg>
                    {tour.type}
                  </span>
                  <span className="tour-meta-item">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 2C5.79 2 4 3.79 4 6c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" />
                      <circle cx="8" cy="6" r="1.5" />
                    </svg>
                    {tour.location}
                  </span>
                </div>
                <h3 className="tour-name">{tour.name}</h3>
                <p className="tour-desc">{tour.description}</p>
                <div className="tour-footer">
                  <div>
                    <p className="tour-price-label">Цена за 2 чел</p>
                    <p className="tour-price-val">
                      {tour.price.toLocaleString("ru-RU")} <span>₽</span>
                    </p>
                  </div>
                  <a
                    href="#"
                    className="tour-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(tour.location);
                    }}
                  >
                    Забронировать
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
