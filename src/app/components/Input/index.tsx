import { Fragment } from 'react';
import { tv } from 'tailwind-variants';
 
const input = tv({
    base: "w-full px-5",
    variants: {
        color: {
            purple: "text-purple",
            gray: "text-gray",
            black: 'text-black-200'
        },
        size: {
            sm: "h-14 text-base",
            md: "h-14 text-base",
            lg: "py-11 text-3xl",
        },
        background: {
            transparent: 'bg-transparent',
            gray: 'bg-gray',
        },
        border: {
            purple: 'border border-purple',
            gray: 'border border-gray'
        }
    },
    defaultVariants: {
        size: "md",
        color: "purple",
        background: 'transparent',
        border: 'purple',
    }
});

export function Input({children, size, color, className, background, border, label, ...props}: any) {
    return (
        <Fragment>
            {label && <label className="mb-2">{label}</label>}
            <input {...props} className={input({size, color, background, border, className})} />
        </Fragment>
    )
}