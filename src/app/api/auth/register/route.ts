import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { fullName, cpf, phone, inviteSlug } = await req.json();

    // 1. Resolve referrer if an invite code was provided
    let referredById = null;
    if (inviteSlug) {
      const referrer = await prisma.supporter.findUnique({
        where: { inviteSlug }
      });
      if (referrer) referredById = referrer.id;
    }

    // 2. Save user locally
    const newUser = await prisma.supporter.create({
      data: {
        tenantId: "default-tenant-id",
        fullName,
        cpf,
        phone,
        inviteSlug: `${fullName.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 1000)}`,
        referredById
      }
    });

    // 3. Sync Outbound with Elegis
    // Replace with real Elegis API endpoint and Headers
    /*
    await fetch('https://api.elegis.com.br/v1/cadastros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ELEGIS_API_KEY}`
      },
      body: JSON.stringify({
        nome: fullName,
        cpf: cpf,
        telefone: phone,
        indicado_por: inviteSlug
      })
    });
    */

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
