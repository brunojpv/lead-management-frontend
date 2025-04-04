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

        <hr className="my-6 border-t border-gray-200" />

        {/* Dados organizados em grade */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, auto)",
            gap: "2px 8px",
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "12px",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin style={{ width: "14px", height: "14px" }} />
            <span>{lead.suburb}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Briefcase style={{ width: "14px", height: "14px" }} />
            <span>{lead.category}</span>
          </div>

          <div>
            Job ID:{" "}
            <span>{lead.id.slice(0, 6).toUpperCase()}</span>
          </div>

          <div style={{ textAlign: "left" }}>
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        {/* Contato */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, auto)",
            gap: "2px 8px",
            fontSize: "14px",
            color: "#ea580c",
            marginBottom: "12px",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Phone style={{ width: "14px", height: "14px", color: "#ea580c" }} />
            <span>{lead.phoneNumber}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Mail style={{ width: "14px", height: "14px", color: "#ea580c" }} />
            <span>{lead.email}</span>
          </div>
        </div>

        <p className="text-sm text-gray-800 mb-2">{lead.description}</p>
      </CardContent>
    </Card>
  )
}
