import { IoIosArrowRoundDown } from "react-icons/io"; 
import Image from 'next/image'


// Components
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Quiz } from '@/app/components/Quiz';
import { CardTrip } from '@/app/components/CardTrip';
import { Banner } from '@/app/components/Banner';
import { Button } from '@/app/components/Button';
import { SliderExperience } from '@/app/components/Slider/experience';
import { Carousel } from "@/app/components/Carousel";

// Hooks
import { useFetch } from '@/app/hooks/useFetch'


export default async function Home() {

    const data = await useFetch('open/experiences?with_uploads=true')

    const destinations = await useFetch('open/destinations?with_uploads=true?per_page=5')

    const res = destinations.data.map((item: any) => ({ 
        id: item.destination_id,
        image_url: item.banner_image_url,
        ...item
    }))


    console.log(res)

    return (
        <body>
            <main>
                <div className='relative h-full overflow-hidden'>
                    <video autoPlay loop muted className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
                        <source src="/videos/background.mp4" type="video/mp4" media="mp4" />
                    </video>
        
                    <div className="flex flex-col justify-between">
                        <div className="relative min-h-screen flex flex-col justify-between z-30 py-14 px-9 md:py-20 md:px-16 text-2xl">
                            <Header />

                            <div className="relative w-max">
                                <p className="text-white text-5xl md:text-8xl leading-snug mb-11 lg:mb-16" >
                                    Your love <br/> honeymoon <br/> starts here.
                                </p>    

                                <a href="#experience">
                                    <Button bgColor='gray' textColor="purple" size="lg">Viva esta Experiência</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 mb-10 ml-9 lg:ml-20 lg:mb-16">
                        <div className="mr-9 flex flex-col justify-between">
                            <h1 className="text-5xl	lg:text-6xl text-purple mb-16 lg:mb-0">We have the better <br/> destinations.</h1>
                            <div className="mb-6 flex justify-between border border-purple rounded-full py-4 px-9 lg:hidden">
                                <span className="text-purple">Top 5</span>

                                <IoIosArrowRoundDown color="purple" />
                            </div>

                            <div>
                                <Button textColor="white" bgColor="purple" size='lg' className="w-full lg:w-fit lg:px-20 hidden lg:block">
                                    See All Destinations
                                </Button>
                            </div>
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

                        
                        <div className="mr-9  mt-10 lg:hidden">
                            <Button textColor="white" bgColor="purple" size='lg' className="w-full md:w-fit">See All Destinations</Button>
                        </div>
                    </div>                
                </section> 


                <section id="experience" className='bg-purple pt-20 pb-10 md:pt-28 md:pb-12 test'>
                    <h1 className='text-white mx-8 mb-16 md:mb-20 md:text-center text-5xl md:text-6xl'>
                        Viva essa <br/> Experiência Conosco.
                    </h1>

                    <SliderExperience experience={data.data}/>
                </section>

                <section className='m-6 md:m-16'>
                    <div className="mb-16 lg:mb-20">
                        <Banner />
                    </div>
                    
                    <Quiz />
                </section>
            </main>

            <Footer/>
        </body>
    )
}
