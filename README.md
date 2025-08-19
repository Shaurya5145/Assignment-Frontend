# React TypeScript Component Library

A modern, production-ready React TypeScript component library featuring InputField and DataTable components with comprehensive functionality, accessibility features, and design system integration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

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

## 📋 Component Documentation

### InputField Component

A flexible input component with comprehensive features:

- **Variants**: Default, filled, outline styles
- **Sizes**: Small, medium, large
- **States**: Error, success, disabled
- **Features**: Clear button, password toggle, custom icons
- **Accessibility**: ARIA labels, keyboard navigation
- **TypeScript**: Full type safety with proper interfaces

### DataTable Component

A powerful data table with advanced functionality:

- **Sorting**: Column-based ascending/descending sort
- **Selection**: Single and multi-row selection
- **States**: Loading, empty, error states
- **Responsive**: Mobile-friendly design
- **Accessibility**: Screen reader support, keyboard navigation
- **TypeScript**: Generic types for type-safe data handling

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Test coverage includes:
- Component rendering and behavior
- User interactions (clicks, typing, keyboard navigation)
- Accessibility features
- Edge cases and error states

## 🎨 Storybook (Optional)

Interactive component documentation is configured but not required:

```bash
npm run storybook
```

