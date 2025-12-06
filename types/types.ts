
export interface PairType {
    id: string,
    key: string,
    value: string
}

export interface ActionType {
    id: string,
    label: string,
    params: string[],
}

export interface StartNodeType {
    type: 'start'
    title: string,
    pair: PairType[]
}

export interface TaskNodeType {
    type: 'task',
    title: string,
    description: string,
    assignee: string,
    dueDate: string,
    pair: PairType[]
}

export interface ApprovalNodeType {
    type: 'approval',
    title: string,
    approvalRole: string,
    autoApproveThreshold: number
}