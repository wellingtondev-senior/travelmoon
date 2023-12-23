import Image from 'next/image'

// Components
import { Carousel } from "@/app/components/Carousel";
// import { Button } from "@/app/components/Button";
import { CardTrip } from '@/app/components/CardTrip';
// import { SliderCarousel } from '@/app/components/Slider';

// Utils
import { formatCurrency } from '@/app/utils'

type ExperienciaProps = {
    params: {
        id: string[]
    }
}

import { TripData } from '@/app/types';

import { useFetch } from '@/app/hooks/useFetch';

export default async function Experiencia({ params } : ExperienciaProps) {

    const data =  await useFetch(`/open/experiences/${params.id[0]}?with_uploads=true`)
    const products = await useFetch(`/open/products?with_uploads=true&filter[tags.id]=${params.id[1]}`)
    
    const item = products.data.map((product: any) => ({ 
        ...product,
        from_price: {
            amount: formatCurrency(product.minimal_price_in_cents),
            currency: 'R$'
        }
    }))

    return (
        <div>
            <div className='relative h-full overflow-hidden'>
                <video autoPlay loop muted className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
                    <source src={data.data.main_video_url} type="video/mp4" media="mp4" />
                </video>
    
                <div className="flex flex-col justify-between">
                    <div className="relative min-h-screen flex flex-col justify-between z-30 p-7 md:p-24 text-2xl">
                        <h1 className='text-4xl lg:text-[105px] text-white text-center font-bold mt-5 mb-5 md:mb-96'>
                            {data.data.name}
                        </h1>

                        <div>
                            <hr className="divide-y border-white mt-6 pb-6"/>

                            <div className='grid md:grid-cols-2 gap-4 mb-6'>
                                <div className="col-auto"></div>

                                <div className="grid-cols-1">
                                    <p className="text-sm md:text-xl mb-4 text-white"> 
                                        {data.data.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="relative max-h-[282px] max-w-[282px] mx-auto md:min-w-full md:max-h-[350px] lg:max-h-[696px] aspect-square">
                                <Image 
                                    src={data.data.main_image_url} 
                                    alt="sobre nós - travelmoon" 
                                    fill
                                    className="rounded-full object-cover md:rounded-3xl" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="mt-20 mb-10 ml-9 lg:ml-20 lg:mb-16">
                    <div className="mr-9 mb-9 flex flex-col justify-between">
                        <h1 className="text-5xl	lg:text-6xl text-purple lg:mb-0">Experiências de <br/> {data.data.name}.</h1>
                    </div>

                    <Carousel>                                
                        <CardTrip data={item} />
                    </Carousel>
                </div>                
            </section> 
        </div>
    )
}