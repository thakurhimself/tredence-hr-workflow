'use client';
import { ActionType, PairType } from "@/types/types";
import { useWorkflowState, useWorkflowDispatch } from "@/context/WorkflowContext";
import { X, PencilRuler } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uid } from "uuid";

export default function AutomatedNodeEditForm() {

    const state = useWorkflowState();
    const dispatch = useWorkflowDispatch();

    const { id } = state.selectedNode;


    const [title, setTitle] = useState<string>(state.nodeRecord[id]?.type === 'automated' ? state.nodeRecord[id]?.title : '')
    const [actionId, setActionId] = useState<string>(state.nodeRecord[id]?.type === 'automated' ? state.nodeRecord[id]?.actionId : '')
    const [params, setParams] = useState<PairType[]>(state.nodeRecord[id]?.type === 'automated' ? state.nodeRecord[id]?.params : [])

    // actions state
    const [actions, setActions] = useState<ActionType[]>([])

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
    }, [actions])

    const changeParams = (id: string, value: string) => {
        return setParams(paramsSnapshot => paramsSnapshot.map((param) => param.id === id ? {...param, value} : param))
    }

    return (
        <div className="w-full">
            <div className="flex justify-end cursor-pointer">
                <button
                className="cursor-pointer"
                onClick={() => dispatch({type: 'UNSELECT_NODE'})}
                >
                    <X />
                </button>
            </div>
            
            <p className="text-xl text-center font-[900] mb-3 flex items-center gap-2 justify-center">
                <PencilRuler />
                <span>Automated Step Node</span>
            </p>

            {/* title */}
            <p className="text-lg font-semibold mb-1">Title</p>
            <input type="text" 
            name="title"
            placeholder="Title" 
            className="w-full mb-3 p-2 border border-[#999] mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />

            {/* choose action */}
            <select 
            onChange={(e) => {
                if (!e.target.value) {
                    setParams([])
                    return
                }
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
                    <p className="font-semibold mb-1 text-lg">Action Parameters</p>
                    {
                        params.map((item) => {
                            return (
                                <section key={item.id} className="flex items-center justify-between">
                                    <span className="capitalize">{item.key}</span>
                                    <input 
                                    type='text'
                                    onChange={(e) => changeParams(item.id, e.target.value)}
                                    className="border border-[#ddd] outline-none"
                                    />
                                </section>
                            )
                        })
                    }
                    
                </>

            }


            <button
            className="w-full p-2 bg-blue-700 hover:bg-blue-500 mt-2 text-white cursor-pointer"
            onClick={() => {
                dispatch({
                    type: 'UPDATE_NODE_RECORD',
                    load: {
                        id: id,
                        data: {
                            type: 'automated',
                            title,
                            actionId,
                            params
                        }
                    }
                })
            }}
            >
                Save
            </button>
        </div>
    )
}