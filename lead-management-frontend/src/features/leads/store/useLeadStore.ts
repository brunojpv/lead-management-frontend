import { create } from "zustand"
import { Lead, PaginatedResponse } from "../types"
import { getLeads, acceptLead, declineLead } from "../api"

interface LeadsState {
  leads: Lead[]
  totalPages: number
  loading: boolean
  fetchLeads: (page: number, status: string, search?: string) => Promise<void>
  acceptLeadById: (id: string) => Promise<void>
  declineLeadById: (id: string) => Promise<void>
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: [],
  totalPages: 1,
  loading: false,

  fetchLeads: async (page, status, search = "") => {
    set({ loading: true })
    try {
      const response: PaginatedResponse<Lead> = await getLeads({ page, status, search })
      set({ leads: response.data, totalPages: response.totalPages })
    } catch (error) {
      console.error("Erro ao buscar leads:", error)
    } finally {
      set({ loading: false })
    }
  },

  acceptLeadById: async (id: string) => {
    await acceptLead(id)
    const updated = get().leads.map(lead => lead.id === id ? { ...lead, status: "Accepted", price: lead.price > 500 ? lead.price * 0.9 : lead.price } : lead)
    set({ leads: updated })
  },

  declineLeadById: async (id: string) => {
    await declineLead(id)
    const updated = get().leads.map(lead => lead.id === id ? { ...lead, status: "Declined" } : lead)
    set({ leads: updated })
  }
}))
