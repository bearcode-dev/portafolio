# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 portfolio application featuring server-side rendering, multilingual support (English/Spanish), and a content management dashboard. The application uses MongoDB with Prisma ORM for data persistence and includes sections for projects, blogs, experiences, and resources.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Database operations
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema changes to MongoDB
npx prisma db seed          # Seed database with initial data
npx prisma studio           # Open Prisma Studio GUI
```

## Architecture Overview

### Application Structure

- **App Router (Next.js 14)**: Uses the `app/` directory structure with server-side rendering by default
- **Public Routes**: Home, About, Experience, Projects, Blogs, Resources (multilingual)
- **Dashboard Routes**: Content management interface at `/dashboard/*` for CRUD operations
- **API Routes**: REST endpoints in `app/api/*` following Next.js Route Handler pattern

### Data Layer

**Database**: MongoDB with Prisma ORM (schema at `prisma/schema.prisma`)

**Key Models**:
- `UserDetail` - Portfolio owner's main information (welcome text, CV, image)
- `UserSocialLink` - Social media links
- `AboutContent` - About section paragraphs
- `Experience` with nested `ExperienceInput` - Work history with bullet points
- `Project` with many-to-many `ProjectTool` - Portfolio projects
- `Blog` - Blog posts
- `Resource` with `ResourceCategory` - Learning resources organized by category
- `SkillCategory` with `Skill` - Technical skills grouped by category

**Data Access Pattern**:
- Server components fetch data directly via `app/requests/requests.ts` using `fetchJSON` utility
- API routes use the singleton Prisma client from `lib/db.ts`
- Client-side mutations use TanStack Query (React Query)

### Internationalization (i18n)

**Language System**: Custom implementation (not using next-intl)
- Two locales: `'en'` (English) and `'es'` (Spanish)
- Dictionary defined in `app/lib/dictionary.ts`
- Language detection: Cookie (`NEXT_LOCALE`) → Accept-Language header → Default to 'en'
- `LanguageProvider` context provides `{ lang, setLang, t }` throughout the app
- Language switcher component allows runtime language changes

### Theming

**Dark Mode**: Custom implementation using localStorage and CSS classes
- Theme initialized via inline script in `app/layout.tsx` to prevent flash
- `ThemeProvider` manages theme state via React context
- Respects system preference if no theme is explicitly set
- Uses Tailwind's `dark:` variant for styling

### Styling

**CSS Framework**: Tailwind CSS with custom configuration
- Custom fonts: Poiret One (headings) and Open Sans (body text) from Google Fonts
- Component library: Radix UI primitives for accessible UI components
- Animations: Framer Motion for page transitions and interactive elements
- Remote images allowed from Cloudinary and `api.bearcodev.com` (see `next.config.js`)

### Key Architectural Patterns

**Provider Nesting** (in `app/layout.tsx`):
```
TanstackProvider → LanguageProvider → ClientLayout → MainLayout → children
```

**Client/Server Boundary**:
- Pages are Server Components by default
- Data fetching happens on the server via `app/requests/requests.ts`
- Client components marked with `'use client'` directive (providers, interactive components)
- Dashboard uses client-side state management with TanStack Query for mutations

**API Route Pattern**:
- Each route exports `GET`, `POST`, `PUT`, `DELETE` handlers as needed
- Dynamic routes use `[param]` folder structure (e.g., `app/api/resources/[slug]/route.ts`)
- Slug generation for Resources and ResourceCategories using `generateSlug()` helper
- Error responses include descriptive messages and appropriate HTTP status codes

### Dashboard Architecture

Located at `/dashboard/*` with dedicated layout (`app/dashboard/layout.tsx`)
- Grid layout with sidebar navigation (`DashBoardSidebar`)
- Reusable CRUD components: `CRUDTable`, `DataGrid`, `Modal`, `DeleteModal`
- Form components with react-hook-form and Zod validation
- Date handling with `DatePicker`, `DatePickerField`, `DatePickerWithPopover` components
- AG Grid for advanced data tables

## Important Implementation Notes

**Node Version**: Requires Node.js >= 24.0.0 (see `package.json` engines)

**Environment Variables**:
- `DATABASE_URL` - MongoDB connection string (required)
- `API_URL` - API base URL for server-side fetches (defaults to http://localhost:3000)

**Slug Generation**: Resources and ResourceCategories auto-generate slugs from titles. Ensure uniqueness checks are in place when creating new entries.

**Image Handling**:
- Uses Next.js Image component with remote patterns configured
- Images stored as URLs (Cloudinary or API server paths)
- Cover images required for Projects, Blogs, and Resources

**TypeScript**:
- Strict mode enabled
- Type definitions in `app/components/types/types.ts`
- All API responses and data models should be properly typed

**Prisma Workflow**:
1. Modify `prisma/schema.prisma`
2. Run `npx prisma db push` to sync with MongoDB
3. Run `npx prisma generate` to update the Prisma client
4. Update TypeScript types in `types.ts` if needed
5. Update seed file if adding new required models

**Database Seeding**:
- Seed file: `prisma/seed.ts`
- Run: `npx prisma db seed`
- Current seed includes:
  - 7 Resource Categories (Frontend, Backend, DevOps, AI/ML, Mobile, Design, Career)
  - 19 Sample Resources with real-world examples
  - All resources have realistic content, cover images (Unsplash), tags, and metadata
