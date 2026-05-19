"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";

interface Tour {
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

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  tourName: string;
  wishes: string | null;
  preferredTime: string | null;
  status: "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "tours">("bookings");
  const router = useRouter();

  // Tour Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formType, setFormType] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);

  // Authenticate and fetch initial data
  useEffect(() => {
    const checkSessionAndFetch = async () => {
      try {
        const authRes = await fetch("/api/admin/auth/check");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }
        
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push("/admin/login");
          return;
        }

        setAuthenticated(true);
        
        // Fetch data
        await Promise.all([fetchBookings(), fetchTours()]);
      } catch (err) {
        console.error("Dashboard mount error:", err);
        router.push("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkSessionAndFetch();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/admin/tours");
      if (res.ok) {
        const data = await res.json();
        setTours(data);
      }
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Booking CRUD
  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus as any } : b))
        );
      } else {
        alert("Не удалось обновить статус заявки");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту заявку?")) return;

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Не удалось удалить заявку");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // Tour CRUD
  const handleOpenAddModal = () => {
    setEditingTour(null);
    setFormName("");
    setFormLocation("");
    setFormPrice("");
    setFormDuration("");
    setFormType("Авиа + отель");
    setFormBadge("");
    setFormDescription("");
    setFormImage("");
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEditModal = (tour: Tour) => {
    setEditingTour(tour);
    setFormName(tour.name);
    setFormLocation(tour.location);
    setFormPrice(tour.price.toString());
    setFormDuration(tour.duration);
    setFormType(tour.type);
    setFormBadge(tour.badge || "");
    setFormDescription(tour.description);
    setFormImage(tour.image);
    setFormError("");
    setModalOpen(true);
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSaving(true);

    const payload = {
      name: formName,
      location: formLocation,
      price: formPrice,
      duration: formDuration,
      type: formType,
      badge: formBadge || null,
      description: formDescription,
      image: formImage,
    };

    try {
      let res;
      if (editingTour) {
        // Edit Mode
        res = await fetch(`/api/admin/tours/${editingTour.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Add Mode
        res = await fetch("/api/admin/tours", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchTours(); // Refresh listings
      } else {
        const data = await res.json();
        setFormError(data.error || "Произошла ошибка при сохранении тура");
      }
    } catch (err) {
      setFormError("Ошибка сети при сохранении");
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот тур?")) return;

    try {
      const res = await fetch(`/api/admin/tours/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTours((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert("Не удалось удалить тур");
      }
    } catch (err) {
      console.error("Error deleting tour:", err);
    }
  };

  if (checking) {
    return (
      <div className="login-container" style={{ fontFamily: "var(--sans)" }}>
        <p style={{ color: "var(--ink-light)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
          Загрузка панели...
        </p>
      </div>
    );
  }

  if (!authenticated) return null;

  // Analytical stats
  const totalBookings = bookings.length;
  const newBookings = bookings.filter((b) => b.status === "NEW").length;
  const processingBookings = bookings.filter((b) => b.status === "PROCESSING").length;
  const totalTours = tours.length;

  return (
    <div className="admin-body" style={{ fontFamily: "var(--sans)" }}>
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-title-wrap">
          <h1 className="admin-title">
            Voy<span>a</span>ger
          </h1>
          <span className="admin-badge">Администратор</span>
        </div>
        <div className="admin-nav">
          <div className="admin-user">
            В сети как: <strong>admin</strong>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-content">
        {/* Statistics Cards */}
        <section className="admin-stats-grid" style={{ padding: 0 }}>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Всего заявок</span>
            <span className="admin-stat-val">{totalBookings}</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Новые заявки</span>
            <span className="admin-stat-val" style={{ color: "var(--gold)" }}>{newBookings}</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">В обработке</span>
            <span className="admin-stat-val" style={{ color: "var(--sea)" }}>{processingBookings}</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Активных туров</span>
            <span className="admin-stat-val" style={{ color: "#2e7559" }}>{totalTours}</span>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            Заявки ({totalBookings})
          </button>
          <button
            className={`admin-tab ${activeTab === "tours" ? "active" : ""}`}
            onClick={() => setActiveTab("tours")}
          >
            Управление турами ({totalTours})
          </button>
        </div>

        {/* Dynamic Card Display */}
        <div className="admin-card">
          {activeTab === "bookings" ? (
            /* Bookings Panel */
            <div>
              <div className="admin-card-header">
                <h2 className="admin-card-title">Список заявок на обратный звонок</h2>
              </div>
              <div className="admin-table-wrap">
                {bookings.length === 0 ? (
                  <p style={{ padding: "3rem", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--ink-light)", textAlign: "center" }}>
                    Заявки пока отсутствуют
                  </p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Клиент</th>
                        <th>Телефон / Email</th>
                        <th>Направление / Тур</th>
                        <th>Удобное время</th>
                        <th>Пожелания / Комментарий</th>
                        <th>Статус</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <strong>{booking.name}</strong>
                            <div style={{ fontSize: "0.72rem", color: "var(--ink-light)", marginTop: "0.2rem" }}>
                              {new Date(booking.createdAt).toLocaleString("ru-RU")}
                            </div>
                          </td>
                          <td>
                            <div>{booking.phone}</div>
                            {booking.email && (
                              <div style={{ fontSize: "0.8rem", color: "var(--ink-light)", marginTop: "0.2rem" }}>
                                {booking.email}
                              </div>
                            )}
                          </td>
                          <td>{booking.tourName}</td>
                          <td>{booking.preferredTime || "—"}</td>
                          <td style={{ maxWidth: "250px", wordBreak: "break-word" }}>
                            {booking.wishes || <span style={{ color: "var(--sand-dark)" }}>—</span>}
                          </td>
                          <td>
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                              className="admin-form-select"
                              style={{ 
                                padding: "0.35rem 0.6rem", 
                                fontSize: "0.75rem", 
                                width: "auto", 
                                border: "1px solid var(--sand-dark)",
                                fontFamily: "var(--sans)",
                                fontWeight: 500,
                                background: "var(--white)"
                              }}
                            >
                              <option value="NEW">Новая</option>
                              <option value="PROCESSING">В обработке</option>
                              <option value="COMPLETED">Выполнена</option>
                              <option value="CANCELLED">Отменена</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="admin-btn-danger"
                              onClick={() => handleDeleteBooking(booking.id)}
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            /* Tours Panel */
            <div>
              <div className="admin-card-header">
                <h2 className="admin-card-title">Список туристических пакетов</h2>
                <button className="admin-btn" onClick={handleOpenAddModal}>
                  Добавить тур +
                </button>
              </div>
              <div className="admin-table-wrap">
                {tours.length === 0 ? (
                  <p style={{ padding: "3rem", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--ink-light)", textAlign: "center" }}>
                    Туры пока отсутствуют. Добавьте свой первый тур!
                  </p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Фото</th>
                        <th>Название</th>
                        <th>Локация</th>
                        <th>Длительность</th>
                        <th>Тип питания / Доп</th>
                        <th>Бэдж</th>
                        <th>Стоимость</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tours.map((tour) => (
                        <tr key={tour.id}>
                          <td>
                            <img
                              src={tour.image}
                              alt={tour.name}
                              style={{ width: "64px", height: "44px", objectFit: "cover", border: "1px solid var(--sand-dark)" }}
                            />
                          </td>
                          <td>
                            <strong>{tour.name}</strong>
                            <div style={{ fontSize: "0.8rem", color: "var(--ink-light)", marginTop: "0.2rem", maxWidth: "260px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {tour.description}
                            </div>
                          </td>
                          <td>{tour.location}</td>
                          <td>{tour.duration}</td>
                          <td>{tour.type}</td>
                          <td>
                            {tour.badge ? (
                              <span className="status-pill NEW" style={{ background: tour.badge === "Успей!" ? "rgba(30, 77, 107, 0.1)" : "rgba(196, 147, 58, 0.1)", color: tour.badge === "Успей!" ? "var(--sea)" : "var(--gold)" }}>
                                {tour.badge}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td>
                            <strong style={{ color: "var(--sea)" }}>
                              {tour.price.toLocaleString("ru-RU")} ₽
                            </strong>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                className="admin-btn-secondary"
                                onClick={() => handleOpenEditModal(tour)}
                                style={{ padding: "0.45rem 1rem", fontSize: "0.68rem" }}
                              >
                                Изменить
                              </button>
                              <button
                                className="admin-btn-danger"
                                onClick={() => handleDeleteTour(tour.id)}
                              >
                                Удалить
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Tour Add/Edit Modal Form */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            {/* Modal Header */}
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingTour ? "Редактирование тура" : "Создание нового тура"}
              </h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSaveTour}>
              <div className="admin-modal-body">
                {formError && (
                  <p style={{ color: "#c94a4a", marginBottom: "1.5rem", fontSize: "0.9rem", textAlign: "center" }}>
                    {formError}
                  </p>
                )}
                
                <div className="admin-form-grid">
                  <div className="admin-form-group admin-form-span-2">
                    <label>Название предложения *</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Например: Волшебный Бали: рисовые поля и храмы"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Локация (Курорт, Страна) *</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="Например: Бали, Индонезия"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Стоимость тура за 2 чел (₽) *</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="Например: 156000"
                      min="1"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Длительность отдыха *</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      placeholder="Например: 10 ночей"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Тип питания / Перелёт *</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      placeholder="Например: Авиа + отель или All inclusive"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Бэдж / Тег (необязательно)</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="Например: Хит продаж или Успей!"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Ссылка на фоновое изображение *</label>
                    <input
                      type="url"
                      className="admin-form-input"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Вставьте URL изображения (Unsplash и т.д.)"
                      required
                    />
                  </div>

                  <div className="admin-form-group admin-form-span-2">
                    <label>Подробное описание тура *</label>
                    <textarea
                      className="admin-form-textarea"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Опишите главные фишки, достопримечательности и атмосферу..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setModalOpen(false)}
                  disabled={formSaving}
                >
                  Отмена
                </button>
                <button type="submit" className="admin-btn" disabled={formSaving}>
                  {formSaving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
