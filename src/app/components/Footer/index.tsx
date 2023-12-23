import Image from 'next/image'
import Link from 'next/link'

// Components
import { SocialNetwork } from "../SocialNetwork";

export function Footer() {
    return (
        <footer className='m-12 md:m-16'>
            <div className='flex flex-col items-center md:flex-row md:justify-between'>
                <div className='md:flex md:flex-row md:items-center'>
                    <Image className='mx-auto mb-8 md:m-0' src="/images/logo-travelmoon-footer.png" width={53} height={63} alt='logo travelmoon' />
        
                    <span className='text-purple text-sm md:ml-4 md:text-base'>All rights reserved to TravelMoon</span>
                </div>

                <ul className='text-center my-11 md:hidden'>
                    <li className='mb-2.5 text-purple text-sm'><Link href="/images/logo-travelmoon">Quem somos</Link></li>
                    <li className='mb-2.5 text-purple text-sm'><Link href="/images/logo-travelmoon">Destinos</Link></li>
                    <li className='mb-2.5 text-purple text-sm'><Link href="/images/logo-travelmoon">Experiências</Link></li>
                    <li className='mb-2.5 text-purple text-sm'><Link href="/images/logo-travelmoon">Trip Finder</Link></li>
                    <li className='text-purple text-sm'><Link href="/images/logo-travelmoon">Blog</Link></li>
                </ul>

                <div className='flex gap-x-4'>
                    <SocialNetwork color="purple" />
                </div>
            </div>
        </footer>
    )
}