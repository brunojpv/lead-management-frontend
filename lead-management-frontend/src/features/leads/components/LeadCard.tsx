// src/features/leads/components/LeadCard.tsx
import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Briefcase, MapPin, Phone, Mail } from "lucide-react"

interface Props {
  lead: Lead
  onAccept?: () => void
  onDecline?: () => void
}

export function LeadCard({ lead, onAccept, onDecline }: Props) {
  const formattedDate = format(new Date(lead.createdAt), "MMMM d yyyy @ h:mm a")

  return (
    <Card className="shadow-sm border rounded-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {lead.firstName.charAt(0)}
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">{lead.firstName} {lead.lastName}</div>
            <div className="text-sm text-muted-foreground">{formattedDate}</div>
          </div>
        </div>

        <div className="flex items-center text-sm gap-4 text-muted-foreground mb-2 flex-wrap">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{lead.suburb}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{lead.category}</span>
          </div>
          <div className="">Job ID: <span className="font-medium">{lead.id.slice(0, 6).toUpperCase()}</span></div>
          <div className="flex items-center gap-1 text-orange-600">
            <Phone className="w-4 h-4" />
            <span>{lead.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-1 text-orange-600">
            <Mail className="w-4 h-4" />
            <span>{lead.email}</span>
          </div>
        </div>

        <p className="text-sm text-gray-800 mb-4 leading-relaxed">
          {lead.description || "Sem descrição."}
        </p>

        <div className="flex items-center justify-between">
          {onAccept && onDecline ? (
            <div className="flex gap-2">
              <Button onClick={onAccept} disabled={lead.status !== "Invited"}>Accept</Button>
              <Button variant="secondary" onClick={onDecline} disabled={lead.status !== "Invited"}>Decline</Button>
            </div>
          ) : <div />}

          <div className="text-sm font-semibold text-muted-foreground">
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
