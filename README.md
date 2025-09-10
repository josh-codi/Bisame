# Bisame

**Bisame** is a modern web application built with [Next.js](https://nextjs.org), leveraging the **App Router** and **TypeScript** for type safety and scalability.  
It includes authentication flows, global state management, and reusable UI components built with [shadcn/ui](https://ui.shadcn.com/).  

---

## ✨ Features

- ⚡ **Next.js (App Router)** — Modular route handling in the `app/` directory  
- 🔒 **Authentication** — Sign In, Sign Up, Forgot Password, Verification  
- 🛠 **TypeScript** — Strong typing for maintainable code  
- 🎨 **UI Components** — Built with [shadcn/ui](https://ui.shadcn.com/)  
- 📦 **pnpm** — Fast, efficient package management  
- 🌍 **State Management** — Zustand store for global state  
- 🌐 **Axios Instance** — Pre-configured for API requests  
- ♻️ **Custom Hooks** — Reusable query and logic hooks  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/josh-codi/Bisame.git
cd bisame

## Getting Started

Install dependencies (using [pnpm](https://pnpm.io/)):

```bash
pnpm install
```

Run the development server:

yarn dev

```bash
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.


You can start editing the main page by modifying `app/page.tsx`. The app supports hot reloading.

### Project Structure

- `app/` — Main app routes and layouts (including authentication pages)
- `components/` — Reusable UI components (including shadcn/ui components)
- `hooks/` — Custom React hooks
- `lib/` — Utility functions and API endpoints
- `store/` — State management (e.g., authentication store)
- `config/` — Configuration files (e.g., Axios instance)
- `public/` — Static assets


## Pages & Routes

Below are the suggested pages and their locations in the Next.js App Router (app/) directory. Create the matching folders/files to add these routes.

- / — app/page.tsx (Home / Landing)

Auth (grouped under app/(auth)/):
- /sign-in — app/(auth)/sign-in/page.tsx
- /sign-up — app/(auth)/sign-up/page.tsx
- /forgot-password — app/(auth)/forgot-password/page.tsx
- /verify — app/(auth)/verify/page.tsx

API routes (App Router API handlers):
- /authentication — app/lib/routes.ts

Layout and common files:
- app/layout.tsx — Root layout (global providers, head, nav)
- app/not-found.tsx — Custom 404 page

Example: simple page file to add a new route (create app/about/page.tsx)
```tsx
export default function AboutPage() {
    return <div>About Bisame</div>;
}
```

Notes:
- Use nested folders with page.tsx for each route.
- For dynamic routes, use bracketed folder names like [id]/page.tsx.
- Place layout.tsx in a route folder to scope layouts to that route subtree.
- Protect authenticated routes (e.g., /dashboard) using your auth hooks/store inside the page or layout.
- Keep API handlers under app/api/* with exported HTTP methods in route.ts.


## UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for modern, accessible UI components. Components are located in `components/ui/`.

To add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add <component>
```

Example:

```bash
pnpm dlx shadcn@latest add checkbox
```


## Authentication

Authentication pages and logic are under `app/(auth)/` and `hooks/Queries/useAuthQueries.tsx`.

State is managed with custom hooks and the store in `store/useAuthStore.ts`.

## API Requests

API requests are handled using a pre-configured Axios instance in `config/axiosInstance.ts`.

## Deployment

You can deploy this app to [Vercel](https://vercel.com/) or any platform that supports Next.js. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more info.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [pnpm Documentation](https://pnpm.io/)
# Bisame
