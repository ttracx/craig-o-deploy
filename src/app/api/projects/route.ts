import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        environments: {
          include: {
            variables: {
              select: {
                id: true,
                key: true,
                isSecret: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      projects,
    })
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      userId,
      name,
      description,
      githubRepo,
      githubOwner,
      githubBranch,
      framework,
      buildCommand,
      installCommand,
      outputDir,
    } = body

    if (!userId || !name) {
      return NextResponse.json(
        { success: false, error: 'User ID and project name required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        userId,
        name,
        description,
        githubRepo,
        githubOwner,
        githubBranch: githubBranch || 'main',
        framework: framework || 'nextjs',
        buildCommand,
        installCommand,
        outputDir,
      },
    })

    // Create default environments
    await prisma.environment.createMany({
      data: [
        { projectId: project.id, userId, name: 'production' },
        { projectId: project.id, userId, name: 'staging' },
        { projectId: project.id, userId, name: 'preview' },
      ],
    })

    return NextResponse.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
