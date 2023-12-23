import Script from 'next/script'
import './globals.css'

// import { Inter } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import Providers from './context/App/provider';


export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className='bg-gray'>
                <Toaster />
               
                <Providers>
                    {children}
                </Providers>
{/*                
                <Script
                    id='blip-chat-desk'
                    src="https://unpkg.com/blip-chat-widget"
                    onLoad={() => {
                        new BlipChat()
                            .withAppKey('dHJhdmVsMzo0ZGMwZmZiMi1kMGJmLTRmOWItYjg2MS04NDYzZjg0NWVmOTg=')
                            .withButton({"color":"#6E2C8E","icon":""})
                            .withCustomCommonUrl('https://thiago-taveiros-a8y49.chat.blip.ai/')
                            .build();
                        }}
                />             */}
            </body>
        </html>
    )
}
