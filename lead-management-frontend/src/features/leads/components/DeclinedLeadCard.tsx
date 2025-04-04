import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { Briefcase, MapPin, Phone, Mail } from "lucide-react"

interface Props {
  lead: Lead
}

export function DeclinedLeadCard({ lead }: Props) {
  const formattedDate = format(new Date(lead.createdAt), "MMMM d yyyy @ h:mm a")

  return (
    <Card className="shadow-md border rounded-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {lead.firstName.charAt(0)}
          </div>
          <div>
            <div className="text-base font-semibold">{lead.firstName} {lead.lastName}</div>
            <div className="text-sm text-muted-foreground">{formattedDate}</div>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div className="flex flex-wrap items-center text-sm gap-4 text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{lead.suburb}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{lead.category}</span>
          </div>
          <div>Job ID:
            <span className="font-medium">{lead.id.slice(0, 6).toUpperCase()}</span>
          </div>
          <div className="text-sm font-semibold text-muted-foreground text-right">
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div className="flex flex-wrap items-center gap-4 mb-2 text-sm">
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" style={{ color: "#ea580c" }} />
            <span style={{ color: "#ea580c" }}>{lead.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" style={{ color: "#ea580c" }} />
            <span style={{ color: "#ea580c" }}>{lead.email}</span>
          </div>
        </div>

        <p className="text-sm text-gray-800 mb-2">{lead.description}</p>
      </CardContent>
    </Card>
  )
}
