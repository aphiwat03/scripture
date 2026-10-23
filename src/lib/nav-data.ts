export type NavChild = {
  title: string;
  href: string;
};

export type NavItem = {
  title: string;
  href: string;
  children?: NavChild[];
};

export type NavGroup = {
  title: string;
  color: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  // 1. หมวด FRONTEND
  {
    title: "FRONTEND",
    color: "#0071e3", // Apple Blue
    items: [
      {
        title: "Next.js 16",
        href: "/docs/nextjs",
        children: [
          {
            title: "Routing",
            href: "/docs/nextjs/routing",
          },
          {
            title: "RSC vs Client",
            href: "/docs/nextjs/rsc-client",
          },
          {
            title: "SSG",
            href: "/docs/nextjs/ssg",
          },
          {
            title: "SSR",
            href: "/docs/nextjs/ssr",
          },
          {
            title: "Data Fetching",
            href: "/docs/nextjs/data-fetching",
          },
          {
            title: "Forms & Zod",
            href: "/docs/nextjs/forms",
          },
          {
            title: "Server Actions",
            href: "/docs/nextjs/server-actions",
          },
          {
            title: "Env Variables",
            href: "/docs/nextjs/env",
          },
          {
            title: "Error & Loading",
            href: "/docs/nextjs/error-handling",
          },
          {
            title: "Authentication",
            href: "/docs/nextjs/auth",
          },
          {
            title: "Database & API",
            href: "/docs/nextjs/database",
          },
          {
            title: "Optimization",
            href: "/docs/nextjs/optimization",
          },
          {
            title: "Deployment",
            href: "/docs/nextjs/deployment",
          },
          {
            title: "Middleware & Proxy",
            href: "/docs/nextjs/middleware",
          },
          {
            title: "Multi-layer Caching",
            href: "/docs/nextjs/caching",
          },
          {
            title: "Metadata & SEO",
            href: "/docs/nextjs/metadata-seo",
          },
          {
            title: "Route Handlers",
            href: "/docs/nextjs/route-handlers",
          },
          {
            title: "Advanced Routing",
            href: "/docs/nextjs/advanced-routing",
          },
          {
            title: "Error Monitoring (Sentry)",
            href: "/docs/nextjs/error-monitoring",
          },
          {
            title: "Web Analytics",
            href: "/docs/nextjs/analytics",
          },
          {
            title: "Web Vitals & Audits",
            href: "/docs/nextjs/web-vitals",
          },
          {
            title: "Progressive Web App (PWA)",
            href: "/docs/nextjs/pwa",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/nextjs/pitfalls",
          },
        ],
      },
      {
        title: "React 19",
        href: "/docs/react",
        children: [
          {
            title: "JSX & Props",
            href: "/docs/react/basics",
          },
          {
            title: "State & Render",
            href: "/docs/react/state-render",
          },
          {
            title: "React Hook",
            href: "/docs/react/react-hooks",
          },
          {
            title: "Custom Hooks",
            href: "/docs/react/custom-hooks",
          },
          {
            title: "Forms",
            href: "/docs/react/forms",
          },
          {
            title: "Context vs Zustand",
            href: "/docs/react/context-zustand",
          },
          {
            title: "Client Fetching",
            href: "/docs/react/client-fetching",
          },
          {
            title: "Error & Suspense",
            href: "/docs/react/error-suspense",
          },
          {
            title: "React 19 New",
            href: "/docs/react/react-19-features",
          },
          {
            title: "Performance",
            href: "/docs/react/performance",
          },
          {
            title: "Architecture",
            href: "/docs/react/architecture",
          },
          {
            title: "Accessibility (A11y)",
            href: "/docs/react/accessibility-components",
          },
          {
            title: "Compound Components",
            href: "/docs/react/compound-components",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/react/pitfalls",
          },
        ],
      },
      {
        title: "TypeScript",
        href: "/docs/typescript",
        children: [
          {
            title: "Primitives & Types",
            href: "/docs/typescript/basics",
          },
          {
            title: "Inference",
            href: "/docs/typescript/inference",
          },
          {
            title: "Interface vs Type",
            href: "/docs/typescript/interface-vs-type",
          },
          {
            title: "Functions",
            href: "/docs/typescript/functions",
          },
          {
            title: "Unions & Literals",
            href: "/docs/typescript/unions",
          },
          {
            title: "Narrowing",
            href: "/docs/typescript/narrowing",
          },
          {
            title: "Generics",
            href: "/docs/typescript/generics",
          },
          {
            title: "Utility Types",
            href: "/docs/typescript/utility-types",
          },
          {
            title: "keyof & satisfies",
            href: "/docs/typescript/advanced-types",
          },
          {
            title: "Classes & OOP",
            href: "/docs/typescript/classes-oop",
          },
          {
            title: "Async & Result",
            href: "/docs/typescript/async-error",
          },
          {
            title: "Zod Validation",
            href: "/docs/typescript/zod-runtime",
          },
          {
            title: "TS in React",
            href: "/docs/typescript/react-ts",
          },
          {
            title: "TS in Backend",
            href: "/docs/typescript/backend-ts",
          },
          {
            title: "tsconfig.json",
            href: "/docs/typescript/tsconfig",
          },
          {
            title: "Branded Types",
            href: "/docs/typescript/branded-types",
          },
          {
            title: "Exhaustive Check",
            href: "/docs/typescript/exhaustive-union",
          },
          {
            title: "Type-safe API Client",
            href: "/docs/typescript/typed-api-client",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/typescript/pitfalls",
          },
        ],
      },
      {
        title: "HTML5",
        href: "/docs/html",
        children: [
          {
            title: "Doc Structure",
            href: "/docs/html/document-structure",
          },
          {
            title: "Block vs Inline",
            href: "/docs/html/block-inline-dom",
          },
          {
            title: "Text & Headings",
            href: "/docs/html/text-content",
          },
          {
            title: "Links & Nav",
            href: "/docs/html/links-navigation",
          },
          {
            title: "Lists & Tables",
            href: "/docs/html/lists-tables",
          },
          {
            title: "Images & Media",
            href: "/docs/html/images-media",
          },
          {
            title: "Attributes",
            href: "/docs/html/attributes",
          },
          {
            title: "Forms",
            href: "/docs/html/forms",
          },
          {
            title: "Form Validation",
            href: "/docs/html/form-validation",
          },
          {
            title: "Semantic HTML",
            href: "/docs/html/semantic-html",
          },
          {
            title: "Scripts & Link",
            href: "/docs/html/scripts-resources",
          },
          {
            title: "HTML in React",
            href: "/docs/html/react-html",
          },
          {
            title: "HTML in Next.js",
            href: "/docs/html/nextjs-html",
          },
          {
            title: "Meta & SEO",
            href: "/docs/html/meta-seo",
          },
          {
            title: "Accessibility",
            href: "/docs/html/accessibility",
          },
          {
            title: "Entities & XSS",
            href: "/docs/html/entities-xss",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/html/pitfalls",
          },
        ],
      },
      {
        title: "CSS",
        href: "/docs/css",
        children: [
          {
            title: "Basics & Syntax",
            href: "/docs/css/basics",
          },
          {
            title: "Selectors",
            href: "/docs/css/selectors",
          },
          {
            title: "Box Model",
            href: "/docs/css/box-model",
          },
          {
            title: "Display & Position",
            href: "/docs/css/display-position",
          },
          {
            title: "Colors & oklch()",
            href: "/docs/css/colors-backgrounds",
          },
          {
            title: "Typography",
            href: "/docs/css/typography",
          },
          {
            title: "Cascade & Specificity",
            href: "/docs/css/cascade-specificity",
          },
          {
            title: "Units & clamp()",
            href: "/docs/css/units-values",
          },
          {
            title: "Flexbox Layout",
            href: "/docs/css/flexbox",
          },
          {
            title: "CSS Grid",
            href: "/docs/css/grid",
          },
          {
            title: "Responsive Design",
            href: "/docs/css/responsive",
          },
          {
            title: "UI Patterns",
            href: "/docs/css/ui-patterns",
          },
          {
            title: "Variables & Themes",
            href: "/docs/css/variables-themes",
          },
          {
            title: "Animations",
            href: "/docs/css/transitions-animations",
          },
          {
            title: "Architecture & BEM",
            href: "/docs/css/architecture-bem",
          },
          {
            title: "Tailwind CSS v4",
            href: "/docs/css/tailwind-v4",
          },
          {
            title: "CSS in React/Next.js",
            href: "/docs/css/react-nextjs-css",
          },
          {
            title: "DevTools Debugging",
            href: "/docs/css/devtools-debugging",
          },
          {
            title: "Performance & a11y",
            href: "/docs/css/performance-a11y",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/css/pitfalls",
          },
        ],
      },
      {
        title: "Tailwind CSS v4",
        href: "/docs/tailwind",
        children: [
          {
            title: "Utility-first",
            href: "/docs/tailwind/utility-first",
          },
          {
            title: "Next.js 16 Setup",
            href: "/docs/tailwind/installation",
          },
          {
            title: "Spacing & Sizing",
            href: "/docs/tailwind/spacing-sizing",
          },
          {
            title: "Typography & Thai",
            href: "/docs/tailwind/typography",
          },
          {
            title: "Colors & Shadows",
            href: "/docs/tailwind/colors-effects",
          },
          {
            title: "Flexbox & Grid",
            href: "/docs/tailwind/flexbox-grid",
          },
          {
            title: "State Variants",
            href: "/docs/tailwind/state-variants",
          },
          {
            title: "Responsive Design",
            href: "/docs/tailwind/responsive",
          },
          {
            title: "Dark Mode & Themes",
            href: "/docs/tailwind/dark-mode",
          },
          {
            title: "Arbitrary Values",
            href: "/docs/tailwind/arbitrary-variables",
          },
          {
            title: "Class in React (cn)",
            href: "/docs/tailwind/class-management",
          },
          {
            title: "@theme & CSS-first",
            href: "/docs/tailwind/css-first-theme",
          },
          {
            title: "Animations",
            href: "/docs/tailwind/transitions-animations",
          },
          {
            title: "Modern UI Effects",
            href: "/docs/tailwind/modern-ui-effects",
          },
          {
            title: "Code Organization",
            href: "/docs/tailwind/code-organization",
          },
          {
            title: "Tailwind & shadcn",
            href: "/docs/tailwind/shadcn-integration",
          },
          {
            title: "DevTools Debugging",
            href: "/docs/tailwind/debugging",
          },
          {
            title: "Performance & a11y",
            href: "/docs/tailwind/performance-a11y",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/tailwind/pitfalls",
          },
        ],
      },
      {
        title: "shadcn/ui",
        href: "/docs/shadcn",
        children: [
          {
            title: "Philosophy & Copy-Paste",
            href: "/docs/shadcn/philosophy",
          },
          {
            title: "3-Layer Architecture",
            href: "/docs/shadcn/three-layer-architecture",
          },
          {
            title: "Next.js 16 + v4 Setup",
            href: "/docs/shadcn/installation",
          },
          {
            title: "cn() & tailwind-merge",
            href: "/docs/shadcn/cn-utility",
          },
          {
            title: "Core Components",
            href: "/docs/shadcn/core-components",
          },
          {
            title: "cva & asChild Slot",
            href: "/docs/shadcn/cva-variants",
          },
          {
            title: "Lucide React Icons",
            href: "/docs/shadcn/lucide-icons",
          },
          {
            title: "Theming & Variables",
            href: "/docs/shadcn/theming-variables",
          },
          {
            title: "Navigation & Layout",
            href: "/docs/shadcn/navigation-layout",
          },
          {
            title: "Overlays & Dialogs",
            href: "/docs/shadcn/overlays-dialogs",
          },
          {
            title: "Toast with Sonner",
            href: "/docs/shadcn/toast-sonner",
          },
          {
            title: "Forms (RHF + Zod)",
            href: "/docs/shadcn/forms-zod",
          },
          {
            title: "Tables & Charts",
            href: "/docs/shadcn/data-display",
          },
          {
            title: "Component Customization",
            href: "/docs/shadcn/customization",
          },
          {
            title: "App Router & Client",
            href: "/docs/shadcn/nextjs-app-router",
          },
          {
            title: "Accessibility & Perf",
            href: "/docs/shadcn/accessibility-perf",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/shadcn/pitfalls",
          },
        ],
      },
      {
        title: "TanStack Query v5",
        href: "/docs/tanstack-query",
        children: [
          {
            title: "Server vs Client State",
            href: "/docs/tanstack-query/server-vs-client-state",
          },
          {
            title: "Next.js 16 Setup",
            href: "/docs/tanstack-query/installation-nextjs",
          },
          {
            title: "useQuery Basics",
            href: "/docs/tanstack-query/use-query-basics",
          },
          {
            title: "Query Keys Factory",
            href: "/docs/tanstack-query/query-keys",
          },
          {
            title: "queryFn Architecture",
            href: "/docs/tanstack-query/query-fn-design",
          },
          {
            title: "staleTime & gcTime",
            href: "/docs/tanstack-query/caching-lifecycle",
          },
          {
            title: "Error & Loading UI",
            href: "/docs/tanstack-query/error-loading-ui",
          },
          {
            title: "useMutation",
            href: "/docs/tanstack-query/use-mutation",
          },
          {
            title: "Cache Invalidation",
            href: "/docs/tanstack-query/invalidation-cache-updates",
          },
          {
            title: "Optimistic Updates",
            href: "/docs/tanstack-query/optimistic-updates",
          },
          {
            title: "Dependent & Parallel",
            href: "/docs/tanstack-query/dependent-parallel",
          },
          {
            title: "Pagination & Infinite",
            href: "/docs/tanstack-query/pagination-infinite",
          },
          {
            title: "Custom Feature Hooks",
            href: "/docs/tanstack-query/custom-hooks",
          },
          {
            title: "App Router & Prefetch",
            href: "/docs/tanstack-query/nextjs-app-router",
          },
          {
            title: "NestJS Auth Integration",
            href: "/docs/tanstack-query/auth-nest-integration",
          },
          {
            title: "Performance & Select",
            href: "/docs/tanstack-query/performance",
          },
          {
            title: "Testing & Mocking",
            href: "/docs/tanstack-query/testing-debugging",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/tanstack-query/pitfalls",
          },
        ],
      },
      {
        title: "Zustand v5",
        href: "/docs/zustand",
        children: [
          {
            title: "Problem & Comparison",
            href: "/docs/zustand/problem-comparison",
          },
          {
            title: "Client vs Server State",
            href: "/docs/zustand/client-vs-server-state",
          },
          {
            title: "First Store Setup",
            href: "/docs/zustand/first-store",
          },
          {
            title: "TypeScript Typing",
            href: "/docs/zustand/typescript",
          },
          {
            title: "Reading & Updating State",
            href: "/docs/zustand/reading-updating-state",
          },
          {
            title: "Selectors & useShallow",
            href: "/docs/zustand/selectors-re-render",
          },
          {
            title: "Derived State",
            href: "/docs/zustand/derived-state",
          },
          {
            title: "Actions & Async Logic",
            href: "/docs/zustand/actions-async",
          },
          {
            title: "Middlewares (persist/immer)",
            href: "/docs/zustand/middleware",
          },
          {
            title: "Slices Pattern",
            href: "/docs/zustand/slices-pattern",
          },
          {
            title: "Real-world Stores",
            href: "/docs/zustand/real-world-examples",
          },
          {
            title: "Next.js 16 SSR Safe",
            href: "/docs/zustand/nextjs-app-router-ssr",
          },
          {
            title: "Hydration & Persist",
            href: "/docs/zustand/hydration-persist",
          },
          {
            title: "Vanilla JS Usage",
            href: "/docs/zustand/vanilla-usage",
          },
          {
            title: "Integration (RHF/Query)",
            href: "/docs/zustand/libraries-integration",
          },
          {
            title: "Testing & DevTools",
            href: "/docs/zustand/testing-debugging",
          },
          {
            title: "Performance Tuning",
            href: "/docs/zustand/performance",
          },
          {
            title: "Pitfalls & Q&A",
            href: "/docs/zustand/pitfalls",
          },
        ],
      },
      {
        title: "React Hook Form + Zod",
        href: "/docs/react-hook-form-zod",
        children: [
          {
            title: "Problem & Philosophy",
            href: "/docs/react-hook-form-zod/problems-overview",
          },
          {
            title: "RHF Core Basics",
            href: "/docs/react-hook-form-zod/rhf-basics",
          },
          {
            title: "Zod Basics & Types",
            href: "/docs/react-hook-form-zod/zod-basics",
          },
          {
            title: "z.infer & Type Safety",
            href: "/docs/react-hook-form-zod/type-inference",
          },
          {
            title: "Connecting with zodResolver",
            href: "/docs/react-hook-form-zod/rhf-zod-resolver",
          },
          {
            title: "Zod Refine & Transform",
            href: "/docs/react-hook-form-zod/zod-intermediate",
          },
          {
            title: "Controller & Custom Inputs",
            href: "/docs/react-hook-form-zod/controller",
          },
          {
            title: "shadcn/ui Form Architecture",
            href: "/docs/react-hook-form-zod/shadcn-form",
          },
          {
            title: "Edit Form & State Reset",
            href: "/docs/react-hook-form-zod/edit-form-reset",
          },
          {
            title: "useFieldArray & Complex Forms",
            href: "/docs/react-hook-form-zod/complex-nested-arrays",
          },
          {
            title: "Submissions & Server Actions",
            href: "/docs/react-hook-form-zod/submit-server-actions",
          },
          {
            title: "File Uploads & Validation",
            href: "/docs/react-hook-form-zod/file-uploads",
          },
          {
            title: "Zod Beyond Forms",
            href: "/docs/react-hook-form-zod/zod-beyond-forms",
          },
          {
            title: "Accessibility & Form UX",
            href: "/docs/react-hook-form-zod/a11y-ux",
          },
          {
            title: "Performance & Re-renders",
            href: "/docs/react-hook-form-zod/performance",
          },
          {
            title: "Testing & Debugging",
            href: "/docs/react-hook-form-zod/testing-debugging",
          },
          {
            title: "Pitfalls & Senior Q&A",
            href: "/docs/react-hook-form-zod/pitfalls",
          },
        ],
      },
      {
        title: "Recharts",
        href: "/docs/recharts",
        children: [
          {
            title: "Concept & Ecosystem",
            href: "/docs/recharts/concept-comparison",
          },
          {
            title: "Installation & Core Setup",
            href: "/docs/recharts/installation-basics",
          },
          {
            title: "Line, Bar, Area & Pie Charts",
            href: "/docs/recharts/basic-charts",
          },
          {
            title: "Composed, Dual-Axis & Stacked",
            href: "/docs/recharts/advanced-charts",
          },
          {
            title: "Styling, Gradients & Formatters",
            href: "/docs/recharts/styling-formatters",
          },
          {
            title: "Custom Tooltip & Legend",
            href: "/docs/recharts/custom-tooltip-legend",
          },
          {
            title: "Interactivity & Brush Filter",
            href: "/docs/recharts/interactivity-events",
          },
          {
            title: "Responsive & Dark Mode",
            href: "/docs/recharts/responsive-dark-mode",
          },
          {
            title: "shadcn/ui Chart & Theming",
            href: "/docs/recharts/shadcn-chart-integration",
          },
          {
            title: "Data Wrangling & Pipelines",
            href: "/docs/recharts/data-transformation",
          },
          {
            title: "Next.js 16 SSR & Hydration",
            href: "/docs/recharts/nextjs-app-router",
          },
          {
            title: "Real-world Analytics Dashboard",
            href: "/docs/recharts/real-world-dashboard",
          },
          {
            title: "Performance & Accessibility",
            href: "/docs/recharts/performance-a11y",
          },
          {
            title: "Pitfalls & Senior Q&A",
            href: "/docs/recharts/pitfalls",
          },
        ],
      },
      {
        title: "Toast Notify",
        href: "/docs/toast-notify",
        children: [
          {
            title: "Toast Philosophy & UX Matrix",
            href: "/docs/toast-notify/concept-ux-matrix",
          },
          {
            title: "Sonner vs React Toastify",
            href: "/docs/toast-notify/sonner-vs-toastify",
          },
          {
            title: "Sonner Setup & Core API",
            href: "/docs/toast-notify/sonner-basics",
          },
          {
            title: "Sonner Promises & Actions",
            href: "/docs/toast-notify/sonner-advanced",
          },
          {
            title: "React Toastify Core Setup",
            href: "/docs/toast-notify/react-toastify-basics",
          },
          {
            title: "React Toastify Advanced",
            href: "/docs/toast-notify/react-toastify-advanced",
          },
          {
            title: "shadcn/ui Sonner & Theming",
            href: "/docs/toast-notify/shadcn-sonner",
          },
          {
            title: "UX Copywriting & Thai Tone",
            href: "/docs/toast-notify/ux-copywriting",
          },
          {
            title: "Accessibility & WAI-ARIA",
            href: "/docs/toast-notify/accessibility",
          },
          {
            title: "Real-world Fullstack Flows",
            href: "/docs/toast-notify/real-world-flows",
          },
          {
            title: "Migration & Unified Wrapper",
            href: "/docs/toast-notify/migration-wrapper",
          },
          {
            title: "Pitfalls & Senior Q&A",
            href: "/docs/toast-notify/pitfalls",
          },
        ],
      },
    ],
  },
  // 2. หมวด BACKEND
  {
    title: "BACKEND",
    color: "#34c759",
    items: [
      {
        title: "Node.js",
        href: "/docs/backend/nodejs",
        children: [
          {
            title: "Module System",
            href: "/docs/backend/nodejs/module-system",
          },
          {
            title: "Package Scripts",
            href: "/docs/backend/nodejs/package-scripts",
          },
          {
            title: "Env Variables",
            href: "/docs/backend/nodejs/env-variables",
          },
          {
            title: "Async Await",
            href: "/docs/backend/nodejs/async-await",
          },
          {
            title: "HTTP Server",
            href: "/docs/backend/nodejs/http-server",
          },
          {
            title: "Event Loop",
            href: "/docs/backend/nodejs/event-loop",
          },
          {
            title: "Process Errors",
            href: "/docs/backend/nodejs/process-errors",
          },
          {
            title: "Streams & Buffer",
            href: "/docs/backend/nodejs/streams-buffer",
          },
          {
            title: "Workers & Memory",
            href: "/docs/backend/nodejs/workers-memory",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/nodejs/pitfalls",
          },
        ],
      },
      {
        title: "NestJS 11",
        href: "/docs/backend/nestjs",
        children: [
          {
            title: "Architecture",
            href: "/docs/backend/nestjs/architecture",
          },
          {
            title: "Modules",
            href: "/docs/backend/nestjs/modules",
          },
          {
            title: "Controllers",
            href: "/docs/backend/nestjs/controllers",
          },
          {
            title: "Providers Services",
            href: "/docs/backend/nestjs/providers-services",
          },
          {
            title: "Dependency Inject",
            href: "/docs/backend/nestjs/dependency-injection",
          },
          {
            title: "ConfigModule",
            href: "/docs/backend/nestjs/config-module",
          },
          {
            title: "Request Lifecycle",
            href: "/docs/backend/nestjs/request-lifecycle",
          },
          {
            title: "Middleware",
            href: "/docs/backend/nestjs/middleware",
          },
          {
            title: "Pipes",
            href: "/docs/backend/nestjs/pipes",
          },
          {
            title: "Guards",
            href: "/docs/backend/nestjs/guards",
          },
          {
            title: "Interceptors",
            href: "/docs/backend/nestjs/interceptors",
          },
          {
            title: "Exception Filters",
            href: "/docs/backend/nestjs/exception-filters",
          },
          {
            title: "Feature Structure",
            href: "/docs/backend/nestjs/feature-structure",
          },
          {
            title: "Enterprise Logging",
            href: "/docs/backend/nestjs/enterprise-logging",
          },
          {
            title: "Health Check",
            href: "/docs/backend/nestjs/health-check",
          },
          {
            title: "Redis Caching",
            href: "/docs/backend/nestjs/redis-cache",
          },
          {
            title: "Queue (BullMQ)",
            href: "/docs/backend/nestjs/bullmq-queue",
          },
          {
            title: "Cron Schedule",
            href: "/docs/backend/nestjs/cron-schedule",
          },
          {
            title: "Real-time (WS & SSE)",
            href: "/docs/backend/nestjs/websocket-sse",
          },
          {
            title: "Graceful Shutdown",
            href: "/docs/backend/nestjs/graceful-shutdown",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/nestjs/pitfalls",
          },
        ],
      },
      {
        title: "REST API Design",
        href: "/docs/backend/rest-api",
        children: [
          {
            title: "Status Codes",
            href: "/docs/backend/rest-api/status-codes",
          },
          {
            title: "Resource URL",
            href: "/docs/backend/rest-api/resource-url",
          },
          {
            title: "HTTP Idempotency",
            href: "/docs/backend/rest-api/http-idempotency",
          },
          {
            title: "Response Envelope",
            href: "/docs/backend/rest-api/response-envelope",
          },
          {
            title: "Pagination Filter",
            href: "/docs/backend/rest-api/pagination-filter",
          },
          {
            title: "Versioning CORS",
            href: "/docs/backend/rest-api/versioning-cors",
          },
          {
            title: "Frontend Contract",
            href: "/docs/backend/rest-api/frontend-contract",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/rest-api/pitfalls",
          },
        ],
      },
      {
        title: "Prisma ORM",
        href: "/docs/backend/prisma-orm",
        children: [
          {
            title: "Prisma Schema",
            href: "/docs/backend/prisma-orm/prisma-schema",
          },
          {
            title: "Model Relations",
            href: "/docs/backend/prisma-orm/model-relations",
          },
          {
            title: "Prisma Client",
            href: "/docs/backend/prisma-orm/prisma-client",
          },
          {
            title: "PrismaService",
            href: "/docs/backend/prisma-orm/prisma-service",
          },
          {
            title: "Transactions",
            href: "/docs/backend/prisma-orm/transactions",
          },
          {
            title: "N1 Query Fix",
            href: "/docs/backend/prisma-orm/n1-query-fix",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/prisma-orm/pitfalls",
          },
        ],
      },
      {
        title: "Authentication",
        href: "/docs/backend/authentication",
        children: [
          {
            title: "Auth Flow Bcrypt",
            href: "/docs/backend/authentication/auth-flow-bcrypt",
          },
          {
            title: "JWT HttpOnly",
            href: "/docs/backend/authentication/jwt-httponly",
          },
          {
            title: "JWT vs Session",
            href: "/docs/backend/authentication/jwt-vs-session",
          },
          {
            title: "Passport Guard",
            href: "/docs/backend/authentication/passport-guard",
          },
          {
            title: "RBAC Decorator",
            href: "/docs/backend/authentication/rbac-decorator",
          },
          {
            title: "Token Rotation",
            href: "/docs/backend/authentication/token-rotation",
          },
          {
            title: "OAuth & Social",
            href: "/docs/backend/authentication/oauth-social",
          },
          {
            title: "Email Verification",
            href: "/docs/backend/authentication/email-verify",
          },
          {
            title: "Reset Password",
            href: "/docs/backend/authentication/reset-password",
          },
          {
            title: "2FA / MFA",
            href: "/docs/backend/authentication/two-factor",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/authentication/pitfalls",
          },
        ],
      },
      {
        title: "Security",
        href: "/docs/backend/security",
        children: [
          {
            title: "Helmet CORS",
            href: "/docs/backend/security/helmet-cors",
          },
          {
            title: "Rate Limiting",
            href: "/docs/backend/security/rate-limiting",
          },
          {
            title: "XSS CSRF Defense",
            href: "/docs/backend/security/xss-csrf-defense",
          },
          {
            title: "BOLA IDOR Guard",
            href: "/docs/backend/security/bola-idor-guard",
          },
          {
            title: "Secrets Audit",
            href: "/docs/backend/security/secrets-audit",
          },
          {
            title: "OWASP Top 10",
            href: "/docs/backend/security/owasp-top-10",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/security/pitfalls",
          },
        ],
      },
      {
        title: "Validation",
        href: "/docs/backend/validation",
        children: [
          {
            title: "ValidationPipe",
            href: "/docs/backend/validation/validation-pipe",
          },
          {
            title: "Class Validator",
            href: "/docs/backend/validation/class-validator",
          },
          {
            title: "Mapped Types",
            href: "/docs/backend/validation/mapped-types",
          },
          {
            title: "Nested Transform",
            href: "/docs/backend/validation/nested-transform",
          },
          {
            title: "Exclude Expose",
            href: "/docs/backend/validation/exclude-expose",
          },
          {
            title: "Validator vs Zod",
            href: "/docs/backend/validation/validator-vs-zod",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/validation/pitfalls",
          },
        ],
      },
      {
        title: "File Upload",
        href: "/docs/backend/file-upload",
        children: [
          {
            title: "Multer Pipeline",
            href: "/docs/backend/file-upload/multer-pipeline",
          },
          {
            title: "Magic Number",
            href: "/docs/backend/file-upload/magic-number",
          },
          {
            title: "Supabase Storage",
            href: "/docs/backend/file-upload/supabase-storage",
          },
          {
            title: "Signed URLs",
            href: "/docs/backend/file-upload/signed-urls",
          },
          {
            title: "Orphan Cleanup",
            href: "/docs/backend/file-upload/orphan-cleanup",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/file-upload/pitfalls",
          },
        ],
      },
      {
        title: "Docker",
        href: "/docs/backend/docker",
        children: [
          {
            title: "Docker Concepts",
            href: "/docs/backend/docker/docker-concepts",
          },
          {
            title: "Docker Compose",
            href: "/docs/backend/docker/docker-compose",
          },
          {
            title: "Volumes Health",
            href: "/docs/backend/docker/volumes-health",
          },
          {
            title: "Network Debug",
            href: "/docs/backend/docker/network-debug",
          },
          {
            title: "Multi-stage Build",
            href: "/docs/backend/docker/multi-stage-build",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/docker/pitfalls",
          },
        ],
      },
      {
        title: "Swagger",
        href: "/docs/backend/swagger",
        children: [
          {
            title: "SwaggerModule",
            href: "/docs/backend/swagger/swagger-module",
          },
          {
            title: "API Decorators",
            href: "/docs/backend/swagger/api-decorators",
          },
          {
            title: "CLI Plugin",
            href: "/docs/backend/swagger/cli-plugin",
          },
          {
            title: "Security Schemes",
            href: "/docs/backend/swagger/security-schemes",
          },
          {
            title: "Codegen Client",
            href: "/docs/backend/swagger/codegen-client",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/swagger/pitfalls",
          },
        ],
      },
      {
        title: "AI Integration",
        href: "/docs/backend/ai-integration",
        children: [
          {
            title: "Groq SDK Setup",
            href: "/docs/backend/ai-integration/groq-sdk-setup",
          },
          {
            title: "GroqService",
            href: "/docs/backend/ai-integration/groq-service",
          },
          {
            title: "Prompt Design",
            href: "/docs/backend/ai-integration/prompt-design",
          },
          {
            title: "Rate Limit Cost",
            href: "/docs/backend/ai-integration/rate-limit-cost",
          },
          {
            title: "Prompt Security",
            href: "/docs/backend/ai-integration/prompt-security",
          },
          {
            title: "Anti-patterns",
            href: "/docs/backend/ai-integration/pitfalls",
          },
        ],
      },
      {
        title: "Email Service",
        href: "/docs/backend/email",
      },
      {
        title: "Payment Gateway",
        href: "/docs/backend/payment",
      },
      {
        title: "Observability",
        href: "/docs/backend/observability",
      },
      {
        title: "CI/CD & Deploy",
        href: "/docs/backend/deployment-cicd",
      },
      {
        title: "Monorepo",
        href: "/docs/backend/monorepo",
      },
    ],
  },
  // 3. หมวด DATABASE
  {
    title: "DATABASE",
    color: "#f59e0b",
    items: [
      {
        title: "MySQL 8.x",
        href: "/docs/database/mysql",
        children: [
          {
            title: "Storage Engines",
            href: "/docs/database/mysql/storage-engines",
          },
          {
            title: "Data Types",
            href: "/docs/database/mysql/data-types",
          },
          {
            title: "CharSet Collation",
            href: "/docs/database/mysql/charset-collation",
          },
          {
            title: "Keys Constraints",
            href: "/docs/database/mysql/keys-constraints",
          },
          {
            title: "mysql CLI Tools",
            href: "/docs/database/mysql/cli-tools",
          },
          {
            title: "Transactions ACID",
            href: "/docs/database/mysql/transactions-acid",
          },
          {
            title: "Locking Mechanics",
            href: "/docs/database/mysql/locking-mechanics",
          },
          {
            title: "InnoDB Indexes",
            href: "/docs/database/mysql/innodb-indexes",
          },
          {
            title: "Query Optimization",
            href: "/docs/database/mysql/query-optimization",
          },
          {
            title: "Replication Binlog",
            href: "/docs/database/mysql/replication-binlog",
          },
          {
            title: "Server Tuning",
            href: "/docs/database/mysql/server-tuning",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/mysql/pitfalls",
          },
        ],
      },
      {
        title: "PostgreSQL 16",
        href: "/docs/database/postgresql",
        children: [
          {
            title: "RDBMS Comparison",
            href: "/docs/database/postgresql/rdbms-comparison",
          },
          {
            title: "Data Types",
            href: "/docs/database/postgresql/data-types",
          },
          {
            title: "Constraints",
            href: "/docs/database/postgresql/constraints",
          },
          {
            title: "psql CLI Tools",
            href: "/docs/database/postgresql/psql-cli-tools",
          },
          {
            title: "Schema Roles",
            href: "/docs/database/postgresql/schema-roles",
          },
          {
            title: "Extensions",
            href: "/docs/database/postgresql/extensions",
          },
          {
            title: "Process MVCC",
            href: "/docs/database/postgresql/process-mvcc",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/postgresql/pitfalls",
          },
        ],
      },
      {
        title: "SQL",
        href: "/docs/database/sql",
        children: [
          {
            title: "DDL Constraints",
            href: "/docs/database/sql/ddl-constraints",
          },
          {
            title: "Basic CRUD DML",
            href: "/docs/database/sql/basic-crud-dml",
          },
          {
            title: "SELECT Filtering",
            href: "/docs/database/sql/select-filtering",
          },
          {
            title: "String Functions",
            href: "/docs/database/sql/string-functions",
          },
          {
            title: "Math Aggregates",
            href: "/docs/database/sql/math-aggregates",
          },
          {
            title: "CASE NULL Handling",
            href: "/docs/database/sql/case-null-handling",
          },
          {
            title: "Date Time Queries",
            href: "/docs/database/sql/date-time-queries",
          },
          {
            title: "SQL JOINs",
            href: "/docs/database/sql/sql-joins",
          },
          {
            title: "GROUP BY Having",
            href: "/docs/database/sql/group-by-having",
          },
          {
            title: "Set Operations",
            href: "/docs/database/sql/set-operations",
          },
          {
            title: "Subquery CTE",
            href: "/docs/database/sql/subquery-cte",
          },
          {
            title: "Window Functions",
            href: "/docs/database/sql/window-functions",
          },
          {
            title: "DML RETURNING",
            href: "/docs/database/sql/dml-returning",
          },
          {
            title: "UPSERT Conflict",
            href: "/docs/database/sql/upsert-conflict",
          },
          {
            title: "Full-Text Search",
            href: "/docs/database/sql/full-text-search",
          },
          {
            title: "Transactions Locks",
            href: "/docs/database/sql/transactions-locks",
          },
          {
            title: "Index EXPLAIN",
            href: "/docs/database/sql/index-explain",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/sql/pitfalls",
          },
        ],
      },
      {
        title: "Database Design",
        href: "/docs/database/database-design",
        children: [
          {
            title: "ER Diagram",
            href: "/docs/database/database-design/er-diagram",
          },
          {
            title: "Table Relations",
            href: "/docs/database/database-design/table-relations",
          },
          {
            title: "Normalization",
            href: "/docs/database/database-design/normalization",
          },
          {
            title: "Primary Keys",
            href: "/docs/database/database-design/primary-keys",
          },
          {
            title: "Money Snapshot",
            href: "/docs/database/database-design/money-snapshot",
          },
          {
            title: "Soft Delete Audit",
            href: "/docs/database/database-design/soft-delete-audit",
          },
          {
            title: "Full Schema",
            href: "/docs/database/database-design/full-schema",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/database-design/pitfalls",
          },
        ],
      },
      {
        title: "Indexing",
        href: "/docs/database/indexing",
        children: [
          {
            title: "B-Tree Mechanics",
            href: "/docs/database/indexing/b-tree-mechanics",
          },
          {
            title: "Index Types",
            href: "/docs/database/indexing/index-types",
          },
          {
            title: "Composite Index",
            href: "/docs/database/indexing/composite-index",
          },
          {
            title: "Partial Covering",
            href: "/docs/database/indexing/partial-covering",
          },
          {
            title: "Prisma Indexes",
            href: "/docs/database/indexing/prisma-indexes",
          },
          {
            title: "Write Cost",
            href: "/docs/database/indexing/write-cost",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/indexing/pitfalls",
          },
        ],
      },
      {
        title: "Query Performance",
        href: "/docs/database/query-performance",
        children: [
          {
            title: "Slow Query Logs",
            href: "/docs/database/query-performance/slow-query-logs",
          },
          {
            title: "EXPLAIN ANALYZE",
            href: "/docs/database/query-performance/explain-analyze",
          },
          {
            title: "Solving N1 Queries",
            href: "/docs/database/query-performance/solving-n1-queries",
          },
          {
            title: "Keyset Pagination",
            href: "/docs/database/query-performance/keyset-pagination",
          },
          {
            title: "VACUUM Autovacuum",
            href: "/docs/database/query-performance/vacuum-autovacuum",
          },
          {
            title: "Query Tuning",
            href: "/docs/database/query-performance/query-tuning",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/query-performance/pitfalls",
          },
        ],
      },
      {
        title: "Transactions",
        href: "/docs/database/transactions",
        children: [
          {
            title: "ACID Properties",
            href: "/docs/database/transactions/acid-properties",
          },
          {
            title: "BEGIN COMMIT",
            href: "/docs/database/transactions/begin-commit",
          },
          {
            title: "Short Transaction",
            href: "/docs/database/transactions/short-transaction",
          },
          {
            title: "Isolation Levels",
            href: "/docs/database/transactions/isolation-levels",
          },
          {
            title: "Prisma Transaction",
            href: "/docs/database/transactions/prisma-transaction",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/transactions/pitfalls",
          },
        ],
      },
      {
        title: "Concurrency",
        href: "/docs/database/concurrency",
        children: [
          {
            title: "Race Conditions",
            href: "/docs/database/concurrency/race-conditions",
          },
          {
            title: "Row Locking",
            href: "/docs/database/concurrency/row-locking",
          },
          {
            title: "Optimistic Lock",
            href: "/docs/database/concurrency/optimistic-lock",
          },
          {
            title: "Deadlock Defense",
            href: "/docs/database/concurrency/deadlock-defense",
          },
          {
            title: "Idempotency Keys",
            href: "/docs/database/concurrency/idempotency-keys",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/concurrency/pitfalls",
          },
        ],
      },
      {
        title: "Migrations",
        href: "/docs/database/migrations",
        children: [
          {
            title: "Why Migrations",
            href: "/docs/database/migrations/why-migrations",
          },
          {
            title: "Prisma Migrate",
            href: "/docs/database/migrations/prisma-migrate",
          },
          {
            title: "Database Seeding",
            href: "/docs/database/migrations/database-seeding",
          },
          {
            title: "Failed Migration",
            href: "/docs/database/migrations/failed-migration",
          },
          {
            title: "Team Workflow",
            href: "/docs/database/migrations/team-workflow",
          },
          {
            title: "Zero Downtime",
            href: "/docs/database/migrations/zero-downtime",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/migrations/pitfalls",
          },
        ],
      },
      {
        title: "Backup",
        href: "/docs/database/backup",
        children: [
          {
            title: "pg_dump Restore",
            href: "/docs/database/backup/pg-dump-restore",
          },
          {
            title: "Docker Backup",
            href: "/docs/database/backup/docker-backup",
          },
          {
            title: "Logical vs PITR",
            href: "/docs/database/backup/logical-vs-pitr",
          },
          {
            title: "Supabase Backup",
            href: "/docs/database/backup/supabase-backup",
          },
          {
            title: "Restore Drills",
            href: "/docs/database/backup/restore-drills",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/backup/pitfalls",
          },
        ],
      },
      {
        title: "Security",
        href: "/docs/database/security",
        children: [
          {
            title: "Least Privilege",
            href: "/docs/database/security/least-privilege",
          },
          {
            title: "SSL TLS Secrets",
            href: "/docs/database/security/ssl-tls-secrets",
          },
          {
            title: "SQL Injection",
            href: "/docs/database/security/sql-injection",
          },
          {
            title: "Network PDPA",
            href: "/docs/database/security/network-pdpa",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/security/pitfalls",
          },
        ],
      },
      {
        title: "Connection Pooling",
        href: "/docs/database/connection-pooling",
        children: [
          {
            title: "Connection Cost",
            href: "/docs/database/connection-pooling/connection-cost",
          },
          {
            title: "Pool Size Formula",
            href: "/docs/database/connection-pooling/pool-size-formula",
          },
          {
            title: "Prisma Pool Limit",
            href: "/docs/database/connection-pooling/prisma-pool-limit",
          },
          {
            title: "pg_stat_activity",
            href: "/docs/database/connection-pooling/pg-stat-activity",
          },
          {
            title: "PgBouncer Modes",
            href: "/docs/database/connection-pooling/pgbouncer-modes",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/connection-pooling/pitfalls",
          },
        ],
      },
      {
        title: "Supabase",
        href: "/docs/database/supabase",
        children: [
          {
            title: "Managed Postgres",
            href: "/docs/database/supabase/managed-postgres",
          },
          {
            title: "Free Tier Limits",
            href: "/docs/database/supabase/free-tier-limits",
          },
          {
            title: "Direct vs Pooler",
            href: "/docs/database/supabase/direct-vs-pooler",
          },
          {
            title: "Pooler Modes",
            href: "/docs/database/supabase/pooler-modes",
          },
          {
            title: "Row Level Security",
            href: "/docs/database/supabase/row-level-security",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/supabase/pitfalls",
          },
        ],
      },
      {
        title: "SQL vs NoSQL",
        href: "/docs/database/sql-vs-nosql",
        children: [
          {
            title: "Relational vs NoSQL",
            href: "/docs/database/sql-vs-nosql/relational-vs-nosql",
          },
          {
            title: "Redis Caching",
            href: "/docs/database/sql-vs-nosql/redis-caching",
          },
          {
            title: "MongoDB Use Cases",
            href: "/docs/database/sql-vs-nosql/mongodb-use-cases",
          },
          {
            title: "CAP Theorem",
            href: "/docs/database/sql-vs-nosql/cap-theorem",
          },
          {
            title: "Polyglot Strategy",
            href: "/docs/database/sql-vs-nosql/polyglot-strategy",
          },
          {
            title: "Anti-patterns",
            href: "/docs/database/sql-vs-nosql/pitfalls",
          },
        ],
      },
    ],
  },
  // 4. หมวด TESTING & QUALITY
  {
    title: "TESTING & QUALITY",
    color: "#af52de",
    items: [
      {
        title: "Testing Fundamentals",
        href: "/docs/testing/fundamentals",
        children: [
          {
            title: "Cost of Bugs",
            href: "/docs/testing/fundamentals/cost-of-bugs",
          },
          {
            title: "AAA Pattern",
            href: "/docs/testing/fundamentals/aaa-pattern",
          },
          {
            title: "What to Test",
            href: "/docs/testing/fundamentals/what-to-test",
          },
          {
            title: "Testing Pyramid",
            href: "/docs/testing/fundamentals/testing-pyramid",
          },
          {
            title: "Test Doubles",
            href: "/docs/testing/fundamentals/test-doubles",
          },
          {
            title: "Code Coverage",
            href: "/docs/testing/fundamentals/code-coverage",
          },
          {
            title: "TDD Workflow",
            href: "/docs/testing/fundamentals/tdd-workflow",
          },
          {
            title: "Flaky Tests",
            href: "/docs/testing/fundamentals/flaky-tests",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/fundamentals/pitfalls",
          },
        ],
      },
      {
        title: "Jest",
        href: "/docs/testing/jest",
        children: [
          {
            title: "Test Structure",
            href: "/docs/testing/jest/test-structure",
          },
          {
            title: "Jest Matchers",
            href: "/docs/testing/jest/jest-matchers",
          },
          {
            title: "Setup Teardown",
            href: "/docs/testing/jest/setup-teardown",
          },
          {
            title: "CLI Watch Mode",
            href: "/docs/testing/jest/cli-watch-mode",
          },
          {
            title: "Async Promises",
            href: "/docs/testing/jest/async-promises",
          },
          {
            title: "Mock Functions",
            href: "/docs/testing/jest/mock-functions",
          },
          {
            title: "Mock Modules",
            href: "/docs/testing/jest/mock-modules",
          },
          {
            title: "Fake Timers",
            href: "/docs/testing/jest/fake-timers",
          },
          {
            title: "Snapshots",
            href: "/docs/testing/jest/snapshots",
          },
          {
            title: "Jest TS Config",
            href: "/docs/testing/jest/jest-ts-config",
          },
          {
            title: "Jest vs Vitest",
            href: "/docs/testing/jest/jest-vs-vitest",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/jest/pitfalls",
          },
        ],
      },
      {
        title: "Backend Testing",
        href: "/docs/testing/backend-testing",
        children: [
          {
            title: "TestingModule DI",
            href: "/docs/testing/backend-testing/testing-module-di",
          },
          {
            title: "Service Unit Test",
            href: "/docs/testing/backend-testing/service-unit-test",
          },
          {
            title: "Controller Guards",
            href: "/docs/testing/backend-testing/controller-guards",
          },
          {
            title: "Supertest E2E",
            href: "/docs/testing/backend-testing/supertest-e2e",
          },
          {
            title: "Auth Upload Test",
            href: "/docs/testing/backend-testing/auth-upload-test",
          },
          {
            title: "Test DB Isolation",
            href: "/docs/testing/backend-testing/test-db-isolation",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/backend-testing/pitfalls",
          },
        ],
      },
      {
        title: "Frontend Testing",
        href: "/docs/testing/frontend-testing",
        children: [
          {
            title: "RTL Philosophy",
            href: "/docs/testing/frontend-testing/rtl-philosophy",
          },
          {
            title: "Query Priority",
            href: "/docs/testing/frontend-testing/query-priority",
          },
          {
            title: "User Event Forms",
            href: "/docs/testing/frontend-testing/user-event-forms",
          },
          {
            title: "Hooks Query Store",
            href: "/docs/testing/frontend-testing/hooks-query-store",
          },
          {
            title: "MSW API Mocking",
            href: "/docs/testing/frontend-testing/msw-api-mocking",
          },
          {
            title: "RSC Testing",
            href: "/docs/testing/frontend-testing/rsc-testing",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/frontend-testing/pitfalls",
          },
        ],
      },
      {
        title: "Playwright",
        href: "/docs/testing/playwright",
        children: [
          {
            title: "Playwright Setup",
            href: "/docs/testing/playwright/playwright-setup",
          },
          {
            title: "Locators Waiting",
            href: "/docs/testing/playwright/locators-waiting",
          },
          {
            title: "Checkout Flow",
            href: "/docs/testing/playwright/checkout-flow",
          },
          {
            title: "Page Object Model",
            href: "/docs/testing/playwright/page-object-model",
          },
          {
            title: "Trace Viewer CI",
            href: "/docs/testing/playwright/trace-viewer-ci",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/playwright/pitfalls",
          },
        ],
      },
      {
        title: "ESLint",
        href: "/docs/testing/eslint",
        children: [
          {
            title: "Linter vs Format",
            href: "/docs/testing/eslint/linter-vs-format",
          },
          {
            title: "Flat Config",
            href: "/docs/testing/eslint/flat-config",
          },
          {
            title: "TS React Rules",
            href: "/docs/testing/eslint/ts-react-rules",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/eslint/pitfalls",
          },
        ],
      },
      {
        title: "Prettier",
        href: "/docs/testing/prettier",
        children: [
          {
            title: "Scripts Monorepo",
            href: "/docs/testing/prettier/scripts-monorepo",
          },
          {
            title: "Prettier Tailwind",
            href: "/docs/testing/prettier/prettier-tailwind",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/prettier/pitfalls",
          },
        ],
      },
      {
        title: "Git",
        href: "/docs/testing/git",
        children: [
          {
            title: "Git Basics Flow",
            href: "/docs/testing/git/basics-flow",
          },
          {
            title: "Commit Conventions",
            href: "/docs/testing/git/commit-conventions",
          },
          {
            title: "Branching Strategy",
            href: "/docs/testing/git/branching-strategy",
          },
          {
            title: "Merge vs Rebase",
            href: "/docs/testing/git/merge-vs-rebase",
          },
          {
            title: "Stash Reset Revert",
            href: "/docs/testing/git/stash-reset-revert",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/git/pitfalls",
          },
        ],
      },
      {
        title: "Git Hooks",
        href: "/docs/testing/git-hooks",
        children: [
          {
            title: "Husky lint-staged",
            href: "/docs/testing/git-hooks/husky-lint-staged",
          },
          {
            title: "Commit Standard",
            href: "/docs/testing/git-hooks/commit-standard",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/git-hooks/pitfalls",
          },
        ],
      },
      {
        title: "GitHub Actions",
        href: "/docs/testing/github-actions",
        children: [
          {
            title: "CI Pipeline",
            href: "/docs/testing/github-actions/ci-pipeline",
          },
          {
            title: "Branch Protection",
            href: "/docs/testing/github-actions/branch-protection",
          },
          {
            title: "Postgres CI E2E",
            href: "/docs/testing/github-actions/postgres-ci-e2e",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/github-actions/pitfalls",
          },
        ],
      },
      {
        title: "Type Checking",
        href: "/docs/testing/type-checking",
        children: [
          {
            title: "Strict Mode tsc",
            href: "/docs/testing/type-checking/strict-mode-tsc",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/type-checking/pitfalls",
          },
        ],
      },
      {
        title: "Debugging",
        href: "/docs/testing/debugging",
        children: [
          {
            title: "Stack Trace Bug",
            href: "/docs/testing/debugging/stack-trace-bug",
          },
          {
            title: "Debug Jest Tests",
            href: "/docs/testing/debugging/debug-jest-tests",
          },
          {
            title: "Debug Fullstack",
            href: "/docs/testing/debugging/debug-fullstack",
          },
          {
            title: "Logging Audit",
            href: "/docs/testing/debugging/logging-audit",
          },
          {
            title: "Anti-patterns",
            href: "/docs/testing/debugging/pitfalls",
          },
        ],
      },
    ],
  },
];

// Helper to flatten all navigable doc items (both main items and child subtopics)
export interface FlatDocMeta {
  slugPath: string; // e.g. "nextjs" or "nextjs/ssr"
  slugArray: string[]; // e.g. ["nextjs"] or ["nextjs", "ssr"]
  title: string;
  category: string;
  parentTitle?: string;
  href: string;
}

export function getAllFlatDocs(): FlatDocMeta[] {
  const result: FlatDocMeta[] = [];

  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      const itemSlug = item.href.replace('/docs/', '');
      result.push({
        slugPath: itemSlug,
        slugArray: itemSlug.split('/'),
        title: item.title,
        category: group.title,
        href: item.href,
      });

      if (item.children) {
        for (const child of item.children) {
          // Skip in-page hash anchors so only standalone doc pages are registered as routes
          if (child.href.includes('#')) continue;
          const childSlug = child.href.replace('/docs/', '');
          result.push({
            slugPath: childSlug,
            slugArray: childSlug.split('/'),
            title: child.title,
            category: group.title,
            parentTitle: item.title,
            href: child.href,
          });
        }
      }
    }
  }

  return result;
}

export function getAdjacentDoc(currentSlugPath: string): {
  prev: FlatDocMeta | null;
  next: FlatDocMeta | null;
} {
  const list = getAllFlatDocs();
  const index = list.findIndex((d) => d.slugPath === currentSlugPath);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}
