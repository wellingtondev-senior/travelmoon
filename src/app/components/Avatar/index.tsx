import React from 'react';
import Image from 'next/image';

// Utils
import {getInitials} from '@/app/utils'

// Utils
import { getData } from '@/app/utils/storage'


export function Avatar() {
    const user = getData('@user');
    console.log(user)
    return ( 
        <div className="bg-purple mx-auto flex justify-center items-center w-28 h-28 rounded-full relative aspect-square">
            {user?.photo_url ?
                <Image src={user.photo_url} fill className="object-cover rounded-full" alt="travelmoon"/>
                :
                <h1 className='text-gray uppercase text-3xl'>{getInitials(user?.name ?? '')}</h1>
            }
        </div>
    )
}

