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

interface Props {
  roadmapId?: string;
}

export default function Roadmap({ roadmapId }: Props) {
  const { model, modelApiKey, query } = useUIStore(
    useShallow((state) => ({
      model: state.model,
      query: state.query,
      modelApiKey: state.modelApiKey,
    })),
  );

  const { data: roadmap, isPending: isRoadmapPending } = useQuery({
    queryFn: async () => {
      let roadmap = await getRoadmapById(roadmapId || "");
      if (roadmap) {
        let json = JSON.parse(roadmap.content);
        roadmap.content = json;
        return roadmap;
      }
      throw Error("error");
    },
    queryKey: ["Roadmap", roadmapId],
    enabled: Boolean(roadmapId),
  });

  const { data, mutate, isPending } = useGenerateRoadmap(
    query,
    model,
    modelApiKey,
  );

  const params = useSearchParams();

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
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Generate Your Learning Roadmap</h2>
                <p className="text-gray-600 mb-6">Enter a topic above and click generate to create your learning roadmap</p>
                <div className="flex justify-center">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Tip:</strong> Add your API key using the &quot;Add Key&quot; button to generate unlimited roadmaps.
                    </p>
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
