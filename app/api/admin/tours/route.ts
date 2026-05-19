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

// GET all tours
export async function GET() {
  try {
    const tours = await db.tour.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tours);
  } catch (error) {
    console.error("GET admin tours error:", error);
    return NextResponse.json({ error: "Ошибка при получении туров" }, { status: 500 });
  }
}

// POST create tour
export async function POST(request: Request) {
  try {
    // Authenticate
    if (!await checkAuth()) {
      return NextResponse.json({ error: "Отказано в доступе: необходимо войти в систему" }, { status: 401 });
    }

    const body = await request.json();
    const { name, location, price, duration, type, badge, description, image } = body;

    // Validate fields
    if (!name || !location || price === undefined || !duration || !type || !description) {
      return NextResponse.json({ error: "Не все обязательные поля заполнены" }, { status: 400 });
    }

    const numericPrice = parseInt(price, 10);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json({ error: "Цена должна быть положительным числом" }, { status: 400 });
    }

    const tour = await db.tour.create({
      data: {
        name,
        location,
        price: numericPrice,
        duration,
        type,
        badge: badge || null,
        description,
        image: image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
      },
    });

    return NextResponse.json({ success: true, tour });
  } catch (error) {
    console.error("POST admin tour creation error:", error);
    return NextResponse.json({ error: "Ошибка при создании нового тура" }, { status: 500 });
  }
}
