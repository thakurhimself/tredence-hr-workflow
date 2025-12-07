'use client';

import { useWorkflowState } from "@/context/WorkflowContext";
import { useReactFlow } from "@xyflow/react";
import { Check, InfoIcon, X } from "lucide-react";
import { useEffect, useCallback, useState } from "react";

export default function SubmitWorkflowPanel(
    {onCloseModal}:
    {onCloseModal: () => void}
) {

    const state = useWorkflowState()
    const { getNodes, getEdges } = useReactFlow()

    const [steps, setSteps] = useState<string[]>([]);
    const [compStatus, setCompStatus] = useState<{type: 'loading' | 'error' | null, message?: string}>({type: null, message: ''})

    const submitWorkflow = useCallback( async() => {
            const payload = {
                workflow: 'hr workflow',
                nodes: getNodes(),
                edges: getEdges(),
                nodeFormData:state.nodeRecord
            }
    
            try {
                setCompStatus({type: 'loading'});
                const response = await fetch('/api/simulate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
    
                if (!response.ok) {
                    setCompStatus({type: 'error', message: 'Internal error occurred'})
                }

                
                setCompStatus({type: null})
                const result = await response.json();
                if (response.status === 400) {
                    setCompStatus({type: 'error', message: result.message})
                    return
                }
                setSteps(result.data)
            } catch (error) {
                let message = 'Internal error occurred';

                if (typeof error === 'object' && error !== null) {
                    if ('message' in error && typeof error.message === 'string') {
                        message = error.message
                    }
                }

                setCompStatus({type: 'error', message})
            }
    }, [getNodes, getEdges, state])

    useEffect(() => {
        (async() => {
            await submitWorkflow()
        })();
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
            <p className="text-center text-xl font-semibold mb-5">Submitting Workflow</p>
            {
                compStatus.type === 'loading' ?
                <div>
                   <p> Please wait ...</p>
                </div>
                :
                <section>
                    {
                        steps.map((item, index) => {
                            const text = item.trim().split(':')
                            return (
                                <p key={item+index} className="ml-8 mb-2 flex items-center gap-2">
                                   <Check color="green"/> <span> <span className="font-bold">{text[0]}</span> : <span>{text[1]}</span> </span>
                                </p>
                            )
                        })
                    }
                </section>
            }

            {
                compStatus.type === 'error' &&
                <p className="px-4 py-2 bg-red-200 text-center w-fit mx-auto flex items-center gap-2 rounded">
                    <InfoIcon size={22}/> <span>{compStatus.message} </span>
                </p>
            }
        </section>
    )
}