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
  const { model, query, setQuery } = useUIStore(
    useShallow((state) => ({
      model: state.model,
      query: state.query,
      setQuery: state.setQuery,
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
    "",
  );

  // Remove auto-generation - let users choose their own topics
  const roadmapData = roadmap?.content || data?.tree || decodeFromURL(params);
  const renderFlow = roadmapData?.[0]?.name || "";

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
