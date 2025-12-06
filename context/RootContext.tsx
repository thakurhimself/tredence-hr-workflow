'use client';
import { createContext, useContext, Dispatch, ReactNode, useReducer } from "react";

interface EditStateType {
    id: string,
    type: string
}

interface RootStateType {
    edit: EditStateType
}

type ActionType = { type: 'edit',load: EditStateType } | { type: 'resetEdit' }

export const RootContext = createContext<RootStateType | null>(null);
export const RootDispatch = createContext<Dispatch<ActionType> | null>(null);


export function RootContextProvider({children}: {children: ReactNode}) {
    const [rootState, dispatch] = useReducer(rootReducer, intialContext)
    return (
        <RootContext value={rootState}>
            <RootDispatch value={dispatch}>
                {children}
            </RootDispatch>
        </RootContext>
    )
}

const intialContext = {
    edit: {
        id: '',
        type: ''
    }
}

const rootReducer = (rootState: RootStateType, action: ActionType) => {
    switch(action.type) {
        case 'edit':
            return {
                ...rootState, 
                edit: {...rootState.edit, id: action.load.id, type: action.load.type}
            }
        case 'resetEdit':
            return {
                ...rootState,
                edit: {...rootState.edit, id: '', type: ''}
            }
        default:
            return rootState
    }
}



export function useRootDispatch() {
  const ctx = useContext(RootDispatch);
  if (!ctx) throw new Error("useRootDispatch must be used within RootContextProvider");
  return ctx;
}

export function useRootState() {
  const ctx = useContext(RootContext);
  if (!ctx) throw new Error("useRootState must be used within RootContextProvider");
  return ctx;
}