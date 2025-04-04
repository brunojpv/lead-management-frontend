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
            <div className="text-base font-semibold text-black">
              {lead.firstName}
            </div>
            <div className="text-sm text-gray-500">
              {formattedDate}
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        {/* Grade com dados principais */}
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

        {/* Descrição */}
        <p className="text-sm text-gray-800 leading-relaxed mb-6">
          {lead.description || "Sem descrição."}
        </p>

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
            ${lead.price.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
