import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Hola, {session.user.name}</span>
          <span className={`px-2 py-1 rounded text-xs ${
            session.user.rol === 'admin' ? 'bg-red-100 text-red-800' :
            session.user.rol === 'mod' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {session.user.rol}
          </span>
        </div>
        <button 
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Cerrar sesión
          </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn('google')}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  )
}