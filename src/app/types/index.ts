import { ReactNode } from "react";

export type ButtonProps = {
    children: ReactNode
    className?: string
    borderColor?: string
    onClick?: () => void
    type: 'text' | 'button' | 'submit'
    size?: 'sm' | 'md' | 'lg'
    color?: 'purple' | 'gray' | 'transparent'
}

export type TripData = {
    name: string,
    stars: string,
    favorite_id: string,
    banner_image_url?: string,
    image_url?: string,
    is_favorite: boolean,
    main_image_url: string,
    secondary_attraction_upload_url: string,
    country_integration_id: number,
    destination_id: string,
    minimal_price_in_cents: string,
    id: string,
    tag_id: string,
}[]

export type SocialNetworkProps = {
    color: 'purple' | 'gray'
}

export type AvatarProps = {
    title: string
}

export type DestinationsProps = {
    id: string;
    created_at: string;
    name: string;
    continent_id: string;
    primary_attraction_upload_url: string;
    secondary_attraction_upload_url: string;
    tertiary_attraction_upload_url: string;
    banner_image_url: string;
    map_image_url: string;
    kind_of_trip: string | null;
    primary_attraction_description: string | null;
    secondary_attraction_description: string | null;
    primary_attraction_upload_id: string;
    secondary_attraction_upload_id: string;
    primary_color: string | null;
    secondary_color: string | null;
    coordinates: string | null;
    stars: string;
    recommendation_description: string | null;
    flight_time_from_br: string;
    when_to_go: string;
    ideal_time_of_days: string;
    active: boolean;
    map_image_upload_id: string;
    banner_image_upload_id: string;
    slogan_phrase: string;
    introduction: string;
    primary_attraction_title: string;
    secondary_attraction_title: string;
    tertiary_attraction_title: string;
    tertiary_attraction_description: string | null;
    tertiary_attraction_upload_id: string;
    top_hits_url: string | null;
    is_sponsored: boolean;
    good_to_know_description: string | null;
    top_visualization: boolean;
    top_hype: boolean;
    top_romance: boolean;
    top_adventurous: boolean;
    top_cost_benefit: boolean;
    is_favorite: boolean;
    favorite_id: string | null;
}

export type UploadProps = {
    children: ReactNode;
    title?: string;
    name: string;
    id: string;
    border: 'purple' | "gray"
    color: 'purple' | 'gray' | "black"
    className: string
    onChange: (event: any) => Promise<void>
    required?: boolean;
}
  
  