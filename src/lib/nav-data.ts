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
    title: 'FRONTEND',
    color: '#0071e3', // Apple Blue
    items: [
      {
        title: 'Next.js 16',
        href: '/docs/nextjs',
        children: [
          {
            title: 'SSR',
            href: '/docs/nextjs/ssr',
          },
          {
            title: 'Routing',
            href: '/docs/nextjs/routing',
          },
          {
            title: 'RSC vs Client',
            href: '/docs/nextjs/rsc-client',
          },
          {
            title: 'Data Fetching',
            href: '/docs/nextjs/data-fetching',
          },
          {
            title: 'Server Actions',
            href: '/docs/nextjs/server-actions',
          },
          {
            title: 'Forms & Zod',
            href: '/docs/nextjs/forms',
          },
          {
            title: 'Authentication',
            href: '/docs/nextjs/auth',
          },
          {
            title: 'Database & API',
            href: '/docs/nextjs/database',
          },
          {
            title: 'Env Variables',
            href: '/docs/nextjs/env',
          },
          {
            title: 'Error & Loading',
            href: '/docs/nextjs/error-handling',
          },
          {
            title: 'Optimization',
            href: '/docs/nextjs/optimization',
          },
          {
            title: 'Deployment',
            href: '/docs/nextjs/deployment',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/nextjs/pitfalls',
          },
        ],
      },
      {
        title: 'React 19',
        href: '/docs/react',
        children: [
          {
            title: 'JSX & Props',
            href: '/docs/react/basics',
          },
          {
            title: 'State & Render',
            href: '/docs/react/state-render',
          },
          {
            title: 'useEffect',
            href: '/docs/react/use-effect',
          },
          {
            title: 'Hooks & Memo',
            href: '/docs/react/memo-hooks',
          },
          {
            title: 'Context vs Zustand',
            href: '/docs/react/context-zustand',
          },
          {
            title: 'useReducer',
            href: '/docs/react/use-reducer',
          },
          {
            title: 'Custom Hooks',
            href: '/docs/react/custom-hooks',
          },
          {
            title: 'Forms',
            href: '/docs/react/forms',
          },
          {
            title: 'Client Fetching',
            href: '/docs/react/client-fetching',
          },
          {
            title: 'React 19 New',
            href: '/docs/react/react-19-features',
          },
          {
            title: 'Error & Suspense',
            href: '/docs/react/error-suspense',
          },
          {
            title: 'Performance',
            href: '/docs/react/performance',
          },
          {
            title: 'Architecture',
            href: '/docs/react/architecture',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/react/pitfalls',
          },
        ],
      },
      {
        title: 'TypeScript',
        href: '/docs/typescript',
        children: [
          {
            title: 'Primitives & Types',
            href: '/docs/typescript/basics',
          },
          {
            title: 'Inference',
            href: '/docs/typescript/inference',
          },
          {
            title: 'Interface vs Type',
            href: '/docs/typescript/interface-vs-type',
          },
          {
            title: 'Unions & Literals',
            href: '/docs/typescript/unions',
          },
          {
            title: 'Narrowing',
            href: '/docs/typescript/narrowing',
          },
          {
            title: 'Functions',
            href: '/docs/typescript/functions',
          },
          {
            title: 'Generics',
            href: '/docs/typescript/generics',
          },
          {
            title: 'Utility Types',
            href: '/docs/typescript/utility-types',
          },
          {
            title: 'keyof & satisfies',
            href: '/docs/typescript/advanced-types',
          },
          {
            title: 'Classes & OOP',
            href: '/docs/typescript/classes-oop',
          },
          {
            title: 'Async & Result',
            href: '/docs/typescript/async-error',
          },
          {
            title: 'TS in React',
            href: '/docs/typescript/react-ts',
          },
          {
            title: 'TS in Backend',
            href: '/docs/typescript/backend-ts',
          },
          {
            title: 'Zod Validation',
            href: '/docs/typescript/zod-runtime',
          },
          {
            title: 'tsconfig.json',
            href: '/docs/typescript/tsconfig',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/typescript/pitfalls',
          },
        ],
      },
      {
        title: 'HTML5',
        href: '/docs/html',
        children: [
          {
            title: 'Doc Structure',
            href: '/docs/html/document-structure',
          },
          {
            title: 'Block vs Inline',
            href: '/docs/html/block-inline-dom',
          },
          {
            title: 'Text & Headings',
            href: '/docs/html/text-content',
          },
          {
            title: 'Links & Nav',
            href: '/docs/html/links-navigation',
          },
          {
            title: 'Lists & Tables',
            href: '/docs/html/lists-tables',
          },
          {
            title: 'Images & Media',
            href: '/docs/html/images-media',
          },
          {
            title: 'Semantic HTML',
            href: '/docs/html/semantic-html',
          },
          {
            title: 'Forms',
            href: '/docs/html/forms',
          },
          {
            title: 'Form Validation',
            href: '/docs/html/form-validation',
          },
          {
            title: 'Attributes',
            href: '/docs/html/attributes',
          },
          {
            title: 'Accessibility',
            href: '/docs/html/accessibility',
          },
          {
            title: 'Meta & SEO',
            href: '/docs/html/meta-seo',
          },
          {
            title: 'Scripts & Link',
            href: '/docs/html/scripts-resources',
          },
          {
            title: 'Entities & XSS',
            href: '/docs/html/entities-xss',
          },
          {
            title: 'HTML in React',
            href: '/docs/html/react-html',
          },
          {
            title: 'HTML in Next.js',
            href: '/docs/html/nextjs-html',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/html/pitfalls',
          },
        ],
      },
      {
        title: 'CSS',
        href: '/docs/css',
        children: [
          {
            title: 'Basics & Syntax',
            href: '/docs/css/basics',
          },
          {
            title: 'Selectors',
            href: '/docs/css/selectors',
          },
          {
            title: 'Cascade & Specificity',
            href: '/docs/css/cascade-specificity',
          },
          {
            title: 'Box Model',
            href: '/docs/css/box-model',
          },
          {
            title: 'Units & clamp()',
            href: '/docs/css/units-values',
          },
          {
            title: 'Colors & oklch()',
            href: '/docs/css/colors-backgrounds',
          },
          {
            title: 'Typography',
            href: '/docs/css/typography',
          },
          {
            title: 'Display & Position',
            href: '/docs/css/display-position',
          },
          {
            title: 'Flexbox Layout',
            href: '/docs/css/flexbox',
          },
          {
            title: 'CSS Grid',
            href: '/docs/css/grid',
          },
          {
            title: 'Responsive Design',
            href: '/docs/css/responsive',
          },
          {
            title: 'Variables & Themes',
            href: '/docs/css/variables-themes',
          },
          {
            title: 'Animations',
            href: '/docs/css/transitions-animations',
          },
          {
            title: 'UI Patterns',
            href: '/docs/css/ui-patterns',
          },
          {
            title: 'Architecture & BEM',
            href: '/docs/css/architecture-bem',
          },
          {
            title: 'Tailwind CSS v4',
            href: '/docs/css/tailwind-v4',
          },
          {
            title: 'CSS in React/Next.js',
            href: '/docs/css/react-nextjs-css',
          },
          {
            title: 'Performance & a11y',
            href: '/docs/css/performance-a11y',
          },
          {
            title: 'DevTools Debugging',
            href: '/docs/css/devtools-debugging',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/css/pitfalls',
          },
        ],
      },
      {
        title: 'Tailwind CSS v4',
        href: '/docs/tailwind',
        children: [
          {
            title: 'Utility-first',
            href: '/docs/tailwind/utility-first',
          },
          {
            title: 'Next.js 16 Setup',
            href: '/docs/tailwind/installation',
          },
          {
            title: 'Spacing & Sizing',
            href: '/docs/tailwind/spacing-sizing',
          },
          {
            title: 'Flexbox & Grid',
            href: '/docs/tailwind/flexbox-grid',
          },
          {
            title: 'Typography & Thai',
            href: '/docs/tailwind/typography',
          },
          {
            title: 'Colors & Shadows',
            href: '/docs/tailwind/colors-effects',
          },
          {
            title: 'Responsive Design',
            href: '/docs/tailwind/responsive',
          },
          {
            title: 'State Variants',
            href: '/docs/tailwind/state-variants',
          },
          {
            title: 'Dark Mode & Themes',
            href: '/docs/tailwind/dark-mode',
          },
          {
            title: '@theme & CSS-first',
            href: '/docs/tailwind/css-first-theme',
          },
          {
            title: 'Animations',
            href: '/docs/tailwind/transitions-animations',
          },
          {
            title: 'Modern UI Effects',
            href: '/docs/tailwind/modern-ui-effects',
          },
          {
            title: 'Arbitrary Values',
            href: '/docs/tailwind/arbitrary-variables',
          },
          {
            title: 'Class in React (cn)',
            href: '/docs/tailwind/class-management',
          },
          {
            title: 'Code Organization',
            href: '/docs/tailwind/code-organization',
          },
          {
            title: 'Tailwind & shadcn',
            href: '/docs/tailwind/shadcn-integration',
          },
          {
            title: 'Performance & a11y',
            href: '/docs/tailwind/performance-a11y',
          },
          {
            title: 'DevTools Debugging',
            href: '/docs/tailwind/debugging',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/tailwind/pitfalls',
          },
        ],
      },
      {
        title: 'shadcn/ui',
        href: '/docs/shadcn',
        children: [
          {
            title: 'Philosophy & Copy-Paste',
            href: '/docs/shadcn/philosophy',
          },
          {
            title: '3-Layer Architecture',
            href: '/docs/shadcn/three-layer-architecture',
          },
          {
            title: 'Next.js 16 + v4 Setup',
            href: '/docs/shadcn/installation',
          },
          {
            title: 'cn() & tailwind-merge',
            href: '/docs/shadcn/cn-utility',
          },
          {
            title: 'Theming & Variables',
            href: '/docs/shadcn/theming-variables',
          },
          {
            title: 'cva & asChild Slot',
            href: '/docs/shadcn/cva-variants',
          },
          {
            title: 'Core Components',
            href: '/docs/shadcn/core-components',
          },
          {
            title: 'Overlays & Dialogs',
            href: '/docs/shadcn/overlays-dialogs',
          },
          {
            title: 'Forms (RHF + Zod)',
            href: '/docs/shadcn/forms-zod',
          },
          {
            title: 'Toast with Sonner',
            href: '/docs/shadcn/toast-sonner',
          },
          {
            title: 'Navigation & Layout',
            href: '/docs/shadcn/navigation-layout',
          },
          {
            title: 'Tables & Charts',
            href: '/docs/shadcn/data-display',
          },
          {
            title: 'Lucide React Icons',
            href: '/docs/shadcn/lucide-icons',
          },
          {
            title: 'Component Customization',
            href: '/docs/shadcn/customization',
          },
          {
            title: 'App Router & Client',
            href: '/docs/shadcn/nextjs-app-router',
          },
          {
            title: 'Accessibility & Perf',
            href: '/docs/shadcn/accessibility-perf',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/shadcn/pitfalls',
          },
        ],
      },
      {
        title: 'TanStack Query v5',
        href: '/docs/tanstack-query',
        children: [
          {
            title: 'Server vs Client State',
            href: '/docs/tanstack-query/server-vs-client-state',
          },
          {
            title: 'Next.js 16 Setup',
            href: '/docs/tanstack-query/installation-nextjs',
          },
          {
            title: 'useQuery Basics',
            href: '/docs/tanstack-query/use-query-basics',
          },
          {
            title: 'Query Keys Factory',
            href: '/docs/tanstack-query/query-keys',
          },
          {
            title: 'staleTime & gcTime',
            href: '/docs/tanstack-query/caching-lifecycle',
          },
          {
            title: 'queryFn Architecture',
            href: '/docs/tanstack-query/query-fn-design',
          },
          {
            title: 'useMutation',
            href: '/docs/tanstack-query/use-mutation',
          },
          {
            title: 'Cache Invalidation',
            href: '/docs/tanstack-query/invalidation-cache-updates',
          },
          {
            title: 'Optimistic Updates',
            href: '/docs/tanstack-query/optimistic-updates',
          },
          {
            title: 'Pagination & Infinite',
            href: '/docs/tanstack-query/pagination-infinite',
          },
          {
            title: 'Dependent & Parallel',
            href: '/docs/tanstack-query/dependent-parallel',
          },
          {
            title: 'Error & Loading UI',
            href: '/docs/tanstack-query/error-loading-ui',
          },
          {
            title: 'App Router & Prefetch',
            href: '/docs/tanstack-query/nextjs-app-router',
          },
          {
            title: 'NestJS Auth Integration',
            href: '/docs/tanstack-query/auth-nest-integration',
          },
          {
            title: 'Custom Feature Hooks',
            href: '/docs/tanstack-query/custom-hooks',
          },
          {
            title: 'Testing & Mocking',
            href: '/docs/tanstack-query/testing-debugging',
          },
          {
            title: 'Performance & Select',
            href: '/docs/tanstack-query/performance',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/tanstack-query/pitfalls',
          },
        ],
      },
      {
        title: 'Zustand v5',
        href: '/docs/zustand',
        children: [
          {
            title: 'Problem & Comparison',
            href: '/docs/zustand/problem-comparison',
          },
          {
            title: 'Client vs Server State',
            href: '/docs/zustand/client-vs-server-state',
          },
          {
            title: 'First Store Setup',
            href: '/docs/zustand/first-store',
          },
          {
            title: 'TypeScript Typing',
            href: '/docs/zustand/typescript',
          },
          {
            title: 'Reading & Updating State',
            href: '/docs/zustand/reading-updating-state',
          },
          {
            title: 'Selectors & useShallow',
            href: '/docs/zustand/selectors-re-render',
          },
          {
            title: 'Actions & Async Logic',
            href: '/docs/zustand/actions-async',
          },
          {
            title: 'Middlewares (persist/immer)',
            href: '/docs/zustand/middleware',
          },
          {
            title: 'Slices Pattern',
            href: '/docs/zustand/slices-pattern',
          },
          {
            title: 'Next.js 16 SSR Safe',
            href: '/docs/zustand/nextjs-app-router-ssr',
          },
          {
            title: 'Hydration & Persist',
            href: '/docs/zustand/hydration-persist',
          },
          {
            title: 'Real-world Stores',
            href: '/docs/zustand/real-world-examples',
          },
          {
            title: 'Derived State',
            href: '/docs/zustand/derived-state',
          },
          {
            title: 'Vanilla JS Usage',
            href: '/docs/zustand/vanilla-usage',
          },
          {
            title: 'Integration (RHF/Query)',
            href: '/docs/zustand/libraries-integration',
          },
          {
            title: 'Testing & DevTools',
            href: '/docs/zustand/testing-debugging',
          },
          {
            title: 'Performance Tuning',
            href: '/docs/zustand/performance',
          },
          {
            title: 'Pitfalls & Q&A',
            href: '/docs/zustand/pitfalls',
          },
        ],
      },
      {
        title: 'React Hook Form + Zod',
        href: '/docs/react-hook-form-zod',
        children: [
          {
            title: 'Problem & Philosophy',
            href: '/docs/react-hook-form-zod/problems-overview',
          },
          {
            title: 'Zod Basics & Types',
            href: '/docs/react-hook-form-zod/zod-basics',
          },
          {
            title: 'Zod Refine & Transform',
            href: '/docs/react-hook-form-zod/zod-intermediate',
          },
          {
            title: 'z.infer & Type Safety',
            href: '/docs/react-hook-form-zod/type-inference',
          },
          {
            title: 'RHF Core Basics',
            href: '/docs/react-hook-form-zod/rhf-basics',
          },
          {
            title: 'Connecting with zodResolver',
            href: '/docs/react-hook-form-zod/rhf-zod-resolver',
          },
          {
            title: 'Controller & Custom Inputs',
            href: '/docs/react-hook-form-zod/controller',
          },
          {
            title: 'shadcn/ui Form Architecture',
            href: '/docs/react-hook-form-zod/shadcn-form',
          },
          {
            title: 'useFieldArray & Complex Forms',
            href: '/docs/react-hook-form-zod/complex-nested-arrays',
          },
          {
            title: 'Edit Form & State Reset',
            href: '/docs/react-hook-form-zod/edit-form-reset',
          },
          {
            title: 'Submissions & Server Actions',
            href: '/docs/react-hook-form-zod/submit-server-actions',
          },
          {
            title: 'File Uploads & Validation',
            href: '/docs/react-hook-form-zod/file-uploads',
          },
          {
            title: 'Zod Beyond Forms',
            href: '/docs/react-hook-form-zod/zod-beyond-forms',
          },
          {
            title: 'Accessibility & Form UX',
            href: '/docs/react-hook-form-zod/a11y-ux',
          },
          {
            title: 'Performance & Re-renders',
            href: '/docs/react-hook-form-zod/performance',
          },
          {
            title: 'Testing & Debugging',
            href: '/docs/react-hook-form-zod/testing-debugging',
          },
          {
            title: 'Pitfalls & Senior Q&A',
            href: '/docs/react-hook-form-zod/pitfalls',
          },
        ],
      },
      {
        title: 'Recharts',
        href: '/docs/recharts',
        children: [
          {
            title: 'Concept & Ecosystem',
            href: '/docs/recharts/concept-comparison',
          },
          {
            title: 'Installation & Core Setup',
            href: '/docs/recharts/installation-basics',
          },
          {
            title: 'Line, Bar, Area & Pie Charts',
            href: '/docs/recharts/basic-charts',
          },
          {
            title: 'Composed, Dual-Axis & Stacked',
            href: '/docs/recharts/advanced-charts',
          },
          {
            title: 'Styling, Gradients & Formatters',
            href: '/docs/recharts/styling-formatters',
          },
          {
            title: 'Custom Tooltip & Legend',
            href: '/docs/recharts/custom-tooltip-legend',
          },
          {
            title: 'Interactivity & Brush Filter',
            href: '/docs/recharts/interactivity-events',
          },
          {
            title: 'shadcn/ui Chart & Theming',
            href: '/docs/recharts/shadcn-chart-integration',
          },
          {
            title: 'Responsive & Dark Mode',
            href: '/docs/recharts/responsive-dark-mode',
          },
          {
            title: 'Data Wrangling & Pipelines',
            href: '/docs/recharts/data-transformation',
          },
          {
            title: 'Next.js 16 SSR & Hydration',
            href: '/docs/recharts/nextjs-app-router',
          },
          {
            title: 'Real-world Analytics Dashboard',
            href: '/docs/recharts/real-world-dashboard',
          },
          {
            title: 'Performance & Accessibility',
            href: '/docs/recharts/performance-a11y',
          },
          {
            title: 'Pitfalls & Senior Q&A',
            href: '/docs/recharts/pitfalls',
          },
        ],
      },
      {
        title: 'Toast Notify',
        href: '/docs/toast-notify',
        children: [
          {
            title: 'Toast Philosophy & UX Matrix',
            href: '/docs/toast-notify/concept-ux-matrix',
          },
          {
            title: 'Sonner vs React Toastify',
            href: '/docs/toast-notify/sonner-vs-toastify',
          },
          {
            title: 'Sonner Setup & Core API',
            href: '/docs/toast-notify/sonner-basics',
          },
          {
            title: 'Sonner Promises & Actions',
            href: '/docs/toast-notify/sonner-advanced',
          },
          {
            title: 'shadcn/ui Sonner & Theming',
            href: '/docs/toast-notify/shadcn-sonner',
          },
          {
            title: 'React Toastify Core Setup',
            href: '/docs/toast-notify/react-toastify-basics',
          },
          {
            title: 'React Toastify Advanced',
            href: '/docs/toast-notify/react-toastify-advanced',
          },
          {
            title: 'Real-world Fullstack Flows',
            href: '/docs/toast-notify/real-world-flows',
          },
          {
            title: 'UX Copywriting & Thai Tone',
            href: '/docs/toast-notify/ux-copywriting',
          },
          {
            title: 'Accessibility & WAI-ARIA',
            href: '/docs/toast-notify/accessibility',
          },
          {
            title: 'Migration & Unified Wrapper',
            href: '/docs/toast-notify/migration-wrapper',
          },
          {
            title: 'Pitfalls & Senior Q&A',
            href: '/docs/toast-notify/pitfalls',
          },
        ],
      },
    ],
  },

  // 2. หมวด BACKEND
  {
    title: 'BACKEND',
    color: '#34c759', // Apple Green
    items: [
      {
        title: 'Node.js',
        href: '/docs/backend/nodejs',
        children: [
          {
            title: 'Event Loop',
            href: '/docs/backend/nodejs#1-event-loop-และ-non-blocking-io',
          },
          {
            title: 'Async Await',
            href: '/docs/backend/nodejs#2-asyncawait-และ-promise',
          },
          {
            title: 'Module System',
            href: '/docs/backend/nodejs#3-module-system-esm-vs-commonjs',
          },
          {
            title: 'Package Scripts',
            href: '/docs/backend/nodejs#4-npm-pnpm-และ-packagejson',
          },
          {
            title: 'Env Variables',
            href: '/docs/backend/nodejs#5-environment-variables-env',
          },
          {
            title: 'HTTP Server',
            href: '/docs/backend/nodejs#6-การทำงานของ-http-server',
          },
          {
            title: 'Process Errors',
            href: '/docs/backend/nodejs#7-process-และ-error-ที่ไม่ได้จัดการ-unhandled-errors',
          },
          {
            title: 'Anti-patterns',
            href: '/docs/backend/nodejs#ข้อผิดพลาดที่พบบ่อย-anti-patterns',
          },
        ],
      },
      {
        title: 'NestJS 11',
        href: '/docs/backend/nestjs',
        children: [
          {
            title: 'Architecture',
            href: '/docs/backend/nestjs#1-สถาปัตยกรรมและเหตุผลที่ออกแบบแบบนี้-เทียบกับ-express',
          },
          {
            title: 'Modules',
            href: '/docs/backend/nestjs#2-modules-กล่องประกอบระบบและ-encapsulation',
          },
          {
            title: 'Controllers',
            href: '/docs/backend/nestjs#3-controllers-จัดการ-http-request-และ-routing',
          },
          {
            title: 'Providers Services',
            href: '/docs/backend/nestjs#4-providers-และ-services-business-logic-layer',
          },
          {
            title: 'Dependency Inject',
            href: '/docs/backend/nestjs#5-dependency-injection-di-และ-inversion-of-control-ioc',
          },
          {
            title: 'Request Lifecycle',
            href: '/docs/backend/nestjs#6-ลำดับการทำงานของ-request-lifecycle-request-pipeline',
          },
          {
            title: 'Middleware Guards',
            href: '/docs/backend/nestjs#7-middleware-ประตูด่านแรกของ-request',
          },
          {
            title: 'Pipes Interceptors',
            href: '/docs/backend/nestjs#9-pipes-การตรวจสอบและแปลงข้อมูล-validation-transformation',
          },
          {
            title: 'Exception Filters',
            href: '/docs/backend/nestjs#11-exception-filters-การจัดการ-error-แบบรวมศูนย์',
          },
          {
            title: 'Config Structure',
            href: '/docs/backend/nestjs#12-configmodule-และ-environment-configuration',
          },
        ],
      },
      {
        title: 'REST API Design',
        href: '/docs/backend/rest-api',
        children: [
          {
            title: 'HTTP Idempotency',
            href: '/docs/backend/rest-api#1-http-methods-และ-idempotency',
          },
          {
            title: 'Status Codes',
            href: '/docs/backend/rest-api#2-http-status-codes-ที่ใช้จริงในระบบ-production',
          },
          {
            title: 'Resource URL',
            href: '/docs/backend/rest-api#3-การตั้งชื่อ-resource-และออกแบบ-url-structure',
          },
          {
            title: 'Response Envelope',
            href: '/docs/backend/rest-api#4-มาตรฐานรูปแบบ-response-และ-error-envelope',
          },
          {
            title: 'Pagination Filter',
            href: '/docs/backend/rest-api#5-pagination-filtering-sorting-และ-searching',
          },
          {
            title: 'Versioning CORS',
            href: '/docs/backend/rest-api#6-api-versioning-cors-และความต่างระหว่าง-put-vs-patch',
          },
          {
            title: 'Frontend Contract',
            href: '/docs/backend/rest-api#7-การออกแบบ-api-contract-ให้ฝั่ง-frontend-ใช้งานง่าย',
          },
        ],
      },
      {
        title: 'Prisma ORM',
        href: '/docs/backend/prisma-orm',
        children: [
          {
            title: 'Prisma Schema',
            href: '/docs/backend/prisma-orm#1-โครงสร้าง-prisma-schema-models-field-types-และ-enums',
          },
          {
            title: 'Model Relations',
            href: '/docs/backend/prisma-orm#2-การออกแบบความสัมพันธ์-relations-1-1-1-n-m-n',
          },
          {
            title: 'Prisma Client',
            href: '/docs/backend/prisma-orm#3-การใช้งาน-prisma-client-crud-filter-select-include-aggregation',
          },
          {
            title: 'Transactions',
            href: '/docs/backend/prisma-orm#4-การจัดการ-transactions-ด้วย-transaction-และการป้องกัน-race-condition',
          },
          {
            title: 'ORM Query Seeding',
            href: '/docs/backend/prisma-orm#5-ปัญหา-n1-query-ใน-orm-raw-queries-อย่างปลอดภัย-และ-seeding',
          },
          {
            title: 'PrismaService',
            href: '/docs/backend/prisma-orm#6-สถาปัตยกรรม-prismaservice-ใน-nestjs-11-และการเชื่อมต่อผ่าน-driver-pg',
          },
        ],
      },
      {
        title: 'Authentication',
        href: '/docs/backend/authentication',
        children: [
          {
            title: 'Auth Flow Bcrypt',
            href: '/docs/backend/authentication#1-สถาปัตยกรรม-end-to-end-auth-flow-และการ-hash-รหัสผ่านด้วย-bcrypt',
          },
          {
            title: 'JWT HttpOnly',
            href: '/docs/backend/authentication#2-กลไก-jwt-access-token-refresh-token-และการตั้งค่า-httponly-cookie',
          },
          {
            title: 'Passport Guard',
            href: '/docs/backend/authentication#3-passportjs-strategies-local-jwt-และ-authguard-ใน-nestjs-11',
          },
          {
            title: 'RBAC Decorator',
            href: '/docs/backend/authentication#4-role-based-access-control-rbac-และ-custom-currentuser-decorator',
          },
          {
            title: 'Token Rotation',
            href: '/docs/backend/authentication#5-refresh-token-rotation-ระบบ-logout-และการเพิกถอนสิทธิ์',
          },
          {
            title: 'JWT vs Session',
            href: '/docs/backend/authentication#6-เปรียบเทียบ-jwt-vs-session-และ-cookie-vs-localstorage',
          },
        ],
      },
      {
        title: 'Security',
        href: '/docs/backend/security',
        children: [
          {
            title: 'OWASP Top 10',
            href: '/docs/backend/security#1-owasp-top-10-สำหรับระบบ-api-สมัยใหม่',
          },
          {
            title: 'XSS CSRF Defense',
            href: '/docs/backend/security#2-การป้องกัน-xss-csrf-และความเชื่อมโยงกับ-cookie-security',
          },
          {
            title: 'Helmet CORS',
            href: '/docs/backend/security#3-การตั้งค่า-helmet-และ-cors-ร่วมกับ-credentials',
          },
          {
            title: 'Rate Limiting',
            href: '/docs/backend/security#4-rate-limiting-และป้องกัน-brute-force-ด้วย-nestjsthrottler',
          },
          {
            title: 'BOLA IDOR Guard',
            href: '/docs/backend/security#5-object-level-authorization-ป้องกันปัญหา-bola-idor',
          },
          {
            title: 'Secrets Audit',
            href: '/docs/backend/security#6-การจัดการ-secrets-data-sanitization-และตรวจสอบช่องโหว่ด้วย-npm-audit',
          },
        ],
      },
      {
        title: 'Validation',
        href: '/docs/backend/validation',
        children: [
          {
            title: 'ValidationPipe',
            href: '/docs/backend/validation#1-สถาปัตยกรรม-dto-และ-global-validationpipe-ใน-nestjs-11',
          },
          {
            title: 'Class Validator',
            href: '/docs/backend/validation#2-decorators-ที่ใช้บ่อยของ-class-validator-และการปรับแต่งข้อความภาษาไทย',
          },
          {
            title: 'Nested Transform',
            href: '/docs/backend/validation#3-nested-validation-และการแปลงชนิดข้อมูลด้วย-class-transformer-type',
          },
          {
            title: 'Exclude Expose',
            href: '/docs/backend/validation#4-การซ่อนข้อมูลอ่อนไหวในขาออกด้วย-exclude-expose-และ-classserializerinterceptor',
          },
          {
            title: 'Mapped Types',
            href: '/docs/backend/validation#5-mapped-types-partialtype-picktype-omittype-และการสร้าง-custom-validator',
          },
          {
            title: 'Validator vs Zod',
            href: '/docs/backend/validation#6-เปรียบเทียบ-class-validator-backend-กับ-zod-frontend',
          },
        ],
      },
      {
        title: 'File Upload',
        href: '/docs/backend/file-upload',
        children: [
          {
            title: 'Multer Pipeline',
            href: '/docs/backend/file-upload#1-สถาปัตยกรรม-end-to-end-file-upload-flow-ด้วย-multer-ใน-nestjs-11',
          },
          {
            title: 'Magic Number',
            href: '/docs/backend/file-upload#2-การตรวจสอบความถูกต้องของไฟล์ด้วย-parsefilepipe-และ-magic-number',
          },
          {
            title: 'Supabase Storage',
            href: '/docs/backend/file-upload#3-การอัปโหลดไฟล์ขึ้น-supabase-storage-และการตั้งชื่อไฟล์ไม่ให้ซ้ำ',
          },
          {
            title: 'Signed URLs',
            href: '/docs/backend/file-upload#4-public-vs-private-buckets-signed-urls-และการจัดการสลิปโอนเงินอย่างปลอดภัย',
          },
          {
            title: 'Orphan Cleanup',
            href: '/docs/backend/file-upload#5-การซิงค์และลบไฟล์ขยะ-orphaned-files-cleanup-เมื่อลบข้อมูลในฐานข้อมูล',
          },
        ],
      },
      {
        title: 'Docker',
        href: '/docs/backend/docker',
        children: [
          {
            title: 'Docker Concepts',
            href: '/docs/backend/docker#1-แนวคิดหลักของ-docker-image-container-volume-network',
          },
          {
            title: 'Multi-stage Build',
            href: '/docs/backend/docker#2-การเขียน-multi-stage-dockerfile-สำหรับ-nestjs-11-ระดับ-production',
          },
          {
            title: 'Docker Compose',
            href: '/docs/backend/docker#3-การประกอบระบบด้วย-docker-compose-nestjs-postgresql-16',
          },
          {
            title: 'Volumes Health',
            href: '/docs/backend/docker#4-การจัดการ-persistent-volumes-environment-variables-secrets-และ-healthcheck',
          },
          {
            title: 'Network Debug',
            href: '/docs/backend/docker#5-การเชื่อมต่อเครือข่ายระหว่าง-container-และคำสั่ง-cli-สำหรับ-debug',
          },
        ],
      },
      {
        title: 'Swagger',
        href: '/docs/backend/swagger',
        children: [
          {
            title: 'SwaggerModule',
            href: '/docs/backend/swagger#1-การติดตั้งและตั้งค่า-swaggermodule-openapi-ใน-nestjs-11',
          },
          {
            title: 'API Decorators',
            href: '/docs/backend/swagger#2-การใช้-decorators-หลัก-apitags-apioperation-apiproperty-apiresponse',
          },
          {
            title: 'CLI Plugin',
            href: '/docs/backend/swagger#3-การเปิดใช้งาน-nestjs-swagger-cli-plugin-เพื่อลดโค้ดซ้ำซ้อน',
          },
          {
            title: 'Security Schemes',
            href: '/docs/backend/swagger#4-การกำหนด-security-schemes-สำหรับ-jwt-bearer-และ-httponly-cookie',
          },
          {
            title: 'Codegen Client',
            href: '/docs/backend/swagger#5-การทำงานร่วมกับทีม-frontend-และการ-generate-typescript-client-อัตโนมัติ',
          },
        ],
      },
      {
        title: 'AI Integration',
        href: '/docs/backend/ai-integration',
        children: [
          {
            title: 'Groq SDK Setup',
            href: '/docs/backend/ai-integration#1-สถาปัตยกรรมการเรียกใช้-llm-จากฝั่ง-backend-อย่างปลอดภัยด้วย-groq-sdk',
          },
          {
            title: 'GroqService',
            href: '/docs/backend/ai-integration#2-การออกแบบ-groqservice-ใน-nestjs-11-และการจัดการ-api-key',
          },
          {
            title: 'Prompt Design',
            href: '/docs/backend/ai-integration#3-prompt-engineering-system-user-prompt-และ-structured-json-output',
          },
          {
            title: 'Rate Limit Cost',
            href: '/docs/backend/ai-integration#4-การจัดการ-timeout-rate-limit-token-cost-control-และ-streaming',
          },
          {
            title: 'Prompt Security',
            href: '/docs/backend/ai-integration#5-การป้องกัน-prompt-injection-พื้นฐานและการเก็บ-audit-log',
          },
        ],
      },
    ],
  },

  // 3. หมวด DATABASE
  {
    title: 'DATABASE',
    color: '#f59e0b', // Amber / Gold
    items: [
      {
        title: 'PostgreSQL 16',
        href: '/docs/database/postgresql',
        children: [
          {
            title: 'RDBMS Comparison',
            href: '/docs/database/postgresql#1-postgresql-คืออะไรและเปรียบเทียบกับฐานข้อมูลอื่น',
          },
          {
            title: 'Process MVCC',
            href: '/docs/database/postgresql#2-สถาปัตยกรรมพื้นฐานของ-postgresql-process-architecture-และ-mvcc',
          },
          {
            title: 'Data Types',
            href: '/docs/database/postgresql#3-ชนิดข้อมูลที่ใช้จริงในงาน-production-data-types',
          },
          {
            title: 'Constraints',
            href: '/docs/database/postgresql#4-constraints-และ-data-integrity-การรักษาความถูกต้องของข้อมูล',
          },
          {
            title: 'Schema Roles',
            href: '/docs/database/postgresql#5-schema-และ-role-permissions-security-isolation',
          },
          {
            title: 'Extensions',
            href: '/docs/database/postgresql#6-postgresql-extensions-ที่มักใช้ในงานจริง',
          },
          {
            title: 'psql CLI Tools',
            href: '/docs/database/postgresql#7-เครื่องมือบริหารจัดการและคำสั่ง-psql-ที่ใช้บ่อย',
          },
        ],
      },
      {
        title: 'SQL',
        href: '/docs/database/sql',
        children: [
          {
            title: 'SELECT Filtering',
            href: '/docs/database/sql#1-การดึงข้อมูลพื้นฐาน-select-where-order-by-limit-offset',
          },
          {
            title: 'DML RETURNING',
            href: '/docs/database/sql#2-การจัดการข้อมูลและการคืนค่า-insert-update-delete-และ-returning',
          },
          {
            title: 'SQL JOINs',
            href: '/docs/database/sql#3-join-ทุกแบบพร้อมภาพประกอบและความเข้าใจลึกซึ้ง',
          },
          {
            title: 'GROUP BY Having',
            href: '/docs/database/sql#4-การจัดกลุ่มและฟังก์ชันคำนวณ-group-by-having-และ-aggregate-functions',
          },
          {
            title: 'Subquery CTE',
            href: '/docs/database/sql#5-subquery-และ-common-table-expressions-cte-with',
          },
          {
            title: 'Set Operations',
            href: '/docs/database/sql#6-การรวมชุดข้อมูล-union-intersect-except',
          },
          {
            title: 'Window Functions',
            href: '/docs/database/sql#7-window-functions-ฟังก์ชันหน้าต่างเพื่อการวิเคราะห์ข้อมูลขั้นสูง',
          },
          {
            title: 'CASE NULL Handling',
            href: '/docs/database/sql#8-ตรรกะเงื่อนไขและการจัดการค่าว่าง-case-expression-และ-null-handling',
          },
          {
            title: 'UPSERT Conflict',
            href: '/docs/database/sql#11-upsert-insert-on-conflict-do-update-do-nothing',
          },
        ],
      },
      {
        title: 'Database Design',
        href: '/docs/database/database-design',
        children: [
          {
            title: 'ER Diagram',
            href: '/docs/database/database-design#1-กระบวนการออกแบบจากโจทย์ธุรกิจสู่-er-diagram-และโครงสร้างตาราง',
          },
          {
            title: 'Table Relations',
            href: '/docs/database/database-design#2-ความสัมพันธ์ของข้อมูล-1-1-1-n-m-n-พร้อม-junction-table',
          },
          {
            title: 'Normalization',
            href: '/docs/database/database-design#3-normalization-1nf-ถึง-3nf-และจังหวะที่ควรทำ-denormalization',
          },
          {
            title: 'Primary Keys',
            href: '/docs/database/database-design#4-การเลือก-primary-key-auto-incrementidentity-vs-uuid-v4v7-และมาตรฐานการตั้งชื่อ',
          },
          {
            title: 'Money Snapshot',
            href: '/docs/database/database-design#5-การเก็บข้อมูลการเงิน-snapshot-ราคาในออเดอร์-และ-state-machine-ของสถานะ',
          },
          {
            title: 'Soft Delete Audit',
            href: '/docs/database/database-design#6-soft-delete-timestamps-createdatupdatedat-และ-audit-log',
          },
          {
            title: 'Full Schema',
            href: '/docs/database/database-design#7-พิมพ์เขียว-schema-ระบบ-smart-butcher-marketplace-ฉบับสมบูรณ์',
          },
        ],
      },
      {
        title: 'Indexing',
        href: '/docs/database/indexing',
        children: [
          {
            title: 'B-Tree Mechanics',
            href: '/docs/database/indexing#1-กลไกการทำงานของ-b-tree-index-และเหตุผลที่ทำให้ค้นหาข้อมูลได้เร็ว',
          },
          {
            title: 'Index Types',
            href: '/docs/database/indexing#2-ชนิดของ-index-ใน-postgresql-16-b-tree-hash-gin-gist',
          },
          {
            title: 'Composite Index',
            href: '/docs/database/indexing#3-composite-index-และกฎลำดับคอลัมน์-leftmost-prefix-rule',
          },
          {
            title: 'Partial Covering',
            href: '/docs/database/indexing#4-unique-index-partial-index-และ-covering-index-include',
          },
          {
            title: 'Write Cost',
            href: '/docs/database/indexing#5-ต้นทุนของ-index-ต่อการเขียนข้อมูล-write-amplification-และเกณฑ์การเลือกสร้าง',
          },
          {
            title: 'Prisma Indexes',
            href: '/docs/database/indexing#6-การแมป-index-กับ-prisma-schema-unique-index-และกรณีศึกษาจริง',
          },
        ],
      },
      {
        title: 'Query Performance',
        href: '/docs/database/query-performance',
        children: [
          {
            title: 'EXPLAIN ANALYZE',
            href: '/docs/database/query-performance#1-การวิเคราะห์-execution-plan-ด้วย-explain-และ-explain-analyze',
          },
          {
            title: 'Solving N1 Queries',
            href: '/docs/database/query-performance#2-ปัญหา-n1-query-ในระดับ-sql-และวิธีแก้ไขอย่างถูกจุด',
          },
          {
            title: 'Keyset Pagination',
            href: '/docs/database/query-performance#3-การทำ-pagination-ประสิทธิภาพสูง-offset-vs-keysetcursor-pagination',
          },
          {
            title: 'Slow Query Logs',
            href: '/docs/database/query-performance#4-การค้นหา-slow-queries-ด้วย-pgstatstatements-และ-log-configuration',
          },
          {
            title: 'VACUUM Autovacuum',
            href: '/docs/database/query-performance#5-กลไก-vacuum-analyze-และการทำงานของ-autovacuum-ใน-postgresql-16',
          },
          {
            title: 'Query Tuning',
            href: '/docs/database/query-performance#6-เทคนิคการปรับจูน-query-ที่ช้าทีละขั้นพร้อมผลลัพธ์เปรียบเทียบก่อนและหลัง',
          },
        ],
      },
      {
        title: 'Transactions',
        href: '/docs/database/transactions',
        children: [
          {
            title: 'ACID Properties',
            href: '/docs/database/transactions#1-คุณสมบัติ-acid-อธิบายผ่านกระบวนการสั่งซื้อและตัดสต็อกจริง',
          },
          {
            title: 'BEGIN COMMIT',
            href: '/docs/database/transactions#2-การควบคุม-transaction-ด้วย-begin-commit-rollback-และ-savepoint',
          },
          {
            title: 'Isolation Levels',
            href: '/docs/database/transactions#3-ระดับการแยกตัวของ-transaction-isolation-levels-และปรากฏการณ์ข้อมูลเพี้ยน',
          },
          {
            title: 'Short Transaction',
            href: '/docs/database/transactions#4-พฤติกรรมค่าเริ่มต้นของ-postgresql-16-และการออกแบบ-transaction-ให้สั้นที่สุด',
          },
          {
            title: 'Prisma Transaction',
            href: '/docs/database/transactions#5-ความเชื่อมโยงระหว่าง-sql-transaction-กับ-prisma-transaction',
          },
        ],
      },
      {
        title: 'Concurrency',
        href: '/docs/database/concurrency',
        children: [
          {
            title: 'Race Conditions',
            href: '/docs/database/concurrency#1-ปัญหาการแย่งชิงข้อมูลพร้อมกัน-race-conditions-ในระบบ-e-commerce',
          },
          {
            title: 'Row Locking',
            href: '/docs/database/concurrency#2-กลไกการล็อกข้อมูล-select-for-update-row-locks-และ-advisory-locks',
          },
          {
            title: 'Optimistic Lock',
            href: '/docs/database/concurrency#3-pessimistic-locking-vs-optimistic-locking-version-column',
          },
          {
            title: 'Deadlock Defense',
            href: '/docs/database/concurrency#4-สาเหตุการเกิด-deadlock-และเทคนิคการป้องกันในระดับสถาปัตยกรรม',
          },
          {
            title: 'Idempotency Keys',
            href: '/docs/database/concurrency#5-การทำ-idempotency-ป้องกันการกดสั่งซื้อหรือตัดเงินซ้ำและการทดสอบ-race-condition',
          },
        ],
      },
      {
        title: 'Migrations',
        href: '/docs/database/migrations',
        children: [
          {
            title: 'Why Migrations',
            href: '/docs/database/migrations#1-ทำไมต้องใช้-database-migration-แทนการแก้ไขฐานข้อมูลโดยตรง',
          },
          {
            title: 'Prisma Migrate',
            href: '/docs/database/migrations#2-กลไก-prisma-migrate-migrate-dev-migrate-deploy-migrate-reset-และ-db-push',
          },
          {
            title: 'Failed Migration',
            href: '/docs/database/migrations#3-การตรวจสอบไฟล์-sql-ที่สร้างขึ้นและการกู้คืนเมื่อ-migration-ล้มเหลว',
          },
          {
            title: 'Zero Downtime',
            href: '/docs/database/migrations#4-เทคนิค-zero-downtime-schema-evolution-เปลี่ยนโครงสร้างโดยข้อมูลไม่สูญหาย',
          },
          {
            title: 'Team Workflow',
            href: '/docs/database/migrations#5-การบริหารจัดการ-migration-ข้ามสภาพแวดล้อม-devstagingprod-และการทำงานเป็นทีม',
          },
          {
            title: 'Database Seeding',
            href: '/docs/database/migrations#6-seeding-การเตรียมข้อมูลตั้งต้นแบบ-idempotent-แยกตามสภาพแวดล้อม',
          },
        ],
      },
      {
        title: 'Backup',
        href: '/docs/database/backup',
        children: [
          {
            title: 'pg_dump Restore',
            href: '/docs/database/backup#1-การทำ-backup-และ-restore-ด้วย-pgdump-pgrestore-และ-psql',
          },
          {
            title: 'Docker Backup',
            href: '/docs/database/backup#2-การสำรองและกู้คืนข้อมูล-postgresql-16-ที่รันอยู่บน-docker-container',
          },
          {
            title: 'Logical vs PITR',
            href: '/docs/database/backup#3-เปรียบเทียบ-logical-backup-vs-physical-backup-และแนวคิด-pitr',
          },
          {
            title: 'Restore Drills',
            href: '/docs/database/backup#4-กลยุทธ์ตั้งเวลา-backup-อัตโนมัติ-การแยกพื้นที่จัดเก็บ-และการซ้อมกู้คืนข้อมูล',
          },
          {
            title: 'Supabase Backup',
            href: '/docs/database/backup#5-ระบบ-backup-ของ-supabase-และข้อจำกัดของแพ็กเกจ-free-tier',
          },
        ],
      },
      {
        title: 'Security',
        href: '/docs/database/security',
        children: [
          {
            title: 'Least Privilege',
            href: '/docs/database/security#1-การจัดการ-roles-และสิทธิ์ตามหลัก-least-privilege-แยก-role-แอปและ-migration',
          },
          {
            title: 'SSL TLS Secrets',
            href: '/docs/database/security#2-การเข้ารหัสการเชื่อมต่อด้วย-ssltls-และการเก็บรักษา-connection-string',
          },
          {
            title: 'SQL Injection',
            href: '/docs/database/security#3-กลไกป้องกัน-sql-injection-ด้วย-parameterized-queries-ในระดับฐานข้อมูล',
          },
          {
            title: 'Network PDPA',
            href: '/docs/database/security#4-การปกป้องข้อมูลอ่อนไหว-การจำกัดเครือข่าย-network-isolation-และกฎหมาย-pdpa',
          },
        ],
      },
      {
        title: 'Connection Pooling',
        href: '/docs/database/connection-pooling',
        children: [
          {
            title: 'Connection Cost',
            href: '/docs/database/connection-pooling#1-ต้นทุนของการสร้าง-connection-ใน-postgresql-process-per-connection',
          },
          {
            title: 'Pool Size Formula',
            href: '/docs/database/connection-pooling#2-กลไกการทำงานของ-connection-pool-และสูตรคำนวณ-pool-size-ที่เหมาะสม',
          },
          {
            title: 'Prisma Pool Limit',
            href: '/docs/database/connection-pooling#3-ปัญหา-too-many-connections-และการตั้งค่า-connection-limit-ใน-prisma',
          },
          {
            title: 'PgBouncer Modes',
            href: '/docs/database/connection-pooling#4-สถาปัตยกรรม-pgbouncer-session-mode-vs-transaction-mode-และ-serverless',
          },
          {
            title: 'pg_stat_activity',
            href: '/docs/database/connection-pooling#5-การตรวจสอบและวิเคราะห์-connection-ที่เปิดใช้งานด้วย-pgstatactivity',
          },
        ],
      },
      {
        title: 'Supabase',
        href: '/docs/database/supabase',
        children: [
          {
            title: 'Managed Postgres',
            href: '/docs/database/supabase#1-สถาปัตยกรรมของ-supabase-ในฐานะ-managed-postgresql-แพลตฟอร์ม',
          },
          {
            title: 'Direct vs Pooler',
            href: '/docs/database/supabase#2-การเชื่อมต่อ-supabase-ร่วมกับ-prisma-direct-connection-vs-supavisor-pooler',
          },
          {
            title: 'Pooler Modes',
            href: '/docs/database/supabase#3-ความแตกต่างของ-transaction-mode-และ-session-mode-ใน-connection-pooler',
          },
          {
            title: 'Row Level Security',
            href: '/docs/database/supabase#4-แนวคิดและการทำงานของ-row-level-security-rls-แบบสรุป',
          },
          {
            title: 'Free Tier Limits',
            href: '/docs/database/supabase#5-ข้อควรระวังในการใช้งานจริง-free-tier-pausing-ขีดจำกัด-และการเลือก-region',
          },
        ],
      },
      {
        title: 'SQL vs NoSQL',
        href: '/docs/database/sql-vs-nosql',
        children: [
          {
            title: 'Relational vs NoSQL',
            href: '/docs/database/sql-vs-nosql#1-เปรียบเทียบสถาปัตยกรรม-sql-relational-vs-nosql-non-relational',
          },
          {
            title: 'MongoDB Use Cases',
            href: '/docs/database/sql-vs-nosql#2-เมื่อไหร่ควรเลือกใช้-mongodb-document-database',
          },
          {
            title: 'Redis Caching',
            href: '/docs/database/sql-vs-nosql#3-การใช้-redis-สำหรับ-caching-session-queue-และ-rate-limiting',
          },
          {
            title: 'CAP Theorem',
            href: '/docs/database/sql-vs-nosql#4-ฐานข้อมูลเฉพาะทางที่ควรรู้จัก-sqlite-elasticsearch-และทฤษฎีบท-cap-theorem',
          },
          {
            title: 'Polyglot Strategy',
            href: '/docs/database/sql-vs-nosql#5-แนวคิด-polyglot-persistence-และเหตุผลที่ระบบร้านค้าเลือก-postgresql-16',
          },
        ],
      },
    ],
  },

  // 4. หมวด TESTING & QUALITY
  {
    title: 'TESTING & QUALITY',
    color: '#af52de', // Apple Purple
    items: [
      {
        title: 'Testing Fundamentals',
        href: '/docs/testing/fundamentals',
        children: [
          {
            title: 'Cost of Bugs',
            href: '/docs/testing/fundamentals#1-ทำไมต้องเขียนเทสต์และต้นทุนของ-bug-the-cost-of-software-defects',
          },
          {
            title: 'Testing Pyramid',
            href: '/docs/testing/fundamentals#2-testing-pyramid-และ-testing-trophy',
          },
          {
            title: 'AAA Pattern',
            href: '/docs/testing/fundamentals#3-หลักการเขียนเทสต์ที่ดี-aaa-pattern-และ-behavior-driven',
          },
          {
            title: 'Test Doubles',
            href: '/docs/testing/fundamentals#4-test-doubles-mock-stub-spy-fake-dummy-ต่างกันอย่างไร',
          },
          {
            title: 'TDD Workflow',
            href: '/docs/testing/fundamentals#5-test-driven-development-tdd-แบบเข้าใจง่าย',
          },
          {
            title: 'Code Coverage',
            href: '/docs/testing/fundamentals#6-code-coverage-และทำไม-100-จึงไม่ใช่เป้าหมายสูงสุด',
          },
          {
            title: 'What to Test',
            href: '/docs/testing/fundamentals#7-สิ่งที่ควรเทสต์และสิ่งที่ไม่ควรเทสต์-what-to-test-vs-what-not-to-test',
          },
          {
            title: 'Flaky Tests',
            href: '/docs/testing/fundamentals#8-flaky-test-คืออะไรและวิธีรับมือ',
          },
        ],
      },
      {
        title: 'Jest',
        href: '/docs/testing/jest',
        children: [
          {
            title: 'Test Structure',
            href: '/docs/testing/jest#1-โครงสร้างพื้นฐานของชุดทดสอบ-describe-ittest-nesting-suites',
          },
          {
            title: 'Jest Matchers',
            href: '/docs/testing/jest#2-jest-matchers-ครบวงจร-tobe-toequal-tothrow-tohavebeencalledwith',
          },
          {
            title: 'Setup Teardown',
            href: '/docs/testing/jest#3-setup-และ-teardown-lifecycle-beforeall-beforeeach-aftereach-afterall',
          },
          {
            title: 'Async Promises',
            href: '/docs/testing/jest#4-การทดสอบ-async-code-promises-asyncawait-rejections',
          },
          {
            title: 'Mock Functions',
            href: '/docs/testing/jest#5-mock-functions-jestfn-และ-jestspyon',
          },
          {
            title: 'Mock Modules',
            href: '/docs/testing/jest#6-mock-modules-jestmock-และ-dependency-interception',
          },
          {
            title: 'Fake Timers',
            href: '/docs/testing/jest#7-fake-timers-และการควบคุมเวลา-jestusefaketimers',
          },
          {
            title: 'Snapshots',
            href: '/docs/testing/jest#8-snapshot-testing-เมื่อไหร่ควรใช้และเมื่อไหร่ไม่ควรใช้',
          },
          {
            title: 'Jest vs Vitest',
            href: '/docs/testing/jest#11-เปรียบเทียบ-jest-vs-vitest-แบบสรุป-เมื่อไหร่ควรเลือกตัวไหน',
          },
        ],
      },
      {
        title: 'Backend Testing',
        href: '/docs/testing/backend-testing',
        children: [
          {
            title: 'TestingModule DI',
            href: '/docs/testing/backend-testing#1-โครงสร้างการทดสอบใน-nestjs-11-และการทำงานของ-testcreatetestingmodule',
          },
          {
            title: 'Service Unit Test',
            href: '/docs/testing/backend-testing#2-การเขียน-unit-test-สำหรับ-service-โดยการ-mock-prismaservice',
          },
          {
            title: 'Controller Guards',
            href: '/docs/testing/backend-testing#3-การเขียน-unit-test-สำหรับ-controller-guard-pipe-และ-interceptor',
          },
          {
            title: 'Supertest E2E',
            href: '/docs/testing/backend-testing#4-การทำ-integration-และ-e2e-testing-ด้วย-supertest',
          },
          {
            title: 'Auth Upload Test',
            href: '/docs/testing/backend-testing#5-การทดสอบ-authentication-flow-dto-validation-และการอัปโหลดไฟล์ด้วย-multer',
          },
          {
            title: 'Test DB Isolation',
            href: '/docs/testing/backend-testing#6-การจัดการฐานข้อมูลสำหรับเทสต์-การ-mock-บริการภายนอก-และทดสอบ-race-condition',
          },
        ],
      },
      {
        title: 'Frontend Testing',
        href: '/docs/testing/frontend-testing',
        children: [
          {
            title: 'RTL Philosophy',
            href: '/docs/testing/frontend-testing#1-ปรัชญาของ-react-testing-library-และการตั้งค่าใน-nextjs-16-react-19',
          },
          {
            title: 'Query Priority',
            href: '/docs/testing/frontend-testing#2-กลยุทธ์การเลือกใช้-queries-getby-queryby-findby-และลำดับความสำคัญด้าน-a11y',
          },
          {
            title: 'User Event Forms',
            href: '/docs/testing/frontend-testing#3-การจำลองพฤติกรรมผู้ใช้ด้วย-user-event-และการทดสอบฟอร์ม-react-hook-form-zod',
          },
          {
            title: 'Hooks Query Store',
            href: '/docs/testing/frontend-testing#4-การทดสอบ-custom-hooks-tanstack-query-v5-และ-zustand-store',
          },
          {
            title: 'MSW API Mocking',
            href: '/docs/testing/frontend-testing#5-การจำลอง-api-ด้วย-msw-mock-service-worker-และทดสอบ-toast-dialog',
          },
          {
            title: 'RSC Testing',
            href: '/docs/testing/frontend-testing#6-ข้อจำกัดการทดสอบ-async-server-components-และแนวทางการใช้-e2e-ทดแทน',
          },
        ],
      },
      {
        title: 'E2E Testing',
        href: '/docs/testing/e2e-playwright',
        children: [
          {
            title: 'Playwright Setup',
            href: '/docs/testing/e2e-playwright#1-บทบาทของ-e2e-testing-และการติดตั้ง-playwright-ร่วมกับ-nextjs-16',
          },
          {
            title: 'Locators Waiting',
            href: '/docs/testing/e2e-playwright#2-กลไก-locators-auto-waiting-และ-web-first-assertions',
          },
          {
            title: 'Checkout Flow',
            href: '/docs/testing/e2e-playwright#3-การเขียนเทสต์-critical-user-journey-ของระบบร้านค้าและการแชร์-login-ด้วย-storagestate',
          },
          {
            title: 'Page Object Model',
            href: '/docs/testing/e2e-playwright#4-สถาปัตยกรรม-page-object-model-pom-การจัดการ-test-database-และ-network-interception',
          },
          {
            title: 'Trace Viewer CI',
            href: '/docs/testing/e2e-playwright#5-การ-debug-ด้วย-trace-viewer-การรันบน-ci-และเปรียบเทียบ-playwright-vs-cypress',
          },
        ],
      },
      {
        title: 'ESLint Prettier',
        href: '/docs/testing/eslint-prettier',
        children: [
          {
            title: 'Linter vs Format',
            href: '/docs/testing/eslint-prettier#1-แยกบทบาทระหว่าง-eslint-code-quality-และ-prettier-code-formatting',
          },
          {
            title: 'Flat Config',
            href: '/docs/testing/eslint-prettier#2-การตั้งค่า-eslint-flat-config-eslintconfigmjs-สำหรับ-nextjs-16-และ-nestjs-11',
          },
          {
            title: 'TS React Rules',
            href: '/docs/testing/eslint-prettier#3-กฎสำคัญของ-typescript-eslint-และ-react-hooks-ที่ต้องเปิดใช้งาน',
          },
          {
            title: 'Prettier Tailwind',
            href: '/docs/testing/eslint-prettier#4-การผสาน-prettier-eslint-config-prettier-และ-prettier-plugin-tailwindcss',
          },
          {
            title: 'Scripts Monorepo',
            href: '/docs/testing/eslint-prettier#5-การตั้งค่า-npm-scripts-vs-code-format-on-save-และมาตรฐานใน-monorepo',
          },
        ],
      },
      {
        title: 'Git Hooks CI',
        href: '/docs/testing/git-hooks-ci',
        children: [
          {
            title: 'Husky lint-staged',
            href: '/docs/testing/git-hooks-ci#1-การดักจับคุณภาพโค้ดก่อน-commit-ด้วย-husky-และ-lint-staged',
          },
          {
            title: 'Commit Standard',
            href: '/docs/testing/git-hooks-ci#2-มาตรฐานข้อความ-commit-ด้วย-conventional-commits',
          },
          {
            title: 'GitHub Actions',
            href: '/docs/testing/git-hooks-ci#3-การออกแบบ-github-actions-ci-pipeline-install-lint-type-check-test-build',
          },
          {
            title: 'Postgres CI E2E',
            href: '/docs/testing/git-hooks-ci#4-การรัน-postgresql-16-service-container-และ-playwright-e2e-บน-github-actions',
          },
          {
            title: 'Branch Protection',
            href: '/docs/testing/git-hooks-ci#5-การตั้งค่า-branch-protection-rules-github-secrets-และ-status-badges',
          },
        ],
      },
      {
        title: 'Debug Type Check',
        href: '/docs/testing/debugging-type-checking',
        children: [
          {
            title: 'Strict Type Check',
            href: '/docs/testing/debugging-type-checking#1-type-checking-ในฐานะปราการด่านแรก-tsc---noemit-และ-strict-mode',
          },
          {
            title: 'Debug Jest Tests',
            href: '/docs/testing/debugging-type-checking#2-เทคนิคการ-debug-ชุดทดสอบ-jest-ที่ล้มเหลว---runinband-vs-code-debugger',
          },
          {
            title: 'Debug Fullstack',
            href: '/docs/testing/debugging-type-checking#3-การ-debug-ฝั่ง-backend-nestjs-11-inspector-และฝั่ง-frontend-nextjs-16-react-devtools',
          },
          {
            title: 'Stack Trace Bug',
            href: '/docs/testing/debugging-type-checking#4-ศิลปะการอ่าน-stack-trace-และกระบวนการ-reproduce-bug-ด้วยการเขียนเทสต์นำ',
          },
          {
            title: 'Logging Audit',
            href: '/docs/testing/debugging-type-checking#5-การออกแบบ-structured-logging-และการตรวจสอบช่องโหว่ด้วย-npm-audit',
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
