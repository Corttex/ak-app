import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Telefone e Código são obrigatórios' }, { status: 400 });
    }

    const sanitizedPhone = phone.replace(/\D/g, '');

    const session = await prisma.otpSession.findUnique({
      where: { phone: sanitizedPhone }
    });

    if (!session) {
      return NextResponse.json({ error: 'Sessão não encontrada. Peça um novo código.' }, { status: 404 });
    }

    if (session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Código expirado. Peça um novo.' }, { status: 400 });
    }

    if (session.code !== code) {
      // Incrementar tentativas
      await prisma.otpSession.update({
        where: { id: session.id },
        data: { attempts: { increment: 1 } }
      });
      return NextResponse.json({ error: 'Código inválido' }, { status: 401 });
    }

    // Sucesso: Deletar sessão
    await prisma.otpSession.delete({ where: { id: session.id } });

    // Atualizar Usuário se existir
    const user = await prisma.supporter.findUnique({ where: { phone: sanitizedPhone } });
    if (user) {
      await prisma.supporter.update({
        where: { id: user.id },
        data: { whatsappVerified: true }
      });
    }

    // Em produção: Emitir Cookie JWT/NextAuth aqui
    
    return NextResponse.json({ success: true, message: 'Autenticado com sucesso' });

  } catch (error) {
    console.error('Erro Verify OTP:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
