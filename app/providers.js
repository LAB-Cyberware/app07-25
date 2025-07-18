'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}   
    </SessionProvider>
  )
}

/* El SessionProvider envuelve la app al completo (children=app). */ 