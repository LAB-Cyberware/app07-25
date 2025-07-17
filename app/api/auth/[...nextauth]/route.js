import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '../../../utils/mongoose'
import User from '../../../models/User'

const handler = NextAuth({ /* La función contenedora del NextAuth con los proveedores, en este caso
  Google (GoogleProvider). */
  providers: [ /* Proveedores */
    GoogleProvider({ /* El proveedor de Google. */
      clientId: process.env.GOOGLE_CLIENT_ID, /* El client id recibido desde GOOGLE_CLIENT_ID. */
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, /* El secreto de cliente, o como yo lo llamo, la
      contraseña, obtenida a través de GOOGLE_CLIENT_SECRET en .env.local. */
    })
  ],
  callbacks: { /* Callbacks para momentos especificos. */
    async jwt({ token, user }) { /* Una función asíncrona con los parámetros de Token y User. */
      if (user) { /* Si detecta la existencia de un usuario. */
        token.id = user.id /* El token.id es igual al user.id. */
      }
      return token /* Retorna el Token. */
    },
    async session({ session, token }) { /* Una función asíncrona con los parámetros de Session y Token. */
      try { /* Intenta */
        await connectDB() /* Conectando a la Base de Datos... */
        
        /* Buscar o crear usuario en la base de datos. */
        let dbUser = await User.findOne({ email: session.user.email })
        
        if (!dbUser) { /* Si no existe, crear nuevo usuario con rol por defecto (user). */
          dbUser = new User({ /* Si el usuario es nuevo en la Base de Datos. */
            email: session.user.email, /* Ingresa el email a la Base de Datos. */
            name: session.user.name, /* Ingresa el nombre de usuario a la Base de Datos. */
            rol: "user" /* Ingresa el rol por defecto, osea, el rol de "user". */
          })
          await dbUser.save() /* Va guardando el usuario en la Base de Datos. */
        } else {
          if (!dbUser.rol) { /* Si existe pero no tiene rol, asignar rol por defecto (user). */
            dbUser.rol = "user"
            await dbUser.save()
          }
        }
        
        /* Agregar información del usuario a la sesión. */
        session.user.id = dbUser._id.toString() /* Convertir el id que es ObjectId a toString para
        evitar cualquier problema con NextAuth y agregarlo a la sesión de esa forma. */
        session.user.rol = dbUser.rol /* Agregar el rol a la sesión. */
        
        return session /* Retorna la sesión. */ 
      } catch (error) { /* Por si ocurriese un error. */
        console.error('Error en callback de sesión:', error) /* Mensaje de error para la consola. */
        return session /* Retorna la sesión. */
      }
    }
  }
})

export { handler as GET, handler as POST }