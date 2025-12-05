'use client';
import { useReactFlow } from "@xyflow/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function AutomatedStepNode({id}: {id: string}) {

    const { setNodes } = useReactFlow()

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState<string>('')

    // actions state
    const [actions, setActions] = useState<
        {
            id: string,
            label: string,
            params: string[]
        }[]
    >([])


    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // routine to fetch actions
        async function fetchActions() {
            try {
                const response = await fetch('/api/autmations');
                if (!response.ok) {
                    throw new Error("Internal error occurred: couldn't fetch the actions")
                }
                const result = await response.json();
                setActions(result);
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

    // const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setAutomatedStep(prevSnapshot => {
    //         return {
    //             ...prevSnapshot,
    //             [e.target.name]: e.target.value
    //         }
    //     })
    // }

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
                    className="border border-[#999] p-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* choose action */}
                    <label>
                        <span>Choose Action</span>
                        <select onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}>
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
                    </label>

                    {/* set params values */}
                </>
                :
                <>
                    <p className="font-bold text-xl w-fit mb-3">
                        {title ? title : 'Automated step node'}
                    </p>
                    {
                        // automatedStep.approverRole &&
                        // <section className="flex justify-between items-center">
                        //     <p>Approver role</p>
                        //     <p>{automatedStep.approverRole}</p>
                        // </section>
                    }
                    {
                        // automatedStep.autoApproveThreshold &&
                        // <section className="flex justify-between items-center">
                        //     <p>Auto-approve threshold</p>
                        //     <p>{automatedStep.autoApproveThreshold}</p>
                        // </section>
                    }
                    
                </>
            }
        </div>
    )
}