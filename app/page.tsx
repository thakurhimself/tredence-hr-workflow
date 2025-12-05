'use client';

import { hrNodeEdges, hrNodes, nodeTypes } from "@/flows/hr-flow";
import { applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from "@xyflow/react";
import { useCallback, useState, useRef } from "react";
import { Node, Edge } from "@xyflow/react";
import { v4 as uid} from 'uuid'
import '@xyflow/react/dist/style.css';
import SideMenu from "@/components/SideMenu";

export default function Home() {
  const reactFlowWrapper = useRef<HTMLElement>(null)
  const [nodes, setNodes] = useState<Node[]>(hrNodes);
  const [edges, setEdges] = useState<Edge[]>(hrNodeEdges);

  const onNodeChanges = useCallback(
    (change) => setNodes((nodesSnapshot) => applyNodeChanges(change, nodesSnapshot))
    ,[])

  const onEdgeChanges = useCallback(
    (change) => setEdges((edgesSnapshot) => applyEdgeChanges(change, edgesSnapshot))
  ,[])


  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, [])

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
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

    setNodes(nodes => nodes.concat(newNode));

    setNodes(nodes => {
      return nodes.map(n => ({
        ...n,
        selected: n.id === id
      }))
    })

  }, [])

  console.log("nodes", nodes);

  return (
      <main className="w-screen h-screen flex">
        <SideMenu />
        <section 
        ref={reactFlowWrapper}
        className="col-span-10 col-start-3 col-end-14 w-full h-full">
          <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodeChanges}
          onEdgesChange={onEdgeChanges}
          onDragOver={onDragOver}
          onDrop={onDrop}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </section>
      </main>
  );
}
