'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const { data: session, status } = useSession()
const router = useRouter()

