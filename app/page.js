'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import '.css/page.css' 

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && session.user.rol === 'admin') {
      router.push('/admin')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="loading-spinner"></div>
          <p className="loading-message">Cargando...</p>
        </div>
      </div>
    )
  }

  if (session) {
    if (session.user.rol === 'admin') {
      return (
        <div className="login-page">
          <div className="login-card">
            <h1 className="login-title">Cargando...</h1>
            <div className="loading-spinner"></div>
            <p className="loading-message">Cargando sesión de Administrador...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">¡Bienvenido!</h1>
          <div className="user-info">
            <p><strong>Nombre:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>Rol:</strong>
              <span className={`role-badge ${session.user.rol}`}>
                {session.user.rol}
              </span>
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="login-button logout-button"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>
        <button
          onClick={() => signIn('google')}
          className="login-button google-button"
        >
          <span className="button-icon">🔐</span>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  )
}