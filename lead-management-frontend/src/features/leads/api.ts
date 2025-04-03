import { Lead, PaginatedResponse } from "./types"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export async function getLeads({
  page = 1,
  search = "",
  status = ""
}: {
  page?: number
  search?: string
  status?: string
}): Promise<PaginatedResponse<Lead>> {
  const query = new URLSearchParams()

  query.append("pageNumber", String(page))
  query.append("pageSize", "5")
  if (search) query.append("search", search)
  if (status) query.append("status", status)

  const res = await fetch(`${BASE_URL}/api/leads?${query.toString()}`)
  if (!res.ok) throw new Error("Erro ao buscar leads")
 
  const json = await res.json()
  
  return {
    data: json.data ?? [],
    totalPages: json.totalPages ?? 1,
    currentPage: json.currentPage ?? page,
    pageSize: json.pageSize ?? 5,
    totalItems: json.totalItems ?? 0
  }
}

export async function acceptLead(id: string) {
  await fetch(`${BASE_URL}/api/leads/accept/${id}`, { method: "POST" })
}

export async function declineLead(id: string) {
  await fetch(`${BASE_URL}/api/leads/decline/${id}`, { method: "POST" })
}
