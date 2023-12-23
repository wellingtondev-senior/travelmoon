import React, { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <div className="bg-purple">
            <div className="container mx-auto">
                <div className="py-20 px-8 lg:py-20 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    )
} 