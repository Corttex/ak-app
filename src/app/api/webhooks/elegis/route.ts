import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Ensure default Tenant exists
    await prisma.tenant.upsert({
      where: { id: "default-tenant-id" },
      update: {},
      create: {
        id: "default-tenant-id",
        slug: "ak-df",
        name: "André Kubitschek DF",
        candidateName: "André Kubitschek",
        ballotNumber: "77",
        officeSought: "Deputado Federal"
      }
    });

    const eventType = payload.event || payload.eventType || "USER_REGISTERED";
    const data = payload.data || payload;
    const { nome, cpf, telefone, indicado_por, cidade, phone, fullName, city, referrerSlug } = data;

    const userPhone = phone || telefone;
    const userName = fullName || nome || "Sem Nome";
    const userCity = city || cidade || null;
    const userReferrer = referrerSlug || indicado_por || null;

    // 1. Log the incoming webhook
    await prisma.webhookLog.create({
      data: {
        tenantId: "default-tenant-id",
        endpoint: "/api/webhooks/elegis",
        eventType: eventType,
        status: userPhone ? 200 : 400,
        payload: JSON.stringify(payload)
      }
    });

    if (!userPhone) {
      return NextResponse.json({ error: 'Missing Phone (telefone / phone)' }, { status: 400 });
    }

    // 2. Resolve referrer (if any)
    let referredById = null;
    if (userReferrer) {
      const referrer = await prisma.supporter.findUnique({
        where: { inviteSlug: userReferrer }
      });
      if (referrer) {
        referredById = referrer.id;
        
        // GAMIFICATION: Increment Points for Referrer (+50 points per invite)
        await prisma.supporter.update({
          where: { id: referrer.id },
          data: { totalPoints: { increment: 50 } }
        });
        console.log(`🟢 [WEBHOOK] +50 pontos para o apoiador: ${referrer.fullName}`);
      }
    }

    // 3. Create or Update user in our base
    const userCpf = cpf || `MOCK-${Date.now()}`;
    
    const user = await prisma.supporter.upsert({
      where: { phone: userPhone },
      update: {
        fullName: userName,
        cpf: userCpf,
        city: userCity,
        referredById: referredById
      },
      create: {
        tenantId: "default-tenant-id",
        fullName: userName,
        cpf: userCpf,
        phone: userPhone,
        city: userCity,
        inviteSlug: `${userName.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`,
        referredById: referredById
      }
    });

    return NextResponse.json({ success: true, userId: user.id, message: "Lead processado e pontos computados." }, { status: 200 });
  } catch (error: any) {
    console.error("Elegis Webhook Error:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
