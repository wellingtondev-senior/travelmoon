'use client'
import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { FaGripLines } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { SocialNetwork } from '../SocialNetwork';

// Pages
import Login from '@/app/(login)/login';
import Cadastro from '@/app/(login)/cadastro';
import Perfil from '@/app/(login)/perfil'
import EsqueciSenha from '@/app/(login)/esqueci_senha';

// Utils
import { getData } from '@/app/utils/storage'

// Contexts
import { useApp } from '@/app/context/App/context';

export function Header() {
    const { visible, setVisible } = useApp()
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter()
    const user = getData("@user")

    const menu = [
        {routeName: 'Destinos', path: '/destinos'},
        {routeName: 'Sobre Nós', path: '/sobre-nos'},
        {routeName: 'Experiências', path: '/viva-experiencia-conosco'},
        {routeName: 'Trip Finder', path: '/viagens'},
        {routeName: 'Fale Conosco', path: '/fale-conosco'},
    ]

    console.log(user)
    return (
        <header>
            <nav className="w-full flex items-center justify-between ">
                <div>
                    <Image src="/images/logo-travelmoon.png" width={180} height={63} alt="travelmoon" />
                </div>
            
                <div className="hidden md:w-auto w-full lg:flex items-center">
                    <ul className="flex md:items-center gap-8">
                        {menu.map(item => (
                            <li key={item.routeName}>
                                <Link 
                                    href={item.path} 
                                    className="text-white py-4 px-5 inline-block text-base hover:text-black hover:bg-white hover:rounded-full"
                                >
                                    {item.routeName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden lg:flex lg:justify-end">
                    {user?.access_token ?
                        <button 
                            onClick={() => {user.admin ? router.push('dashboard') : setShowMenu(true), setVisible("Perfil")}}
                            className="rounded-full w-12 h-12 bg-white flex items-center justify-center focus:outline-none">
                            <AiFillHeart className="text-purple text-xl" />
                        </button>
                        :
                        <button 
                            onClick={() => setShowMenu(true)} 
                            className="text-white py-4 px-5 inline-block text-base hover:text-black hover:bg-white hover:rounded-full"
                        >
                            Log in <span aria-hidden="true">&rarr;</span>
                        </button>
                    }
                </div>

                <div className="lg:hidden relative z-50 flex items-center">
                    {user?.access_token &&
                        <button 
                            onClick={() => {user.admin ? router.push('dashboard') : setShowMenu(true), setVisible("Perfil")}}
                            className="rounded-full w-12 h-12 bg-white flex items-center justify-center focus:outline-none"
                        >
                            <AiFillHeart className="text-purple text-xl" />
                        </button>
                    }
                    <FaGripLines color="white" className='ml-6' onClick={() => setShowMenu(!showMenu)} />
                </div>
            </nav> 

            <div className={`duration-300 ${showMenu ? 'opacity-1 relative z-50 block' : 'opacity-0 hidden'}`}>
                {/* overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

                <div className="fixed max-h-full p-5 md:p-10 inset-0 bg-purple overflow-auto lg:m-10 lg:rounded-3xl">
                    {visible !== 'Login' && visible !== 'Cadastro' && visible !== 'Perfil' &&  visible !== 'EsqueciSenha' &&
                        <div className="w-full min-h-full flex-col flex items-center justify-between">
                            <div className="w-full relative justify-end flex">
                                <button 
                                    className="rounded-full bg-gray text-purple p-1 md:p-2 flex items-center justify-center focus:outline-none"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <IoIosClose className="text-3xl" />
                                </button>
                            </div>
                        
                            <div className="w-[378px] text-center">
                                
                                <ul className='space-y-9 lg:space-y-12'>
                                    {menu.map(item => (
                                        <li key={item.routeName}>
                                            <Link href={item.path} className='text-2xl md:text-3xl text-gray duration-300 link-underline'>
                                                {item.routeName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                
                                {!user?.access_token &&
                                    <button className='text-lg md:text-2xl mt-12 border p-5 rounded-full text-gray' onClick={() => setVisible('Login')}>
                                        Login / Cadastro
                                    </button>
                                }
                            </div> 
                            <div className='flex gap-x-4 mt-7 xl:mt-0'>
                                <SocialNetwork color="gray" />
                            </div>
                        </div>
                    }

                    {visible === 'Login' && <Login />}

                    {visible === 'Cadastro' && <Cadastro />}

                    {visible === 'Perfil' && <Perfil />}

                    {visible === 'EsqueciSenha' && <EsqueciSenha />}
                    
                </div>
            </div>
        </header>
    )
}