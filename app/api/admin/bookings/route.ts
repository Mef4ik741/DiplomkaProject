import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "../../../utils/db";

const JWT_SECRET = process.env.JWT_SECRET || "voyager-secret-key-2026";

async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET all bookings (Admin only)
export async function GET() {
  try {
    // Authenticate
    if (!await checkAuth()) {
      return NextResponse.json({ error: "Отказано в доступе: необходимо войти" }, { status: 401 });
    }

    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET admin bookings error:", error);
    return NextResponse.json({ error: "Ошибка при получении заявок" }, { status: 500 });
  }
}
