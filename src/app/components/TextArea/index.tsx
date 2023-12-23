import { Fragment } from 'react';
import { tv } from 'tailwind-variants';
 
const textarea = tv({
    base: "w-full p-5",
    variants: {
        color: {
            purple: "text-purple",
            gray: "text-gray",
            black: 'text-black-200'
        },
        size: {
            sm: "text-base",
            md: "text-base",
            lg: "text-3xl",
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

export function TextArea({children, size, color, className, background, border, label, ...props}: any) {
    return (
        <Fragment>
            {label && <label className="mb-2">{label}</label>}
            <textarea {...props} className={textarea({size, color, background, border, className})} />
        </Fragment>
    )
}