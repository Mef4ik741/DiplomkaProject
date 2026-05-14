"use client";

import { showToast } from "../utils/ui";

export default function Search() {
  return (
    <div className="search-section">
      <div className="search-bar">
        <div className="search-field">
          <span className="search-label">Направление</span>
          <input type="text" placeholder="Куда хотите поехать?" />
        </div>
        <div className="search-field">
          <span className="search-label">Отъезд</span>
          <input type="date" />
        </div>
        <div className="search-field">
          <span className="search-label">Возвращение</span>
          <input type="date" />
        </div>
        <div className="search-field">
          <span className="search-label">Туристы</span>
          <select>
            <option>2 взрослых</option>
            <option>1 взрослый</option>
            <option>2 взрослых + 1 ребёнок</option>
            <option>2 взрослых + 2 детей</option>
            <option>Группа (6+)</option>
          </select>
        </div>
        <button
          className="search-btn"
          onClick={() => showToast("Поиск туров...")}
        >
          Найти тур
        </button>
      </div>
    </div>
  );
}
