
export default function SideMenu() {

    const onDragStart = (event: React.DragEvent<HTMLParagraphElement>, nodeType: string) => {
        event.dataTransfer?.setData('application/reactflow', nodeType)
    }

    return (
        <section className="w-[200px] border-r-1 border-r-[#ddd]">
            <h1 className="font-bold text-lg text-red-900 my-2 ml-5">HR Workflow</h1>
            <hr className="mb-2 text-[#ddd]"/>
            <p className="font-semibold text-[#666] ml-5 mb-2">Nodes</p>
            <p 
            className="ml-7 mb-2" 
            draggable
            onDragStart={(event: React.DragEvent<HTMLParagraphElement>) => onDragStart(event, 'start')}
            > 
                Start Node 
            </p>
            <p 
            className="ml-7 mb-2" 
            draggable
            onDragStart={(event: React.DragEvent<HTMLParagraphElement>) => onDragStart(event, 'task')}
            > 
                Task Node 
            </p>
            <p className="ml-7 mb-2" draggable
            onDragStart={(event: React.DragEvent<HTMLParagraphElement>) => onDragStart(event, 'approval')}
            > 
                Approval Node 
            </p>
            <p 
            className="ml-7 mb-2" draggable
            onDragStart={(event: React.DragEvent<HTMLParagraphElement>) => onDragStart(event, 'automated')}
            > 
                Automated Node 
            </p>

            <p className="ml-7 mb-2" draggable
            onDragStart={(event: React.DragEvent<HTMLParagraphElement>) => onDragStart(event, 'end')}
            > 
                End Node 
            </p>
        </section>
    )
}