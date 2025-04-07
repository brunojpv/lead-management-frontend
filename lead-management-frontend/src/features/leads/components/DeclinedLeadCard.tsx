import { LeadCardBase } from "./LeadCardBase"
import { Lead } from "../types"

export function DeclinedLeadCard({ lead }: { lead: Lead }) {
  return <LeadCardBase lead={lead} backgroundColor="#ef4444" />
}
