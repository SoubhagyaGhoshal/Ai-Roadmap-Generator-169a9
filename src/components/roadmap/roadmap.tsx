"use client";

import { getRoadmapById } from "@/actions/roadmaps";
import ExpandCollapse from "@/components/flow-components/expand-collapse";
import { Separator } from "@/components/ui/separator";
import { decodeFromURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { GeneratorControls } from "@/components/flow-components/generator-controls";
import { useUIStore } from "../../lib/stores/useUI";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

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
  const [timeoutError, setTimeoutError] = useState(false);
  const [hasTriggeredGeneration, setHasTriggeredGeneration] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [generationError, setGenerationError] = useState<any>(null);
  
  // Handle topic query parameter from URL
  useEffect(() => {
    const topic = params.get('topic');
    console.log("🔍 URL topic:", topic);
    console.log("🔍 Current query:", query);
    if (topic && !query) {
      console.log("🔍 Setting query from URL topic:", topic);
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

  // Direct API call function
  const generateRoadmap = useCallback(async (topic: string) => {
    console.log("🚀 Starting direct API call for:", topic);
    setIsGenerating(true);
    setGenerationError(null);
    setTimeoutError(false);
    
    try {
      const apiKeyParam = modelApiKey && modelApiKey.trim() !== "" ? `?apiKey=${modelApiKey}` : "";
      const url = `/api/v1/${model}/roadmap${apiKeyParam}`;
      
      console.log("📡 Making API call to:", url);
      console.log("📡 Request body:", { query: topic });
      
      const response = await axios.post(url, { query: topic }, {
        timeout: 30000,
      });
      
      console.log("✅ API call successful:", response.data);
      setGeneratedData(response.data);
      setIsGenerating(false);
    } catch (error) {
      console.error("❌ API call failed:", error);
      setGenerationError(error);
      setIsGenerating(false);
      setTimeoutError(true);
    }
  }, [model, modelApiKey]);

  // Simplified auto-generation logic
  useEffect(() => {
    const topic = params.get('topic');
    console.log("🔄 Auto-generation check:");
    console.log("  - Topic from URL:", topic);
    console.log("  - Current query:", query);
    console.log("  - Is generating:", isGenerating);
    console.log("  - Has generated data:", !!generatedData);
    console.log("  - Has triggered generation:", hasTriggeredGeneration);
    console.log("  - Model:", model);
    console.log("  - Model API Key:", modelApiKey ? "SET" : "NOT SET");
    
    // If we have a topic and haven't triggered generation yet, do it now
    if (topic && !hasTriggeredGeneration && !isGenerating && !generatedData) {
      console.log("🚀 Triggering generation for topic:", topic);
      setHasTriggeredGeneration(true);
      setQuery(topic);
      
      // Make the API call directly
      const makeApiCall = async () => {
        console.log("🚀 Starting direct API call for:", topic);
        setIsGenerating(true);
        setGenerationError(null);
        setTimeoutError(false);
        
        try {
          const apiKeyParam = modelApiKey && modelApiKey.trim() !== "" ? `?apiKey=${modelApiKey}` : "";
          const url = `/api/v1/${model}/roadmap${apiKeyParam}`;
          
          console.log("📡 Making API call to:", url);
          console.log("📡 Request body:", { query: topic });
          
          const response = await axios.post(url, { query: topic }, {
            timeout: 30000,
          });
          
          console.log("✅ API call successful:", response.data);
          setGeneratedData(response.data);
          setIsGenerating(false);
        } catch (error) {
          console.error("❌ API call failed:", error);
          setGenerationError(error);
          setIsGenerating(false);
          setTimeoutError(true);
        }
      };
      
      // Call immediately
      makeApiCall();
    }
  }, [params]);

  // Fallback auto-generation with timeout
  useEffect(() => {
    const topic = params.get('topic');
    if (topic && !generatedData && !isGenerating) {
      const timeoutId = setTimeout(() => {
        if (!hasTriggeredGeneration && !generatedData) {
          console.log("⏰ Fallback auto-generation triggered for:", topic);
          setHasTriggeredGeneration(true);
          setQuery(topic);
          
          const makeApiCall = async () => {
            setIsGenerating(true);
            setGenerationError(null);
            setTimeoutError(false);
            
            try {
              const apiKeyParam = modelApiKey && modelApiKey.trim() !== "" ? `?apiKey=${modelApiKey}` : "";
              const url = `/api/v1/${model}/roadmap${apiKeyParam}`;
              
              const response = await axios.post(url, { query: topic }, {
                timeout: 30000,
              });
              
              setGeneratedData(response.data);
              setIsGenerating(false);
            } catch (error) {
              setGenerationError(error);
              setIsGenerating(false);
              setTimeoutError(true);
            }
          };
          
          makeApiCall();
        }
      }, 2000); // 2 second fallback
      
      return () => clearTimeout(timeoutId);
    }
  }, [params, generatedData, isGenerating, hasTriggeredGeneration, model, modelApiKey, setQuery]);

  // Component mount test
  useEffect(() => {
    console.log("🎯 Component mounted");
    console.log("🎯 Initial params:", params.toString());
    console.log("🎯 Initial query:", query);
    console.log("🎯 Initial model:", model);
    console.log("🎯 Initial modelApiKey:", modelApiKey ? "SET" : "NOT SET");
    console.log("🎯 Initial hasTriggeredGeneration:", hasTriggeredGeneration);
    console.log("🎯 Initial generatedData:", !!generatedData);
    console.log("🎯 Initial isGenerating:", isGenerating);
    
    // Simple test alert
    const topic = params.get('topic');
    if (topic) {
      alert(`Component mounted with topic: ${topic}`);
    }
  }, [params, query, model, modelApiKey, hasTriggeredGeneration, generatedData, isGenerating]);

  // Reset trigger flag when topic changes
  useEffect(() => {
    const topic = params.get('topic');
    if (topic !== query) {
      setHasTriggeredGeneration(false);
      setGeneratedData(null);
      setGenerationError(null);
      console.log("🔄 Reset generation state");
    }
  }, [params, query]);

  // Monitor state changes
  useEffect(() => {
    console.log("📊 State update:");
    console.log("  - isGenerating:", isGenerating);
    console.log("  - has generated data:", !!generatedData);
    console.log("  - error:", generationError);
    if (!isGenerating && generatedData) {
      console.log("✅ Roadmap generation completed successfully");
    }
  }, [isGenerating, generatedData, generationError]);

  // Timeout handling - if loading for more than 30 seconds, show error
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isGenerating) {
      timeoutId = setTimeout(() => {
        console.log("⏰ Request timeout - showing error");
        setTimeoutError(true);
      }, 30000); // 30 seconds
    } else {
      setTimeoutError(false);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isGenerating]);

  const roadmapData = roadmap?.content || generatedData?.tree || generatedData?.text?.tree || decodeFromURL(params);
  const renderFlow = roadmapData?.[0]?.name || "";

  // Debug logging
  console.log("🔍 Final state:");
  console.log("  - Roadmap data:", roadmapData);
  console.log("  - Generated data:", generatedData);
  console.log("  - Is generating:", isGenerating);
  console.log("  - Has roadmap data:", roadmapData && roadmapData.length > 0);
  console.log("  - Data status:", generatedData?.status);
  console.log("  - Data tree:", generatedData?.tree);
  console.log("  - Roadmap content:", roadmap?.content);
  console.log("  - Model API Key:", modelApiKey ? "SET" : "NOT SET");
  console.log("  - Model:", model);
  console.log("  - Error:", generationError);
  console.log("  - Timeout error:", timeoutError);

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <GeneratorControls
          mutate={() => {}} // Empty function since we're not using React Query mutation
          isPending={isGenerating}
          renderFlow={renderFlow}
          roadmapId={generatedData?.roadmapId}
          dbRoadmapId={roadmapId || ""}
          visibility={roadmap?.visibility}
          title={query}
          key={roadmap?.visibility}
        />
      </div>
      <Separator />
      {isGenerating ? (
        <div className="h-[75vh] grid place-content-center">
          <div className="text-center">
            <Loader2 className="animate-spin w-8 h-8 mx-auto mb-4" />
            <p className="text-gray-600">Generating your roadmap...</p>
            {timeoutError && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-yellow-600">
                  Taking longer than expected. Please wait or try again.
                </p>
              </div>
            )}
            {generationError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-red-600">
                  Error: {(generationError as any)?.response?.data?.message || (generationError as any)?.message || "Unknown error"}
                </p>
              </div>
            )}
          </div>
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
              isPending={isRoadmapPending || isGenerating}
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
                    {generatedData && !generatedData.status && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">
                          Roadmap Generation Failed
                        </h3>
                        <p className="text-sm text-red-600 mb-3">
                          {generatedData.message || "Failed to generate roadmap"}
                        </p>
                        {generatedData.message?.includes("API key") && (
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
                    {generationError && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">
                          Generation Error
                        </h3>
                        <p className="text-sm text-red-600">
                          {(generationError as any)?.response?.data?.message || (generationError as any)?.message || "An error occurred during generation"}
                        </p>
                      </div>
                    )}
                    {params.get('topic') && !generatedData && !isGenerating && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">
                          Manual Generation
                        </h3>
                        <p className="text-sm text-blue-600 mb-3">
                          Auto-generation didn&apos;t trigger. Click the button below to generate the roadmap manually.
                        </p>
                        <button
                          onClick={() => {
                            const topic = params.get('topic');
                            if (topic) {
                              setQuery(topic);
                              generateRoadmap(topic);
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Generate Roadmap for &quot;{params.get('topic')}&quot;
                        </button>
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
