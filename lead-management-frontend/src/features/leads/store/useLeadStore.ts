import { create } from "zustand"
import { Lead, PaginatedResponse } from "../types"
import { acceptLead as apiAcceptLead, declineLead as apiDeclineLead, getLeads } from "../api"

type LeadStatus = "Invited" | "Accepted" | "Declined"

interface LeadStore {
  leads: Record<LeadStatus, Lead[]>
  pages: Record<LeadStatus, number>
  totalPages: Record<LeadStatus, number>
  loading: boolean
  fetchLeads: (status: LeadStatus, page?: number) => Promise<void>
  acceptLead: (id: string) => Promise<void>
  declineLead: (id: string) => Promise<void>
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: {
    Invited: [],
    Accepted: [],
    Declined: []
  },
  pages: {
    Invited: 1,
    Accepted: 1,
    Declined: 1
  },
  totalPages: {
    Invited: 1,
    Accepted: 1,
    Declined: 1
  },
  loading: false,

  fetchLeads: async (status, page = 1) => {
    set({ loading: true })
    try {
      const response: PaginatedResponse<Lead> = await getLeads({ page, status })
      set((state) => ({
        leads: { ...state.leads, [status]: response.data },
        pages: { ...state.pages, [status]: page },
        totalPages: { ...state.totalPages, [status]: response.totalPages }
      }))
    } catch (error) {
      console.error("Erro ao buscar leads:", error)
    } finally {
      set({ loading: false })
    }
  },

  acceptLead: async (id) => {
    await apiAcceptLead(id)
    await get().fetchLeads("Invited", get().pages.Invited)
    await get().fetchLeads("Accepted", get().pages.Accepted)
  },

  declineLead: async (id) => {
    await apiDeclineLead(id)
    await get().fetchLeads("Invited", get().pages.Invited)
    await get().fetchLeads("Declined", get().pages.Declined)
  }
}))
