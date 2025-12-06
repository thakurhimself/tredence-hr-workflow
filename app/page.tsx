import RootComponent from "@/components/RootComponent";
import { RootContextProvider } from "@/context/RootContext";
import { WorkflowProvider } from "@/context/WorkflowContext";

export default function Home() {
  return (
    <WorkflowProvider>
      <RootContextProvider>
        <RootComponent />
      </RootContextProvider>
    </WorkflowProvider>
    
  )
}