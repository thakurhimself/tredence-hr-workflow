import RootComponent from "@/components/RootComponent";
import { RootContextProvider } from "@/context/RootContext";

export default function Home() {
  return (
    <RootContextProvider>
      <RootComponent />
    </RootContextProvider>
  )
}