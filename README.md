# Project Starter

A Next.js application with TypeScript, Redux toolkit for client state management, Redux toolkit query for server state mangement, shadcn UI and Tailwind CSS.


# To Login
Please use any email and password of your choice example 
Email: oluwatosinadegoroye21@gmail.com
Password: Password123!

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

Install dependencies:

```bash
npm install
```

## Running the App

### Development Mode

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Additional Commands

- `npm run lint` - Run ESLint to check for code issues

## Architecture Notes

### Tradeoffs

- **Redux Toolkit Query**: Provides automatic caching, request deduplication, and background refetching, but adds bundle size and complexity compared to simpler data fetching solutions.
- **Client-side State Management**: Using Redux toolkit for global state management alongside Next.js App Router. This provides predictable state updates but requires client components, limiting the use of server components in some areas.
- **API Base URL**: Currently hardcoded in `apiSlice.ts` (using Rick and Morty API as example)-[https://rickandmortyapi.com/]. The environment variable pattern is commented out and should be configured for production.
- **Middleware on Edge Runtime**: Fast response times with redirects, but limited to Edge-compatible APIs and cannot access Node.js APIs.

### Performance Decisions

- **RTK Query Caching**: Automatic request caching and deduplication reduces redundant API calls and improves perceived performance.
- **Next.js Image Optimization**: Configured remote patterns for optimized image loading with Next.js Image component.
- **Font Optimization**: Using Next.js font optimization (Geist fonts) to reduce layout shift and improve load times.
- **Debouncing**: Custom `useDebounce` hook (500ms default) for input fields to reduce unnecessary API calls or computations.
- **TypeScript Strict Mode**: Enabled for better type safety and catch errors at compile time, trading some development speed for runtime reliability.

### Assumptions

- **Authentication**: API uses Bearer token authentication stored in Redux auth state. All authenticated requests automatically include the token via `prepareHeaders`.
- **Route Protection**: Root path (`/`) redirects to `/sign-in`, assuming authentication is required for the application.
- **Node.js Version**: Requires Node.js 18.x or higher for Next.js 15 compatibility.
- **API Structure**: Assumes RESTful API structure compatible with RTK Query's fetchBaseQuery.
- **Client-side Rendering**: Most interactive features use client components, assuming the app prioritizes interactivity over server-side rendering benefits.
