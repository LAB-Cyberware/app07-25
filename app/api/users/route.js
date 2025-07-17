import { NextResponse } from "next/server";
import { connectDB } from "mongoose";
import User from '../../../User';

export async function GET() {
    connectDB()
    const users = await User.find()
    return NextResponse.json(users);
}

export async function POST(request) {
    try {
        connectDB()
        const data = await request.json()
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email: data.email })
        
        if (existingUser) {
            // Si existe, verificar que tenga rol asignado
            if (!existingUser.rol) {
                existingUser.rol = "user"
                await existingUser.save()
            }
            return NextResponse.json({
                user: existingUser,
                message: "Usuario encontrado."
            })
        }
        
        // Si no existe, crear nuevo usuario con rol por defecto
        const newUser = new User({
            email: data.email,
            name: data.name,
            rol: data.rol || "user"
        })
        
        const savedUser = await newUser.save()
        return NextResponse.json({
            user: savedUser,
            message: "Usuario creado exitosamente."
        })
        
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}