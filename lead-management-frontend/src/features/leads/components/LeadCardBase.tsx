import { Lead } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Briefcase, MapPin, Mail, Phone } from "lucide-react"

interface Props {
  lead: Lead
  showActions?: boolean
  onAccept?: () => void
  onDecline?: () => void
  backgroundColor?: string
}

export function LeadCardBase({
  lead,
  showActions = false,
  onAccept,
  onDecline,
  backgroundColor = "#ea580c",
}: Props) {
  const formattedDate = format(new Date(lead.createdAt), "MMMM d @ h:mm a")

  return (
    <Card className="shadow-sm border rounded-md">
      <CardContent className="p-6">
        {/* Avatar e nome */}
        <div className="flex items-center gap-4 mb-6">
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor,
              color: "#fff",
              fontSize: "24px",
            }}
            className="rounded-full flex items-center justify-center font-bold uppercase shadow-sm"
          >
            {lead.firstName.charAt(0)}
          </div>
          <div style={{ marginLeft: "12px" }}>
            <div className="text-base font-bold text-black">{lead.firstName} {lead.lastName}</div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
        </div>

        {/* Infos */}
        <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{lead.suburb}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{lead.category}</span>
          </div>
          <div>
            Job ID: <span className="font-medium">{lead.id.slice(0, 6).toUpperCase()}</span>
          </div>
          <div className="text-sm font-semibold text-muted-foreground text-right">
            ${lead.price.toFixed(2)} Lead Invitation
          </div>
        </div>

        {/* Contato */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px 2px",
            fontSize: "14px",
            color: "#ea580c",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Phone style={{ width: "16px", height: "16px", color: "#ea580c" }} />
            <span>{lead.phoneNumber}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Mail style={{ width: "16px", height: "16px", color: "#ea580c" }} />
            <span>{lead.email}</span>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          {lead.description || "Sem descrição."}
        </p>

        {/* Ações */}
        {showActions && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button
                onClick={onAccept}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                disabled={lead.status !== "Invited"}
              >
                Aceitar
              </Button>
              <Button
                variant="outline"
                className="text-black border px-6"
                onClick={onDecline}
                disabled={lead.status !== "Invited"}
              >
                Recusar
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
