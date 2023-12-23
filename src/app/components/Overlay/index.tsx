import { ReactNode } from "react"
import { AiOutlineClose } from "react-icons/ai";

type OverlayProps = {
    children: ReactNode, 
    isOpen: boolean,
    isClose: () => void
}

export function Overlay({children, isOpen, isClose}: OverlayProps) {

    return (    
        <div className={`
            justify-center 
            items-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            p-5
            outline-none 
            focus:outline-none
            bg-neutral-800/70
            ${isOpen ? 'block': 'hidden'}
        `}
        >   
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => isClose()}>
                <AiOutlineClose className="text-white text-xl md:text-2xl lg:text-3xl" />   
            </div>

            {children}
        </div> 
    )
}