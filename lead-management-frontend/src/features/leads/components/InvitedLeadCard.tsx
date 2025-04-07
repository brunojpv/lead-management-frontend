import { LeadCardBase } from "./LeadCardBase"
import { Lead } from "../types"

export function InvitedLeadCard({ lead, onAccept, onDecline }: {
  lead: Lead
  onAccept: () => void
  onDecline: () => void
}) {
  return (
    <LeadCardBase
      lead={lead}
      showActions
      onAccept={onAccept}
      onDecline={onDecline}
      backgroundColor="#ea580c"
    />
  )
}
