"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Github, 
  Zap, 
  Shield, 
  History, 
  RotateCcw, 
  Globe,
  ArrowRight,
  Check,
  Terminal,
  Cloud,
  Settings,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: Github,
      title: "GitHub Integration",
      description: "Connect your repositories and deploy with automatic branch detection and webhook triggers.",
    },
    {
      icon: Cloud,
      title: "Multi-Platform Deploy",
      description: "Deploy to Vercel, Render, or Railway with a single click. Choose the best platform for your project.",
    },
    {
      icon: Settings,
      title: "Environment Management",
      description: "Manage environment variables across different environments with encryption and access control.",
    },
    {
      icon: History,
      title: "Deploy History",
      description: "Track every deployment with detailed logs, build times, and commit information.",
    },
    {
      icon: RotateCcw,
      title: "Instant Rollback",
      description: "Roll back to any previous deployment instantly if something goes wrong.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encrypted secrets and secure connections.",
    },
  ];

  const platforms = [
    { name: "Vercel", icon: "▲", color: "text-white", description: "Optimal for Next.js & React" },
    { name: "Render", icon: "◉", color: "text-emerald-400", description: "Great for full-stack apps" },
    { name: "Railway", icon: "🚂", color: "text-purple-400", description: "Perfect for any stack" },
  ];

  const handleGetStarted = () => {
    setIsLoading(true);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen grid-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center glow-orange">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Craig-O-Deploy
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Docs</Button>
              <Button variant="ghost" size="sm">Pricing</Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button size="sm" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="default" className="mb-6 animate-pulse-glow">
            ✨ One-Click Deployments
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Deploy Anywhere</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              With a Single Click
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Connect your GitHub repos and deploy to Vercel, Render, or Railway instantly. 
            Manage environments, track history, and roll back with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} disabled={isLoading} className="group">
              {isLoading ? "Loading..." : "Start Deploying Free"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/ttracx/craig-o-deploy" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
          
          {/* Platform Icons */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-3xl group-hover:border-orange-500/50 transition-colors">
                  {platform.icon}
                </div>
                <span className={`font-medium ${platform.color}`}>{platform.name}</span>
                <span className="text-xs text-gray-500">{platform.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Deploy
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A complete deployment platform with all the tools modern teams need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Deploy in Three Steps
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Connect GitHub", description: "Link your GitHub account and select repositories to deploy.", icon: Github },
              { step: 2, title: "Configure", description: "Set up environment variables and deployment settings.", icon: Settings },
              { step: 3, title: "Deploy", description: "Click deploy and watch your project go live in seconds.", icon: Rocket },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold text-white mb-6 glow-orange">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                {item.step < 3 && (
                  <ChevronRight className="hidden md:block absolute right-0 top-8 w-8 h-8 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400">One plan with everything you need.</p>
          </div>
          
          <Card className="relative overflow-hidden border-orange-500/30 glow-orange">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-500 text-white text-sm font-medium px-4 py-1 rounded-bl-lg">
              Most Popular
            </div>
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-3xl">Craig-O-Deploy Pro</CardTitle>
              <CardDescription className="text-lg">Everything you need for professional deployments</CardDescription>
              <div className="mt-6">
                <span className="text-6xl font-bold text-white">$29</span>
                <span className="text-gray-400 text-xl">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited deployments",
                  "All platforms (Vercel, Render, Railway)",
                  "Unlimited projects",
                  "Environment management",
                  "Deploy history & analytics",
                  "Instant rollback support",
                  "GitHub integration",
                  "Priority support",
                  "Team collaboration (coming soon)",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full" onClick={handleGetStarted}>
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                14-day free trial • No credit card required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-12">
              <Zap className="w-16 h-16 text-orange-400 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Deploy?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of developers who deploy with confidence.
              </p>
              <Button size="lg" onClick={handleGetStarted}>
                Get Started Now
                <Rocket className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">Craig-O-Deploy</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 VibeCaaS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Terms</a>
            <a href="https://github.com/ttracx/craig-o-deploy" className="text-gray-400 hover:text-orange-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
