# React Component Library

## Overview

This is a modern React TypeScript component library featuring comprehensive UI components with a focus on accessibility, design consistency, and developer experience. The project centers around two primary components - InputField and DataTable - built with TypeScript for type safety and styled with TailwindCSS for modern, responsive design. The library integrates with shadcn/ui components and includes Storybook for interactive documentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18+** with TypeScript for component development
- **Vite** as the build tool and development server
- **Component-first architecture** with reusable, composable UI elements
- **Dual deployment modes**: Frontend-only (Vercel) and full-stack development
- **Wouter** for lightweight client-side routing

### Design System
- **TailwindCSS** for utility-first styling with CSS custom properties
- **shadcn/ui** integration for consistent component patterns
- **Dark mode support** with theme switching capabilities
- **Radix UI primitives** for accessible, unstyled component foundations
- **Class Variance Authority (CVA)** for component variant management

### Component Library Structure
- **InputField Component**: Flexible input with validation states, multiple variants (outlined, filled, ghost), and accessibility features
- **DataTable Component**: Advanced data table with sorting, selection, and state management
- **UI Components**: Comprehensive set of shadcn/ui components (buttons, cards, forms, etc.)
- **Type-safe props** with TypeScript interfaces and proper IntelliSense support

### Development Tools
- **Storybook** for component documentation and interactive testing
- **Vitest + React Testing Library** for comprehensive testing coverage
- **ESLint/Prettier** for code quality and formatting
- **PostCSS + Autoprefixer** for CSS processing

### State Management
- **React hooks** for local component state
- **TanStack Query** for server state management and caching
- **Custom hooks** for reusable stateful logic

### Backend Architecture (Optional)
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations with PostgreSQL support
- **Zod schemas** for data validation
- **RESTful API** structure with `/api` prefix
- **Session management** with connect-pg-simple

### Configuration Management
- **Multiple Vite configs** for different deployment scenarios
- **Path aliases** for clean imports (@, @shared, @assets)
- **Environment-based configuration** for development and production

## External Dependencies

### Core Framework Dependencies
- **React 18+** - Component library foundation
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server

### UI and Styling
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Comprehensive suite of accessible component primitives
- **Lucide React** - Icon library for consistent iconography
- **class-variance-authority** - Component variant management
- **clsx + tailwind-merge** - Conditional CSS class handling

### Development and Testing
- **Storybook** - Component documentation and testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

### Data Management
- **TanStack React Query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Database and Backend (Optional)
- **Drizzle ORM** - Type-safe database operations
- **@neondatabase/serverless** - PostgreSQL database connectivity
- **Express.js** - Backend server framework

### Deployment
- **Vercel** - Primary deployment platform for frontend-only mode
- **PostgreSQL** - Database for full-stack deployment scenarios