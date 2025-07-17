import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '../../../utils/mongoose.js'
import User from '../../../models/User.js'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "select_account",
        },
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      try {
        await connectDB()
        
        // Buscar o crear usuario en la base de datos
        let dbUser = await User.findOne({ email: session.user.email })
        
        if (!dbUser) {
          // Si no existe, crear nuevo usuario con rol por defecto
          dbUser = new User({
            email: session.user.email,
            name: session.user.name,
            rol: "user"
          })
          await dbUser.save()
        } else {
          // Si existe pero no tiene rol, asignar rol por defecto
          if (!dbUser.rol) {
            dbUser.rol = "user"
            await dbUser.save()
          }
        }
        
        // Agregar información del usuario a la sesión
        session.user.id = dbUser._id.toString()
        session.user.rol = dbUser.rol
        
        return session
      } catch (error) {
        console.error('Error en callback de sesión:', error)
        return session
      }
    }
  }
})

export { handler as GET, handler as POST }