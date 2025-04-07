import { LeadCardBase } from "./LeadCardBase"
import { Lead } from "../types"

interface Props {
  lead: Lead
}

export function AcceptedLeadCard({ lead }: Props) {
  return (
    <LeadCardBase
      lead={lead}
      backgroundColor="#22c55e"
      showActions={false}
      showContact={true}
    />
  )
}
