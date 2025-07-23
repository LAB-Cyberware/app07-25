import User from "../../../User"; 
import { NextResponse } from 'next/server';
import { connectDB } from "../../../mongoose";

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
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const { rol } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "ID de usuario no proporcionado." }, { status: 400 });
    }

    if (!rol) {
      return NextResponse.json({ message: "Rol no proporcionado." }, { status: 400 });
    }

    // Actualizar el usuario en MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { rol }, 
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Rol actualizado correctamente", 
      user: updatedUser 
    });

  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: 'Error al actualizar rol.' }, { status: 500 });
  }
}