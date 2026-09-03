import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('supporter_token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supporter = await prisma.supporter.findUnique({
      where: { id: token.value },
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
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      inviteSlug: supporter.inviteSlug || 'ak-22022',
      totalReferrals: supporter.referrals.length,
      referrals: supporter.referrals
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch team data', details: error.message }, { status: 500 });
  }
}
