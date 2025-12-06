
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
    title: string,
    pair: PairType[]
}