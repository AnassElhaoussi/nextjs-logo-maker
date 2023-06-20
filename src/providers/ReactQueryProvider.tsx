"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Props } from "@/types"

export const ReactQueryProvider = ({children}: Props) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}