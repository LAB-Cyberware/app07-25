import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function AccountSwitcher() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const switchAccount = async () => {
    setIsLoading(true)
    try {
      // Cerrar sesión actual
      await signOut({ redirect: false })
      
      // Abrir selector de cuenta de Google
      await signIn('google', { 
        callbackUrl: window.location.href,
        prompt: 'select_account'
      })
    } catch (error) {
      console.error('Error al cambiar cuenta:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) return null

  return (
    <div className="relative">
      <button 
        onClick={switchAccount}
        disabled={isLoading}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Cambiando...' : 'Cambiar cuenta'}
      </button>
    </div>
  )
}