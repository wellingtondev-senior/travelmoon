import { Metadata } from 'next';

// Components
import { CardTrip } from '@/app/components/CardTrip'
import { Filter } from "@/app/components/Filter";

// Hooks
import { useFetch } from '@/app/hooks/useFetch'

// Types
import { TripData } from '@/app/types'

export const metadata: Metadata = {
    title: 'Descubra Destinos | Travelmoon',
};

export default async function DescubraDestinos() {
    const data = await useFetch('/open/destinations?with_uploads=true')

    const res = data.data.map((item: any) => ({ 
        id: item.destination_id,
        image_url: item.banner_image_url,
        ...item
    }))
    console.log(res)
    return (
        <div className="container mx-auto">
            <div className="py-20 px-8 lg:py-20 lg:px-8">
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-purple">Descubra <br/> Destinos</h1>

                {/* <Filter /> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
                    <CardTrip data={res} route="destinos/detalhes" />
                </div>
            </div>
        </div>
    )
} 
