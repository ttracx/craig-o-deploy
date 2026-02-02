import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID required' },
        { status: 400 }
      )
    }

    const environments = await prisma.environment.findMany({
      where: { projectId },
      include: {
        variables: {
          select: {
            id: true,
            key: true,
            value: true, // In production, decrypt this
            isSecret: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    // Mask secret values
    const maskedEnvironments = environments.map((env) => ({
      ...env,
      variables: env.variables.map((v) => ({
        ...v,
        value: v.isSecret ? '••••••••' : v.value,
      })),
    }))

    return NextResponse.json({
      success: true,
      environments: maskedEnvironments,
    })
  } catch (error) {
    console.error('Environments fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch environments' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { projectId, userId, name } = body

    if (!projectId || !userId || !name) {
      return NextResponse.json(
        { success: false, error: 'Project ID, user ID, and name required' },
        { status: 400 }
      )
    }

    const environment = await prisma.environment.create({
      data: {
        projectId,
        userId,
        name,
      },
    })

    return NextResponse.json({
      success: true,
      environment,
    })
  } catch (error) {
    console.error('Environment creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create environment' },
      { status: 500 }
    )
  }
}
