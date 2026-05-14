export default function About() {
  return (
    <section id="about">
      <div style={{ maxWidth: "560px" }}>
        <p className="section-label reveal">Почему Voyager</p>
        <h2 className="section-title reveal reveal-delay-1">
          Мы делаем <em>больше</em>, чем просто туры
        </h2>
      </div>
      <div className="why-grid">
        <div className="why-item reveal">
          <div className="why-num">01</div>
          <h3 className="why-title">Индивидуальный подход</h3>
          <p className="why-text">
            Каждый маршрут создаётся с нуля под вас. Мы изучаем ваши
            предпочтения, бюджет и мечты — и создаём путешествие, которое
            невозможно забыть.
          </p>
        </div>
        <div className="why-item reveal reveal-delay-1">
          <div className="why-num">02</div>
          <h3 className="why-title">Поддержка 24/7</h3>
          <p className="why-text">
            Наши менеджеры на связи круглосуточно. Где бы вы ни были — в Токио
            или Лиме — мы всегда готовы помочь в любой ситуации.
          </p>
        </div>
        <div className="why-item reveal reveal-delay-2">
          <div className="why-num">03</div>
          <h3 className="why-title">Лучшие цены</h3>
          <p className="why-text">
            Прямые контракты с отелями и авиакомпаниями позволяют предлагать
            цены ниже рыночных. Нашли дешевле — снизим цену.
          </p>
        </div>
        <div className="why-item reveal reveal-delay-3">
          <div className="why-num">04</div>
          <h3 className="why-title">Полная безопасность</h3>
          <p className="why-text">
            Все туры застрахованы. Мы работаем только с надёжными партнёрами и
            тщательно проверяем каждый отель и транспортную компанию.
          </p>
        </div>
      </div>
    </section>
  );
}
