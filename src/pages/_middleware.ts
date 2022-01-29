import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! });

  const { pathname } = req.nextUrl
  
  if(token && pathname.includes('/login')) {
    return NextResponse.redirect('/');
  }

  if(pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if(!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}