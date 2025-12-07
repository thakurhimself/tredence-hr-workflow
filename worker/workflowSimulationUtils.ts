import { Edge, Node } from "@xyflow/react";


export function detectCycles(nodes: Node[], edges: Edge[]) {
    const graph: Record<string, string[]> = {};
    const indegree: Record<string, number> = {};

    nodes.forEach((node: Node) => {
        graph[node.id] = []
        indegree[node.id] = 0
    });

    edges.forEach((edge: Edge) => {
        graph[edge.source].push(edge.target);
        indegree[edge.target]++;
    })

    const queue: string[] = [];
    Object.keys(indegree).forEach((node) => {
        if (indegree[node] === 0) {
            queue.push(node);
        }
    })

    let count = 0;

    while (queue.length > 0) {
        const current = queue.shift()
        count++;

        if (!current) {
            continue;
        }

        graph[current].forEach((neighbor) => {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        })
    }

    if (count != nodes.length) {
        return true
    }

    return false
}




export function getExecutionOrder(nodes: Node[], edges: Edge[]) {
    const graph: Record<string, string[]> = {};
    const indegree: Record<string, number> = {};

    nodes.forEach((node: Node) => {
        graph[node.id] = []
        indegree[node.id] = 0
    });

    edges.forEach((edge: Edge) => {
        graph[edge.source].push(edge.target);
        indegree[edge.target]++;
    })

    const queue: string[] = Object.keys(indegree).filter((id) => indegree[id] === 0);
    const order = []


    while (queue.length > 0) {
        const current = queue.shift()
        order.push(current)

        if (!current) {
            continue;
        }

        graph[current].forEach((neighbor) => {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        })
    }

  return order;
}

export function simulationHandler(type: string, title: string) {
    switch(type) {
        case 'start':
            return `Start: ${title ? title : 'start'} is initiazed...`
        case 'task':
            return `Task: ${title ? title : 'task'} is done`
        case 'approval':
            return `Approval: ${title ? title : 'approval request'} is approved`
        case 'automated':
            return `Automated Step: ${title ? title : 'automated step'} is done`
        case 'end':
            return `End: ${title ? title : 'workflow'}`
        default:
            return null
    }
}




