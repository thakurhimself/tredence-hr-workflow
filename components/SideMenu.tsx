import { Workflow } from "lucide-react"

export default function SideMenu() {

    const onDragStart = (event: React.DragEvent<HTMLParagraphElement>, nodeType: string) => {
        event.dataTransfer?.setData('application/reactflow', nodeType)
    }

    const nodes = ['Start', 'Task', 'Approval', 'Automated', 'End']

    return (
        <section className="w-[250px] border-r-1 border-r-[#ddd]">
            <h1 className="font-bold text-lg text-red-900 my-2 ml-5">HR Workflow</h1>
            <hr className="mb-2 text-[#ddd]"/>
            <p className="font-semibold text-[#666] ml-5 mb-2">Nodes</p>
            {
                nodes.map((item, index) => {
                    return (
                        <p 
                        key={item+index}
                        className="ml-5 mb-2 flex item-center gap-4" 
                        draggable
                        onDragStart={(event: React.DragEvent<HTMLParagraphElement>) => onDragStart(event, item.toLowerCase())}
                        > 
                            <Workflow />
                            <span>{item} Node</span>
                        </p>
                    )
                })
            }
        </section>
    )
}