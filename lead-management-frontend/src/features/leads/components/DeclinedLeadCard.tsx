import { LeadCardBase } from "./LeadCardBase"
import { Lead } from "../types"

interface Props {
  lead: Lead
}

export function DeclinedLeadCard({ lead }: Props) {
  return (
    <LeadCardBase
      lead={lead}
      backgroundColor="#ef4444"
      showActions={false}
      showContact={true}
    />
  )
}
