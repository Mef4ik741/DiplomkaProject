"use client";

import { openModal } from "../utils/ui";

export default function Tours() {
  return (
    <section id="tours">
      <p className="section-label reveal">Наши предложения</p>
      <h2 className="section-title reveal reveal-delay-1">
        Горящие <em>туры</em>
      </h2>
      <div className="tours-grid">
        <div className="tour-card reveal">
          <div className="tour-img-wrap">
            <img
              className="tour-img"
              src="https://images.unsplash.com/photo-1499678329028-101435549a4e?w=700&q=80"
              alt="Бали"
            />
            <span className="tour-badge">Хит продаж</span>
          </div>
          <div className="tour-body">
            <div className="tour-meta">
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="11" rx="1" />
                  <path d="M5 1v4M11 1v4M2 7h12" />
                </svg>
                10 ночей
              </span>
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
                Авиа + отель
              </span>
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2C5.79 2 4 3.79 4 6c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                Бали, Индонезия
              </span>
            </div>
            <h3 className="tour-name">Волшебный Бали: рисовые поля и храмы</h3>
            <p className="tour-desc">
              Погрузитесь в мистическую атмосферу острова богов. Террасы
              Тегаллаланг, Убуд, пляжи Семиньяк и закат на Танах Лот.
            </p>
            <div className="tour-footer">
              <div>
                <p className="tour-price-label">Цена за 2 чел</p>
                <p className="tour-price-val">
                  156 000 <span>₽</span>
                </p>
              </div>
              <a
                href="#"
                className="tour-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Бали");
                }}
              >
                Забронировать
              </a>
            </div>
          </div>
        </div>
        <div className="tour-card reveal reveal-delay-1">
          <div className="tour-img-wrap">
            <img
              className="tour-img"
              src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=700&q=80"
              alt="Стамбул"
            />
            <span className="tour-badge" style={{ background: "var(--sea)" }}>
              Успей!
            </span>
          </div>
          <div className="tour-body">
            <div className="tour-meta">
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="11" rx="1" />
                  <path d="M5 1v4M11 1v4M2 7h12" />
                </svg>
                6 ночей
              </span>
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
                All inclusive
              </span>
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2C5.79 2 4 3.79 4 6c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                Стамбул
              </span>
            </div>
            <h3 className="tour-name">Стамбул: на стыке двух цивилизаций</h3>
            <p className="tour-desc">
              Айя-София, Гранд-базар, круиз по Босфору. Город, где Восток
              встречает Запад — и оба проигрывают его магии.
            </p>
            <div className="tour-footer">
              <div>
                <p className="tour-price-label">Цена за 2 чел</p>
                <p className="tour-price-val">
                  78 000 <span>₽</span>
                </p>
              </div>
              <a
                href="#"
                className="tour-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Стамбул");
                }}
              >
                Забронировать
              </a>
            </div>
          </div>
        </div>
        <div className="tour-card reveal reveal-delay-2">
          <div className="tour-img-wrap">
            <img
              className="tour-img"
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&q=80"
              alt="Италия"
            />
          </div>
          <div className="tour-body">
            <div className="tour-meta">
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="11" rx="1" />
                  <path d="M5 1v4M11 1v4M2 7h12" />
                </svg>
                12 ночей
              </span>
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
                Авиа + отель
              </span>
              <span className="tour-meta-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2C5.79 2 4 3.79 4 6c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                Амальфи, Италия
              </span>
            </div>
            <h3 className="tour-name">
              Амальфитанское побережье: классика Италии
            </h3>
            <p className="tour-desc">
              Позитано, Равелло, Капри — живописные деревушки на скалах,
              лимонные рощи и лазурное Тирренское море.
            </p>
            <div className="tour-footer">
              <div>
                <p className="tour-price-label">Цена за 2 чел</p>
                <p className="tour-price-val">
                  198 000 <span>₽</span>
                </p>
              </div>
              <a
                href="#"
                className="tour-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("Амальфи");
                }}
              >
                Забронировать
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
