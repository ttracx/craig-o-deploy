import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get the deployment to rollback to
    const targetDeployment = await prisma.deployment.findUnique({
      where: { id },
      include: {
        project: true,
      },
    })

    if (!targetDeployment) {
      return NextResponse.json(
        { success: false, error: 'Deployment not found' },
        { status: 404 }
      )
    }

    if (targetDeployment.status !== 'SUCCESS') {
      return NextResponse.json(
        { success: false, error: 'Can only rollback to successful deployments' },
        { status: 400 }
      )
    }

    // Create a new deployment record for the rollback
    const rollbackDeployment = await prisma.deployment.create({
      data: {
        userId: targetDeployment.userId,
        projectId: targetDeployment.projectId,
        platform: targetDeployment.platform,
        status: 'DEPLOYING',
        commitSha: targetDeployment.commitSha,
        commitMessage: `Rollback to ${targetDeployment.commitSha?.slice(0, 7) || 'previous'}`,
        branch: targetDeployment.branch,
        rolledBackFromId: id,
      },
    })

    // In production, this would trigger the actual rollback via the platform API
    // For now, we'll simulate a successful rollback
    setTimeout(async () => {
      await prisma.deployment.update({
        where: { id: rollbackDeployment.id },
        data: {
          status: 'SUCCESS',
          url: targetDeployment.url,
          completedAt: new Date(),
          duration: 10,
        },
      })
    }, 2000)

    return NextResponse.json({
      success: true,
      rollbackDeployment,
      message: 'Rollback initiated',
    })
  } catch (error) {
    console.error('Rollback error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to rollback deployment' },
      { status: 500 }
    )
  }
}
