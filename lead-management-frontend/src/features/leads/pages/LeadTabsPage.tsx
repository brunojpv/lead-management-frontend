import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLeads } from "../hooks"
import { InvitedLeadCard } from "../components/InvitedLeadCard"
import { AcceptedLeadCard } from "../components/AcceptedLeadCard"
import { DeclinedLeadCard } from "../components/DeclinedLeadCard"

export default function LeadTabsPage() {
  const [invitedPage, setInvitedPage] = useState(1)
  const [acceptedPage, setAcceptedPage] = useState(1)
  const [declinedPage, setDeclinedPage] = useState(1)

  const invited = useLeads({ page: invitedPage, status: "Invited" })
  const accepted = useLeads({ page: acceptedPage, status: "Accepted" })
  const declined = useLeads({ page: declinedPage, status: "Declined" })

  const handleAccept = async (id: string) => {
    try {
      await invited.acceptLead(id)
      toast.success("Lead aceito com sucesso")
      invited.reload()
      accepted.reload()
    } catch {
      toast.error("Erro ao aceitar o lead")
    }
  }

  const handleDecline = async (id: string) => {
    try {
      await invited.declineLead(id)
      toast.error("Lead recusado")
      invited.reload()
      accepted.reload()
      declined.reload()
    } catch {
      toast.error("Erro ao recusar o lead")
    }
  }

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "768px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", textAlign: "center" }}>
          📋 Gestão de Leads
        </h1>

        <Tabs defaultValue="invited" style={{ width: "100%" }}>
        <TabsList
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            maxWidth: "768px", // igual ao max-w-3xl (~768px)
            margin: "0 auto 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "0px",
            backgroundColor: "#f9fafb",
          }}
        >
          <TabsTrigger
            value="invited"
            style={{
              width: "253px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "12px 0",
              border: "none",
            }}
          >
            Invited
          </TabsTrigger>

          <TabsTrigger
            value="accepted"
            style={{
              width: "253px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "12px 0",
              border: "none",
            }}
          >
            Accepted
          </TabsTrigger>

          <TabsTrigger
            value="declined"
            style={{
              width: "253px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "12px 0",
              border: "none",
            }}
          >
            Declined
          </TabsTrigger>
        </TabsList>

          {/* Invited */}
          <TabsContent value="invited">
            {invited.loading && <p className="text-muted-foreground">Carregando...</p>}
            {invited.leads.map((lead) => (
              <div key={lead.id} style={{ marginBottom: "24px" }}>
                <InvitedLeadCard
                  lead={lead}
                  onAccept={() => handleAccept(lead.id)}
                  onDecline={() => handleDecline(lead.id)}
                />
              </div>
            ))}
            <Pagination page={invitedPage} setPage={setInvitedPage} totalPages={invited.totalPages} />
          </TabsContent>

          {/* Accepted */}
          <TabsContent value="accepted">
            {accepted.loading && <p className="text-muted-foreground">Carregando...</p>}
            {accepted.leads.map((lead) => (
              <div key={lead.id} style={{ marginBottom: "24px" }}>
                <AcceptedLeadCard lead={lead} />
              </div>
            ))}
            <Pagination page={acceptedPage} setPage={setAcceptedPage} totalPages={accepted.totalPages} />
          </TabsContent>

          {/* Declined */}
          <TabsContent value="declined">
            {declined.loading && <p className="text-muted-foreground">Carregando...</p>}
            {declined.leads.map((lead) => (
              <div key={lead.id} style={{ marginBottom: "24px" }}>
                <DeclinedLeadCard lead={lead} />
              </div>
            ))}
            <Pagination page={declinedPage} setPage={setDeclinedPage} totalPages={declined.totalPages} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function Pagination({ page, setPage, totalPages }: { page: number, setPage: (page: number) => void, totalPages: number }) {
  return (
    <div className="flex justify-between mt-6">
      <Button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
        Anterior
      </Button>
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      <Button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Próxima
      </Button>
    </div>
  )
}
