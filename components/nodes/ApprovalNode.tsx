'use client';
import { useReactFlow } from "@xyflow/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function ApprovalNode({id}: {id: string}) {

    const { setNodes } = useReactFlow()

    const [editMode, setEditMode] = useState(false);
    const [approvalInfo, setApprovalInfo] = useState<{
        title: string,
        approverRole: string,
        autoApproveThreshold: number,
    }>({
        title: '',
        approverRole: '',
        autoApproveThreshold: 0,
    })


    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        /* Disable the edit mode when click outside the node */
        function handleOutsideClick(e: MouseEvent) {
            if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
                // syncing the data with parent
                const data = { 
                    title: approvalInfo.title, 
                    approverRole: approvalInfo.approverRole,
                    autoApproveThreshold: approvalInfo.autoApproveThreshold
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
    }, [id, approvalInfo, setNodes])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setApprovalInfo(prevSnapshot => {
            return {
                ...prevSnapshot,
                [e.target.name]: e.target.value
            }
        })
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
                    className="border border-[#999] p-2 w-full"
                    value={approvalInfo.title}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* description */}
                    <input 
                    type="text" 
                    name="approverRole"
                    placeholder="Approver role" 
                    className="border border-[#999] p-2 w-full"
                    value={approvalInfo.approverRole}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />

                    {/* auto-approve threshold */}
                    <input 
                    type="number" 
                    name="autoApproveThreshold"
                    placeholder="Approver role" 
                    className="border border-[#999] p-2 w-full"
                    value={approvalInfo.autoApproveThreshold}
                    onChange={changeHandler}
                    onFocus={(e) => e.stopPropagation()}
                    />

                </>
                :
                <>
                    <p className="font-bold text-xl w-fit mb-3">
                        {approvalInfo.title ? approvalInfo.title : 'Approval Node'}
                    </p>
                    {
                        approvalInfo.approverRole &&
                        <section className="flex justify-between items-center">
                            <p>Approver role</p>
                            <p>{approvalInfo.approverRole}</p>
                        </section>
                    }
                    {
                        approvalInfo.autoApproveThreshold &&
                        <section className="flex justify-between items-center">
                            <p>Auto-approve threshold</p>
                            <p>{approvalInfo.autoApproveThreshold}</p>
                        </section>
                    }
                    
                </>
            }
        </div>
    )
}