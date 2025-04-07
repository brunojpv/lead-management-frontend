import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { InvitedLeadCard } from "../components/InvitedLeadCard"
import { AcceptedLeadCard } from "../components/AcceptedLeadCard"
import { DeclinedLeadCard } from "../components/DeclinedLeadCard"
import { useLeadStore } from "@/store/leadStore"

export default function LeadTabsPage() {
  const [tab, setTab] = useState("invited")
  const {
    leads,
    loading,
    totalPages,
    currentPage,
    fetchLeads,
    acceptLeadById,
    declineLeadById,
  } = useLeadStore()

  useEffect(() => {
    fetchLeads(1, "", tabToStatus(tab))
  }, [tab])

  const tabToStatus = (tab: string) => {
    if (tab === "accepted") return "Accepted"
    if (tab === "declined") return "Declined"
    return "Invited"
  }

  const handleAccept = async (id: string) => {
    await acceptLeadById(id)
    toast.success("Lead aceito com sucesso")
  }

  const handleDecline = async (id: string) => {
    await declineLeadById(id)
    toast.error("Lead recusado")
  }

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
      <h1 className="text-3xl font-bold text-center mb-6">📋 Gestão de Leads</h1>

      <Tabs defaultValue="invited" onValueChange={setTab} className="w-full">
        <TabsList className="flex justify-center bg-muted rounded-lg mb-4">
          <TabsTrigger value="invited">📨 Invited</TabsTrigger>
          <TabsTrigger value="accepted">✅ Accepted</TabsTrigger>
          <TabsTrigger value="declined">❌ Declined</TabsTrigger>
        </TabsList>

        {/* Reutiliza o mesmo layout para as 3 abas */}
        <TabsContent value={tab}>
          {loading && <p className="text-muted-foreground">Carregando...</p>}
          {leads.map((lead) => (
            <div key={lead.id} style={{ marginBottom: "24px" }}>
              {tab === "invited" && (
                <InvitedLeadCard lead={lead} onAccept={() => handleAccept(lead.id)} onDecline={() => handleDecline(lead.id)} />
              )}
              {tab === "accepted" && <AcceptedLeadCard lead={lead} />}
              {tab === "declined" && <DeclinedLeadCard lead={lead} />}
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <Button onClick={() => fetchLeads(currentPage - 1, "", tabToStatus(tab))} disabled={currentPage === 1}>
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() => fetchLeads(currentPage + 1, "", tabToStatus(tab))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
