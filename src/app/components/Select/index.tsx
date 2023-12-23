import { Fragment } from 'react'
import { tv } from 'tailwind-variants';

type Option = {
    id: string;
    name: string;
};

type SelectProps = {
    id: string;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    color?: "purple" | "gray" | 'black';
    className?: string;
    background?: "transparent";
    border?: "purple" | 'gray';
    options: any;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    placeholder?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    label?: string;
}

const input = tv({
    base: "px-5 appearance-none w-full bg-transparent border text-purple border-purple rounded-full",
    variants: {
        color: {
            purple: "text-purple",
            gray: "text-gray",
            black: 'text-black'
        },
        size: {
            sm: "h-14 text-base",
            md: "h-14 text-base",
            lg: "py-11 text-3xl",
        },
        background: {
            transparent: 'bg-transparent'
        },
        border: {
            purple: 'border border-purple',
            gray: 'border border-gray',
        }
    },
    defaultVariants: {
        size: "md",
        color: "purple",
        background: 'transparent',
        border: 'purple',
    }
});

export function Select({ label, children, size , color , className, background, border , options, ...props }: SelectProps) {
    return (
        <div>
            {label && <label>{label}</label>}
            <select {...props} className={input({ size, color, background, border, className })}>
                <option value="" selected>{props.placeholder}</option>

                {options?.map((item : any) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}
