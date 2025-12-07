'use client';

import { useWorkflowState } from "@/context/WorkflowContext";
import { useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";
import { useEffect, useCallback } from "react";

export default function SubmitWorkflowPanel(
    {onCloseModal}:
    {onCloseModal: () => void}
) {

    const state = useWorkflowState()
    const { getNodes, getEdges } = useReactFlow()

    const submitWorkflow = useCallback( async() => {
            const payload = {
                workflow: 'hr workflow',
                nodes: getNodes(),
                edges: getEdges(),
                nodeFormData:state.nodeRecord
            }
    
            try {
                const response = await fetch('/api/simulate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
    
                if (!response.ok) {
                    console.log("couldn't fetch");
                }
    
                const result = await response.json();
                console.log("result", result);
            } catch (error) {
                console.log("error", error);
            }
    }, [getNodes, getEdges, state])

    useEffect(() => {
        submitWorkflow();
    }, [submitWorkflow])

    return (
        <section className="w-full">
            <section className="flex justify-end mb-2">
                <button
                className="cursor-pointer"
                onClick={onCloseModal}
                >
                    <X />
                </button>
            </section>
            <p className="text-center font-semibold">Submitting Workflow</p>
        </section>
    )
}