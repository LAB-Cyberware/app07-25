import { NextResponse } from "next/server";
import { connectDB } from "../../../mongoose"; 
import User from "../../../User"; 

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params; 

    if (!id) {
      return NextResponse.json({ message: "ID de usuario no proporcionado." }, { status: 400 });
    }

    const user = await User.findById(id); 

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching specific user:", error);
    return NextResponse.json({ error: 'Error al obtener usuario.' }, { status: 500 });
  }
}
