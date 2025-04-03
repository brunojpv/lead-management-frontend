# 💻 Lead Management Front-End (React + Vite)

Interface web para o sistema de gerenciamento de leads. Construída com **React 18 + Vite**, estilização com **Tailwind CSS** e componentes modernos usando **shadcn/ui**. Comunicação com a API via `fetch`, com filtros, paginação e controle de status dos leads.

---

## 🧰 Tecnologias

- ⚛️ React 18 + Vite
- 🎨 Tailwind CSS + shadcn/ui
- 🚦 React Router DOM
- 📦 TypeScript
- 🍃 Arquitetura modular (hooks, features, components)
- 🧪 Testado com a API real (localhost:5000)

---

## 🖼️ Funcionalidades

- ✅ Tabs com separação por status: `Invited`, `Accepted`
- ✅ Paginação dinâmica
- ✅ Ações para aceitar/recusar leads
- ✅ Toasts com feedback visual (usando **sonner**)
- ✅ Consumo direto da API com suporte a query params
- ✅ Integração pronta com autenticação JWT (token fake)

---

## 🚀 Como rodar o projeto

### ▶️ 1. Acesse a pasta do front

```bash
cd lead-management-frontend
```

### ▶️ 2. Instale as dependências

```
npm install
```

### ▶️ 3. Configure o .env

Crie o arquivo .env:

```
VITE_API_URL=http://localhost:5000
```

### ▶️ 4. Rode o projeto

```
npm run dev
```

### Acesse:

📎 http://localhost:5173

---

## 🧩 Estrutura do projeto

```
lead-management-frontend
├── src
│   ├── components         # Componentes reutilizáveis (LeadCard, Button, etc)
│   ├── features/leads     # Lógica de leads (hooks, api, pages)
│   ├── types              # Tipos TypeScript globais
│   └── App.tsx            # Root da aplicação com tabs
```

---

## 📘 Exemplo de consumo da API

```
const res = await fetch(`${VITE_API_URL}/api/leads?pageNumber=1&pageSize=5`)
const data = await res.json()
```

---

## 🛠️ Scripts úteis

| Comando           | Ação                         |
|-------------------|------------------------------|
| `npm run dev`     | Roda o projeto em modo dev   |
| `npm run build`   | Gera build otimizado         |
| `npm run preview` | Visualiza o build localmente |

---

## 🤝 Comunicação com o back-end

| Front-End	              | Back-End                  |
|-------------------------|---------------------------|
| `http://localhost:5173` | http://localhost:5000     |
| `Porta do Vite`	        | Porta do ASP.NET Core API |

✔️ CORS já está habilitado no back para localhost:5173

---

## 🙌 Autor

**Bruno Vieira**  
💻 Full Stack .NET + React  
🔗 [linkedin.com/in/brunojpv](https://www.linkedin.com/in/brunojpv)
