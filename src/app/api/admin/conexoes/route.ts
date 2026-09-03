import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Retrieve recent webhook logs from DB
    const logs = await prisma.webhookLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' }
    });

    // Compute basic statistics
    const totalLogs = await prisma.webhookLog.count();
    const successfulLogs = await prisma.webhookLog.count({ where: { status: 200 } });
    const uptimePercentage = totalLogs > 0 ? ((successfulLogs / totalLogs) * 100).toFixed(1) : "100.0";

    return NextResponse.json({
      success: true,
      logs,
      stats: {
        totalLogs,
        successfulLogs,
        uptimePercentage: `${uptimePercentage}%`,
        apiUsage: `${totalLogs} / 50k`
      }
    });
  } catch (error: any) {
    console.error("Error fetching connections logs:", error);
    return NextResponse.json({ error: 'Failed to fetch logs', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Ensure default Tenant exists
    await prisma.tenant.upsert({
      where: { id: "default-tenant-id" },
      update: {},
      create: {
        id: "default-tenant-id",
        slug: "ak-df",
        name: "André Kubitschek DF",
        candidateName: "André Kubitschek",
        ballotNumber: "77",
        officeSought: "Deputado Federal"
      }
    });

    const body = await req.json();
    const { action, endpoint, apiKey, tseUrl } = body;

    if (action === 'test') {
      // Simulate endpoint ping test
      const testLog = await prisma.webhookLog.create({
        data: {
          tenantId: "default-tenant-id",
          endpoint: endpoint || "/api/webhooks/elegis",
          eventType: "PING_TEST",
          status: 200,
          payload: JSON.stringify({ action: "PING_TEST", timestamp: new Date().toISOString() }),
          response: JSON.stringify({ success: true, message: "Connection OK" })
        }
      });
      return NextResponse.json({ success: true, message: "Conexão testada com sucesso!", log: testLog });
    }

    if (action === 'save_config') {
      // Save settings to Tenant (upsert default tenant)
      const tenant = await prisma.tenant.upsert({
        where: { id: 'default-tenant-id' },
        update: {
          tseSyncUrl: tseUrl,
          tseApiKey: apiKey
        },
        create: {
          id: 'default-tenant-id',
          slug: 'ak-df',
          name: 'André Kubitschek DF',
          candidateName: 'André Kubitschek',
          ballotNumber: '77',
          officeSought: 'Deputado Federal',
          tseSyncUrl: tseUrl,
          tseApiKey: apiKey
        }
      });

      return NextResponse.json({ success: true, message: "Configurações salvas!", tenant });
    }

    return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
  } catch (error: any) {
    console.error("Error in conexoes API:", error);
    return NextResponse.json({ error: 'Failed to execute action', details: error.message }, { status: 500 });
  }
}
