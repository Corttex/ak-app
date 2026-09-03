import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Telefone é obrigatório' }, { status: 400 });
    }

    // Sanitize phone
    const sanitizedPhone = phone.replace(/\D/g, '');

    if (sanitizedPhone.length < 10) {
      return NextResponse.json({ error: 'Telefone inválido' }, { status: 400 });
    }

    // Gerar PIN de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    // Salvar no banco (upsert)
    await prisma.otpSession.upsert({
      where: { phone: sanitizedPhone },
      update: { code, expiresAt, attempts: 0 },
      create: { phone: sanitizedPhone, code, expiresAt },
    });

    // MOCK: Em produção isso chamaria a API da Z-API ou Meta.
    console.log(`\n\n🟢 [MOCK API WhatsApp] Enviando PIN ${code} para ${sanitizedPhone}\n\n`);

    return NextResponse.json({ success: true, message: 'Código enviado com sucesso via WhatsApp' });

  } catch (error) {
    console.error('Erro Request OTP:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
