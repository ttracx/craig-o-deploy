import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const projectId = searchParams.get('projectId')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (userId) where.userId = userId
    if (projectId) where.projectId = projectId

    const deployments = await prisma.deployment.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            githubRepo: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({
      success: true,
      deployments,
    })
  } catch (error) {
    console.error('Deployments fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deployments' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      userId,
      projectId,
      platform,
      commitSha,
      commitMessage,
      branch,
    } = body

    if (!userId || !projectId) {
      return NextResponse.json(
        { success: false, error: 'User ID and project ID required' },
        { status: 400 }
      )
    }

    const deployment = await prisma.deployment.create({
      data: {
        userId,
        projectId,
        platform: platform || 'VERCEL',
        status: 'PENDING',
        commitSha,
        commitMessage,
        branch,
      },
    })

    return NextResponse.json({
      success: true,
      deployment,
    })
  } catch (error) {
    console.error('Deployment creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create deployment' },
      { status: 500 }
    )
  }
}
