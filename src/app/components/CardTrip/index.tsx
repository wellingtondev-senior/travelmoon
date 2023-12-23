'use client'
import { IoMdHeart, IoMdStar } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Image from 'next/image'
import Link from 'next/link'



// Services
import { api } from "@/app/services/api";

type FavoriteData = {
    name: string;
    stars: string;
    favorite_id: string;
    is_favorite: boolean;
    id: string;
    title: string;
    image_url: string;
    country_integration_id: number;
    from_price?: {
        currency: string;
        amount: number;
    };
}

type CardFavoriteProps = {
    data: FavoriteData[];
    route?: string;
}

export function CardTrip({ data, route}: CardFavoriteProps) {
    const router = useRouter();

    async function handleFavorite(item: FavoriteData) {
        try {
            let request;

            if (item.is_favorite) {
                request = () => api.delete(`me/favorites-destinations/${item.favorite_id}`)
            } else {
                request = () => api.post('me/favorites-destinations', {
                    destination_id: item.id
                })
            }

            await request();
            router.refresh(); // Usamos replace para evitar histórico duplicado
            toast.success('Success');
        } catch (err: any) {
            toast.error(err.message || 'Algo deu errado.');
        }
    }

    function handlePath(item: any) {
        router.push( item.tag_id  ? `/${route}/${item.id}/${item.tag_id}` : `/${route}/${item.id}`)
    }

    return (
        <div className="flex gap-6 snap-x snap-mandatory before:shrink-0 after:shrink-0 scroll-smooth">
            {data.map((item, index) => (
                <div key={index} className='shrink-0 relative snap-center w-[686px] h-[956px]'>
                    <h1 className="absolute mt-5 ml-5 z-10 text-3xl text-white md:text-4xl lg:text-6xl break-all">
                        {item.name}
                    </h1>
                            
                    <div onClick={() => handlePath(item)}>
                        <Image
                            src={item.image_url}
                            className={`rounded-3xl group-hover:scale-110 transition object-cover`}
                            fill
                            alt={item.name}
                        />
                    </div>

                    <div className="absolute bottom-0 flex flex-row w-full justify-between">
                        {item.from_price &&
                            <div className="text-white flex ml-5 mb-5 flex-col">
                                <span>{item.from_price.currency}</span>
                                    <h1 className="text-5xl">{item.from_price.amount}</h1>
                            </div>
                        }

                        {item.stars &&
                            <div className="text-white flex flex-row items-center border-2 ml-5 mb-5 border-white p-3 rounded-full">
                                <IoMdStar size={24} color="white" className="mr-2" /> {item.stars}
                            </div>
                        }
                                
                        {item.is_favorite &&
                            <div className={`${item.is_favorite ? 'bg-white' : 'bg-transparent'} border-2 mr-5 mb-5 border-white p-3 rounded-full`}
                                onClick={() => handleFavorite(item)}
                            >
                                <IoMdHeart size={24} color={item.is_favorite ? 'purple' : "white"} />
                            </div>
                        }
                    </div>  
                </div>
            ))}
        </div>
    )
}
