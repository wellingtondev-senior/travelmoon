import { api } from '@/app/services/api';

export async function useFetch<Data = any, Error = any>(url: string) {
    try {
        const result = await api.get(url)

        return result.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}