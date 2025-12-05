import ApprovalNode from "@/components/nodes/ApprovalNode"
import AutomatedStepNode from "@/components/nodes/AutomatedStepNode"
import StartNode from "@/components/nodes/StartNode"
import TaskNode from "@/components/nodes/TaskNode"

export const nodeTypes = {
    start: StartNode,
    task: TaskNode,
    approval: ApprovalNode,
    automated: AutomatedStepNode
}

export const hrNodes = []

export const hrNodeEdges = []

