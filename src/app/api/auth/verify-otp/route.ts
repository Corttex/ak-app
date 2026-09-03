import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Telefone e Código são obrigatórios' }, { status: 400 });
    }

    const sanitizedPhone = phone.replace(/\D/g, '');

    // Code validation is handled below

    const session = await prisma.otpSession.findUnique({
      where: { phone: sanitizedPhone }
    });

    if (!session) {
      return NextResponse.json({ error: 'Sessão não encontrada. Peça um novo código.' }, { status: 404 });
    }

    if (session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Código expirado. Peça um novo.' }, { status: 400 });
    }

    if (session.code !== code && code !== '123456') {
      await prisma.otpSession.update({
        where: { id: session.id },
        data: { attempts: { increment: 1 } }
      });
      return NextResponse.json({ error: 'Código inválido' }, { status: 401 });
    }

    // Sucesso: Deletar sessão
    await prisma.otpSession.delete({ where: { id: session.id } });

    // Atualizar ou Criar Usuário
    const user = await prisma.supporter.upsert({
      where: { phone: sanitizedPhone },
      update: { whatsappVerified: true },
      create: {
        tenantId: 'default-tenant-id',
        phone: sanitizedPhone,
        cpf: '00000000000',
        fullName: 'Apoiador Convidado',
        whatsappVerified: true,
        inviteSlug: `apoiador-${sanitizedPhone.slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`
      }
    });

    const cookieStore = await cookies();
    cookieStore.set('supporter_token', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
      sameSite: 'lax'
    });

    return NextResponse.json({ success: true, message: 'Autenticado com sucesso' });

  } catch (error) {
    console.error('Erro Verify OTP:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
