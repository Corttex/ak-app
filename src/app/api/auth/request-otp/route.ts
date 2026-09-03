import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Telefone é obrigatório' }, { status: 400 });
    }

    const sanitizedPhone = phone.replace(/\D/g, '');

    if (sanitizedPhone.length < 10) {
      return NextResponse.json({ error: 'Telefone inválido' }, { status: 400 });
    }

    // Verificar se o Apoiador já existe no Banco de Dados
    const supporter = await prisma.supporter.findUnique({
      where: { phone: sanitizedPhone }
    });

    // Se não encontrou no supporter, verificar nos logs de webhook da Elegis
    let foundInWebhook = false;
    if (!supporter) {
      const webhookLog = await prisma.webhookLog.findFirst({
        where: { payload: { contains: sanitizedPhone } }
      });
      if (webhookLog) foundInWebhook = true;
    }

    // Master Access Bypass (Desenvolvimento / Administrador)
    const isMasterBypass = (sanitizedPhone === '61994344843' || sanitizedPhone === '61999998888' || sanitizedPhone === '61999999999');

    // Se não encontrou em nenhum local, retorna notFound: true (Exibe aviso de link de convite)
    if (!supporter && !foundInWebhook && !isMasterBypass) {
      return NextResponse.json({
        notFound: true,
        message: 'Não encontramos esse número. Peça o link de convite para quem te chamou.'
      }, { status: 404 });
    }

    // Gerar PIN de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Salvar no banco (upsert)
    await prisma.otpSession.upsert({
      where: { phone: sanitizedPhone },
      update: { code, expiresAt, attempts: 0 },
      create: { phone: sanitizedPhone, code, expiresAt },
    });

    console.log(`\n🟢 [Z-API / WhatsApp] Código OTP gerado para ${sanitizedPhone}: ${code}\n`);

    return NextResponse.json({ success: true, message: 'Código OTP enviado via WhatsApp' });

  } catch (error) {
    console.error('Erro Request OTP:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
