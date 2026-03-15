# BookStore UI

A modern React front-end for the BookStore application. Built with React 19, TypeScript, Vite, and Tailwind CSS. Connects to a Spring Boot backend API for product catalog and order management.

## Tech Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| React 19         | UI library                     |
| TypeScript 5.9   | Type safety                    |
| Vite 8           | Build tool & dev server        |
| Tailwind CSS 4   | Utility-first styling          |
| React Router 7   | Client-side routing            |
| Axios            | HTTP client for API calls      |
| React Hook Form  | Form handling & validation     |
| React Hot Toast  | Toast notifications            |

## Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- Backend API running at `http://localhost:8989` (configurable via `.env`)

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd bookstore-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

## Available Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start Vite dev server with hot reload  |
| `npm run build`   | Type-check and build for production    |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`    | Run ESLint across the project          |

## Project Structure

```
bookstore-ui/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.tsx                      # App entry point
│   ├── App.tsx                       # Routing setup
│   ├── index.css                     # Global styles
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── AuthContext.tsx        # Auth state mgmt
│   │   │   ├── useAuth.ts            # Auth hook
│   │   │   ├── LoginPage.tsx         # Login form
│   │   │   └── ProtectedRoute.tsx    # Route guard
│   │   │
│   │   ├── catalog/
│   │   │   ├── types.ts
│   │   │   ├── catalogApi.ts
│   │   │   ├── ProductListPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   └── ProductCard.tsx
│   │   │
│   │   └── orders/
│   │       ├── types.ts
│   │       ├── orderApi.ts
│   │       ├── OrderListPage.tsx
│   │       ├── OrderDetailPage.tsx
│   │       ├── CreateOrderPage.tsx
│   │       └── OrderSummaryCard.tsx
│   │
│   └── shared/
│       ├── api/
│       │   └── axiosClient.ts        # Axios instance
│       └── components/
│           ├── layout/
│           │   ├── AppLayout.tsx
│           │   └── Navbar.tsx
│           └── ui/
│               ├── Button.tsx
│               ├── Input.tsx
│               ├── Card.tsx
│               └── LoadingSpinner.tsx
│
├── .env
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── .gitignore
```

## Architecture

### Feature-Based Organization

Code is organized by **feature** under `src/features/`. Each module contains its own pages, API calls, types, and components — keeping related code together.

### Authentication Flow

1. `AuthProvider` wraps the entire app and manages auth state using React Context + `localStorage`
2. `ProtectedRoute` guards all protected pages — unauthenticated users are redirected to `/login`
3. `LoginPage` collects credentials and calls `login()` — on success, redirects to the originally requested page
4. `useAuth()` hook gives any component access to the current user and auth actions

> **Note:** Auth is currently mocked. Any non-empty username with any password will work. Replace the `login()` function in `AuthContext.tsx` with a real API call when backend auth is ready.

### API Layer

`axiosClient.ts` provides a shared Axios instance with:

- **Base URL** from the `VITE_API_BASE_URL` environment variable
- **Request interceptor** — attaches `X-Username` header on every request
- **Response interceptor** — auto-redirects to `/login` on `401` responses
- **Dev proxy** — Vite proxies `/api` requests to the backend to avoid CORS issues

### API Endpoints

| Module  | Method | Endpoint                           | Description            |
| ------- | ------ | ---------------------------------- | ---------------------- |
| Catalog | GET    | `/catalog/api/products?page={n}`   | Paginated product list |
| Catalog | GET    | `/catalog/api/products/{code}`     | Product by code        |
| Orders  | POST   | `/orders/api/orders`               | Create a new order     |
| Orders  | GET    | `/orders/api/orders`               | List all orders        |
| Orders  | GET    | `/orders/api/orders/{orderNumber}` | Order by number        |

### Routes

| Path                   | Component          | Auth Required |
| ---------------------- | ------------------ | :-----------: |
| `/login`               | LoginPage          |      No       |
| `/`                    | ProductListPage    |      Yes      |
| `/products/:code`      | ProductDetailPage  |      Yes      |
| `/orders`              | OrderListPage      |      Yes      |
| `/orders/new`          | CreateOrderPage    |      Yes      |
| `/orders/:orderNumber` | OrderDetailPage    |      Yes      |

## Environment Variables

Create a `.env` file in the project root (one is already included):

```env
VITE_API_BASE_URL=http://localhost:8989
```

## Path Aliases

The `@` alias points to `src/`, configured in both `vite.config.ts` and `tsconfig.json`:

```typescript
import { useAuth } from "@/features/auth/useAuth";
import axiosClient from "@/shared/api/axiosClient";
```
