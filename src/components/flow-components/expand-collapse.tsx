import { HierarchyNode, hierarchy } from "d3-hierarchy";
import { Loader2 } from "lucide-react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/base.css";
import "reactflow/dist/style.css";
import { Node } from "@/lib/shared/types/common";
import { Drawer } from "./drawer";
import ReactFlowPro from "./react-flow-pro";

type Props = {
  data: Node[];
  isPending: boolean;
  roadmapId?: string;
};

function ExpandCollapse(props: Props) {
  const { data, isPending, roadmapId } = props;

  if (isPending)
    return (
      <div className="w-full h-[86vh] flex justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );

  // Check if data exists and has at least one item
  if (!data || data.length === 0 || !data[0] || !data[0].children) {
    return (
      <div className="w-full h-[86vh] flex justify-center items-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const h: HierarchyNode<unknown> = hierarchy<unknown>(data[0]);
  h.descendants().forEach((d: any, i: number) => {
    d.id = `${i}`;
    d._children = d.children;
    d.children = null;
  });

  return (
    <div className="w-full h-[84vh]">
      <ReactFlowProvider>
        <Drawer roadmapId={roadmapId} />
        <ReactFlowPro {...props} h={h} />
      </ReactFlowProvider>
    </div>
  );
}

export default ExpandCollapse;
