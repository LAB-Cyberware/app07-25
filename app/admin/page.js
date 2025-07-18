'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return /*  */

    if (!session) {
      router.push('/') // Redirigir al login si no hay sesión
      return
    }

    if (session.user.rol !== 'admin') {
      router.push('/') // Redirigir si no es admin
      return
    }
  }, [session, status, router])

  if (status === 'loading') return <p>Cargando...</p>

  if (!session || session.user.rol !== 'admin') {
    return <p>Acceso denegado...</p>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Página VIP de Administrador</h1>
      <p className="mb-4">¡Bienvenido, {session.user.name}!</p>
      
      <div className="bg-red-50 p-4 rounded mb-4">
        <p className='text-sm text-red-600 mt-2'>Email: {session.user.email}</p>
        <p className="text-sm text-red-600 mt-2">Rol actual: {session.user.rol}</p>
      </div>

      <button 
        onClick={() => signOut()}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}