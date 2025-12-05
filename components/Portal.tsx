
import { ReactNode } from "react";

export default function Portal(
    {children}: 
    {children: ReactNode}
) {
    return (
        <section 
        className="fixed z-[3500] inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
            <section
            className="w-[95%] md:w-3/4 lg:w-1/2 xl:w-1/4 bg-white p-3 rounded-lg"
            >
                {children}
            </section>
        </section>
    )
}