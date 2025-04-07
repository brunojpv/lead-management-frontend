import { LeadCardBase } from "./LeadCardBase"
import { Lead } from "../types"

interface Props {
  lead: Lead
  onAccept: () => void
  onDecline: () => void
}

export function InvitedLeadCard({ lead, onAccept, onDecline }: Props) {
  return (
    <LeadCardBase
      lead={lead}
      onAccept={onAccept}
      onDecline={onDecline}
      backgroundColor="#ea580c"
      showActions={true}
      showContact={false}
    />
  )
}
