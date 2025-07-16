import NextAuth from 'next-auth' /* Importación del Instalado Next-Auth */
import GoogleProvider from 'next-auth/providers/google' /* Importación del Proveedor de Google para 
permitir login con cuentas de Google usando el Next Auth */

const handler = NextAuth({ /* Llamada del importado Next Auth para configuración y que esta misma
configuración se guarde en handler */
  providers: [ /* Lista de Proveedores */
    GoogleProvider({ /* Proveedor de Google */
      clientId: process.env.GOOGLE_CLIENT_ID, /* clientId es el id del cliente, el cual fue obtenido
      desde Google Cloud Console, y que está usando el objeto process de Node.js. Node.js ya leyó el
      .env.local y creó process.env al iniciar la aplicación, pero desde el presente código se obtiene 
      el valor de GOOGLE_CLIENT_ID del process.env para que Next Auth pueda usarlo. Puede exponerse sin 
      problemas.*/
      /* Hay que destacar que, clientId sirve para identificar la aplicación ante Google y que así pueda
      por ejemplo decir "esta solicitud viene de app07-25" */
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, /* clientSecret es el id Secreto, el cual fue 
      obtenido desde Google Cloud Console al igual que el clientId. Nuevamente, el proceso es el mismo
      que con clientId, pero para el caso del GOOGLE_CLIENT_SECRET. No puede exponerse, podría generar
      diversos problemas como podría ser un ataque cibernetico o suplantación de identidad. */
      /* A destacar para su caso está el hecho de que, el clientSecret, se trata de una especie de
      "contraseña" que busca decirle a Google, por ejemplo, que "soy el dueño de app07-25", es la forma
      de autenticar la aplicación ante Google. */
    })
  ],
  callbacks: { /* Los callbacks se tratan de funciones personalizadas de NextAuth que se ejecutan en
    momentos específicos. */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    }
  }
})

export { handler as GET, handler as POST }