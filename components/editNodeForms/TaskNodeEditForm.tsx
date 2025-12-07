'use client';

import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { PairType } from "@/types/types";
import { X, PencilRuler } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { v4 as uid } from 'uuid';

export default function TaskNodeEditForm() {

    const state = useWorkflowState();
    const dispatch = useWorkflowDispatch();

    const { id } = state.selectedNode;

    const [taskDetails, setTaskDetails] = useState<{
        title: string,
        description: string,
        assignee: string,
        dueDate: string
    }>({
        title: state.nodeRecord[id]?.type === 'task' ? state.nodeRecord[id]?.title : '',
        description: state.nodeRecord[id]?.type === 'task' ? state.nodeRecord[id]?.description : '',
        assignee: state.nodeRecord[id]?.type === 'task' ? state.nodeRecord[id]?.assignee : '',
        dueDate: state.nodeRecord[id]?.type === 'task' ? state.nodeRecord[id]?.dueDate : '',
    })
    
    const [pair, setPair] = useState<PairType[]>(
        state.nodeRecord[id]?.type === 'task' ? state.nodeRecord[id]?.pair : []
    )


    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskDetails(prevSnapshot => {
            return {
                ...prevSnapshot,
                [e.target.name]: e.target.value
            }
        })
    }

    const updatepair = (id: string, field: 'key' | 'value', value: string) => {
         setPair(pairSnapshot => pairSnapshot.map((item) => item.id === id ? {...item, [field]: value} : item));
    }

    const addpair = () => {
        setPair((pairSnapshot) => [...pairSnapshot, {id: uid(), key: '', value: ''}])
    }

    return (
        <section className="w-full">
            {/* title input */}
            <div 
            className="flex justify-end cursor-pointer"
            
            >
                <button
                className="cursor-pointer"
                onClick={() => dispatch({
                    type: 'UNSELECT_NODE'
                })}
                >
                    <X />
                </button>
            </div>
            <p className="text-xl text-center font-[900] mb-3 flex items-center gap-2 justify-center">
                <PencilRuler />
                <span>Task Node</span>
            </p>

            {/* title */}
            <p className="text-lg font-semibold mb-1">Title</p>
            <input type="text" 
            name="title"
            placeholder="Enter Title" 
            className="border border-[#999] p-2 w-full mb-3"
            value={taskDetails.title}
            required
            onChange={changeHandler}
            />

            {/* description */}
            <p className="text-lg font-semibold mb-1">Description</p>
            <input 
            type="text" 
            name="description"
            placeholder="Enter Description" 
            className="border border-[#999] p-2 w-full mb-3"
            value={taskDetails.description}
            onChange={changeHandler}
            />

            {/* Assignee */}
            <p className="text-lg font-semibold mb-1">Assignee</p>
            <input type="text" 
            name="assignee"
            placeholder="Enter Assignee" 
            className="border border-[#999] p-2 w-full mb-3"
            value={taskDetails.assignee}
            onChange={changeHandler}
            />
            
            {/* Date */}
            <p className="text-lg font-semibold mb-1">Date</p>
            <input type="date" 
            name="dueDate"
            className="border border-[#999] p-2 w-full mb-3"
            value={taskDetails.dueDate}
            onChange={changeHandler}
            />

            {/* optional add pair */}
            <p className="text-lg font-semibold my-2">Custom Fields</p>
            {
                pair.map((item) => {
                    return (
                        <section key={item.id} 
                        className="flex gap-2 items-center justify-between mb-3"
                        >
                            <input type="text" 
                            value={item.key} 
                            className="border p-2 w-full"
                            placeholder="Add key"
                            onChange={(e) => updatepair(item.id, 'key', e.target.value)}
                            />

                            <input type="text" 
                            value={item.value} 
                            className="border p-2 w-full"
                            placeholder="Add value"
                            onChange={(e) => updatepair(item.id, 'value', e.target.value)}
                            />
                        </section>
                    )
                })
            }

            <button 
            onClick={() => addpair()}
            className="w-full p-2 bg-blue-900 hover:bg-blue-500 mt-2 text-white font-bold cursor-pointer hover">
                Add Feilds
            </button>

            <button
            className="w-full p-2 bg-blue-700 hover:bg-blue-500 mt-2 text-white"
            onClick={() => {
                dispatch({
                    type: 'UPDATE_NODE_RECORD',
                    load: {
                        id,
                        data: {
                            type: 'task',
                            title: taskDetails.title,
                            description: taskDetails.description,
                            assignee: taskDetails.assignee,
                            dueDate: taskDetails.dueDate,
                            pair: pair
                        }
                    }
                })
            }}
            >
                Save
            </button>
        </section>
    )
}