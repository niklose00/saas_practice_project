import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { useEffect } from "react"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get("origin")

    const { data, isLoading, error } = trpc.authCallback.useQuery()

    useEffect(() => {
        if (data?.success) {
            router.push(origin ? `/${origin}` : '/dashboard')
        }
    }, [data, origin, router])

    useEffect(() => {
        if (error) {
            // handle error, maybe redirect to an error page or show a message
            console.error("An error occurred:", error)
        }
    }, [error])

}

export default Page