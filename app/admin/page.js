'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link';

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/')
      return
    }
    if (session.user.rol !== 'admin') {
      router.push('/')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="loading-text">
        <div className="loading-spinner"></div>
        Cargando...
      </div>
    )
  }

  if (!session || session.user.rol !== 'admin') {
    return <div className="access-denied">🚫 Acceso denegado.</div>
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Página VIP de Administrador</h1>
      <p className="admin-welcome">
        ¡Bienvenido, <span className="username">{session.user.name}</span>!
      </p>
      
      <div className="admin-info-card">
        <p className="admin-info-text">📧 Email: {session.user.email}</p>
        <p className="admin-info-text">🎯 Rol actual: {session.user.rol}</p>
      </div>

      <div className="admin-buttons">
        <Link href="/admin/users" className="admin-btn admin-btn-primary">
          Listado de Usuarios
        </Link>
        <button 
          onClick={() => signOut()}
          className="admin-btn admin-btn-danger"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}