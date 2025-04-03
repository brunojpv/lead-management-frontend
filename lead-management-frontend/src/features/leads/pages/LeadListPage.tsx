import { useState } from "react"
import { useLeads } from "../hooks"
import { LeadCard } from "../components/LeadCard"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function LeadListPage() {
  const [page, setPage] = useState(1)

  const {
    leads,
    totalPages,
    acceptLead,
    declineLead,
    reload,
    loading
  } = useLeads({ page })

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todos os Leads</h1>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onAccept={async () => {
              await acceptLead(lead.id)
              toast.success(`Lead de ${lead.firstName} aceito`)
              reload()
            }}
            onDecline={async () => {
              await declineLead(lead.id)
              toast.error(`Lead de ${lead.firstName} recusado`)
              reload()
            }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Anterior
        </Button>
        <span className="text-sm">Página {page} de {totalPages}</span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
          Próxima
        </Button>
      </div>
    </div>
  )
}
