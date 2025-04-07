import { LeadCardBase } from "./LeadCardBase"
import { Lead } from "../types"

export function AcceptedLeadCard({ lead }: { lead: Lead }) {
  return <LeadCardBase lead={lead} backgroundColor="#22c55e" />
}
