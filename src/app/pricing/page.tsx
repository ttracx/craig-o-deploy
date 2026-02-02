"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Rocket, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const features = [
    "Unlimited deployments",
    "All platforms (Vercel, Render, Railway)",
    "Unlimited projects",
    "Environment management",
    "Deploy history & analytics",
    "Instant rollback support",
    "GitHub integration",
    "Priority support",
    "Team collaboration (coming soon)",
    "Custom domains",
    "Deployment webhooks",
    "API access",
  ];

  return (
    <div className="min-h-screen grid-pattern py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <Badge variant="default" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400 text-lg">
            One plan with everything you need. No hidden fees.
          </p>
        </div>

        <Card className="relative overflow-hidden border-orange-500/30 glow-orange max-w-xl mx-auto">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-500 text-white text-sm font-medium px-4 py-1 rounded-bl-lg">
            Best Value
          </div>
          <CardHeader className="text-center pb-8 pt-10">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Rocket className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Craig-O-Deploy Pro</CardTitle>
            <CardDescription className="text-lg mt-2">
              Everything you need for professional deployments
            </CardDescription>
            <div className="mt-6">
              <span className="text-6xl font-bold text-white">$29</span>
              <span className="text-gray-400 text-xl">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="w-full" asChild>
              <Link href="/dashboard">
                Start Your Free Trial
              </Link>
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
            {[
              {
                q: "What platforms do you support?",
                a: "We support Vercel, Render, and Railway. More platforms coming soon!",
              },
              {
                q: "Is there a free tier?",
                a: "We offer a 14-day free trial with all features. No credit card required.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes! You can cancel your subscription at any time with no penalties.",
              },
              {
                q: "Do you offer team plans?",
                a: "Team collaboration is coming soon. Stay tuned for updates!",
              },
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
