// app/api/auth/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { cookies } from "next/headers";
import { SignJWT } from 'jose';
import path from 'path';

const credentialsPath = path.join(process.cwd(), 'conf', 'credentials.json');


const encoder = new TextEncoder();
const jwtKey = encoder.encode(process.env.JWT_KEY || 'default-secret-key');

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const fileContent = await fs.readFile(credentialsPath, 'utf8');
    const credentials = JSON.parse(fileContent);

    
    if (credentials.username === username && credentials.password === password) {
        const token = await new SignJWT({ isAuthenticated: true }).setProtectedHeader({ alg: 'HS256' }).sign(jwtKey);
        cookies().set("access-token", token, {
          path: '/',
          secure: process.env.NODE_ENV === 'production', 
          httpOnly: true, 
          sameSite: 'lax', 
          maxAge: 60 * 60 * 24 * 1, 
        });
        return NextResponse.json({ status: 'success', message: 'Authentication successful' });
    } else {
      return NextResponse.json({ status: 'fail', message: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error handling login:', error);
    return NextResponse.json({ status: 'error', message: 'An error occurred' }, { status: 500 });
  }
}
