'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && session.user.rol === 'admin') {
      router.push('/admin') // Cambia por tu ruta de admin
    }
  }, [session, router])

  if (status === 'loading') return <p>Cargando...</p>

  
  if (session) {
    // Si es admin, mostrar mensaje de redirección
    if (session.user.rol === 'admin') {
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Redirigiendo...</h1>
          <p>Redirigiendo al panel de administrador...</p>
        </div>
      )
    }
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>
        <div className="space-y-2">
          <p><strong>Nombre:</strong> {session.user.name}</p>
          <p><strong>Email:</strong> {session.user.email}</p>
          <p><strong>Rol:</strong> 
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              session.user.rol === 'admin' ? 'bg-red-100 text-red-800' :
              session.user.rol === 'mod' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}> {session.user.rol}
            </span>
          </p>
        </div>
        <button 
          onClick={() => signOut()}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <button 
        onClick={() => signIn('google')}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Iniciar sesión con Google
      </button>
    </div>
  )
}