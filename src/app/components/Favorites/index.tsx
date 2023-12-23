'use client'

import { IoMdHeart } from "react-icons/io";

// Services
import { api } from "@/app/services/api";

type FavoriteProps = {
    is_favorite: boolean
    id: string    
}

export function Favorites({is_favorite, id}: FavoriteProps) {

    async function handleFavorite(id : string, is_favorite : boolean) {
        if (is_favorite) {
            try {
                const res = await api.delete(`me/favorites-destinations/${id}`)

                console.log(res)
            } catch (err) {
                console.log(err)
            }
        } else {
            const res = await api.post('me/favorites-destinations', {
                destination_id: id
            })
            console.log(res)
        }
    }

    return (
        <div 
            className={`${is_favorite ? 'bg-white' : 'bg-transparent'} border-2 mr-5 mb-5 border-white p-3 rounded-full`} 
            onClick={() => handleFavorite(id , is_favorite) }
        >
            <IoMdHeart size={24} color={is_favorite ? 'purple' : "white"} />
        </div>
    )
}

