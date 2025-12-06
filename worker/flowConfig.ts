import { CustomEdge } from "@/components/edges/CustomEdge"
import ApprovalNode from "@/components/nodes/ApprovalNode"
import AutomatedStepNode from "@/components/nodes/AutomatedStepNode"
import EndNode from "@/components/nodes/EndNode"
import StartNode from "@/components/nodes/StartNode"
import TaskNode from "@/components/nodes/TaskNode"

export const nodeTypes = {
    start: StartNode,
    task: TaskNode,
    approval: ApprovalNode,
    automated: AutomatedStepNode,
    end: EndNode
}

export const edgeTypes = {
    customEdge: CustomEdge
}
