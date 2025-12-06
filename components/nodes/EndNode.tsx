'use client';
import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { Position, Handle, useReactFlow } from "@xyflow/react";
import { X, SquareChevronRight } from "lucide-react";

export default function EndNode({id, type}: {id: string, type: string}) {

    const dispatch = useWorkflowDispatch()
    const state = useWorkflowState();
    
    const { setNodes } = useReactFlow()

    const node = state.nodeRecord[id] || {};

    const removeNode = () => {
        dispatch({
            type: 'DELETE_NODE',
            id
        })
        return setNodes((nodeSnapshot) => nodeSnapshot.filter((n) => n.id !== id))
    }
    
    return (
        <div 
        className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        onClick={() => dispatch({type: 'SELECT_NODE', load: { id, type}})}
        >
            <Handle type="target" position={Position.Left} id={'outgoing'}/>
            <section className="flex justify-end">
                <button className="cursor-pointer" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeNode()
                }}>
                    <X />
                </button>
            </section>
            <p className="flex items-center gap-2 font-bold text-xl w-fit">
                <span>
                    <SquareChevronRight />
                </span>
                <span>
                    {
                        node.title ? 
                        node.title : 
                        'End Node'
                    }
                </span>
            </p>
            <hr className="my-2 border-[#ddd]"/>
            
        </div>
    )
}