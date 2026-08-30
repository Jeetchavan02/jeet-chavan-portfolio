<div align="center">

# ✨ Jeet Chavan — Creative Developer & UI/UX Designer Portfolio

### *An ultra-premium, interactive 3D portfolio crafted with modern web technologies*

[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black?style=flat-square&logo=threedotjs)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)

---

> **Jeet Chavan's Portfolio** is a highly interactive, 3D-driven digital experience showcasing creative development and UI/UX design. It features immersive 3D WebGL scenes, seamless page transitions, dark/light mode, and high-performance animations, built entirely with a cutting-edge modern stack.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🎨 Design & Aesthetics](#-design--aesthetics)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 💻 **Interactive 3D Stage** | Custom Three.js / React Three Fiber interactive MacBook scene with dynamic lighting. |
| 🗂️ **Accordion Architecture** | Strict single-expansion project explorer with scroll-spy interactions and smooth routing. |
| 🌗 **Dynamic Theming** | Seamless Light and Dark mode transitions built natively with Tailwind CSS and React Context. |
| ✉️ **Editorial Contact** | Minimalist typography-first contact experience with smooth micro-interactions. |
| ⚡ **Performance Optimized** | Vite-powered hot module replacement and optimized asset delivery. |
| 🧩 **Accessible UI components** | Built utilizing Radix UI primitives ensuring semantics and keyboard navigability. |
| 🎥 **Fluid Animations** | Complex orchestration utilizing Framer Motion and GSAP for micro and macro layout animations. |

---

## 🏗️ Tech Stack

### Frontend & Core
| Technology | Version | Purpose |
|---|---|---|
| **Vite** | 8.1.5 | Ultra-fast frontend build tool |
| **React** | 19.2.0 | UI component library |
| **TypeScript** | 5.8 | Static type safety |
| **TanStack Router** | 1.170 | Advanced, type-safe routing |
| **Tailwind CSS** | 4.2 | Utility-first styling with modern capabilities |
| **Radix UI** | latest | Accessible headless UI primitives |

### 3D & Animations
| Technology | Version | Purpose |
|---|---|---|
| **Three.js** | 0.185 | WebGL 3D graphics rendering |
| **React Three Fiber** | 9.7 | React renderer for Three.js |
| **React Three Drei** | 10.7 | Useful helpers for R3F |
| **Framer Motion** | 13.1 | Declarative component animations |
| **GSAP** | 3.15 | Advanced scroll and timeline animations |

### State & Utilities
| Technology | Version | Purpose |
|---|---|---|
| **React Query** | 5.101 | Asynchronous state management |
| **React Hook Form** | 7.71 | Performant form validation and handling |
| **Zod** | 3.24 | Schema declaration and validation |
| **Lucide React** | 0.575 | Beautiful and consistent SVG icons |
| **Sonner** | 2.0 | Toast notification system |

---

## 📁 Project Structure

```
Portfolio-website/
├── 📂 public/                   # Static assets (fonts, models, images)
│   ├── favicon.ico
│   └── ...
├── 📂 src/
│   ├── 📂 components/           # Reusable UI components (Radix, custom UI)
│   │   ├── 📂 ui/               # Base design system components
│   │   └── ...
│   ├── 📂 lib/                  # Utilities, context providers (ThemeContext)
│   ├── 📂 routes/               # TanStack Router page definitions
│   │   ├── __root.tsx           # Global app shell & providers
│   │   └── ...
│   ├── styles.css               # Global CSS & Tailwind imports
│   ├── main.tsx                 # React entry point
│   └── routeTree.gen.ts         # Generated route tree definitions
├── package.json
├── tsconfig.json
├── vite.config.ts               # Vite bundler configuration
└── tailwind.config.js / .css    # Tailwind styling tokens
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** ≥ 18.0.0
- **npm** (or yarn/bun)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Portfolio-Website2026.git
cd Portfolio-Website2026/Portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
# → Vite dev server running at http://localhost:5173
```

### 4. Build for Production

```bash
npm run build
# → Outputs static files to the `dist` or `.output` folder
```

---

## 🎨 Design & Aesthetics

This portfolio emphasizes an **ultra-premium, dynamic design language**:
- **Typography:** Built heavily on `Plus Jakarta Sans`, `Oswald`, and `JetBrains Mono` for a highly editorial feel.
- **Micro-interactions:** Interactive hover states across buttons, links, and cards powered by Framer Motion.
- **Glassmorphism & Depth:** Soft drop shadows, translucent backgrounds, and physical materials in WebGL give the site a dimensional, tangible aesthetic.
- **Color Palette:** Carefully curated HSL values supporting both high-contrast Dark Mode and crisp Light Mode.

---

## 🤝 Contributing

While this is a personal portfolio, constructive feedback and code improvements are always welcome!

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/improvement`
3. Commit your changes: `git commit -m 'feat: added improvement'`
4. Push to branch: `git push origin feature/improvement`
5. Open a **Pull Request**

---


<div align="center">

**Designed & Engineered by Jeet Chavan**

*Built with precision and passion.*

</div>
