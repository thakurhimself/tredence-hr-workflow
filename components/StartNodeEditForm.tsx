'use client';
import { useRootDispatch } from "@/context/RootContext";
import { PairType } from "@/types/types";
import { X } from "lucide-react";
// import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { v4 as uid } from 'uuid';

export default function StartNodeEditForm() {

    const dispatch = useRootDispatch()

    // const flow = useReactFlow()
    const [title, setTitle] = useState('')
    const [metadata, setMetadata] = useState<PairType[]>([])

    const updateMetadata = (id: string, field: 'key' | 'value', value: string) => {
        setMetadata(metadataSnapshot => metadataSnapshot.map((item) => item.id === id ? {...item, [field]: value} : item));
    }

    return (
        <section className="w-full">
            <section className="flex justify-end">
                <button 
                className="cursor-pointer"
                onClick={() => dispatch({type: 'resetEdit'})}>
                    <X />
                </button>
            </section>
            <p className="text-center text-xl font-[900]">Start Node Edit</p>
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
            className="block w-full p-2 bg-blue-900 mt-2 text-white">
                Add New Pair
            </button>

            <button
            className="block w-fit mx-auto p-2 bg-blue-900 mt-2 text-white"
            >
                Save
            </button>
        </section>
    )
}