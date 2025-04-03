import { useState } from "react"
import { useLeads } from "../hooks"
import { LeadCard } from "../components/LeadCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function LeadTabsPage() {
  const [invitedPage, setInvitedPage] = useState(1)
  const [acceptedPage, setAcceptedPage] = useState(1)

  const invited = useLeads({ page: invitedPage, status: "Invited" })
  const accepted = useLeads({ page: acceptedPage, status: "Accepted" })

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      <Tabs defaultValue="invited" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="invited">Convidados</TabsTrigger>
          <TabsTrigger value="accepted">Aceitos</TabsTrigger>
        </TabsList>

        {/* TAB: INVITED */}
        <TabsContent value="invited">
          {invited.loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {invited.leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onAccept={async () => {
                      await invited.acceptLead(lead.id)
                      toast.success(`Lead de ${lead.firstName} aceito com sucesso!`)
                      invited.reload()
                      accepted.reload()
                    }}
                    onDecline={async () => {
                      await invited.declineLead(lead.id)
                      toast.error(`Lead de ${lead.firstName} recusado.`)
                      invited.reload()
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button onClick={() => setInvitedPage((p) => Math.max(1, p - 1))} disabled={invitedPage === 1}>
                  Anterior
                </Button>
                <span className="text-sm">Página {invitedPage} de {invited.totalPages}</span>
                <Button onClick={() => setInvitedPage((p) => p + 1)} disabled={invitedPage >= invited.totalPages}>
                  Próxima
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        {/* TAB: ACCEPTED */}
        <TabsContent value="accepted">
          {accepted.loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {accepted.leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button onClick={() => setAcceptedPage((p) => Math.max(1, p - 1))} disabled={acceptedPage === 1}>
                  Anterior
                </Button>
                <span className="text-sm">Página {acceptedPage} de {accepted.totalPages}</span>
                <Button onClick={() => setAcceptedPage((p) => p + 1)} disabled={acceptedPage >= accepted.totalPages}>
                  Próxima
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
