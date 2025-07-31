"use client";

import { getRoadmapById } from "@/actions/roadmaps";
import ExpandCollapse from "@/components/flow-components/expand-collapse";
import { Separator } from "@/components/ui/separator";
import { useGenerateRoadmap } from "@/lib/queries";
import { decodeFromURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { GeneratorControls } from "@/components/flow-components/generator-controls";
import { useUIStore } from "../../lib/stores/useUI";
import { useEffect } from "react";

interface Props {
  roadmapId?: string;
}

export default function Roadmap({ roadmapId }: Props) {
  const { model, query, setQuery, modelApiKey } = useUIStore(
    useShallow((state) => ({
      model: state.model,
      query: state.query,
      setQuery: state.setQuery,
      modelApiKey: state.modelApiKey,
    })),
  );

  const params = useSearchParams();
  
  // Handle topic query parameter from URL
  useEffect(() => {
    const topic = params.get('topic');
    if (topic && !query) {
      setQuery(topic);
    }
  }, [params, query, setQuery]);

  const { data: roadmap, isPending: isRoadmapPending } = useQuery({
    queryFn: async () => {
      if (!roadmapId) return null;
      let roadmap = await getRoadmapById(roadmapId);
      if (roadmap && roadmap.content) {
        try {
          let json = JSON.parse(roadmap.content);
          roadmap.content = json;
          return roadmap;
        } catch (error) {
          console.error("Error parsing roadmap content:", error);
          return roadmap;
        }
      }
      return roadmap;
    },
    queryKey: ["Roadmap", roadmapId],
    enabled: Boolean(roadmapId),
  });

  const { data, mutate, isPending } = useGenerateRoadmap(
    query,
    model,
    modelApiKey,
    {
      onSuccess: (response: any) => {
        console.log("Roadmap generation successful:", response);
        if (response.status === true && response.tree) {
          console.log("Tree data available:", response.tree);
        } else {
          console.error("Invalid response format:", response);
        }
      },
      onError: (error: any) => {
        console.error("Roadmap generation failed:", error);
        // Don't retry if it's an API key error
        if (error?.response?.data?.message?.includes("API key")) {
          console.log("API key error detected, not retrying");
        }
      },
      retry: (failureCount, error: any) => {
        // Don't retry if it's an API key error
        if (error?.response?.data?.message?.includes("API key")) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
    }
  );

  // Auto-generate roadmap when query is set from URL
  useEffect(() => {
    const topic = params.get('topic');
    if (topic && query === topic && !isPending && !data) {
      // Auto-trigger generation for URL topics
      mutate({
        body: { query: topic },
      });
    }
  }, [params, query, isPending, data, mutate]);

  // Monitor loading state changes
  useEffect(() => {
    console.log("Loading state changed - isPending:", isPending);
    console.log("Data available:", !!data);
    if (!isPending && data) {
      console.log("Roadmap generation completed successfully");
    }
  }, [isPending, data]);

  // Remove auto-generation - let users choose their own topics
  const roadmapData = roadmap?.content || data?.tree || decodeFromURL(params);
  const renderFlow = roadmapData?.[0]?.name || "";

  // Debug logging
  console.log("Roadmap data:", roadmapData);
  console.log("API data:", data);
  console.log("Is pending:", isPending);
  console.log("Has roadmap data:", roadmapData && roadmapData.length > 0);
  console.log("Data status:", data?.status);
  console.log("Data tree:", data?.tree);
  console.log("Roadmap content:", roadmap?.content);
  console.log("Model API Key:", modelApiKey ? "SET" : "NOT SET");
  console.log("Model:", model);

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <GeneratorControls
          mutate={mutate}
          isPending={isPending}
          renderFlow={renderFlow}
          roadmapId={data?.roadmapId}
          dbRoadmapId={roadmapId || ""}
          visibility={roadmap?.visibility}
          title={query}
          key={roadmap?.visibility}
        />
      </div>
      <Separator />
      {isPending ? (
        <div className="h-[75vh] grid place-content-center">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : isRoadmapPending && roadmapId ? (
        <div>
          <div className="h-[75vh] grid place-content-center">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        </div>
      ) : (
        <>
          {roadmapData && roadmapData.length > 0 ? (
            <ExpandCollapse
              key={renderFlow}
              data={roadmapData}
              isPending={isRoadmapPending || isPending}
              roadmapId={roadmapId}
            />
          ) : (
            <div className="min-h-[75vh] flex items-center justify-center bg-gray-50">
              <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    AI Roadmap Generator
                  </h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">
                        Your roadmap will appear here once generated
                      </p>
                    </div>
                    {data && !data.status && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">
                          Roadmap Generation Failed
                        </h3>
                        <p className="text-sm text-red-600 mb-3">
                          {data.message || "Failed to generate roadmap"}
                        </p>
                        {data.message?.includes("API key") && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm text-yellow-800">
                              <strong>To fix this:</strong>
                            </p>
                            <ol className="text-sm text-yellow-700 mt-2 ml-4 list-decimal">
                              <li>Get a free API key from <a href="https://console.groq.com/" target="_blank" rel="noopener noreferrer" className="underline">Groq Console</a></li>
                              <li>Add it to your Vercel environment variables as <code>GROQ_API_KEY</code></li>
                              <li>Redeploy your application</li>
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
