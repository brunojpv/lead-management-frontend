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
    await invited.acceptLead(id)
    toast.success("Lead aceito com sucesso")
    invited.reload()
    accepted.reload()
  }

  const handleDecline = async (id: string) => {
    await invited.declineLead(id)
    toast.error("Lead recusado")
    invited.reload()
    accepted.reload()
    declined.reload()
  }

  return (
    <>
      {/* Container geral centralizado */}
      <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f9f9f9",
        padding: "32px"
      }}
>
        <div style={{ maxWidth: "768px", width: "100%" }}>
          <Tabs defaultValue="invited" className="w-full">
            <TabsList className="flex justify-center bg-muted rounded-lg mb-6">
              <TabsTrigger style={{ backgroundColor: "#FFFFFF", color: "#000000" }} value="invited">📨 Invited</TabsTrigger>
              <TabsTrigger style={{ backgroundColor: "#FFFFFF", color: "#000000" }} value="accepted">✅ Accepted</TabsTrigger>
              <TabsTrigger style={{ backgroundColor: "#FFFFFF", color: "#000000" }} value="declined">❌ Declined</TabsTrigger>
            </TabsList>

            {/* INVITED */}
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
              <div className="flex justify-between mt-6">
                <Button onClick={() => setInvitedPage((p) => Math.max(1, p - 1))} disabled={invitedPage === 1}>
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {invitedPage} de {invited.totalPages}
                </span>
                <Button onClick={() => setInvitedPage((p) => p + 1)} disabled={invitedPage === invited.totalPages}>
                  Próxima
                </Button>
              </div>
            </TabsContent>

            {/* ACCEPTED */}
            <TabsContent value="accepted">
              {accepted.loading && <p className="text-muted-foreground">Carregando...</p>}
              {accepted.leads.map((lead) => (
                <div key={lead.id} style={{ marginBottom: "24px" }}>
                  <AcceptedLeadCard lead={lead} />
                </div>
              ))}
              <div className="flex justify-between mt-6">
                <Button onClick={() => setAcceptedPage((p) => Math.max(1, p - 1))} disabled={acceptedPage === 1}>
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {acceptedPage} de {accepted.totalPages}
                </span>
                <Button onClick={() => setAcceptedPage((p) => p + 1)} disabled={acceptedPage === accepted.totalPages}>
                  Próxima
                </Button>
              </div>
            </TabsContent>

            {/* DECLINED */}
            <TabsContent value="declined">
              {declined.loading && <p className="text-muted-foreground">Carregando...</p>}
              {declined.leads.map((lead) => (
                <div key={lead.id} style={{ marginBottom: "24px" }}>
                  <DeclinedLeadCard lead={lead} />
                </div>
              ))}
              <div className="flex justify-between mt-6">
                <Button onClick={() => setDeclinedPage((p) => Math.max(1, p - 1))} disabled={declinedPage === 1}>
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {declinedPage} de {declined.totalPages}
                </span>
                <Button onClick={() => setDeclinedPage((p) => p + 1)} disabled={declinedPage === declined.totalPages}>
                  Próxima
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}


function Pagination({
  page,
  total,
  onChange
}: {
  page: number
  total: number
  onChange: (page: number) => void
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
      <Button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>
        Anterior
      </Button>
      <span style={{ fontSize: "14px", color: "#6b7280" }}>
        Página {page} de {total}
      </span>
      <Button onClick={() => onChange(page + 1)} disabled={page === total}>
        Próxima
      </Button>
    </div>
  )
}
