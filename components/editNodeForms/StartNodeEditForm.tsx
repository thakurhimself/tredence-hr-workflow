'use client';
import { useWorkflowDispatch, useWorkflowState } from "@/context/WorkflowContext";
import { PairType } from "@/types/types";
import { X, PencilRuler } from "lucide-react";
import { useState } from "react";
import { v4 as uid } from 'uuid';

export default function StartNodeEditForm() {
    const state = useWorkflowState()
    const dispatch = useWorkflowDispatch()

    const { id } = state.selectedNode

    const initTitle = state.nodeRecord[id]?.type === 'start' ? state.nodeRecord[id]?.['title'] : "";
    const initMetaData = state.nodeRecord[id]?.type === 'start' ? state.nodeRecord[id].pair : [];

    const [title, setTitle] = useState(initTitle)
    const [metadata, setMetadata] = useState<PairType[]>(initMetaData)

    const updateMetadata = (id: string, field: 'key' | 'value', value: string) => {
        setMetadata(metadataSnapshot => metadataSnapshot.map((item) => item.id === id ? {...item, [field]: value} : item));
    }

    return (
        <section className="w-full">
            <section className="flex justify-end">
                <button 
                className="cursor-pointer"
                onClick={() => dispatch({type: 'UNSELECT_NODE'})}>
                    <X />
                </button>
            </section>

            <p className="text-xl text-center font-[900] mb-3 flex items-center gap-2 justify-center">
                <PencilRuler />
                <span>Task Node</span>
            </p>

            <p className="text-lg font-semibold mb-2">Add Title</p>
            <input type="text" 
            placeholder="Enter title" 
            className="border border-[#999] p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            {/* optional add metadata */}
            <p className="text-lg font-semibold my-2">Add Metadata</p>
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
                            onChange={(e) => updateMetadata(item.id, 'key', e.target.value)}
                            />

                            <input type="text" 
                            value={item.value} 
                            className="border p-2 w-full"
                            placeholder="Add new value"
                            onChange={(e) => updateMetadata(item.id, 'value', e.target.value)}
                            />
                        </section>
                    )
                })
            }

            <button 
            onClick={() => setMetadata(prev => [...prev, {id: uid(), key: '', value: ''}])}
            className="block w-full p-2 bg-blue-900 hover:bg-blue-500 cursor-pointer mt-2 text-white">
                Add Metadata
            </button>

            <button
            className="w-full p-2 cursor-pointer bg-blue-700 hover:bg-blue-500 mt-2 text-white"
            onClick={() => {
                dispatch({
                    type: 'UPDATE_NODE_RECORD',
                    load: {
                        id: state.selectedNode.id,
                        data: {
                            type: 'start',
                            title,
                            pair: metadata
                        }
                    }
                })
            }}
            >
                Save
            </button>
        </section>
    )
}