'use client'

import { useSession, signIn, signOut } from 'next-auth/react' /* Importaciones de useSession, signIn,
signOut de Next Auth. */
import { useRouter } from 'next/navigation' /* Importación de useRouter de Next. */
import { useEffect } from 'react' /* Importación de useEffect de React. */

export default function Login() {   /* La función de login, con toda la configuración dentro. */
  const { data: session, status } = useSession() /* Hook que hace que tanto session como
  status sean extraídos de useSession. Además, renombra la data a session. Aclarar que session 
  representa la información del usuario logueado, mientras que status el estado de la autenticación, como puede ser
  un "Cargando...". */
  const router = useRouter() /* Obtiene el objeto useRouter y lo asigna como router. Se usa para 
  navegación. */

  useEffect(() => { /* Configuración del useEffect, este se ejecuta cuando cambian las dependencias. */ 
    if (session && session.user.rol === 'admin') { /* Si la sesión existe y el rol del usuario es
      "admin". */
      router.push('/admin') /* Envía a la carpeta admin y toma el page.js (página). */
    }
  }, [session, router]) /* Arreglo que indica que el useEffect solo se ejecute cuando cambian las
  dependencias. */

  if (status === 'loading') return <p>Cargando...</p> /* Si el status es "loading" retornara el mensaje
  de "Cargando...". El "loading" proviene de Next Auth. */

  
  if (session) { /* Si la sesión está iniciada. */
    if (session.user.rol === 'admin') { /* Si la sesión está iniciada, pero si el rol del usuario en la
      sesión es 'admin'. */
      return ( /* Si es 'admin' retornará lo siguiente. */
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"> 
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1> 
          <p>Cargando sesión de Administrador...</p>
        </div> /* Mensaje de sesión de Administrador. */
      )
    }
    return ( /* Si la sesión es como usuario o mod. */
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>
        <div className="space-y-2">
          <p><strong>Nombre:</strong> {session.user.name}</p>
          <p><strong>Email:</strong> {session.user.email}</p>
          <p><strong>Rol:</strong> 
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              session.user.rol === 'mod' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}> {session.user.rol}
            </span>
          </p>
        </div>
        <button /* Botón de cierre de sesión del respectivo usuario. Activa el signOut de NextAuth. */
          onClick={() => signOut()} 
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar sesión
        </button> 
      </div>
    )
  }

  return ( /* Si se cierra la sesión entonces pondrá disponible el inicio de sesión. */
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <button /* Botón de inicio de sesión. Activa el signIn de NextAuth y que sea a través de
      'google'. */
        onClick={() => signIn('google')}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Iniciar sesión con Google
      </button>
    </div>
  )
}