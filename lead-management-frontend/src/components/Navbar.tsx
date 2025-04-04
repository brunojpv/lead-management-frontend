// src/components/Navbar.tsx
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onNewLead: () => void
}

export function Navbar({ onNewLead }: NavbarProps) {
  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🚀 <span className="text-2xl">Lead Management</span>
        </h1>
        <Button onClick={onNewLead}>+ Novo Lead</Button>
      </div>
    </header>
  )
}
