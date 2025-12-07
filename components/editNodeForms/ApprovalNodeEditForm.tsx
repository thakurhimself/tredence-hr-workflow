'use client';
import { useWorkflowState, useWorkflowDispatch } from "@/context/WorkflowContext";
import { X, PencilRuler } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function ApprovalNodeEditForm() {

    const state = useWorkflowState();
    const dispatch = useWorkflowDispatch();

    const { id } = state.selectedNode;

    const [approvalInfo, setApprovalInfo] = useState<{
        title: string,
        approverRole: string,
        autoApproveThreshold: number,
    }>({
        title: state.nodeRecord[id]?.type === 'approval' ? state.nodeRecord[id]?.title : '',
        approverRole: state.nodeRecord[id]?.type === 'approval' ? state.nodeRecord[id]?.approvalRole : '',
        autoApproveThreshold: state.nodeRecord[id]?.type === 'approval' ? state.nodeRecord[id]?.autoApproveThreshold : 0,
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setApprovalInfo(prevSnapshot => {
            return {
                ...prevSnapshot,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className="w-full">
            <button
            className="cursor-pointer"
            onClick={() => dispatch({type: 'UNSELECT_NODE'})}
            >
                <X />
            </button>

            <p className="text-xl text-center font-[900] mb-3 flex items-center gap-2 justify-center">
                <PencilRuler />
                <span>Approval Node</span>
            </p>

            {/* title */}
            <p className="text-lg font-semibold mb-1">Title</p>
            <input 
            type="text" 
            name="title"
            placeholder="Enter Title" 
            className="border border-[#999] p-2 w-full mb-3"
            value={approvalInfo.title}
            onChange={changeHandler}
            required
            />

            {/* Approval Role */}
            <p className="text-lg font-semibold mb-1">Approver Role</p>
            <input 
            type="text" 
            name="approverRole"
            placeholder="Approver role" 
            className="border border-[#999] p-2 w-full mb-3"
            value={approvalInfo.approverRole}
            onChange={changeHandler}
            />

            {/* auto-approve threshold */}
            <p className="text-lg font-semibold mb-1">Auto-approve Threshold</p>
            <input 
            type="number" 
            name="autoApproveThreshold"
            placeholder="Approver role" 
            className="border border-[#999] p-2 w-full mb-3"
            value={approvalInfo.autoApproveThreshold}
            onChange={changeHandler}
            />

            <button
            className="w-full p-2 bg-blue-700 hover:bg-blue-500 mt-2 text-white cursor-pointer"
            onClick={() => {
                dispatch({
                    type: 'UPDATE_NODE_RECORD',
                    load: {
                        id: id,
                        data: {
                            type: 'approval',
                            title: approvalInfo.title,
                            approvalRole: approvalInfo.approverRole,
                            autoApproveThreshold: approvalInfo.autoApproveThreshold
                        }
                    }
                })

                dispatch({type: 'UNSELECT_NODE'})
            }}
            >
                Save
            </button>
        </div>
    )
}