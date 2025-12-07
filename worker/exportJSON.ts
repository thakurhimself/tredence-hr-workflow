import { ApprovalNodeType, AutomatedNodeType, EndNodeType, StartNodeType, TaskNodeType } from "@/types/types";
import { Node, Edge } from "@xyflow/react";

interface JSONDataType {
    workflow: string, 
    nodes: Node[], 
    edges: Edge[], 
    nodeFormData: Record<string, StartNodeType | TaskNodeType | ApprovalNodeType | AutomatedNodeType | EndNodeType>
        
}

export function downloadJSON(data: JSONDataType) {
    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();

    URL.revokeObjectURL(url);
}