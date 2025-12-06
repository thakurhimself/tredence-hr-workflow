import { ReactNode } from "react";

export default function Panel({children}: {children: ReactNode}) {
    return (
        <section className="fixed z-[100] w-[400px] p-3 h-full top-0 right-0 bg-white shadow-2xl">
            {children}
        </section>
    )
}