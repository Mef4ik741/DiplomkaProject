import { NextResponse } from "next/server";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "duygiwcsz";
const API_KEY = process.env.CLOUDINARY_API_KEY || "149696794782919";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "DlKE6PeZb9oCXAqAFPndLYTuFvQ";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не предоставлен" },
        { status: 400 }
      );
    }

    // 1. Convert file to Base64 Data URI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 2. Generate secure signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signatureStr = `timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureStr)
      .digest("hex");

    // 3. Prepare payload for Cloudinary API
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", base64File);
    cloudinaryFormData.append("api_key", API_KEY);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("signature", signature);

    // 4. Send request to Cloudinary API
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Cloudinary upload API error:", errorData);
      return NextResponse.json(
        { error: errorData.error?.message || "Ошибка загрузки в Cloudinary" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return the secure URL of the uploaded image
    return NextResponse.json({
      success: true,
      url: data.secure_url,
    });
  } catch (error) {
    console.error("Admin upload API error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера при загрузке" },
      { status: 500 }
    );
  }
}
