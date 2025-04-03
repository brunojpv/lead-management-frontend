import { useEffect, useState } from "react"
import { getLeads, acceptLead, declineLead } from "./api"
import { Lead } from "./types"

export function useLeads({ page = 1, search = "", status = "" }: {
  page?: number
  search?: string
  status?: string
}) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getLeads({ page, search, status })
      console.log("Leads recebidos:", data)
      setLeads(data.data)
      setTotalPages(data.totalPages)
    } catch (e) {
      console.error("Erro ao carregar leads", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [page, search, status])

  return {
    leads,
    loading,
    totalPages,
    acceptLead,
    declineLead,
    reload: load,
  }
}
