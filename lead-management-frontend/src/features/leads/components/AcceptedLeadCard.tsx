import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, Phone, Mail } from "lucide-react"
import { format } from "date-fns"

interface Props {
  lead: Lead
}

export function AcceptedLeadCard({ lead }: Props) {
  const formattedDate = format(new Date(lead.createdAt), "MMMM d yyyy @ h:mm a")

  return (
    <Card className="shadow-sm border rounded-md mb-6">
      <CardContent className="p-6">
        {/* Cabeçalho */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-muted-foreground mb-6">
          {/* Avatar circular com letra inicial */}
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              fontSize: "24px",
            }}
            className="rounded-full flex items-center justify-center font-bold uppercase shadow-sm"
          >
            {lead.firstName.charAt(0)}
          </div>

          {/* Nome e data */}
          <div>
            <div className="text-base font-semibold">
              {lead.firstName} {lead.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {formattedDate}
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        {/* Dados organizados em grade */}
        <div className="grid grid-cols-4 gap-x-8 gap-y-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{lead.suburb}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>{lead.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Job ID:</span>
            <span className="font-medium">{lead.id.slice(0, 6).toUpperCase()}</span>
          </div>

          <div className="text-sm font-semibold text-muted-foreground">
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        {/* Contato */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2 text-orange-600">
            <Phone className="w-4 h-4" />
            <span style={{ color: "#ea580c" }}>{lead.phoneNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-orange-600">
            <Mail className="w-4 h-4" />
            <span style={{ color: "#ea580c" }}>{lead.email}</span>
          </div>
        </div>

        <p className="text-sm text-gray-800 mb-2">{lead.description}</p>
      </CardContent>
    </Card>
  )
}
