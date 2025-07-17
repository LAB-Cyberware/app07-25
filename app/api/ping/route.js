import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose.js";

export function GET() {
    connectDB()
    return NextResponse.json({
        message: "¡Hello World!",
    });
}

/* Solo un Ping. */