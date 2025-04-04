import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Briefcase, MapPin, Phone, Mail } from "lucide-react"

interface Props {
  lead: Lead
  onAccept: () => void
  onDecline: () => void
}

export function InvitedLeadCard({ lead, onAccept, onDecline }: Props) {
  const formattedDate = format(new Date(lead.createdAt), "MMMM d @ h:mm a")

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
              {lead.firstName}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" /* gray-500 */ }}>
              {formattedDate}
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        {/* Grade com dados principais */}
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
        </div>

        <hr className="my-6 border-t border-gray-200" />

        {/* Descrição */}
        <p className="text-sm text-gray-800 leading-relaxed mb-6">
          {lead.description || "Sem descrição."}
        </p>

        <hr className="my-6 border-t border-gray-200" />

        {/* Ações */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Button 
              onClick={onAccept}
              variant="custom"
              style={{backgroundColor: "#ea580c",  color: "#FFFFFF" }}
            >
              Accept
            </Button>
            
            <Button
              onClick={onDecline}
              variant="custom"
              style={{backgroundColor: "#E5E7EB",  color: "#000000" }}
            >
              Decline
            </Button>
          </div>

          <div className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
