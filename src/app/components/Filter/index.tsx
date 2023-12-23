import Image from 'next/image'

// Images
import Icon from '/public/images/iconfilter.png'

export function Filter() {
    return (
        <div className="border mb-8 border-purple rounded-full flex flex-row overflow-hidden p-1">
            <input placeholder="Filter your search" className="bg-transparent w-full pl-7 text-purple font-bold" /> 

            <button className="rounded-full bg-purple h-10 w-12 md:h-12 flex items-center justify-center"> 
                <Image src={Icon} width={15} height={15} alt="filtro" /> 
            </button>
        </div>
    )
}