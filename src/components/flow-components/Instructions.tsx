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
    <div className="mx-auto max-w-7xl w-full md:h-[75vh] flex flex-col items-center justify-center">
      <Card className="md:p-14 p-10">
        <h1 className="text-3xl font-bold my-4">
          Welcome to AI Roadmap Generator! 🚀
        </h1>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Getting Started with Real Roadmap Generation
            </h3>
            <p className="text-blue-800 text-sm">
              To generate real roadmaps, you need to add an API key. Click the &quot;Add Key&quot; button 
              in the top right to add your OpenAI, Gemini, Cohere, or Groq API key.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              How to Get API Keys (Free Options Available)
            </h3>
            <div className="text-green-800 text-sm space-y-2">
              <p><strong>OpenAI:</strong> Sign up at <a href="https://platform.openai.com" target="_blank" className="underline">platform.openai.com</a> - Get $5 free credits</p>
              <p><strong>Gemini:</strong> Sign up at <a href="https://makersuite.google.com" target="_blank" className="underline">makersuite.google.com</a> - Free tier available</p>
              <p><strong>Cohere:</strong> Sign up at <a href="https://cohere.ai" target="_blank" className="underline">cohere.ai</a> - Free tier available</p>
              <p><strong>Groq:</strong> Sign up at <a href="https://console.groq.com" target="_blank" className="underline">console.groq.com</a> - Free tier available</p>
            </div>
          </div>
          
          <ol className="list-disc flex flex-col gap-4 text-gray-700">
            <li>
              <strong>Free Credits:</strong> You start with 5 free credits to generate roadmaps.
            </li>
            <li>
              <strong>API Keys:</strong> Add your own API key to generate unlimited roadmaps with any topic.
            </li>
            <li>
              <strong>Explore:</strong> Check out existing roadmaps in the{" "}
              <Link className="underline underline-offset-4 text-blue-600" href="/explore">
                Explorer
              </Link>{" "}
              section.
            </li>
            <li>
              <strong>Real Generation:</strong> Generate custom learning roadmaps for any topic you want to learn.
            </li>
            <li>
              <strong>Content Policy:</strong> Avoid searching for NSFW/sensitive content.
            </li>
            <li>
              <strong>Support:</strong> If you like this tool, please give it a star on{" "}
              <Link
                className="underline underline-offset-4 text-blue-600"
                href="https://github.com/thatbeautifuldream/ai-roadmap-generator"
                target="_blank"
              >
                GitHub
              </Link>
              .
            </li>
          </ol>
          
          <div className="flex gap-3 mt-6">
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
