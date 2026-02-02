import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export async function POST() {
  try {
    // Create the product
    const product = await stripe.products.create({
      name: 'Craig-O-Deploy Pro',
      description: 'One-click deployment platform with unlimited deployments, multi-platform support (Vercel, Render, Railway), GitHub integration, environment management, deploy history, and rollback support.',
      metadata: {
        app: 'craig-o-deploy',
        tier: 'pro',
      },
    })

    // Create the price (monthly subscription)
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2900, // $29.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        app: 'craig-o-deploy',
        tier: 'pro',
      },
    })

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
      },
      price: {
        id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        interval: price.recurring?.interval,
      },
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // List existing products with craig-o-deploy metadata
    const products = await stripe.products.list({
      limit: 10,
    })

    const craigProducts = products.data.filter(
      (p) => p.metadata?.app === 'craig-o-deploy'
    )

    // Get prices for each product
    const productsWithPrices = await Promise.all(
      craigProducts.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
          active: true,
        })
        return {
          product,
          prices: prices.data,
        }
      })
    )

    return NextResponse.json({
      success: true,
      products: productsWithPrices,
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to list products' },
      { status: 500 }
    )
  }
}
