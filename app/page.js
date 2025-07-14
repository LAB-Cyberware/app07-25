'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Cargando...</p>

  if (session) {
    return (
      <div>
        <p>Hola, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <button onClick={() => signIn('google')}>
        Iniciar sesión con Google
      </button>
    </div>
  )
}

const uri = "mongodb+srv://labcyberware:<db_password>@labcyberware.yd96pdc.mongodb.net/?retryWrites=true&w=majority&appName=labcyberware";
