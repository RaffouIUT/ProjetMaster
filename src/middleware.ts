import type { NextRequest } from 'next/server';
import {NextResponse} from "next/server";


export const config = {
    //matcher: ['/admin/:path*', '/inter/:path*'],
    //matcher: '/:path*',

    matcher: ['/((?!etu).*)',],
}


export function middleware(request: NextRequest) {

    //check id admin dans la bdd en hachant le cookie
    const getIsAdmin = () => {
        const authAdminCookie = request.cookies.get('authAdmin');
        return authAdminCookie !== undefined && authAdminCookie.value !== undefined && authAdminCookie.value !== 'false'&& authAdminCookie.value !== '';
    }

    const getIsInter = () => {
        const authInterCookie = request.cookies.get('authInter');
        //TODO : encrypt fonct check valeur dans bdd : verif(authInterCookie.value)
        return authInterCookie !== undefined && authInterCookie.value !== undefined && authInterCookie.value !== 'false' && authInterCookie.value !== '';
    }


    if(!getIsAdmin() && request.cookies.get('authAdmin')) {
        request.cookies.delete('authAdmin')
    }
    if (!getIsInter() && request.cookies.get('authInter')) {
        request.cookies.delete('authInter')
    }



    const URLstring = ""+process.env.SERVER_URL;
    const loginUrl: URL = new URL(URLstring);
    const response = NextResponse.next();

    //console.log('inter = '+getIsInter())
    //console.log('admin = '+getIsAdmin())


    if (request.nextUrl.pathname.startsWith('/admin') && !getIsAdmin()) {
        return NextResponse.redirect(loginUrl)
    }

    if (request.nextUrl.pathname.startsWith('/inter') && !getIsInter()) {
        return NextResponse.redirect(loginUrl)
    }

    if(request.nextUrl.pathname === '/' && getIsAdmin()) {
        return NextResponse.redirect(new URL(URLstring+'/admin'))
    }

    if(request.nextUrl.pathname === '/' && getIsInter()) {
        return NextResponse.redirect(new URL(URLstring+'/inter'))
    }


    return response;
}


