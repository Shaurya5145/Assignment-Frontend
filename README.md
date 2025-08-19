# React Component Library

A modern React TypeScript component library featuring InputField and DataTable components with comprehensive functionality, accessibility features, and design system integration.

## 🎯 Overview

This project implements a production-ready component library with:

- **InputField Component**: A flexible input with multiple variants, validation states, and accessibility features
- **DataTable Component**: A powerful data table with sorting, selection, and state management
- **TypeScript**: Full type safety and IntelliSense support
- **Storybook**: Interactive component documentation (configured)
- **TailwindCSS**: Modern styling with dark mode support
- **Testing**: Comprehensive test coverage with Vitest and React Testing Library
- **Vercel-Ready**: Optimized for frontend-only deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-component-library
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
# Frontend-only development (recommended for component library)
npx vite --config vite.config.frontend.ts

# Or full-stack development (if you need backend features)
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the component showcase.

## 📦 Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment as a frontend-only application:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Deploy with these settings:
   - **Build Command**: `npx vite build --config vite.config.frontend.ts`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Manual Build

To build for production:

```bash
# Frontend-only build (for static hosting)
npx vite build --config vite.config.frontend.ts

# Full-stack build (if you need server features)
npm run build
```

The frontend build creates static files in the `dist` directory ready for deployment to any static hosting service.
