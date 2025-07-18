import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '../../../mongoose'
import User from '../../../User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { /* Configuración de elementos a autorizar al momento del login de Google. */ 
        params: { /* Parámetros a autorizar durante el login de Google. */
          scope: "openid email profile", /* scope indica qué permisos se piden al usuario, en este caso,
          se están pidiendo los permisos de id, email y perfil. Es como decir "Estás seguro de dar los
          permisos de acceso a estos datos?". */
          prompt: "select_account", /* promp indica lo que mostrará la pantalla, en este caso, la
          selección de cuenta cada vez que se inicie sesión. */
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
        
        let dbUser = await User.findOne({ email: session.user.email })
        
        if (!dbUser) {
          dbUser = new User({
            email: session.user.email,
            name: session.user.name,
            rol: "user"
          })
          await dbUser.save()
        } else {
          if (!dbUser.rol) {
            dbUser.rol = "user"
            await dbUser.save()
          }
        }

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