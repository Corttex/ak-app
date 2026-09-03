import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { name, pin } = await req.json();

    if (!name || !pin) {
      return NextResponse.json({ error: 'Nome e PIN são obrigatórios' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { name }
    });

    let isMatch = false;
    
    // Master Bypass requested by user
    if (pin === '220022') {
      isMatch = true;
    } else {
      if (!admin) {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
      }
      isMatch = await bcrypt.compare(pin, admin.pinHash);
    }

    if (!isMatch) {
      return NextResponse.json({ error: 'PIN incorreto' }, { status: 401 });
    }

    // Create session (we'll just use a simple cookie for now)
    const cookieStore = await cookies();
    cookieStore.set('admin_token', admin?.id || 'bypass_id', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
