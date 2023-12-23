import { Metadata } from 'next';

// Components
import { CardTrip } from '@/app/components/CardTrip'
import { Filter } from "@/app/components/Filter";

// Actions
import {useFetch}  from "@/app/hooks/useFetch";

export const metadata: Metadata = {
    title: 'Destinos Favoritos | Travelmoon',
};

type DestinosData = {
    destination: string[]
}

export default async function Favoritos() {
    // const data = await useFetch('me/favorites-destinations')

    // const res = data?.map((item: DestinosData)  => item.destination)

    return (
        <div className="container mx-auto">
            <div className="py-20 px-8 lg:py-20 lg:px-8">
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-purple">
                    Seus Destinos <br/> Favotiros
                </h1>

                {/* <Filter /> */}

                {/* <CardTrip data={res} /> */}
            </div>
        </div>
    )
} 