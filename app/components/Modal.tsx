"use client";

import { useEffect } from "react";
import { closeModal, showToast } from "../utils/ui";

export default function Modal() {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal(null);
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleModal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const preferredTime = formData.get("preferredTime") as string;
    
    // Parse the selected destination from the modal title
    const tourTitleText = document.getElementById("modal-title")?.textContent || "Интересует тур";
    const tourName = tourTitleText.replace("Тур в ", "");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, preferredTime, tourName }),
      });

      if (res.ok) {
        closeModal();
        showToast("Заявка принята! Перезвоним в течение 30 минут 🎉");
        e.currentTarget.reset();
      } else {
        const errData = await res.json();
        showToast(errData.error || "Ошибка сохранения заявки 😢");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      showToast("Ошибка отправки! Проверьте интернет-соединение 😢");
    }
  };

  return (
    <div className="modal-overlay" id="modal" onClick={closeModal}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>
        <h2 id="modal-title">Направление</h2>
        <p id="modal-sub">
          Оставьте заявку и мы подберём лучший вариант для вас
        </p>
        <form onSubmit={handleModal}>
          <div className="form-group">
            <label className="form-label">Ваше имя</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Имя"
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
          <div className="form-group">
            <label className="form-label">Удобное время звонка</label>
            <select name="preferredTime" className="form-select">
              <option>Утром (9:00–12:00)</option>
              <option>Днём (12:00–17:00)</option>
              <option>Вечером (17:00–20:00)</option>
              <option>В любое время</option>
            </select>
          </div>
          <button type="submit" className="form-submit">
            Жду звонка →
          </button>
        </form>
      </div>
    </div>
  );
}
