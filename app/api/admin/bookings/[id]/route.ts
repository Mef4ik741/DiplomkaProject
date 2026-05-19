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

// PATCH update booking status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate
    if (!await checkAuth()) {
      return NextResponse.json({ error: "Отказано в доступе: необходимо войти" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["NEW", "PROCESSING", "COMPLETED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Недопустимый статус заявки" }, { status: 400 });
    }

    // Check if booking exists
    const existingBooking = await db.booking.findUnique({ where: { id } });
    if (!existingBooking) {
      return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("PATCH admin booking status error:", error);
    return NextResponse.json({ error: "Ошибка при обновлении статуса" }, { status: 500 });
  }
}

// DELETE booking
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

    // Check if booking exists
    const existingBooking = await db.booking.findUnique({ where: { id } });
    if (!existingBooking) {
      return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
    }

    await db.booking.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE admin booking error:", error);
    return NextResponse.json({ error: "Ошибка при удалении заявки" }, { status: 500 });
  }
}
