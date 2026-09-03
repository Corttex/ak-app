import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const topSupporters = await prisma.supporter.findMany({
      where: {
        showInLeaderboard: true,
        totalPoints: { gt: 0 } // only show people with points
      },
      orderBy: [
        { totalPoints: 'desc' },
        { createdAt: 'asc' }
      ],
      take: 50,
      include: {
        _count: {
          select: { referrals: true }
        }
      }
    });

    const ranking = topSupporters.map(s => ({
      id: s.id,
      nome: s.fullName.split(' ')[0],
      avatarUrl: s.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.fullName.split(' ')[0])}&background=0047BB&color=fff`,
      tier: s.tier,
      pontos: s.totalPoints,
      cadastros: s._count.referrals
    }));

    return NextResponse.json({ success: true, ranking });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao buscar ranking' }, { status: 500 });
  }
}
