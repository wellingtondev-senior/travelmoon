import { Metadata } from 'next';

// Components
import { CardTrip } from '@/app/components/CardTrip'
import { useFetch } from '@/app/hooks/useFetch';

// Types
import { TripData } from '@/app/types'

export const metadata: Metadata = {
    title: 'Viva essas Experiências Conosco | Travelmoon',
};

export default async function Experience() {
    const data = await useFetch('open/experiences?with_uploads=true')

    const res = data.data.map((item: any) => ({ 
        id: item.destination_id,
        image_url: item.main_image_url,
        ...item
    }))

    return (
        <div>
            <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-white">Viva essas <br/> Experiências <br/> Conosco</h1>
           
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
                <CardTrip data={res} route="experiencia" />
            </div>
        </div>
    )
}