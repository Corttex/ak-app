import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// BUSCAR DADOS DO APOIADOR (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ error: 'Telefone não informado' }, { status: 400 });
    }

    const supporter = await prisma.supporter.findUnique({
      where: { phone },
      include: {
        referrals: true
      }
    });

    if (!supporter) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: supporter });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao buscar dados do perfil', details: error.message }, { status: 500 });
  }
}

// SALVAR/ATUALIZAR DADOS DO PERFIL (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, nome, email, instagram, cidade, showInLeaderboard, cpf } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Telefone é obrigatório' }, { status: 400 });
    }

    // Upsert do perfil
    const updatedUser = await prisma.supporter.upsert({
      where: { phone },
      update: {
        fullName: nome,
        email,
        instagram,
        city: cidade,
        showInLeaderboard
      },
      create: {
        tenantId: 'default-tenant-id',
        phone,
        cpf: cpf || '00000000000',
        fullName: nome || 'Apoiador',
        email,
        instagram,
        city: cidade,
        showInLeaderboard: showInLeaderboard ?? true,
        inviteSlug: `${(nome || 'apoiador').toLowerCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error('Erro ao salvar perfil:', error);
    return NextResponse.json({ error: 'Erro interno ao salvar perfil' }, { status: 500 });
  }
}
