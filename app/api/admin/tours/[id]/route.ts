import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "../../../../utils/db";

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

// PUT (update) tour
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate
    if (!await checkAuth()) {
      return NextResponse.json({ error: "Отказано в доступе" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, location, price, duration, type, badge, description, image } = body;

    // Check if tour exists
    const existingTour = await db.tour.findUnique({ where: { id } });
    if (!existingTour) {
      return NextResponse.json({ error: "Тур не найден" }, { status: 404 });
    }

    // Parse price if provided
    let numericPrice = undefined;
    if (price !== undefined) {
      numericPrice = parseInt(price, 10);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return NextResponse.json({ error: "Цена должна быть положительным числом" }, { status: 400 });
      }
    }

    const updatedTour = await db.tour.update({
      where: { id },
      data: {
        name: name || undefined,
        location: location || undefined,
        price: numericPrice,
        duration: duration || undefined,
        type: type || undefined,
        badge: badge !== undefined ? badge : undefined,
        description: description || undefined,
        image: image || undefined,
      },
    });

    return NextResponse.json({ success: true, tour: updatedTour });
  } catch (error) {
    console.error("PUT admin tour update error:", error);
    return NextResponse.json({ error: "Ошибка при обновлении тура" }, { status: 500 });
  }
}

// DELETE tour
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate
    if (!await checkAuth()) {
      return NextResponse.json({ error: "Отказано в доступе" }, { status: 401 });
    }

    const { id } = await params;

    // Check if tour exists
    const existingTour = await db.tour.findUnique({ where: { id } });
    if (!existingTour) {
      return NextResponse.json({ error: "Тур не найден" }, { status: 404 });
    }

    await db.tour.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE admin tour error:", error);
    return NextResponse.json({ error: "Ошибка при удалении тура" }, { status: 500 });
  }
}
