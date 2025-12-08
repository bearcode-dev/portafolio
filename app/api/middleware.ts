import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const apiKey = req.headers.get('x-api-key');

    if (apiKey === process.env.ADMIN_API_KEY) {
        return NextResponse.next();
    } else {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/api/resources/:path*', '/api/resource-categories/:path*'],
};