import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: environmentId } = await params
    const body = await req.json()
    const { key, value, isSecret = false } = body

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Key and value required' },
        { status: 400 }
      )
    }

    // In production, encrypt the value before storing
    const variable = await prisma.environmentVariable.upsert({
      where: {
        environmentId_key: {
          environmentId,
          key,
        },
      },
      update: {
        value, // In production, encrypt this
        isSecret,
      },
      create: {
        environmentId,
        key,
        value, // In production, encrypt this
        isSecret,
      },
    })

    return NextResponse.json({
      success: true,
      variable: {
        ...variable,
        value: isSecret ? '••••••••' : variable.value,
      },
    })
  } catch (error) {
    console.error('Variable creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create/update variable' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: environmentId } = await params
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key required' },
        { status: 400 }
      )
    }

    await prisma.environmentVariable.delete({
      where: {
        environmentId_key: {
          environmentId,
          key,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Variable deleted',
    })
  } catch (error) {
    console.error('Variable deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete variable' },
      { status: 500 }
    )
  }
}
