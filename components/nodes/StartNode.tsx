'use client';
import { PairType } from "@/types/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uid } from 'uuid';

export default function StartNode() {

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('')
    const [metadata, setMetadata] = useState<PairType[]>(
        [{id: uid(), key: '',value: ''}]
    )

    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        /* Disable the edit mode when click outside the node */
        function handleOutsideClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setEditMode(false);
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => { document.removeEventListener('click', handleOutsideClick)}
    }, [])

    const updateMetadata = (id: string, field: 'key' | 'value', value: string) => {
         setMetadata(metadataSnapshot => metadataSnapshot.map((item) => item.id === id ? {...item, [field]: value} : item));
    }

    const addMetadata = () => {
        setMetadata((metadataSnapshot) => [...metadataSnapshot, {id: uid(), key: '', value: ''}])
    }
    
    return (
        <section className="border border-[#ddd] rounded-md p-3 min-w-[300px]" 
        ref={containerRef}
        onClick={() => setEditMode(true)
        }>
            {
                editMode ?
                <>
                    {/* title input */}
                    <p className="text-lg font-semibold mb-2">Add Title</p>
                    <input type="text" 
                    placeholder="Enter title" 
                    className="border border-[#999] p-2 w-full"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTitle(e.target.value);
                    }}
                    onFocus={(e) => e.stopPropagation()}
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
                                    onChange={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        updateMetadata(item.id, 'key', e.target.value)
                                    }}
                                    onFocus={(e) => e.stopPropagation()}
                                    />

                                    <input type="text" 
                                    value={item.value} 
                                    className="border p-2 w-full"
                                    placeholder="Add new value"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        updateMetadata(item.id, 'value', e.target.value)
                                    }}
                                    onFocus={(e) => e.stopPropagation()}
                                    />
                                </section>
                            )
                        })
                    }

                    <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addMetadata()
                    }}
                    className="block w-fit mx-auto p-2 bg-blue-900 mt-2 text-white">
                        Add New Pair
                    </button>
                </>
                :
                <>
                    <p className="font-bold text-xl">{title}</p>
                    <hr className="my-2 border-[#ddd]"/>
                    {
                        metadata.map((pair, index) => {
                            return (
                                <section key={index} className="flex justify-between items-center gap-2">
                                    <p>{pair.key}</p>
                                    <p>{pair.value}</p>
                                </section>
                            )
                        })
                    }
                </>
            }
        </section>
    )
}