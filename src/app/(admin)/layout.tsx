"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BsArrowLeftShort, BsMailbox, BsPeople, BsAirplane, BsBasket, BsTags, BsFillPinMapFill } from 'react-icons/bs'
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri'
import { ImExit } from "react-icons/im";
import { useRouter } from 'next/navigation'

// Utils
import { getData, removeData } from '@/app/utils/storage'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    const [open, setOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const user = getData('@user');
    const router = useRouter()

    const menus = [
        { title: "Dashboard", icon: <MdOutlineDashboard />, path: '/dashboard'},
        { title: "Produtos", icon: <MdOutlineProductionQuantityLimits />, path: '/dashboard/produtos' },
        { title: "Destinos", icon: <BsFillPinMapFill />, path: '/dashboard/destinos' },
        { title: "Leads", icon: <BsBasket />, path: '/dashboard/pedidos' },
        { title: "Usuários", icon: <BsPeople />, path: '/dashboard/usuarios' },
        { title: "Inbox", icon: <BsMailbox />,  path: '/dashboard/inbox' },
        { title: 'Tags', icon: <BsTags />, path: '/dashboard/tags'},
        { title: 'Experiências', icon: <BsAirplane />, path: '/dashboard/experiencias'}
    ]

    function logout() {
        router.push('/')
        removeData("@user")
    }

    return (
        <div className="flex min-h-full bg-gray-200">
            <div className={`bg-black-300 min-h-full p-5 pt-6 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>

                <div className="inline-flex w-full">
                    <Image className='mx-auto mb-8' src="/images/logo-travelmoon-footer.png" width={53} height={63} alt='logo travelmoon' />
                </div>

                <li  className='flex items-center gap-x-4 p-2'>
                    <span className={`text-sm text-gray-500 ${!open && 'hidden'}`}>Menu</span>
                </li>
                
                {menus.map((item, index) => (
                    <Link key={index} href={item.path}>
                        <li  className={`${pathname === item.path && 'bg-black-200'}
                            mt-4 flex text-gray-300 text-sm items-center gap-x-4 cursor-pointer p-2 hover:bg-black-200 rounded-md`}
                        >
                            <span className='text-2xl text-gray-500 block mr-2'>
                                {item.icon ? item.icon : <BsArrowLeftShort/>}
                            </span>
                            <span className={`text-sm text-gray-500 font-medium flex-1 ${!open && 'hidden'}`}>{item.title}</span>
                        </li>
                    </Link>
                ))}

                <li onClick={() => logout()}  className='mt-4 flex text-gray-300 text-sm items-center gap-x-4 cursor-pointer p-2 hover:bg-black-200 rounded-md'>
                    <span className='text-2xl text-gray-500 block mr-2'> <ImExit /> </span>
                    <span className={`text-sm text-gray-500 font-medium flex-1 ${!open && 'hidden'}`}>Sair</span>
                </li>
            </div>

            <div className='w-full'>
                <div className='flex items-center bg-white shadow-md h-20 justify-between p-5'>

                    {open ?  
                        <RiCloseLine className='text-3xl cursor-pointer' onClick={() => setOpen(!open)}/> 
                        :
                        <RiMenu2Fill className='text-3xl cursor-pointer' onClick={() => setOpen(!open)} />
                    }

                    <div className="flex gap-3 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                            <img
                                className="h-full w-full rounded-full object-cover object-center"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                        </div>
                        <div className="text-sm">
                            <div className="font-medium text-gray-700">{user?.name}</div>
                            <div className="text-gray-400">{user?.email}</div>
                        </div>
                    </div>
                </div>
                <div className='p-7'>
                    {children}
                </div>
            </div>   
        </div>
    )
}
