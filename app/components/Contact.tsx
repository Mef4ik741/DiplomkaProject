"use client";

import { showToast } from "../utils/ui";

export default function Contact() {
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const tourCategory = formData.get("tourCategory") as string;
    const wishes = formData.get("wishes") as string;

    const tourName = tourCategory ? `Консультация по направлению: ${tourCategory}` : "Общая консультация";

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, tourName, wishes }),
      });

      if (res.ok) {
        showToast("Спасибо! Мы свяжемся с вами совсем скоро ✈️");
        e.currentTarget.reset();
      } else {
        const errData = await res.json();
        showToast(errData.error || "Ошибка сохранения заявки 😢");
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      showToast("Ошибка отправки! Проверьте интернет-соединение 😢");
    }
  };

  return (
    <div className="cta-section" id="contact">
      <div className="cta-left">
        <p className="section-label">Напишите нам</p>
        <h2 className="section-title">
          Начните <em>своё</em> путешествие
        </h2>
        <p>
          Оставьте заявку и наш менеджер свяжется с вами в течение 30 минут для
          бесплатной консультации.
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.22 9.94a19.79 19.79 0 01-3.07-8.59A2 2 0 012.13 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            +7 (800) 555-35-35
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            hello@voyager-travel.ru
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            Москва, ул. Арбат, 22, оф. 304
          </div>
        </div>
      </div>
      <div className="cta-right">
        <form onSubmit={handleForm}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Имя</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Иван"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Телефон</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="ivan@email.ru"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Направление</label>
            <select name="tourCategory" className="form-select">
              <option value="">Не выбрано</option>
              <option>Европа</option>
              <option>Азия</option>
              <option>Ближний Восток</option>
              <option>Африка</option>
              <option>Латинская Америка</option>
              <option>Океания</option>
              <option>Помогите выбрать</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Ваши пожелания</label>
            <textarea
              name="wishes"
              className="form-textarea"
              placeholder="Расскажите о вашей мечте..."
            ></textarea>
          </div>
          <button type="submit" className="form-submit">
            Отправить заявку →
          </button>
        </form>
      </div>
    </div>
  );
}
