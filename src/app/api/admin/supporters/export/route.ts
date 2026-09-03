import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Buscamos todos os supporters
    const supporters = await prisma.supporter.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Cria o header do CSV
    const headers = ['ID', 'Nome', 'Telefone', 'CPF', 'Email', 'Cidade', 'Pontos', 'Nível', 'Link de Convite', 'Data de Cadastro'];
    
    // Mapeia os dados
    const csvRows = [headers.join(',')];
    
    supporters.forEach(sup => {
      const row = [
        sup.id,
        `"${sup.fullName}"`,
        sup.phone,
        sup.cpf || '',
        sup.email || '',
        `"${sup.city || ''}"`,
        sup.totalPoints.toString(),
        sup.tier,
        sup.inviteSlug,
        sup.createdAt.toISOString()
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    // Retorna o CSV como arquivo baixável
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="apoiadores_export.csv"',
      },
    });
  } catch (error) {
    console.error('Export Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
