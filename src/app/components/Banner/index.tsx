
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa';

import Logo from '/public/images/aruba.png'

export function Banner () {
    return (      
        <div className="cursor-pointer group">
            <div className="aspect-auto w-full relative overflow-hidden rounded-3xl">
                <div className="
                    absolute 
                    rounded-full 
                    bg-green 
                    mt-6 ml-6
                    lg:mt-20 
                    lg:ml-20 
                    z-10 
                    text-xs	
                    md:text-2xl 
                    text-green-800 
                    lg:text-6xl 
                    py-3 
                    px-8"
                >
                    Sponsors by
                </div>
                        
                    <Image 
                        className="w-full h-[350px] md:h-[500px] lg:h-[904px] rounded-3xl group-hover:scale-110 transition"
                        src={Logo}  
                        alt='banner travelmoon'
                    />
            
                <div className="absolute bottom-0"> 
                    <h1 className="text-5xl	md:text-7xl lg:ml-20 lg:mb-20 ml-6 mb-6 text-green">Get to <br/> Know <br/> Aruba</h1>
                </div>

                <div className="absolute bottom-0 right-0">
                    <button className="
                        mr-6 mb-6
                        lg:mr-20 lg:mb-20 
                        rounded-full w-12 h-12 lg:w-24 lg:h-24
                        bg-green text-green-800 flex items-center justify-center focus:outline-none"
                    >
                        <FaArrowRight className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}