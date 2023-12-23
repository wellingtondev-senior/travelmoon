import Image from 'next/image'
import { AiOutlineUpload  } from "react-icons/ai";

// Components
import { Banner } from "@/app/components/Banner";
import { Button } from "@/app/components/Button";
import { Carousel } from "@/app/components/Carousel";
import { CardTrip } from '@/app/components/CardTrip';
// import { SliderCarousel } from '@/app/components/Slider';

// Images
import Calendar from '/public/images/Calendar.svg'
import FlightTime from '/public/images/FlightTime.svg'
import KindOfTrip from '/public/images/KindOfTrip.svg'

// Services
import { useFetch } from '@/app/hooks/useFetch';

// Types 
import { TripData } from '@/app/types';

type DetalhesProps = {
    params: {
        id: string[];
    };
}

export default async function Destino({params}: DetalhesProps) {
    const { data } = await useFetch(`/open/destinations/${params.id}?include[]=tags&with_uploads=true`)

    const packages = await useFetch(`/open/products?with_uploads=true&filter[destination_id]=${params.id}`)

    const res = packages.data.map((item: any) => ({ 
        title: item.name,
        banner_image_url: item.image_url,
        id: item.destination_id,
        ...item
    }))

    return (
        <div>
            <section className='h-screen relative'>
                <Image src={data.banner_image_url} className='object-cover object-center shadow' fill alt="Destino - Travelmoon" />

                <div className='absolute p-8 lg:px-24 w-full h-full flex flex-col justify-between'>
                    <h1 className='relative top-0 text-7xl text-green-100 break-all'>{data.name}</h1>
                    
                    <div>
                        <Image src={data.map_image_url} className='mb-6' width={72} height={130} alt="mapas - Travelmoon" />

                        <div className='flex justify-between items-center'>
                            <span className='text-green-100 w-28 block'>{data.coordinates}</span>

                            <button className="
                                rounded-full w-10 h-10 lg:w-11 lg:h-11
                                bg-green text-green-800 flex items-center justify-center focus:outline-none"
                            >
                                <AiOutlineUpload className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mx-8 my-11 lg:mx-24 lg:my-40'>
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-green-700">
                    {data.slogan_phrase} 
                </h1>

                <hr className="divide-y border-green-700 mb-6"/>

                <div className='grid md:grid-cols-2 gap-4 mb-16'>
                    <div className="col-auto hidden md:block">
                        <span className="text-sm md:text-xl lg:text-3xl text-green-700">01</span>
                    </div>

                    <div className="grid-col-1">
                        <p className="text-sm md:text-xl lg:text-3xl mb-4 text-green-700"> 
                            {data.introduction} 
                        </p>
                    </div>
                </div>
                
                <div className='mb-28 flex flex-col items-end'>
                    <h1 className='text-green-700 text-9xl'> {data.primary_attraction_title.replace('First', '')} </h1>
                    <span className='text-green-700 text-xs'>Habitantes</span>
                </div>
                
                <div className="w-full relative lg:max-h-[696px] md:max-h-[350px] aspect-square">
                    <Image 
                        src={data.primary_attraction_upload_url} 
                        alt="sobre nós - travelmoon" 
                        fill
                        className="rounded-full object-cover md:rounded-3xl" 
                    />
                 </div>

                <a href="#pacotes">
                    <Button bgColor="green700" textColor="gray" size='lg' className='mt-14 md:mt-20'>Ver Pacotes</Button>
                </a>
            </section>

            <section className='px-8 py-11 lg:mx-24 lg:py-24 lg:px-16 lg:my-40 lg:rounded-3xl bg-green-700'>
                <div className='mb-28 flex flex-col items-end'>
                    <h1 className='text-gray text-9xl'> {data.secondary_attraction_title.replace('Praias', '')} </h1>
                    <span className='text-gray text-xs'>Temples</span>
                </div>

                <hr className="divide-y border-gray mb-6"/>

                <div className='grid md:grid-cols-2 gap-4 mb-16'>
                    <div className="col-auto hidden md:block">
                        <span className="text-sm md:text-xl lg:text-3xl text-gray">02</span>
                    </div>

                    <div className="grid-col-1">
                        <p className="text-sm md:text-xl lg:text-3xl mb-4 text-gray"> 
                            {data.secondary_attraction_description}
                        </p>
                    </div>
                </div>
                

                <div className="w-full relative lg:max-h-[696px] md:max-h-[350px] aspect-square">
                    <Image 
                        src={data.secondary_attraction_upload_url} 
                        alt="sobre nós - travelmoon" 
                        fill
                        className="rounded-full object-contain md:rounded-3xl" 
                    />
                 </div>

                <a href="#pacotes">
                    <Button bgColor="gray" textColor="green700" size='lg' className='mt-14 md:mt-20'>Ver Pacotes</Button>
                </a>
            </section>

            <section className='mx-8 my-11 lg:mx-24 lg:my-40'>
                <div className='mb-28 flex flex-col items-end'>
                    <h1 className='text-green-700 text-9xl'> {data.tertiary_attraction_title.replace('Praças', '')} </h1>
                    <span className='text-green-700 text-xs'>Beachs</span>
                </div>

                <hr className="divide-y border-green-700 mb-6"/>

                <div className='grid md:grid-cols-2 gap-4 mb-16'>
                    <div className="col-auto hidden md:block">
                        <span className="text-sm md:text-xl lg:text-3xl text-green-700">01</span>
                    </div>

                    <div className="grid-col-1">
                        <p className="text-sm md:text-xl lg:text-3xl mb-4 text-green-700"> 
                            {data.tertiary_attraction_description} 
                        </p>
                    </div>
                </div>
                
                <div className="w-full relative lg:max-h-[696px] md:max-h-[350px] aspect-square">
                    <Image 
                        src={data.tertiary_attraction_upload_url} 
                        alt="sobre nós - travelmoon" 
                        fill
                        className="rounded-full object-cover md:rounded-3xl" 
                    />
                 </div>

                <a href="#pacotes">
                    <Button bgColor="green700" textColor="gray" size='lg' className='mt-14 md:mt-20'>Ver Pacotes</Button>
                </a>
            </section>

            <section className='mx-8 my-11 lg:mx-24 lg:my-40 rounded-3xl bg-green-700'>
                <div className='px-8 py-11 lg:py-24 lg:px-16'>
                    <h1 className='text-gray text-5xl lg:text-8xl text-center'>Top Hits</h1>
                </div>

                {/* <SliderCarousel /> */}
                
                <div className='px-8 py-11 lg:py-24 lg:px-16'>    
                    <p className="text-sm md:text-xl lg:text-3xl mb-4 text-gray text-center"> 
                        After touching down in Bali, your heavenly Indonesia trip will begin at one of our
                        favourite cliffside retreats, Six Senses Uluwatu. A place that exceeds perfection, 
                        the next two days are to de-stress and unwind post wedding.
                    </p>
                </div>       
            </section>

            <section className='mx-8 my-11 px-8 py-11 lg:mx-24 lg:py-24 lg:px-16 lg:my-40 rounded-3xl bg-green-700'>
                <div>
                    <h1 className='text-gray text-5xl lg:text-8xl mb-72 text-center'>Dicas Travel</h1>
    
                    <p className="text-sm md:text-xl lg:text-3xl mb-4 text-gray"> 
                        After touching down in Bali, your heavenly Indonesia trip will begin at one of our
                        favourite cliffside retreats, Six Senses Uluwatu. A place that exceeds perfection, 
                        the next two days are to de-stress and unwind post wedding.
                    </p>
                </div>       
            </section>

            <section className='mx-8 my-11 lg:mx-24 lg:my-40'>
                <Banner />
            </section> 

            <section className='mx-8 my-11 px-8 py-11 lg:mx-24 lg:py-24 lg:px-16 lg:my-40 rounded-3xl bg-green-700'>
                <div>
                    <h1 className='text-gray text-5xl lg:text-8xl mb-72 text-center'>Fale com a IA</h1>
    
                    <p className="text-sm md:text-xl lg:text-3xl mb-4 text-gray text-center"> 
                        Nossa inteligência artificial está pronta para responder a todas as suas dúvidas.
                    </p>
                </div>       
            </section>

            <section className='mx-8 my-11 lg:mx-24 lg:my-40'>
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-green-700">
                    Bom Saber
                </h1>

                <hr className="divide-y border-green-700 mb-6"/>

                <div className='grid md:grid-cols-2 gap-4 mb-16'>
                    <div className="col-auto hidden sm:block">
                        <span className="text-sm md:text-xl text-green-700">04</span>
                    </div>

                    <div className="grid-col-1">
                        <p className="text-sm md:text-xl lg:text-3xl mb-12 lg:mb-40 text-green-700"> 
                            {data. good_to_know_description}  
                        </p>

                        <div className="flex justify-between mb-3.5 lg:mb-8">
                            <div className="flex flex-col items-center">
                                <Image src={Calendar} alt="Calendario - travelmoon" className="text-green-700 w-6 lg:w-14 mb-3" /> 
                        
                                <span className="mb-2 text-green-700 text-sm lg:text-3xl"> Quando ir </span>
                                <span className="text-green-700 text-xs lg:text-2xl"> {data.when_to_go} </span>
                            </div>
                            <div className="mb-2 flex flex-col items-center">
                                <Image src={Calendar} alt="Calendario - travelmoon" className="text-green-700 w-6 lg:w-14 mb-3" /> 

                                <span className="mb-2 text-green-700 text-sm lg:text-3xl"> Qtd. de dias ideal </span>
                                <span className="text-green-700 text-xs lg:text-2xl">{data.ideal_time_of_days}</span>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <Image src={FlightTime} alt="Calendario - travelmoon" className="text-green-700 w-6 lg:w-14 mb-3" /> 

                                <span className="mb-2 text-green-700 text-sm lg:text-3xl"> Tempo de voo </span>
                                <span className="text-green-700 text-xs lg:text-2xl"> {data.flight_time_from_br} </span>
                            </div>
                            <div className="mb-2 flex flex-col items-center">
                                <Image src={KindOfTrip} alt="Calendario - travelmoon" className="text-green-700 w-6 lg:w-14 mb-3" /> 

                                <span className="mb-2 text-green-700 text-sm lg:text-3xl"> Moeda local </span>
                                <span className="text-green-700 text-xs lg:text-2xl"> talk</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Button bgColor='green700' textColor='gray' size='lg' className='mt-14 md:mt-20'>Viva esta experiência</Button>
            </section>

            <section className='pl-8 py-11 lg:py-24 lg:pl-24 bg-green-700' id="pacotes">
                <div className="mr-9 mb-9 flex flex-col justify-between">
                    <h1 className="text-5xl	lg:text-8xl text-gray lg:mb-0">Destinos<br/> 
                        {data.name}
                    </h1>
                </div>

                <Carousel>
                            <ul className="flex  gap-6 snap-x snap-mandatory before:shrink-0 after:shrink-0 scroll-smooth">
                                    {res.map((item: any) => (
                                        <li key={item.name} className="shrink-0 relative snap-center w-[686px] h-[956px]">
                                            <div className="w-full relative overflow-hidden h-full rounded-3xl">
                                                <h1 className="absolute mt-5 ml-5 z-10 text-3xl text-white md:text-4xl lg:text-6xl break-all">
                                                    {item.name}
                                                </h1>
                                                
                                                    <Image
                                                        src={item.image_url}
                                                        className={`rounded-3xl group-hover:scale-110 transition object-cover`}
                                                        fill
                                                        alt={item.name}
                                                    />
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </Carousel>


                <div className="mr-8 lg:mr-24">
                    <Button bgColor="gray" textColor="green700" size='lg' className='mt-14 md:mt-20'>Ver Pacotes</Button>
                </div>
            </section>
        </div>
    )
}