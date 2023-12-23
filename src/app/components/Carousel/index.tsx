'use client'
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion'

type CarouselProps = {
    children: ReactNode;
}

export function Carousel({ children }: CarouselProps) {
    const carousel = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    return (
        <div>
            <motion.div className="overflow-hidden" ref={carousel} whileTap={{ cursor: "grabbing" }}>
                <motion.div
                    className="flex flex-row gap-6 after:pr-14"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
