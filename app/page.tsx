import RootComponent from "@/components/RootComponent";
import { WorkflowProvider } from "@/context/WorkflowContext";

export default function Home() {
  return (
    <WorkflowProvider>
        <RootComponent />
    </WorkflowProvider>
    
  )
}