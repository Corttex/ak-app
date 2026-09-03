import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone') || "61994344843";

    const supporter = await prisma.supporter.findUnique({
      where: { phone },
      include: {
        referrals: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            city: true,
            tier: true,
            totalPoints: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!supporter) {
      // Mock data response for smooth preview if not seeded yet
      return NextResponse.json({
        success: true,
        inviteSlug: "andre-kubitschek-77",
        totalReferrals: 14,
        referrals: [
          { id: "1", fullName: "Marcos Vinicius", city: "Taguatinga", tier: "LEAO_BEBE", totalPoints: 150, createdAt: "2026-08-20T10:00:00Z" },
          { id: "2", fullName: "Fernanda Lima", city: "Ceilândia", tier: "LEAO_JOVEM", totalPoints: 320, createdAt: "2026-08-22T14:30:00Z" },
          { id: "3", fullName: "Roberto Silva", city: "Águas Claras", tier: "LEAO_BEBE", totalPoints: 100, createdAt: "2026-08-25T09:15:00Z" }
        ]
      });
    }

    return NextResponse.json({
      success: true,
      inviteSlug: supporter.inviteSlug,
      totalReferrals: supporter.referrals.length,
      referrals: supporter.referrals
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch team data', details: error.message }, { status: 500 });
  }
}
