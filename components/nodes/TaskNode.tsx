'use client';
import { PairType } from "@/types/types";
import { useReactFlow, Position, Handle } from "@xyflow/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uid } from 'uuid';

export default function TaskNode({id}: {id: string}) {

    const { setNodes } = useReactFlow()

    const [editMode, setEditMode] = useState(false);
    const [taskDetails, setTaskDetails] = useState<{
        title: string,
        description: string,
        assignee: string,
        dueDate: string
    }>({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
    })
    const [metadata, setMetadata] = useState<PairType[]>(
        [{id: uid(), key: '',value: ''}]
    )

    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        /* Disable the edit mode when click outside the node */
        function handleOutsideClick(e: MouseEvent) {
            if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
                // syncing the data with parent
                const data = { 
                    title: taskDetails.title, 
                    metadata: metadata.map((item) => (item.key && item.value) ? item : null).filter(item => item !== null),
                    isEditing: false
                }
                setNodes((nodeSnapshot) => {
                    return nodeSnapshot.map((n) => {
                        return n.id === id ? {...n, data: {...n.data, ...data}} : n
                    })
                })

                // disable edit mode
                setEditMode(false);
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => { document.removeEventListener('click', handleOutsideClick)}
    }, [id, metadata, taskDetails.title, setNodes])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setTaskDetails(prevSnapshot => {
            return {
                ...prevSnapshot,
                [e.target.name]: e.target.value
            }
        })
    }

    const updateMetadata = (id: string, field: 'key' | 'value', value: string) => {
         setMetadata(metadataSnapshot => metadataSnapshot.map((item) => item.id === id ? {...item, [field]: value} : item));
    }

    const addMetadata = () => {
        setMetadata((metadataSnapshot) => [...metadataSnapshot, {id: uid(), key: '', value: ''}])
    }

    const removeNode = () => {
        return setNodes((nodeSnapshot) => nodeSnapshot.filter((n) => n.id !== id))
    }

    return (
        <div className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        ref={parentRef}
        onClick={() => setEditMode(true)
        }>
            <Handle type="source" position={Position.Right} id={'outgoing'}/>
            <Handle type="target" position={Position.Left} id={'incoming'} />
            {
                editMode ?
                <>
                    {/* title input */}
                    <div 
                    className="flex justify-end cursor-pointer"
                    onClick={removeNode}
                    >
                        <button>X</button>
                    </div>
                    <p className="text-lg font-semibold mb-2">Add Title</p>

                    {/* title */}
                    <input type="text" 
                    placeholder="Enter title" 
                    className="border border-[#999] p-2 w-full"
                    value={taskDetails.title}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* description */}
                    <input type="text" 
                    placeholder="Enter Description" 
                    className="border border-[#999] p-2 w-full"
                    value={taskDetails.title}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* Assignee */}
                    <input type="text" 
                    placeholder="Enter title" 
                    className="border border-[#999] p-2 w-full"
                    value={taskDetails.title}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />
                    
                    {/* Date */}
                    <input type="date" 
                    placeholder="Enter title" 
                    className="border border-[#999] p-2 w-full"
                    value={taskDetails.title}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* optional add metadata */}
                    <p className="text-lg font-semibold my-2">Custom Fields</p>
                    {
                        metadata.map((item) => {
                            return (
                                <section key={item.id} 
                                className="flex gap-2 items-center justify-between"
                                onClick={(e) => e.stopPropagation()}
                                >
                                    <input type="text" 
                                    value={item.key} 
                                    className="border p-2 w-full"
                                    placeholder="Add new key"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        updateMetadata(item.id, 'key', e.target.value)
                                    }}
                                    onFocus={(e) => e.stopPropagation()}
                                    />

                                    <input type="text" 
                                    value={item.value} 
                                    className="border p-2 w-full"
                                    placeholder="Add new value"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        updateMetadata(item.id, 'value', e.target.value)
                                    }}
                                    onFocus={(e) => e.stopPropagation()}
                                    />
                                </section>
                            )
                        })
                    }

                    <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addMetadata()
                    }}
                    className="block w-fit mx-auto p-2 bg-blue-900 mt-2 text-white">
                        Add Feilds
                    </button>
                </>
                :
                <>
                    <p className="font-bold text-xl w-fit">{taskDetails.title ? taskDetails.title : 'Task Node'}</p>
                    <hr className="my-2 border-[#ddd]"/>
                    {
                        metadata.map((pair, index) => {
                            return (
                                <section key={index} className="flex justify-between items-center gap-2">
                                    <p>{pair.key}</p>
                                    <p>{pair.value}</p>
                                </section>
                            )
                        })
                    }
                </>
            }
        </div>
    )
}