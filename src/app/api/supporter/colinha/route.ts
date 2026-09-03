import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone') || "61994344843";

    const supporter = await prisma.supporter.findUnique({
      where: { phone },
      include: { colinha: true }
    });

    if (!supporter) {
      return NextResponse.json({ error: 'Supporter not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      colinha: supporter.colinha || {
        deputadoFederal: "7777 - André Kubitschek",
        deputadoEstadual: "77123 - Dra. Paula",
        senador1: "777 - Carlos Eduardo",
        senador2: "555 - Flávia Arruda",
        governador: "77 - Ibaneis Rocha",
        presidente: "22 - Jair Bolsonaro"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch colinha', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, deputadoFederal, deputadoEstadual, senador1, senador2, governador, presidente } = body;

    const userPhone = phone || "61994344843";

    const supporter = await prisma.supporter.findUnique({
      where: { phone: userPhone }
    });

    if (!supporter) {
      return NextResponse.json({ error: 'Supporter not found' }, { status: 404 });
    }

    const colinha = await prisma.colinha.upsert({
      where: { supporterId: supporter.id },
      update: {
        deputadoFederal,
        deputadoEstadual,
        senador1,
        senador2,
        governador,
        presidente
      },
      create: {
        supporterId: supporter.id,
        tenantId: supporter.tenantId,
        deputadoFederal,
        deputadoEstadual,
        senador1,
        senador2,
        governador,
        presidente
      }
    });

    return NextResponse.json({ success: true, message: 'Colinha salva com sucesso!', colinha });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to save colinha', details: error.message }, { status: 500 });
  }
}
