import React from "react";
import Image from "next/image";
import { Metadata } from 'next';
import Link from "next/link";

// Components
import { Button } from "@/app/components/Button";

// Images
import Img from '/public/images/sobre.png'

export const metadata: Metadata = {
    title: 'Sobre nós | Travelmoon',
};

export default function Sobre() {
    return (
        <div className="container mx-auto">
            <div className="py-20 px-8 lg:py-20 lg:px-8">
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-purple">Sobre <br/> nós</h1>

                <hr className="divide-y border-purple"/>

                <div className="mt-6">
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="col-auto">
                            <span className="text-sm md:text-xl text-purple"></span>
                        </div>

                        <div className="grid-cols-1">
                            <p className="text-sm md:text-xl mb-4 text-purple"> 
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our
                                favourite cliffside retreats, Six Senses Uluwatu. A place that exceeds perfection, 
                                the next two days are to de-stress and unwind post wedding.
                            </p>
                            <p className="text-sm md:text-xl mb-4 text-purple">
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our favourite cliffside retreats, 
                                Six Senses Uluwatu. A place that exceeds perfection, the next two days are to de-stress and unwind post wedding. 
                            </p>
                            <p className="text-sm md:text-xl mb-16 text-purple">
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our favourite cliffside retreats, 
                                Six Senses Uluwatu. A place that exceeds perfection, the next two days are to de-stress and unwind post wedding.
                            </p>
                        </div>
                    </div>
                    
                    <div className="w-full relative lg:max-h-[696px] md:max-h-[350px] aspect-square">
                        <Image 
                            src={Img} 
                            alt="sobre nós - travelmoon" 
                            fill
                            className="rounded-full object-cover md:rounded-3xl" 
                        />
                    </div>

                    <Link href="/destinos">
                        <Button bgColor="purple" textColor="white" size="lg" className="mt-14 lg:mt-20">
                            Comece a Planejar Aqui
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
} 