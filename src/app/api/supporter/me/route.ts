import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('supporter_token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
    }

    const supporter = await prisma.supporter.findUnique({
      where: { id: token.value },
      include: {
        referrals: true
      }
    });

    if (!supporter) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, supporter, user: supporter });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao buscar dados do perfil', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('supporter_token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
    }

    const body = await req.json();
    const { nome, email, instagram, cidade, showInLeaderboard, avatarUrl } = body;

    const updatedUser = await prisma.supporter.update({
      where: { id: token.value },
      data: {
        fullName: nome,
        email,
        instagram,
        city: cidade,
        showInLeaderboard,
        ...(avatarUrl ? { avatarUrl } : {})
      }
    });

    return NextResponse.json({ success: true, user: updatedUser, supporter: updatedUser });
  } catch (error: any) {
    console.error('Erro ao salvar perfil:', error);
    return NextResponse.json({ error: 'Erro interno ao salvar perfil' }, { status: 500 });
  }
}
