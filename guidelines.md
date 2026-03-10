# Project Context
This is a mobile-first Point of Sale (POS) application. 
The app features Authentication, User/Item/Category Management, Core POS functionality, Payment Methods, Sales Reports, and Discounts. Crucially, it must interface with hardware components like thermal printers and cash drawers.

# Tech Stack
- **Core Framework:** Tauri v2 (Strictly v2, DO NOT use v1 APIs or plugins)
- **Frontend:** React, TypeScript, React Router, TailwindCSS
- **UI Components:** Shadcn UI, React Hook Form (for forms)
- **Backend / System:** Rust, SQLite

# Architectural Guidelines

## Frontend (React / TypeScript)
- **Mobile-First Design:** All UI components and layouts must be responsive and optimized for mobile screens first, scaling up if necessary.
- **Component Reusability:** Always scan existing code and the Shadcn UI library before creating new components. Do not reinvent the wheel.
- **State & Forms:** Form state must be managed exclusively with `react-hook-form`. Validate inputs cleanly.
- **Styling:** Use TailwindCSS utility classes. Keep complex style logic encapsulated in standard Shadcn UI patterns.

## Backend & Hardware (Tauri / Rust)
- **Tauri IPC:** All communication between the React frontend and SQLite database or hardware must happen via Tauri commands (`invoke`).
- **Database (SQLite):** Database queries, schema migrations, and data access layers must be implemented in Rust. The frontend should only call Rust commands to read/write data.
- **Hardware Integration:** Interactions with thermal printers and cash drawers must be handled natively in Rust. Do not attempt to use browser-based printing or web serial APIs unless explicitly requested.

# STRICT "DO NOT" CONSTRAINTS
- **DO NOT** use Tauri v1 syntax, imports, or plugins. Ensure all Tauri code aligns with v2 documentation (`@tauri-apps/api/core`, etc.).
- **DO NOT** use plain `useState` for form inputs or validation; strictly enforce `react-hook-form`.
- **DO NOT** create duplicate UI components. If a button, modal, or input exists in the Shadcn UI folder, reuse it.
- **DO NOT** attempt to use Node.js specific libraries (like `fs` or `path`) in the React frontend. Use Tauri's provided frontend APIs or Rust backend commands for system-level operations.