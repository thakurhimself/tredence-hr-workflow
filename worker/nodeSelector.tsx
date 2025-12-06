import StartNodeEditForm from "@/components/editNodeForms/StartNodeEditForm";


export function nodeSelector(type: string) {
    switch(type) {
        case 'start':
            return <StartNodeEditForm />
        default:
            return null
    }
}