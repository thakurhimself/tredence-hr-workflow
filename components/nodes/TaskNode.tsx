'use client';
import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { useReactFlow, Position, Handle } from "@xyflow/react";
import { X, SquareChevronRight } from "lucide-react";

export default function TaskNode({id, type}: {id: string, type: string}) {
    const dispatch = useWorkflowDispatch()
    const state = useWorkflowState();
    const { setNodes } = useReactFlow();

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
        <div 
        className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        onClick={() => {
            dispatch({
                type: 'SELECT_NODE',
                load: {
                    id,
                    type
                }
            })
        }}>
            <Handle type="source" position={Position.Right} id={'outgoing'}/>
            <Handle type="target" position={Position.Left} id={'incoming'} />

            <div 
            className="flex justify-end cursor-pointer"
            >
                <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeNode()
                }}
                className="cursor-pointer"
                >
                    <X/>
                </button>
            </div>
            <p className="flex items-center gap-2 font-bold text-xl w-fit">
                <span>
                    <SquareChevronRight />
                </span>
                <span>
                    {
                        node.title ? 
                        node.title : 
                        'Task Node'
                    }
                </span>
            </p>
            <hr className="my-2 border-[#ddd]"/>
            {
                (node.type === 'task' && node.description) 
                && 
                <section>
                    <p className="font-bold">
                        Description
                    </p>
                    <p className="ml-2">
                        {node.description}
                    </p>
                </section>
            }

            {
                (node.type === 'task' && node.assignee) 
                && 
                <section>
                    <p className="font-bold">
                        Assignee
                    </p>
                    <p className="ml-2">
                        {node.assignee}
                    </p>
                </section>
            }

             {
                (node.type === 'task' && node.dueDate) 
                && 
                <section>
                    <p className="font-bold">
                        Due Date
                    </p>
                    <p className="ml-2">
                        {new Date(node.dueDate).toLocaleString()}
                    </p>
                </section>
            }

            {
                (node.type === 'task' && node.pair && node.pair.length > 0) &&
                <section>
                    <p className="font-bold">
                        Additional Data
                    </p>
                    {
                        node.pair && node.pair.map((pair, index) => {
                            return (
                                <section key={index} className="ml-2 border-b-[#ddd]">
                                    <p className="font-semibold">{pair.key}</p>
                                    <p className="italic">{pair.value}</p>
                                </section>
                            )
                        })
                    }
                </section>
            }
        </div>
    )
}