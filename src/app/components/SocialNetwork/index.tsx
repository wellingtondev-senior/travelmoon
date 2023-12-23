import { Fragment } from "react";
import { AiFillInstagram, AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";

// Types
import { SocialNetworkProps } from "@/app/types";

export function SocialNetwork({color}: SocialNetworkProps) {
    return (
        <Fragment>
             <button className={`rounded-full border border-${color} p-2 flex items-center justify-center focus:outline-none`}>
                <AiFillInstagram className={`text-lg text-${color}`} />
            </button>
            <button className={`rounded-full border border-${color} p-2 flex items-center justify-center focus:outline-none`}>
                <AiOutlineTwitter className={`text-lg text-${color}`} />
            </button>
            <button className={`rounded-full border border-${color} p-2 flex items-center justify-center focus:outline-none`}>
                <AiFillYoutube className={`text-lg text-${color}`} />
            </button>
        </Fragment>
    )
}