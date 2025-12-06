'use client';

import { hrNodeEdges, hrNodes, nodeTypes } from "@/worker/hr-flow";
import { 
  addEdge, 
  Background, 
  Connection, 
  Controls, 
  ReactFlow, 
  ReactFlowProvider, 
  useEdgesState, 
  useNodesState 
} from "@xyflow/react";
import { useCallback, useState, useRef } from "react";
import { Node, Edge } from "@xyflow/react";
import { v4 as uid} from 'uuid'
import '@xyflow/react/dist/style.css';
import SideMenu from "@/components/SideMenu";
import Portal from "@/components/Portal";
import Panel from "@/components/Panel";
import { useRootState } from "@/context/RootContext";
import { nodeSelector } from "@/worker/nodeSelector";

export default function RootComponent() {
    const rootState = useRootState();
    const reactFlowWrapper = useRef<HTMLElement>(null)
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(hrNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(hrNodeEdges)
    const [actionStatus, setActionStatus] = useState<{type: 'error' | null, message: string}>(
    {type: null, message: ''}
    )

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    }, [])

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) {
        return;
    }

    const rect = reactFlowWrapper.current?.getBoundingClientRect()

    const pos = {
        x: event.clientX - (rect ? rect.left : 0),
        y: event.clientY - (rect ? rect.y : 0)
    }

    const id = uid();

    const newNode = {
        id,
        type,
        position: pos,
        data: {}
    }
    console.log("")
    if (nodes.length < 1 && type !== 'start') {
        setActionStatus({type: 'error', message: 'Start node must be first'})
        return;
    }

    if (nodes.length > 0 && nodes[0].type !== 'start') {
        setActionStatus({type: 'error', message: 'Start node must be first'})
        return;
    }

    setNodes(nodes => nodes.concat(newNode));

    }

    return (
        <main className="w-screen h-screen flex">
            {
                actionStatus.type === 'error' &&
                <Portal>
                <section>
                    <p className="text-center text-xl my-4">{actionStatus.message}</p>
                    <button 
                    className="block w-fit mx-auto px-5 py-1 bg-red-700 text-white rounded cursor-pointer"
                    onClick={() => setActionStatus({type: null, message: ''})}
                    >
                    Okay
                    </button>
                </section>
                </Portal>
            }

            <ReactFlowProvider>
                {
                    (rootState.edit.id) &&
                    <Panel>
                        {nodeSelector(rootState.edit.type)}
                    </Panel>
                }

                <SideMenu />
                <section 
                ref={reactFlowWrapper}
                className="col-span-10 col-start-3 col-end-14 w-full h-full">
                    <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onConnect={onConnect}
                    >
                    <Controls />
                    <Background />
                    </ReactFlow>
                </section>
            </ReactFlowProvider>
        </main>
    );
}
