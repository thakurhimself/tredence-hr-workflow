'use client';
import { ActionType } from "@/types/types";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { v4 as uid } from "uuid";

export default function AutomatedStepNode({id}: {id: string}) {

    const { setNodes } = useReactFlow()

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [actionId, setActionId] = useState<string>('')
    const [params, setParams] = useState<{id: string, key: string, value: string}[]>([])

    // actions state
    const [actions, setActions] = useState<ActionType[]>([])


    const parentRef = useRef<HTMLDivElement>(null)

    console.log("actionID, params", actionId, params)

    useEffect(() => {
        // routine to fetch actions
        async function fetchActions() {
            try {
                const response = await fetch('/api/automations');
                if (!response.ok) {
                    throw new Error("Internal error occurred: couldn't fetch the actions")
                }
                const result = await response.json();
                setActions(result.actions);
            } catch (error) {
                console.log("error", error);
            }
        }

        // branch to fetch actions if actions array is empty
        if (actions.length < 1) {
           fetchActions();
        }

        /* Disable the edit mode when click outside the node */
        function handleOutsideClick(e: MouseEvent) {
            if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
                // syncing the data with parent
                const data = { 
                    // title: automatedStep.title, 
                    // approverRole: automatedStep.approverRole,
                    // autoApproveThreshold: automatedStep.autoApproveThreshold
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
    }, [id, setNodes, actions])

    const changeParams = (id: string, value: string) => {
        return setParams(paramsSnapshot => paramsSnapshot.map((param) => param.id === id ? {...param, value: value} : param))
    }

    const removeNode = () => {
        return setNodes((nodeSnapshot) => nodeSnapshot.filter((n) => n.id !== id))
    }

    return (
        <div className="border border-[#ddd] rounded-md p-3 min-w-[300px] bg-white shadow-lg" 
        ref={parentRef}
        onClick={() => setEditMode(true)
        }>
            {
                editMode ?
                <>
                    <div 
                    className="flex justify-end cursor-pointer"
                    onClick={removeNode}
                    >
                        <button>X</button>
                    </div>
                    <p className="text-lg font-semibold mb-2">Add Title</p>

                    {/* title */}
                    <input type="text" 
                    name="title"
                    placeholder="Title" 
                    className="w-full mb-3 p-2 border border-[#999]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* choose action */}
                    <select 
                    onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActionId(e.target.value)

                        const params = actions.filter(item => item.id === e.target.value)[0].params.map(item => ({id: uid(), key: item, value: ''}));
                        setParams(params);
                    }}
                    className="w-full p-2 border border-[#999] mb-3"
                    >
                        <option value=''>Choose action</option>
                        {
                            actions.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>

                    {/* set params values */}
                    {
                        (params.length > 0) &&
                        <>
                            <p className="font-semibold mb-2">Action Parameters</p>
                            {
                                params.map((item) => {
                                    return (
                                        <section key={item.id} className="flex items-center justify-between">
                                            <span className="capitalize">{item.key}</span>
                                            <input 
                                            name="value" 
                                            onChange={() => changeParams(item.id, item.value)}
                                            className="border border-[#ddd] outline-none"
                                            />
                                        </section>
                                    )
                                })
                            }
                          
                        </>

                    }
                </>
                :
                <>
                    <p className="font-bold text-xl w-fit mb-3">
                        {title ? title : 'Automated step node'}
                    </p>
                    {
                        actionId &&
                        <section className="flex justify-between items-center">
                            <p>Chosen Action</p>
                            <p className="capitalize">{actions.filter(item => item.id === actionId)[0].label}</p>
                        </section>
                    }
                    {
                        (params.length > 0) &&
                        <>
                            {
                                params.map((item) => {
                                    return (
                                        <section key={item.id} className="flex items-center gap-2">
                                            {/* <input name="key" value={item.key} onChange={() => changeParams(item.id, 'key', item.key)}/> */}
                                            <span className="capitalize">{item.key}</span>
                                            <span>{item.value}</span>
                                        </section>
                                    )
                                })
                            }
                        </>
                    }
                    
                </>
            }
        </div>
    )
}