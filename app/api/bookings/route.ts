import { NextResponse } from "next/server";
import db from "../../utils/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, tourName, wishes, preferredTime } = body;

    // Check required fields
    if (!name || !phone || !tourName) {
      return NextResponse.json(
        { error: "Имя, телефон и направление обязательны для заполнения" },
        { status: 400 }
      );
    }

    // Save to the database
    const booking = await db.booking.create({
      data: {
        name,
        phone,
        email: email || null,
        tourName,
        wishes: wishes || null,
        preferredTime: preferredTime || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error("Booking API creation error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера при создании заявки" },
      { status: 500 }
    );
  }
}
