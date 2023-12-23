'use client'

import useSWR from 'swr'

// Services
import { api } from '@/app/services/api';

export function useFetchClient<Data = any, Error = any>(url: string) {
    const { data, error, mutate } = useSWR<Data, Error>(url, async (url:string) => {
        const response = await api.get(url);
    
        return response.data;
    })
  
    return { data, error, mutate }
}