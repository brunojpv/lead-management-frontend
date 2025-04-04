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
    <Card className="shadow-sm border rounded-md mb-6">
      <CardContent className="p-5">
        {/* Cabeçalho */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
          {/* Avatar circular com letra inicial */}
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              fontSize: "24px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              textTransform: "uppercase",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              minWidth: "64px"
            }}
          >
            {lead.firstName.charAt(0)}
          </div>

          {/* Nome e data */}
          <div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#000", marginBottom: "4px" }}>
              {lead.firstName} {lead.lastName}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" /* gray-500 */ }}>
              {formattedDate}
            </div>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div className="grid grid-cols-4 gap-x-8 gap-y-4 text-sm text-muted-foreground mb-6">
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

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-muted-foreground mb-6">
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
