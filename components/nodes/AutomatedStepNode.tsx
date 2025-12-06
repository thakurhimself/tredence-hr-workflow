'use client';
import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X, SquareChevronRight } from "lucide-react";

export default function AutomatedStepNode({id, type}: {id: string, type: string}) {
    const dispatch = useWorkflowDispatch()
    const state = useWorkflowState();

    const { setNodes } = useReactFlow()

    const node = state.nodeRecord[id] || {};
    console.log("node", node);

    const removeNode = () => {
        dispatch({
            type: 'DELETE_NODE',
            id
        })
        return setNodes((nodeSnapshot) => nodeSnapshot.filter((n) => n.id !== id))
    }

    return (
        <div className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        onClick={() => dispatch({type: 'SELECT_NODE', load: { id, type}})}
        >
            <Handle type="target" position={Position.Left} id={'incoming'} />
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
                        'Automated Step Node'
                    }
                </span>
                
            </p>

            <hr className="my-2 border-[#ddd]"/>
            {
                (node.type === 'automated' && node.actionId) 
                && 
                <section>
                    <p className="font-bold">
                        Chosen Action
                    </p>
                    <p className="ml-2 capitalize">
                        {node.actionId.split('_').join(' ')}
                    </p>
                </section>
            }

            {
                (node.type === 'automated' && node.params && node.params.length > 0) &&
                <section>
                    <p className="font-bold">
                        Action Params
                    </p>
                    {
                        node.params.map((pair, index) => {
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