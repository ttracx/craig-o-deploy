"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Rocket,
  Plus,
  Github,
  ExternalLink,
  MoreVertical,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  RotateCcw,
  Settings,
  History,
  ChevronDown,
  Globe,
  GitBranch,
  Calendar,
  Zap,
} from "lucide-react";

// Demo data
const demoProjects = [
  {
    id: "1",
    name: "vibecaas-frontend",
    description: "Main marketing website and dashboard",
    githubRepo: "ttracx/vibecaas-frontend",
    framework: "Next.js",
    lastDeploy: "2 hours ago",
    status: "SUCCESS",
    url: "https://vibecaas.com",
    platform: "VERCEL",
    branch: "main",
  },
  {
    id: "2",
    name: "craig-o-code",
    description: "AI-powered code generation platform",
    githubRepo: "ttracx/craig-o-code",
    framework: "Next.js",
    lastDeploy: "5 hours ago",
    status: "SUCCESS",
    url: "https://craig-o-code.vibecaas.com",
    platform: "VERCEL",
    branch: "main",
  },
  {
    id: "3",
    name: "api-gateway",
    description: "Microservices API gateway",
    githubRepo: "ttracx/api-gateway",
    framework: "Node.js",
    lastDeploy: "1 day ago",
    status: "BUILDING",
    url: null,
    platform: "RENDER",
    branch: "develop",
  },
];

const recentDeployments = [
  { id: "d1", project: "vibecaas-frontend", status: "SUCCESS", duration: "45s", time: "2h ago", commit: "feat: add pricing" },
  { id: "d2", project: "craig-o-code", status: "SUCCESS", duration: "1m 12s", time: "5h ago", commit: "fix: auth flow" },
  { id: "d3", project: "api-gateway", status: "BUILDING", duration: "-", time: "Just now", commit: "chore: update deps" },
  { id: "d4", project: "vibecaas-frontend", status: "FAILED", duration: "32s", time: "1d ago", commit: "test: broken build" },
  { id: "d5", project: "craig-o-code", status: "SUCCESS", duration: "58s", time: "2d ago", commit: "feat: new AI model" },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "SUCCESS":
      return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    case "FAILED":
      return <XCircle className="w-4 h-4 text-red-400" />;
    case "BUILDING":
    case "DEPLOYING":
      return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
    default:
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
};

const PlatformBadge = ({ platform }: { platform: string }) => {
  const config = {
    VERCEL: { icon: "▲", color: "bg-white/10 text-white" },
    RENDER: { icon: "◉", color: "bg-emerald-500/20 text-emerald-400" },
    RAILWAY: { icon: "🚂", color: "bg-purple-500/20 text-purple-400" },
  }[platform] || { icon: "●", color: "bg-gray-500/20 text-gray-400" };

  return (
    <Badge className={config.color}>
      <span className="mr-1">{config.icon}</span>
      {platform}
    </Badge>
  );
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = demoProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 grid-pattern">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-gray-800 bg-gray-950/90 backdrop-blur-xl z-40">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center glow-orange">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Craig-O-Deploy
            </span>
          </div>

          <nav className="space-y-1">
            {[
              { icon: Globe, label: "Projects", active: true },
              { icon: History, label: "Deployments" },
              { icon: Settings, label: "Settings" },
              { icon: Zap, label: "Usage" },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Subscription Status */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 border border-orange-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Pro Plan</span>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-xs text-gray-400">Unlimited deployments</p>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Manage Subscription
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Manage and deploy your projects</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Projects", value: "3", icon: Globe, color: "text-blue-400" },
            { label: "Deployments Today", value: "7", icon: Rocket, color: "text-orange-400" },
            { label: "Success Rate", value: "94%", icon: CheckCircle2, color: "text-green-400" },
            { label: "Avg Build Time", value: "52s", icon: Clock, color: "text-purple-400" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-800/50 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`cursor-pointer transition-all hover:border-orange-500/30 hover:-translate-y-1 ${
                selectedProject === project.id ? "border-orange-500/50 ring-2 ring-orange-500/20" : ""
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-lg">
                      {project.framework === "Next.js" ? "▲" : "◯"}
                    </div>
                    <div>
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Github className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{project.githubRepo}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <PlatformBadge platform={project.platform} />
                  <Badge variant="secondary" className="gap-1">
                    <GitBranch className="w-3 h-3" />
                    {project.branch}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={project.status} />
                    <span className="text-sm text-gray-400">
                      {project.status === "BUILDING" ? "Building..." : project.lastDeploy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.url && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button size="sm" className="h-8">
                      Deploy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Project Card */}
          <Card className="border-dashed border-2 border-gray-700 hover:border-orange-500/50 transition-colors cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[240px]">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Plus className="w-6 h-6 text-gray-500 group-hover:text-orange-400 transition-colors" />
              </div>
              <p className="text-gray-400 font-medium">Add New Project</p>
              <p className="text-sm text-gray-600 mt-1">Import from GitHub</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deployments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Deployments</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeployments.map((deploy) => (
                <div
                  key={deploy.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <StatusIcon status={deploy.status} />
                    <div>
                      <p className="font-medium text-white">{deploy.project}</p>
                      <p className="text-sm text-gray-500">{deploy.commit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{deploy.time}</p>
                      <p className="text-xs text-gray-600">{deploy.duration}</p>
                    </div>
                    {deploy.status === "SUCCESS" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Rollback">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
