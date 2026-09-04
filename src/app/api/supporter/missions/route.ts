import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('supporter_token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supporter = await prisma.supporter.findUnique({
      where: { id: token.value }
    });

    if (!supporter) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Default missions to ensure there's something to show
    const defaultMissions = [
      {
        title: "Conectado com o Futuro",
        description: "Faça login diariamente e acompanhe as novidades da nossa campanha.",
        pointsReward: 10,
        badgeReward: "Pioneiro",
        requiresProof: false
      },
      {
        title: "Eu Apoio o Desenvolvimento",
        description: "Gere sua foto com a moldura da campanha e coloque no seu perfil do WhatsApp.",
        pointsReward: 20,
        badgeReward: "Fotogênico",
        requiresProof: true
      },
      {
        title: "Multiplicador de Oportunidades",
        description: "Convide um amigo para a nossa rede usando seu link exclusivo.",
        pointsReward: 10,
        badgeReward: "Conector",
        requiresProof: false
      },
      // Social Missions
      {
        title: "Seguir no Instagram",
        description: "Siga nosso perfil oficial no Instagram e fique por dentro das novidades.",
        pointsReward: 25,
        badgeReward: "InstaFã",
        requiresProof: false
      },
      {
        title: "Curtir no Facebook",
        description: "Curta nossa página no Facebook.",
        pointsReward: 25,
        badgeReward: "FaceFã",
        requiresProof: false
      },
      {
        title: "Acompanhar no TikTok",
        description: "Siga nosso canal no TikTok para vídeos curtos.",
        pointsReward: 25,
        badgeReward: "TikToker",
        requiresProof: false
      },
      {
        title: "Inscrever-se no YouTube",
        description: "Inscreva-se no nosso canal oficial do YouTube.",
        pointsReward: 25,
        badgeReward: "YouTuber",
        requiresProof: false
      },
      {
        title: "Seguir no X (Twitter)",
        description: "Siga nossas atualizações no X (antigo Twitter).",
        pointsReward: 25,
        badgeReward: "XFã",
        requiresProof: false
      },
      // 5 Extra Missions
      {
        title: "Comitê Virtual",
        description: "Acesse e leia nossas propostas principais.",
        pointsReward: 20,
        badgeReward: "Informado",
        requiresProof: false
      },
      {
        title: "Adesivo no Carro",
        description: "Mande uma foto com o adesivo oficial colado no seu carro.",
        pointsReward: 30,
        badgeReward: "Mobilizado",
        requiresProof: true
      },
      {
        title: "Reunião de Amigos",
        description: "Faça uma postagem ou envie uma foto de uma reunião de apoio.",
        pointsReward: 20,
        badgeReward: "Agitador",
        requiresProof: true
      },
      {
        title: "Voz da Rua",
        description: "Envie uma sugestão ou feedback para a campanha.",
        pointsReward: 15,
        badgeReward: "Conselheiro",
        requiresProof: false
      },
      {
        title: "História Viva",
        description: "Leia a história do candidato na aba História e Legado.",
        pointsReward: 10,
        badgeReward: "Historiador",
        requiresProof: false
      }
    ];

    // Ensure all default missions exist in the DB for the tenant
    let missions = await prisma.mission.findMany({
      where: { tenantId: supporter.tenantId, isActive: true }
    });

    for (const m of defaultMissions) {
      const exists = missions.find(dbM => dbM.title === m.title);
      if (!exists) {
        const newMission = await prisma.mission.create({
          data: {
            tenantId: supporter.tenantId,
            title: m.title,
            description: m.description,
            pointsReward: m.pointsReward,
            category: 'GERAL',
            requiresApproval: m.requiresProof
          }
        });
        missions.push(newMission);
      }
    }

    // Get user's submissions
    const submissions = await prisma.missionSubmission.findMany({
      where: { supporterId: supporter.id }
    });

    // Merge missions with submission status
    const result = missions.map(mission => {
      const sub = submissions.find(s => s.missionId === mission.id);
      return {
        ...mission,
        status: sub ? sub.status : 'AVAILABLE', // AVAILABLE, PENDING, APPROVED, REJECTED
        proofUrl: sub?.proofUrl || null
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Missions API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('supporter_token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { missionId, proofUrl } = await req.json();

    const mission = await prisma.mission.findUnique({
      where: { id: missionId }
    });

    if (!mission) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }

    const existing = await prisma.missionSubmission.findFirst({
      where: { missionId, supporterId: token.value }
    });

    if (existing) {
      if (existing.status === 'REJECTED') {
        // Can resubmit
        await prisma.missionSubmission.update({
          where: { id: existing.id },
          data: { status: 'PENDING', proofUrl }
        });
        return NextResponse.json({ success: true, message: 'Resubmitted' });
      }
      return NextResponse.json({ error: 'Already submitted' }, { status: 400 });
    }

    // Auto-approve if no proof required
    const status = mission.requiresApproval ? 'PENDING' : 'APPROVED';

    const submission = await prisma.missionSubmission.create({
      data: {
        missionId,
        supporterId: token.value,
        status,
        proofUrl
      }
    });

    // If auto-approved, give points
    if (status === 'APPROVED') {
      await prisma.supporter.update({
        where: { id: token.value },
        data: { totalPoints: { increment: mission.pointsReward } }
      });
      // Optionally add badge logic here
    }

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Missions Submit API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
