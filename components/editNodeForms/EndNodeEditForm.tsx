'use client';
import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { X, PencilRuler } from "lucide-react";
import { useState } from "react";

export default function EndNodeEditForm() {
    const state = useWorkflowState()
    const dispatch = useWorkflowDispatch()

    const { id } = state.selectedNode

    const initTitle = state.nodeRecord[id]?.['title'] || "";
    const [title, setTitle] = useState<string>(initTitle)
    const [summary, setSummary] = useState<boolean>(false)

    return (
        <section className="w-full">
            <button 
            className="cursor-pointer"
            onClick={() => dispatch({type: 'UNSELECT_NODE'})}>
                <X />
            </button>
            
            <p className="text-xl text-center font-[900] mb-3 flex items-center gap-2 justify-center">
                <PencilRuler />
                <span>End Node</span>
            </p>

            <p className="text-lg font-semibold mb-2">Title</p>
            <input type="text" 
            placeholder="Enter title" 
            className="border border-[#999] p-2 w-full mb-5"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block w-full flex items-center justify-between mb-3">
                <input 
                type="checkbox" 
                placeholder="Enter title" 
                checked={summary}
                onChange={(e) => setSummary(e.target.checked)}
                />

                <span className="font-semibold text-lg">Summary</span>
            </label>

            <button
            className="w-full p-2 bg-blue-700 hover:bg-blue-500 cursor-pointer mt-2 text-white"
            onClick={() => {
                dispatch({
                    type: 'UPDATE_NODE_RECORD',
                    load: {
                        id: state.selectedNode.id,
                        data: {
                            type: 'end',
                            title,
                            summary
                        }
                    }
                })
                dispatch({type: 'UNSELECT_NODE'})
            }}
            >
                Save
            </button>
        </section>
    )
}