import React, { Suspense } from "react";
import Image from 'next/image'
import { Metadata } from 'next';

// Componentes
import { Button } from "@/app/components/Button";

// Images
import Logo from '/public/images/indonesia.png'

export const metadata: Metadata = {
    title: 'Suas Viagens | Travelmoon',
};

export default function SuasViagens() {
    return (
        <div className="container mx-auto">
            <div className="py-20 px-8 lg:py-20 lg:px-8">
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-purple">Suas <br/> Viagens</h1>

                <div>
                    <div className="mb-8">
                        <h2 className="text-purple text-2xl">Viagens Atuais</h2>
                    </div>

                    <div className='flex gap-4 w-max lg:w-min flex-col flex-wrap'>
                        <div>
                            <div className="w-full bg-purple rounded-3xl flex p-3 mb-7">
                                <div>
                                    <Image 
                                        width={0} 
                                        height={0} 
                                        src={Logo} 
                                        alt="stopper." 
                                        className="max-w-[140px] max-h-[199px] rounded-3xl hidden lg:block" 
                                    />
                                </div>
                                <div className="ml-6 flex flex-col justify-between">
                                    <h1 className="text-white text-2xl mb-1">Indonesia</h1>

                                    <p className="text-white text-sm mb-4">Indonesia, Ubud, Jakarta. Diving Experiencie + Accor Hotel.</p>

                                    <hr className="divide-white border-white"/>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-white text-2xl">23.04.23</span>
                                        <button className="w-[30px] h-[30px]" > - </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <Button size="md" textColor="gray" bgColor="purple" > 24 Hour Support </Button>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="mb-8">
                        <h2 className="text-purple text-2xl">Viagens Anteriores</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div className="w-full md:max-w-sm">
                            <div className="bg-gray rounded-3xl border border-purple flex p-3 mb-7">
                                <div className="w-full">
                                    <h1 className="text-purple text-2xl mb-1">Indonesia</h1>

                                    <p className="text-purple text-sm mb-4">Indonesia, Ubud, Jakarta. Diving Experiencie + Accor Hotel.</p>

                                    <hr className="divide-purple border-purple"/>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-purple text-2xl">23.04.23</span>
                                        <button className="bg-purple text-gray rounded-3xl py-2 px-5 text-xs">See Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:max-w-sm">
                            <div className="bg-gray rounded-3xl border border-purple flex p-3 mb-7">
                                <div className="w-full">
                                    <h1 className="text-purple text-2xl mb-1">Indonesia</h1>

                                    <p className="text-purple text-sm mb-4">Indonesia, Ubud, Jakarta. Diving Experiencie + Accor Hotel.</p>

                                    <hr className="divide-purple border-purple"/>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-purple text-2xl">23.04.23</span>
                                        <button className="bg-purple text-gray rounded-3xl py-2 px-5 text-xs">See Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:max-w-sm">
                            <div className="bg-gray rounded-3xl border border-purple flex p-3 mb-7">
                                <div className="w-full">
                                    <h1 className="text-purple text-2xl mb-1">Indonesia</h1>

                                    <p className="text-purple text-sm mb-4">Indonesia, Ubud, Jakarta. Diving Experiencie + Accor Hotel.</p>

                                    <hr className="divide-purple border-purple"/>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-purple text-2xl">23.04.23</span>
                                        <button className="bg-purple text-gray rounded-3xl py-2 px-5 text-xs">See Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:max-w-sm">
                            <div className="bg-gray rounded-3xl border border-purple flex p-3 mb-7">
                                <div className="w-full">
                                    <h1 className="text-purple text-2xl mb-1">Indonesia</h1>

                                    <p className="text-purple text-sm mb-4">Indonesia, Ubud, Jakarta. Diving Experiencie + Accor Hotel.</p>

                                    <hr className="divide-purple border-purple"/>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-purple text-2xl">23.04.23</span>
                                        <button className="bg-purple text-gray rounded-3xl py-2 px-5 text-xs">See Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 