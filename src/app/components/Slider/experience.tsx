'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function SliderExperience({experience}: any) {
    const router = useRouter()

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "160px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    arrows: false,
                },
            },
            {
               breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false,
                    centerPadding: "0px", // Add this line to reduce centerPadding for smaller screens
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerPadding: "0px", // Add this line to remove centerPadding for smallest screens
                },
            },
        ],
    }

    return (
        <div>
            <Slider {...settings}>
                {experience && experience.map((item : any, index:  number) => (
                    <div key={index} className='text-center'>
                        <div className="w-full relative max-h-[258px] max-w-[258px] md:max-h-[358px] md:max-w-[358px] mx-auto aspect-square">
                            <Image 
                                src={item.main_image_url} 
                                alt={`${item.name} - travelmoon`} 
                                fill
                                className="rounded-full object-cover cursor-grabbing"  
                            />
                        </div>                                   
                        <h1 
                            className='text-6xl	text-white mt-14 cursor-pointer' 
                            onClick={() => router.push(`/experiencia/${item.id}/${item.tag_id}`)}
                        >
                            {item.name}
                        </h1>
                    </div>
                ))}
            </Slider>
        </div>
    );
}