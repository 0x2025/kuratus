import { NextResponse } from 'next/server'
import { GetItem } from '@/libs/Db';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const authenticated = await isAuthenticated(request);
    if (!authenticated.status) {
        console.log('401')
        const loginUrl = new URL('/401', request.url)
        return NextResponse.redirect(loginUrl)
    }
    console.log('middleware ' + authenticated.username)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/items']
}

async function isAuthenticated(req) {
    const authheader = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!authheader) {
        return false;
    }

    const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];
    const userProfile = await GetItem(`${user}/profile.json`);
    if (user === userProfile?.username && userProfile?.password === pass) {
        return {
            status: true,
            username: user
        };
    } else {
        return {
            status: false
        };
    }
}