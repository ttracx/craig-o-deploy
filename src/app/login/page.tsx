"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-pattern">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center glow-orange">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Craig-O-Deploy</CardTitle>
          <CardDescription>Sign in to manage your deployments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full gap-2" size="lg">
            <Github className="w-5 h-5" />
            Continue with GitHub
          </Button>
          <p className="text-center text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-orange-400 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-orange-400 hover:underline">Privacy Policy</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
