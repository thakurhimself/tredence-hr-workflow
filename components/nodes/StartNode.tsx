'use client';
import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { Position, Handle, useReactFlow } from "@xyflow/react";
import { X, SquareChevronRight } from "lucide-react";

export default function StartNode({id, type}: {id: string, type: string}) {

    const dispatch = useWorkflowDispatch()
    const state = useWorkflowState();
    
    const { setNodes } = useReactFlow()

    const node = state.nodeRecord[id] || {};

    const removeNode = () => {
        return setNodes((nodeSnapshot) => nodeSnapshot.filter((n) => n.id !== id))
    }
    
    return (
        <div 
        className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        onClick={() => dispatch({type: 'SELECT_NODE', load: { id, type}})}
        >
            <Handle type="source" position={Position.Right} id={'outgoing'}/>
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
                        'Start Node'
                    }
                </span>
            </p>
            <hr className="my-2 border-[#ddd]"/>

            {
                (node.type === 'start' && node.pair && node.pair.length > 0) &&
                <section>
                    <p className="font-bold">
                        Metadata
                    </p>
                    {
                        node.pair.map((pair, index) => {
                            return (
                                <section key={index} className="ml-2 border-b-[#ddd]">
                                    <p className="font-semibold">{pair.key}</p>
                                    <p className="italic ml-2">{pair.value}</p>
                                </section>
                            )
                        })
                    }
                </section>
            }
            
        </div>
    )
}