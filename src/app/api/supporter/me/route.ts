import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BUSCAR DADOS DO APOIADOR (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    
    if (!phone) {
      return NextResponse.json({ error: 'Telefone não fornecido' }, { status: 400 });
    }

    const user = await prisma.supporter.findUnique({
      where: { phone: phone }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ATUALIZAR DADOS DO APOIADOR (POST)
export async function POST(req: Request) {
  try {
    const { phone, nome, email, instagram, cidade, showInLeaderboard } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Telefone obrigatório para update' }, { status: 400 });
    }
    
    const user = await prisma.supporter.upsert({
      where: { phone: phone },
      update: {
        fullName: nome || "Sem Nome",
        email: email || null,
        instagram: instagram || null,
        city: cidade || null,
        showInLeaderboard: showInLeaderboard !== undefined ? showInLeaderboard : true
      },
      create: {
        tenantId: "default-tenant-id", // mock default
        fullName: nome || "Sem Nome",
        cpf: `MOCK-PROFILE-${Date.now()}`,
        phone: phone,
        email: email || null,
        instagram: instagram || null,
        city: cidade || null,
        showInLeaderboard: showInLeaderboard !== undefined ? showInLeaderboard : true,
        inviteSlug: `${(nome || 'user').toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`,
      }
    });

    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
