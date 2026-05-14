"use client";

import { openModal } from "../utils/ui";

export default function Destinations() {
  return (
    <section className="destinations" id="destinations">
      <div className="dest-header">
        <div className="dest-header-left">
          <p className="section-label reveal">Куда поехать</p>
          <h2 className="section-title reveal reveal-delay-1">
            Популярные <em>направления</em>
          </h2>
          <p className="dest-lead reveal reveal-delay-2">
            Более 80 стран и 500 маршрутов для самых взыскательных
            путешественников.
          </p>
        </div>
        <a
          href="#tours"
          className="btn-primary reveal"
          style={{
            borderColor: "var(--ink)",
            background: "transparent",
            color: "var(--ink)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "var(--ink)";
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--ink)";
          }}
        >
          Все направления
        </a>
      </div>
      <div className="dest-grid reveal">
        <div className="dest-card">
          <img
            className="dest-img"
            src="https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=900&q=80"
            alt="Париж"
          />
          <div className="dest-overlay">
            <p className="dest-country">Франция</p>
            <h3 className="dest-name">Париж</h3>
            <div className="dest-info">
              <p className="dest-price">
                от <strong>89 000 ₽</strong> / чел
              </p>
              <a
                href="#"
                className="dest-link"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Париж");
                }}
              >
                Подробнее{" "}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="dest-card">
          <img
            className="dest-img"
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80"
            alt="Индия"
          />
          <div className="dest-overlay">
            <p className="dest-country">Индия</p>
            <h3 className="dest-name">Раджастан</h3>
            <div className="dest-info">
              <p className="dest-price">
                от <strong>65 000 ₽</strong>
              </p>
              <a
                href="#"
                className="dest-link"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Раджастан");
                }}
              >
                →
              </a>
            </div>
          </div>
        </div>
        <div className="dest-card">
          <img
            className="dest-img"
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80"
            alt="Япония"
          />
          <div className="dest-overlay">
            <p className="dest-country">Япония</p>
            <h3 className="dest-name">Токио</h3>
            <div className="dest-info">
              <p className="dest-price">
                от <strong>120 000 ₽</strong>
              </p>
              <a
                href="#"
                className="dest-link"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Токио");
                }}
              >
                →
              </a>
            </div>
          </div>
        </div>
        <div className="dest-card">
          <img
            className="dest-img"
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=80"
            alt="Мальдивы"
          />
          <div className="dest-overlay">
            <p className="dest-country">Мальдивы</p>
            <h3 className="dest-name">Атолл Баа</h3>
            <div className="dest-info">
              <p className="dest-price">
                от <strong>210 000 ₽</strong>
              </p>
              <a
                href="#"
                className="dest-link"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Мальдивы");
                }}
              >
                →
              </a>
            </div>
          </div>
        </div>
        <div className="dest-card">
          <img
            className="dest-img"
            src="https://images.unsplash.com/photo-1531693251400-ed25e85a2ae5?w=700&q=80"
            alt="Перу"
          />
          <div className="dest-overlay">
            <p className="dest-country">Перу</p>
            <h3 className="dest-name">Мачу-Пикчу</h3>
            <div className="dest-info">
              <p className="dest-price">
                от <strong>145 000 ₽</strong>
              </p>
              <a
                href="#"
                className="dest-link"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Перу");
                }}
              >
                →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
