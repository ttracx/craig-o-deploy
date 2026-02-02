import { NextRequest, NextResponse } from 'next/server'

const VERCEL_TOKEN = process.env.VERCEL_TOKEN

export async function POST(req: NextRequest) {
  try {
    const { projectName, gitRepo, gitBranch = 'main', envVars } = await req.json()

    // Create deployment via Vercel API
    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        gitSource: {
          type: 'github',
          repo: gitRepo,
          ref: gitBranch,
        },
        target: 'production',
        projectSettings: {
          framework: 'nextjs',
          buildCommand: 'pnpm build',
          installCommand: 'pnpm install',
          outputDirectory: '.next',
        },
        env: envVars,
      }),
    })

    const deployment = await deployResponse.json()

    if (!deployResponse.ok) {
      return NextResponse.json(
        { success: false, error: deployment.error?.message || 'Deployment failed' },
        { status: deployResponse.status }
      )
    }

    return NextResponse.json({
      success: true,
      deployment: {
        id: deployment.id,
        url: `https://${deployment.url}`,
        state: deployment.readyState,
        createdAt: deployment.createdAt,
      },
    })
  } catch (error) {
    console.error('Vercel deployment error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create deployment' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const deploymentId = searchParams.get('id')

    if (!deploymentId) {
      return NextResponse.json(
        { success: false, error: 'Deployment ID required' },
        { status: 400 }
      )
    }

    const response = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    })

    const deployment = await response.json()

    return NextResponse.json({
      success: true,
      deployment: {
        id: deployment.id,
        url: deployment.url,
        state: deployment.readyState,
        buildLogs: deployment.buildLogs,
      },
    })
  } catch (error) {
    console.error('Vercel fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deployment' },
      { status: 500 }
    )
  }
}
