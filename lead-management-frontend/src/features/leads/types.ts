export interface Lead {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    suburb: string
    category: string
    description: string
    price: number
    status: string
    createdAt: string
  }
  
  export interface PaginatedResponse<T> {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
    data: T[]
  }
  