'use client'
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";

// Components
import { Button } from "@/app/components/Button";
import { Avatar } from "@/app/components/Avatar";

// Contexts
import { useApp } from '@/app/context/App/context';

// Utils
import { getData, removeData } from "@/app/utils/storage";
import { DateFormat } from '@/app/utils'

export default function Perfil(): JSX.Element {   
    const {setVisible} = useApp(); 
    const user = getData("@user");
    const [showProfile, setShowProfile] = useState(false)

    function logout() {
        removeData('@user')
        setVisible('')
    }

    return (
        <div className="w-full min-h-full flex-col flex items-center justify-center">
            <div className="max-w-[378px] text-center bg-gray rounded-3xl overflow-auto ">
                <div className="w-full relative justify-end flex p-2">
                    <button  onClick={() => setVisible('')} 
                        className="rounded-full bg-purple text-gray p-1 md:p-2 flex items-center justify-center focus:outline-none"
                    >
                        <IoIosClose className="text-3xl" />
                    </button>
                </div>

                <div className='p-11'>
                    <Avatar />
                                    
                    <h1 className="text-purple text-2xl mb-14 mt-6">
                        {user.name}
                    </h1>        

                    <div className="flex items-center flex-col">
                        <div className={`${showProfile === false ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                            <div className={`${showProfile === false ? 'block' : 'hidden'} duration-300`}>
                                <Link href="/favoritos">
                                    <Button className="mb-6" size="sm" textColor="purple" border="purple">
                                        Meus Favoritos
                                    </Button>
                                </Link>

                                <Link href="/minhas-viagens">
                                    <Button className="mb-6" size="sm" textColor="purple" border="purple">
                                        Minhas Viagens
                                    </Button>
                                </Link>

                                <Button onClick={() => setShowProfile(true)} className="mb-12" size="sm" textColor="purple" border="purple">
                                    Minha Conta
                                </Button>

                                <button onClick={() => logout()} className="text-center text-purple underline">Sair</button>
                            </div>
                        </div>

                        <div className={`${showProfile === true ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                            <div className={`${showProfile === true ? 'block' : 'hidden'} duration-300 text-left`}>
                                <div className="mb-2">
                                    <span className="bold text-purple text-lg">CPF: </span> 
                                    <span className="bold text-lg text-black-200">{user?.cpf}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="bold text-purple text-lg">Tipo de usuário: </span> 
                                    <span className="bold text-lg text-black-200">{user?.admin ? 'Administrador' : 'Usuário'}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="bold text-purple text-lg">Cidade: </span> 
                                    <span className="bold text-lg text-black-200">{user?.city.name}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="bold text-purple text-lg">Estado: </span> 
                                    <span className="bold text-lg text-black-200">{user?.state.name}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="bold text-purple text-lg">Email: </span> 
                                    <span className="bold text-lg text-black-200">{user?.email}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="bold text-purple text-lg">Data de criação: </span> 
                                    <span className="bold text-lg text-black-200">{DateFormat(user?.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy')}</span>
                                </div>
                                <div className="mb-6">
                                    <span className="bold text-purple text-lg">Status: </span> 
                                    <span className="bold text-lg text-black-200">{user?.active ? 'Ativo' : 'Inativo'}</span>
                                </div>
                            </div>
                            <button className="text-center text-purple underline" onClick={() => setShowProfile(false)}>
                                voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
