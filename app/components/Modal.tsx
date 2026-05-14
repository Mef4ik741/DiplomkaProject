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

  const handleModal = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    showToast("Заявка принята! Перезвоним в течение 30 минут 🎉");
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
              className="form-input"
              placeholder="Имя"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Телефон</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+7 (___) ___-__-__"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Удобное время звонка</label>
            <select className="form-select">
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
