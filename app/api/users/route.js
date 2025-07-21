import { NextResponse } from "next/server";
import { connectDB } from "../../mongoose";
import User from "../../User"; 

export async function GET(request) {
    try {
        await connectDB();
        const users = await User.find({}); 
        return NextResponse.json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Error al obtener usuarios", error: error.message }, {
            status: 500 
        });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        let existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            if (!existingUser.rol) {
                existingUser.rol = "user"; 
                await existingUser.save();
            }
            return NextResponse.json({
                user: existingUser,
                message: "Usuario encontrado."
            });
        }

        const newUser = new User({
            email: data.email,
            name: data.name,
            rol: data.rol || "user"
        });

        const savedUser = await newUser.save(); 
        return NextResponse.json({
            user: savedUser,
            message: "Usuario creado exitosamente."
        });

    } catch (error) {
        console.error("Error processing user POST request:", error);
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}
