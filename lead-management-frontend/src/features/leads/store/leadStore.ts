import { create } from "zustand"
import { Lead } from "../types"
import { getLeads, acceptLead, declineLead } from "../api"

interface LeadState {
  leads: Lead[]
  totalPages: number
  loading: boolean
  fetchLeads: (params: { page: number; status: string; search?: string }) => Promise<void>
  accept: (id: string) => Promise<void>
  decline: (id: string) => Promise<void>
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  totalPages: 1,
  loading: false,

  fetchLeads: async ({ page, status, search }) => {
    set({ loading: true })
    try {
      const res = await getLeads({ page, status, search })
      set({ leads: res.data, totalPages: res.totalPages })
    } catch (error) {
      console.error("Erro ao carregar leads", error)
    } finally {
      set({ loading: false })
    }
  },

  accept: async (id: string) => {
    await acceptLead(id)
    const updatedLeads = get().leads.filter((l) => l.id !== id)
    set({ leads: updatedLeads })
  },

  decline: async (id: string) => {
    await declineLead(id)
    const updatedLeads = get().leads.filter((l) => l.id !== id)
    set({ leads: updatedLeads })
  },
}))
