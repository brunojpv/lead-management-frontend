import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
  lead: Lead
  onAccept?: () => void
  onDecline?: () => void
}

export function LeadCard({ lead, onAccept, onDecline }: Props) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="text-lg font-semibold">{lead.firstName} {lead.lastName}</div>
        <div className="text-sm text-muted-foreground">{lead.email} | {lead.phoneNumber}</div>
        <div className="text-sm">{lead.category} | {lead.suburb}</div>
        <div className="text-sm mb-2">Status: <strong>{lead.status}</strong></div>

        {(onAccept || onDecline) && (
          <div className="flex gap-2">
            {onAccept && (
              <Button onClick={onAccept} disabled={lead.status !== "Invited"}>
                Aceitar
              </Button>
            )}
            {onDecline && (
              <Button variant="destructive" onClick={onDecline} disabled={lead.status !== "Invited"}>
                Recusar
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
