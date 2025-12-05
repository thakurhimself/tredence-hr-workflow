import StartNode from "@/components/nodes/StartNode"

export const nodeTypes = {
    start: StartNode
}

export const hrNodes = [
    {
        id: 'n1',
        type: 'start',
        label: 'Start',
        position: {x: 10, y: 10},
        data: {}
    },
    // {
    //     id: 'n2',
    //     label: 'Completion',
    //     position: {x: 50, y: 100}
    // }
]

export const hrNodeEdges = [
    // {
    //     id: 'n1-n2',
    //     source: 'n1',
    //     target: 'n2'
    // }
]

