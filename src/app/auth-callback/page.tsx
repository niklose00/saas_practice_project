"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const { data, error, isLoading } = trpc.authCallback.useQuery()

  useEffect(() => {
    if (data) {
      if (data.success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    }
    if (error && error.data?.code === 'UNAUTHORIZED') {
      router.push('/sign-in')
    }
  }, [data, error, origin, router])

  if (isLoading) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            Setting up your account...
          </h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='font-semibold text-xl text-red-500'>
            Something went wrong.
          </h3>
          <p>Please try again later.</p>
        </div>
      </div>
    )
  }

  return null
}

export default Page
