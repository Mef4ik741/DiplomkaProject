export default function Testimonials() {
  return (
    <section className="testimonials">
      <p className="section-label reveal">Отзывы клиентов</p>
      <h2 className="section-title reveal reveal-delay-1">
        Они уже <em>побывали</em> с нами
      </h2>
      <div className="testi-grid">
        <div className="testi-card reveal">
          <div className="testi-quote">"</div>
          <div className="stars">★★★★★</div>
          <p className="testi-text">
            Voyager организовал нам свадебное путешествие на Мальдивы. Всё было
            продумано до мелочей — от трансфера до ужина на закате. Это было
            волшебно.
          </p>
          <div className="testi-author">
            <img
              className="testi-avatar"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Анна"
            />
            <div>
              <p className="testi-name">Анна Соколова</p>
              <p className="testi-trip">Мальдивы · Медовый месяц</p>
            </div>
          </div>
        </div>
        <div className="testi-card reveal reveal-delay-1">
          <div className="testi-quote">"</div>
          <div className="stars">★★★★★</div>
          <p className="testi-text">
            Впервые поехали всей семьёй — 2 взрослых и трое детей. Менеджер
            Мария подобрала идеальный маршрут по Японии. Дети в восторге, мы
            тоже!
          </p>
          <div className="testi-author">
            <img
              className="testi-avatar"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
              alt="Дмитрий"
            />
            <div>
              <p className="testi-name">Дмитрий Козлов</p>
              <p className="testi-trip">Япония · Семейный тур</p>
            </div>
          </div>
        </div>
        <div className="testi-card reveal reveal-delay-2">
          <div className="testi-quote">"</div>
          <div className="stars">★★★★★</div>
          <p className="testi-text">
            Уже третий год подряд летаем через Voyager. Первый раз — Перу,
            второй — ЮАР, третий — Норвегия. Каждый раз лучше предыдущего.
          </p>
          <div className="testi-author">
            <img
              className="testi-avatar"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
              alt="Елена"
            />
            <div>
              <p className="testi-name">Елена Новикова</p>
              <p className="testi-trip">Норвегия · Fjord Explorer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
