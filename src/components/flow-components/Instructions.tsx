import { Card } from "@/components/ui/card";
import { Network, Key, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function RoadmapEmptyState() {
  return (
    <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center ">
      <Network className="mx-auto h-12 w-12 text-gray-300" />
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Generate a new roadmap
      </span>
      <p className="mt-2 text-sm text-gray-600">
        Enter a topic above and click generate to create your learning roadmap
      </p>
    </div>
  );
}

const AppInstructions = () => {
  return (
    <div className="mx-auto max-w-4xl w-full md:h-[75vh] flex flex-col items-center justify-center">
      <Card className="md:p-8 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Roadmap Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Generate personalized learning roadmaps for any topic
        </p>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Getting Started
            </h3>
            <p className="text-blue-800 text-sm">
              Add your API key to generate unlimited roadmaps. Click the &quot;Add Key&quot; button 
              to add your OpenAI, Gemini, Cohere, or Groq API key.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Free API Keys
            </h3>
            <div className="text-green-800 text-sm space-y-1">
              <p><strong>OpenAI:</strong> <a href="https://platform.openai.com" target="_blank" className="underline">platform.openai.com</a> - $5 free credits</p>
              <p><strong>Gemini:</strong> <a href="https://makersuite.google.com" target="_blank" className="underline">makersuite.google.com</a> - Free tier</p>
              <p><strong>Cohere:</strong> <a href="https://cohere.ai" target="_blank" className="underline">cohere.ai</a> - Free tier</p>
              <p><strong>Groq:</strong> <a href="https://console.groq.com" target="_blank" className="underline">console.groq.com</a> - Free tier</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 justify-center">
            <Link href="/explore">
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Explore Roadmaps
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button variant="outline">
                Start Generating
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AppInstructions />
      </div>
    </div>
  );
};

export default Instructions;
