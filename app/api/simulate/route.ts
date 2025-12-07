import { detectCycles, getExecutionOrder, simulationHandler } from "@/worker/workflowSimulationUtils";
import { Node } from "@xyflow/react";


export async function POST(request: Request) {
    const body = await request.json();
    const { nodes, edges, nodeFormData } = body;

    if (detectCycles(nodes, edges)) {
        return Response.json({message: "Cycle detected"}, {status: 400})
    }

    const executionOrder = getExecutionOrder(nodes, edges);

    const executionSteps = executionOrder.map((id) => {
        const node = nodes.filter((item: Node) => item.id === id)[0]
        const title = nodeFormData[node.id] ? nodeFormData[node.id].title : ''
        return simulationHandler(node.type, title)
    })

    return Response.json({data: executionSteps}, {status: 200})
}