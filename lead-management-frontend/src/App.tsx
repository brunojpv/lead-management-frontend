import LeadTabsPage from "@/features/leads/pages/LeadTabsPage"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <LeadTabsPage />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
