import React, { ReactNode } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = {
    bgColor?: 'gray' | 'green700' | 'purple' | 'success'
    textColor: "green700" | 'gray' | 'purple' | 'white';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    onClick?: () => void,
    className?: string,
    type?: 'button' | 'submit' | 'reset', // Atualizei o tipo aqui
    border?: 'purple' | 'gray' | 'white',
};

const button = tv({
    base: "py-4 text-base rounded-full flex items-center justify-center",
    variants: {
        bgColor: {
            gray: "bg-gray",
            green700: "bg-green-700",
            purple: 'bg-purple',
            success: 'bg-success'
        },
        textColor: {
            green700: "text-green-700",
            gray: "text-gray",
            purple: 'text-purple',
            white: 'text-white'
        },
        size: {
            sm: "py-5 w-52",
            md: "",
            lg: "w-full md:py-6 lg:py-11 md:text-xl lg:text-3xl"
        },
        border: {
            purple: 'border border-purple bg-transparent',
            white: 'border border-white bg-transparent',
            gray: 'border border-gray bg-transparent'
        }
    },
});
 
export function Button({ children, textColor, bgColor, border, size, className, ...props }: ButtonProps) {
    return (
        <button {...props} className={button({textColor, border, bgColor, size, className})}>
            {children}
        </button>
    );
}
