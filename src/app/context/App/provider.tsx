"use client"
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

export default function Providers({children}:{children:ReactNode}){

    const [queryClient] = useState(() => new QueryClient());
    

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
            {children}
        </QueryClientProvider>
    )

}