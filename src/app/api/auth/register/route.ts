import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { fullName, cpf, phone, inviteSlug } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Telefone é obrigatório' }, { status: 400 });
    }

    const sanitizedPhone = phone.replace(/\D/g, '');

    // 1. Resolve referrer if an invite code was provided
    let referredById = null;
    if (inviteSlug) {
      const referrer = await prisma.supporter.findUnique({
        where: { inviteSlug }
      });
      if (referrer) referredById = referrer.id;
    }

    // 2. Save user locally (upsert to handle existing phone)
    const newUser = await prisma.supporter.upsert({
      where: { phone: sanitizedPhone },
      update: {
        fullName,
        cpf,
        referredById: referredById || undefined
      },
      create: {
        tenantId: "default-tenant-id",
        fullName: fullName || "Novo Apoiador",
        cpf,
        phone: sanitizedPhone,
        inviteSlug: `${(fullName || 'apoiador').toLowerCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`,
        referredById
      }
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
