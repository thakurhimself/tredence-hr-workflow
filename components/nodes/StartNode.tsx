'use client';
import { useWorkflowDispatch } from "@/context/WorkflowContext";
import { Position, Handle, useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";

export default function StartNode({id, type}: {id: string, type: string}) {

    const dispatch = useWorkflowDispatch()
    const { setNodes } = useReactFlow()

    const removeNode = () => {
        return setNodes((nodeSnapshot) => nodeSnapshot.filter((n) => n.id !== id))
    }
    
    return (
        <div 
        className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        onClick={() => dispatch({type: 'SELECT_NODE', load: { id, type}})}
        >

            <Handle type="source" position={Position.Right} id={'outgoing'}/>
            <Handle type="target" position={Position.Left} id={'incoming'}/>
                
            <section className="flex justify-end">
                <button className="cursor-pointer" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeNode()
                }}>
                    <X />
                </button>
            </section>
            <p className="font-bold text-xl">Start Node</p>
            <hr className="my-2 border-[#ddd]"/>
            {
                // metadata.map((pair, index) => {
                //     return (
                //         <section key={index} className="flex justify-between items-center gap-2">
                //             <p>{pair.key}</p>
                //             <p>{pair.value}</p>
                //         </section>
                //     )
                // })
            }
        </div>
    )
}