"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../admin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the administrator is already authenticated
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.push("/admin");
            return;
          }
        }
      } catch (err) {
        console.error("Session verification error:", err);
      } finally {
        setChecking(false);
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Неверный логин или пароль");
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError("Ошибка сети. Пожалуйста, проверьте интернет-соединение.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="login-container" style={{ fontFamily: "var(--sans)" }}>
        <p style={{ color: "var(--ink-light)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
          Загрузка...
        </p>
      </div>
    );
  }

  return (
    <div className="login-container" style={{ fontFamily: "var(--sans)" }}>
      <div className="login-card">
        <h1 className="login-logo">
          Voy<span>a</span>ger
        </h1>
        <span className="login-sub">Панель управления</span>
        
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group" style={{ textAlign: "left" }}>
            <label>Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-form-input"
              placeholder="Введите логин"
              required
              disabled={loading}
            />
          </div>
          
          <div className="admin-form-group" style={{ textAlign: "left", marginTop: "1.5rem" }}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-form-input"
              placeholder="Введите пароль"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p style={{ color: "#c94a4a", fontSize: "0.85rem", marginTop: "1.2rem", textAlign: "center", fontWeight: 400 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-btn"
            disabled={loading}
            style={{ width: "100%", marginTop: "2.5rem", padding: "1rem", letterSpacing: "0.15em" }}
          >
            {loading ? "Вход..." : "Войти →"}
          </button>
        </form>
      </div>
    </div>
  );
}
