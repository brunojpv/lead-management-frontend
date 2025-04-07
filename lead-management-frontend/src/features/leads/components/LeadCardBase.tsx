import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Briefcase, MapPin, Mail, Phone } from "lucide-react"

interface Props {
  lead: Lead
  showActions?: boolean
  showContact?: boolean
  onAccept?: () => void
  onDecline?: () => void
  backgroundColor?: string
}

export function LeadCardBase({
  lead,
  showActions = false,
  showContact = false,
  onAccept,
  onDecline,
  backgroundColor = "#ea580c",
}: Props) {
  const formattedDate = format(new Date(lead.createdAt), "MMMM d @ h:mm a")

  return (
    <Card
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "0px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      }}
    >
      <CardContent
        className="p-6"
        style={{
          height: "460px",
          width: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "24px",
        }}
      >
        {/* Avatar e nome */}
        <div className="flex gap-4 mb-6 items-start">
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor,
              color: "#fff",
              fontSize: "24px",
              marginLeft: "12px",
              marginTop: "12px",
            }}
            className="rounded-full flex items-center justify-center font-bold uppercase shadow-sm"
          >
            {lead.firstName.charAt(0)}
          </div>
          <div style={{ marginLeft: "12px", marginTop: "20px" }}>
            <div className="text-base font-bold text-black">
              {lead.firstName} {lead.lastName}
            </div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
        </div>

        <hr style={{ margin: "24px 0", width: "700px", borderTop: "1px solid #e5e7eb" }} />

        {/* Informações principais */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "6px",
            fontSize: "14px",
            color: "#000000",
            marginTop: "18px",
            height: "8px",
          }}
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{lead.suburb}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{lead.category}</span>
          </div>
          <div>
            Job ID:{" "}
            <span className="font-medium">
              {lead.id.slice(0, 6).toUpperCase()}
            </span>
          </div>
          <div className="text-sm font-semibold text-muted-foreground text-right">
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>

        <hr style={{ margin: "24px 0", width: "700px", borderTop: "1px solid #e5e7eb" }} />

        {/* Contato (opcional) */}
        {showContact && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "6px",
              fontSize: "14px",
              color: "#ea580c",
              marginTop: "18px",
              marginBottom: "16px",
            }}
          >
            <div className="flex items-center gap-1">
              <Phone style={{ width: 16, height: 16, color: "#ea580c" }} />
              <span>{lead.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail style={{ width: 16, height: 16, color: "#ea580c" }} />
              <span>{lead.email}</span>
            </div>
          </div>
        )}

        {/* Descrição */}
        <p style={{height: "10px"}} className="text-sm text-gray-800 leading-relaxed mb-4">
          {lead.description || "Sem descrição."}
        </p>

        <hr style={{ margin: "24px 0", width: "700px", borderTop: "1px solid #e5e7eb" }} />

        {/* Ações (apenas para Invited) */}
        {showActions && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button
                style={{ backgroundColor: "#ea580c", color: "#fff" }}
                className="px-6"
                onClick={onAccept}
                disabled={lead.status !== "Invited"}
              >
                Accept
              </Button>
              <Button
                style={{ backgroundColor: "#9ca3af", color: "#000" }}
                className="px-6"
                onClick={onDecline}
                disabled={lead.status !== "Invited"}
              >
                Decline
              </Button>
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              ${lead.price.toFixed(2)} Lead Invitation
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
