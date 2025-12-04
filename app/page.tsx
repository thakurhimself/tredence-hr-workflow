'use client';

import { hrNodeEdges, hrNodes, nodeTypes } from "@/flows/hr-flow";
import { applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { Node, Edge } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

export default function Home() {

  const [nodes, setNodes] = useState<Node[]>(hrNodes);
  const [edges, setEdges] = useState<Edge[]>(hrNodeEdges);

  const onNodeChanges = useCallback(
    (change) => setNodes((nodesSnapshot) => applyNodeChanges(change, nodesSnapshot))
    ,[])

  const onEdgeChanges = useCallback(
    (change) => setEdges((edgesSnapshot) => applyEdgeChanges(change, edgesSnapshot))
  ,[])

  return (
      <main className="w-screen h-screen flex">
        <section className="w-[200px] border-r-1 border-r-[#ddd]">
          <h1 className="font-bold text-lg text-red-900 my-2 ml-5">HR Workflow</h1>
          <hr className="mb-2 text-[#ddd]"/>
          <p className="font-semibold text-[#666] ml-5 mb-2">Nodes</p>
          <p className="ml-7 mb-2" draggable> Start Node </p>
          <p className="ml-7 mb-2" draggable> Task Node </p>
          <p className="ml-7 mb-2" draggable> Approval Node </p>
          <p className="ml-7 mb-2" draggable> Automated Node </p>
          <p className="ml-7 mb-2" draggable> End Node </p>
        </section>
        <section className="col-span-10 col-start-3 col-end-14 w-full h-full">
          <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodeChanges}
          onEdgesChange={onEdgeChanges}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </section>
      </main>
  );
}
