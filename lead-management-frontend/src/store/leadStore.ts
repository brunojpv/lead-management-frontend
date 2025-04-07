// src/store/leadStore.ts
import { create } from "zustand"
import { Lead, PaginatedResponse } from "@/features/leads/types"
import { getLeads, acceptLead, declineLead } from "@/features/leads/api"

interface LeadStore {
  leads: Lead[]
  loading: boolean
  totalPages: number
  currentPage: number
  status: string
  search: string
  fetchLeads: (page?: number, search?: string, status?: string) => Promise<void>
  acceptLeadById: (id: string) => Promise<void>
  declineLeadById: (id: string) => Promise<void>
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
  status: "Invited",
  search: "",

  fetchLeads: async (page = 1, search = "", status = "Invited") => {
    set({ loading: true })
    try {
      const res: PaginatedResponse<Lead> = await getLeads({ page, search, status })
      set({
        leads: res.data,
        totalPages: res.totalPages,
        currentPage: res.currentPage,
        status,
        search,
      })
    } catch (err) {
      console.error("Erro ao buscar leads:", err)
    } finally {
      set({ loading: false })
    }
  },

  acceptLeadById: async (id: string) => {
    await acceptLead(id)
    await get().fetchLeads(get().currentPage, get().search, get().status)
  },

  declineLeadById: async (id: string) => {
    await declineLead(id)
    await get().fetchLeads(get().currentPage, get().search, get().status)
  },
}))
