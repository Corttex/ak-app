import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

function generateSlug(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const randomStr = Math.random().toString(36).substring(2, 6);
  return `${base}-${randomStr}`;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { supporters } = body;

    if (!Array.isArray(supporters) || supporters.length === 0) {
      return NextResponse.json({ error: 'Nenhum dado válido para importar.' }, { status: 400 });
    }

    // Get default tenant
    const tenant = await prisma.tenant.findFirst();
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant não configurado no sistema.' }, { status: 500 });
    }

    let importedCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const data of supporters) {
      try {
        const phone = data.phone?.replace(/\D/g, '');
        if (!phone) {
          errorCount++;
          errors.push(`Linha ignorada: sem telefone (${data.fullName})`);
          continue;
        }

        const fullName = data.fullName || 'Sem Nome';
        const cpf = data.cpf?.replace(/\D/g, '') || `TMP${Date.now()}${Math.floor(Math.random()*1000)}`;
        
        await prisma.supporter.upsert({
          where: { phone },
          update: {
            fullName,
            email: data.email || null,
            city: data.city || null,
            // não atualiza CPF se já existe pra não quebrar uniqueness
          },
          create: {
            tenantId: tenant.id,
            fullName,
            phone,
            cpf,
            email: data.email || null,
            city: data.city || null,
            inviteSlug: generateSlug(fullName)
          }
        });
        importedCount++;
      } catch (err: any) {
        errorCount++;
        errors.push(`Erro ao importar ${data.fullName}: ${err.message}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      importedCount, 
      errorCount,
      errors
    });
  } catch (error: any) {
    console.error('Import Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
