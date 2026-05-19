"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <footer>
        <div className="footer-brand">
          <a href="#" className="logo" style={{ color: "var(--white)" }}>
            Voy<span style={{ color: "var(--gold)" }}>a</span>ger
          </a>
          <p className="footer-desc">
            Турагентство премиального класса. Создаём уникальные путешествия по
            всему миру с 2012 года.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" title="Telegram">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </a>
            <a href="#" className="social-link" title="Instagram">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="social-link" title="VK">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M2 5h4l3 8 3-8h4l-5 7 5 7h-4l-3-8-3 8H2l5-7-5-7z" />
              </svg>
            </a>
            <a href="#" className="social-link" title="WhatsApp">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Направления</h4>
          <ul>
            <li>
              <a href="#">Европа</a>
            </li>
            <li>
              <a href="#">Азия</a>
            </li>
            <li>
              <a href="#">Африка</a>
            </li>
            <li>
              <a href="#">Латинская Америка</a>
            </li>
            <li>
              <a href="#">Океания</a>
            </li>
            <li>
              <a href="#">Ближний Восток</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Компания</h4>
          <ul>
            <li>
              <a href="#">О нас</a>
            </li>
            <li>
              <a href="#">Наша команда</a>
            </li>
            <li>
              <a href="#">Партнёрам</a>
            </li>
            <li>
              <a href="#">Вакансии</a>
            </li>
            <li>
              <a href="#">Блог</a>
            </li>
            <li>
              <a href="#">Пресса</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Поддержка</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Условия бронирования</a>
            </li>
            <li>
              <a href="#">Страховка</a>
            </li>
            <li>
              <a href="#">Возврат и отмена</a>
            </li>
            <li>
              <a href="#">Контакты</a>
            </li>
            <li>
              <a href="#">Политика конфиденциальности</a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>
          © 2024 Voyager Travel. Все права защищены. Лицензия туроператора РТО
          012345
        </p>
        <p>Сделано с ♥ для путешественников</p>
      </div>
    </>
  );
}
