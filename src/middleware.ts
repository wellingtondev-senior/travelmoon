'use client'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
    const token = 'teste'

    const singInURL = new URL('/', request.url)

    if (!token) {
        if(request.nextUrl.pathname === '/') {
            return NextResponse.next()
        }

        return NextResponse.redirect(singInURL)
    }
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/favoritos', '/minhas-viagens']
}