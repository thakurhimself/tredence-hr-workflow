// State pertaining to Nodes, edges, and selecting node for editing

'use client';

import { ApprovalNodeType, AutomatedNodeType, EndNodeType, StartNodeType, TaskNodeType } from "@/types/types";
import { createContext, useContext, ReactNode, Dispatch, useReducer } from "react";

export interface SelectNodeType {
    id: string,
    type: string
}

export interface WorkflowStateType {
    selectedNode: SelectNodeType
    nodeRecord: {
        [key: string]: StartNodeType | TaskNodeType | ApprovalNodeType | AutomatedNodeType | EndNodeType
    }
}

export type WorkflowActionType = { type: "SELECT_NODE"; load: SelectNodeType }
    | { type: "UNSELECT_NODE" }
    | { type: "UPDATE_NODE_RECORD", load: {id: string, data: StartNodeType | TaskNodeType | ApprovalNodeType | AutomatedNodeType | EndNodeType} }
    | {type: 'DELETE_NODE', id: string}
    | { type: "RESET" };


const WorkflowContext = createContext<WorkflowStateType | null>(null)
const WorkflowAction = createContext<Dispatch<WorkflowActionType> | null>(null)

const initialState = {
    selectedNode: {id: '', type: ''},
    nodeRecord: {}
}

const workflowReducer = (state: WorkflowStateType, action: WorkflowActionType) => {
    switch(action.type) {
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    id: action.load.id,
                    type: action.load.type
                }
            }
        case 'UNSELECT_NODE':
            return {
                ...state,
                selectedNode: {...state.selectedNode, id: '', type: ''}
            }
        case 'UPDATE_NODE_RECORD':
            const {id, data} = action.load
            return {
                ...state,   // root level workflow state
                nodeRecord: {
                    ...state.nodeRecord,    // node Record object
                    [id]: {     // individual record object
                        ...state.nodeRecord[id],
                        ...data,
                    }
                }
            }
        case 'DELETE_NODE':
            const updRecord = {...state.nodeRecord}
            delete updRecord[action.id]
            return {
                ...state,   // root level workflow state
                nodeRecord: updRecord,
                selectedNode: {...state.selectedNode, id: '', type: ''}
            }
        default: 
            return state
    }
}

export function WorkflowProvider({children}: {children: ReactNode}) {
    const [flowState, dispatch] = useReducer(workflowReducer, initialState)
    return (
        <WorkflowContext value={flowState}>
            <WorkflowAction value={dispatch}>
                {children}
            </WorkflowAction>
        </WorkflowContext>
    )
}


export function useWorkflowDispatch() {
  const context = useContext(WorkflowAction);
  if (!context) throw new Error("useRootDispatch must be used within RootContextProvider");
  return context;
}

export function useWorkflowState() {
  const context = useContext(WorkflowContext);
  if (!context) throw new Error("useRootState must be used within RootContextProvider");
  return context;
}