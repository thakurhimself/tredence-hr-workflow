import ApprovalNodeEditForm from "@/components/editNodeForms/ApprovalNodeEditForm";
import StartNodeEditForm from "@/components/editNodeForms/StartNodeEditForm";
import TaskNodeEditForm from "@/components/editNodeForms/TaskNodeEditForm";


export function nodeSelector(type: string) {
    switch(type) {
        case 'start':
            return <StartNodeEditForm />
        case 'task':
            return <TaskNodeEditForm />
        case 'approval':
            return <ApprovalNodeEditForm />
        default:
            return null
    }
}