'use client';

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
import { nodeSelector } from "@/worker/nodeSelector";
import { useWorkflowState } from "@/context/WorkflowContext";
import { edgeTypes, nodeTypes } from "@/worker/flowConfig";
import { Play } from "lucide-react";
import SubmitWorkflowPanel from "./SubmitWorkflowPanel";

export default function RootComponent() {
    const state = useWorkflowState();
    const reactFlowWrapper = useRef<HTMLElement>(null)
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

    const [actionStatus, setActionStatus] = useState<{type: 'error' | 'submit-workflow' | null, message?: string}>(
        {type: null, message: ''}
    )

    // const [subWorkflow, setSubmitWorkflow] = useState<boolean>(false);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge({...params, type:'customEdge'}, eds)
    ), [setEdges])

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

            {
                (state.selectedNode.id) &&
                <Panel>
                    {nodeSelector(state.selectedNode.type)}
                </Panel>
            }

         

            <ReactFlowProvider>
                {
                    actionStatus.type === 'submit-workflow' &&
                    <Portal>
                        <SubmitWorkflowPanel onCloseModal={() => setActionStatus({type: null})} />
                    </Portal>
                }
                <SideMenu />
                <section className="w-full h-full flex flex-col">
                    {/* Top header */}
                    <section className="flex justify-around items-center border-b-1 border-b-[#aaa] p-2">
                        <section>

                        </section>
                        <section>
                            <p className="font-semibold text-red-900">Workflow</p>
                        </section>
                        <section>
                            <button 
                            className="cursor-pointer"
                            onClick={() => setActionStatus({type: 'submit-workflow'})}
                            >
                                <Play size={20} />
                            </button>
                        </section>
                    </section>

                    {/* Canvas */}
                    <section 
                    ref={reactFlowWrapper}
                    className="w-full flex-1">
                        <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
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
                </section>
            </ReactFlowProvider>
        </main>
    );
}
