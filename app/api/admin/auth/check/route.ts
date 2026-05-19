import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "voyager-secret-key-2026";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("admin_session");

    if (!tokenCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const token = tokenCookie.value;
    
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({ authenticated: true, user: decoded });
  } catch (error) {
    // If token verification fails (expired or tempered), it throws
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
