import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useState } from "react"
import { Label } from "@/components/ui/label"

const schema = z.object({
  firstName: z.string().min(2, "Nome é obrigatório"),
  lastName: z.string().min(2, "Sobrenome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phoneNumber: z.string().min(8, "Telefone inválido"),
  suburb: z.string().min(1, "Bairro é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.coerce.number().positive("Preço deve ser positivo"),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export function NewLeadModal({ open, onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      toast.success("Lead criado com sucesso!")
      reset()
      onCreated()
      onClose()
    } catch {
      toast.error("Erro ao criar lead")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Nome</Label>
              <Input placeholder="Nome" {...register("firstName")} />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label>Sobrenome</Label>
              <Input placeholder="Sobrenome" {...register("lastName")} />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <Label>E-mail</Label>
            <Input placeholder="E-mail" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label>Telefone</Label>
            <Input placeholder="Telefone" {...register("phoneNumber")} />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <Label>Bairro</Label>
            <Input placeholder="Bairro" {...register("suburb")} />
            {errors.suburb && <p className="text-sm text-red-500">{errors.suburb.message}</p>}
          </div>

          <div>
            <Label>Categoria</Label>
            <Input placeholder="Categoria" {...register("category")} />
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea placeholder="Descrição" {...register("description")} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <Label>Preço</Label>
            <Input type="number" step="0.01" placeholder="Preço" {...register("price")} />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Salvando..." : "Salvar Lead"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
