import {
  PortfolioData,
  SectionContentConfig,
  HeroAnimationConfig,
  CustomSection
} from '../types';

export const defaultHeroAnimation: HeroAnimationConfig = {
  typingWords: [
    'Scalable Web Systems',
    'Django & PHP Backends',
    'Custom CMS & Portals',
    'AI-Powered Workflows',
    'High-Performance UI'
  ],
  animationType: 'typewriter',
  typingSpeedMs: 85,
  pauseDurationMs: 1800,
  prefixText: "Hi, I'm",
  buildingPrefix: "Building",
  headlineGradient: 'orange-amber',
  roleBadgeText: "Software Engineer",
  subRoleBadgeText: "Full-Stack Developer"
};

export const defaultSectionConfigs: Record<string, SectionContentConfig> = {
  hero: {
    id: 'hero',
    badge: 'Available for Freelance & Full-time',
    badgeIcon: 'Zap',
    title: "Hi, I'm",
    titleAccent: 'Software Engineer',
    subtitle: 'Highly motivated and results-oriented Software Developer delivering production-ready web applications and solving complex business problems.',
    animationType: 'typewriter',
    accentGradient: 'orange-amber',
    enabled: true
  },
  about: {
    id: 'about',
    badge: 'About & Technical Arsenal',
    badgeIcon: 'Sparkles',
    title: 'Engineered for ',
    titleAccent: 'Scalability',
    titleSuffix: ' & Reliability',
    subtitle: 'With 2+ years of hands-on software development experience, I specialize in architecting backend systems, crafting pixel-perfect responsive frontends, and automating workflows.',
    animationType: 'glow-pulse',
    accentGradient: 'orange-amber',
    enabled: true
  },
  projects: {
    id: 'projects',
    badge: 'Production Portfolio',
    badgeIcon: 'FolderGit2',
    title: 'Featured ',
    titleAccent: 'Software Projects',
    subtitle: 'End-to-end web applications, custom WordPress architecture, AI automation engines, and high-throughput APIs.',
    animationType: 'gradient-shimmer',
    accentGradient: 'orange-amber',
    enabled: true
  },
  work: {
    id: 'work',
    badge: 'Career & Work Entries',
    badgeIcon: 'Briefcase',
    title: 'Work History & ',
    titleAccent: 'Deliverables',
    subtitle: 'Chronological track record of client solutions, full-stack engagements, and software apprenticeships.',
    animationType: 'fade-rotate',
    accentGradient: 'orange-amber',
    enabled: true
  },
  gallery: {
    id: 'gallery',
    badge: 'High-Resolution Showcase',
    badgeIcon: 'Camera',
    title: 'Visual ',
    titleAccent: 'Design & Architecture',
    titleSuffix: ' Gallery',
    subtitle: 'High-resolution captures of responsive web applications, backend schema diagrams, WordPress UI designs, and AI node workflows.',
    animationType: 'gradient-shimmer',
    accentGradient: 'orange-amber',
    enabled: true
  },
  blog: {
    id: 'blog',
    badge: 'Technical Insights & Engineering Notes',
    badgeIcon: 'BookOpen',
    title: 'Latest ',
    titleAccent: 'Blog Posts',
    titleSuffix: ' & Articles',
    subtitle: 'Practical write-ups on Python Django performance, custom WordPress development, and AI prompt engineering workflows.',
    animationType: 'typewriter',
    accentGradient: 'orange-amber',
    enabled: true
  },
  contact: {
    id: 'contact',
    badge: "Let's Connect",
    badgeIcon: 'Mail',
    title: 'Initiate a Project or ',
    titleAccent: 'Hire Full-Time',
    subtitle: 'Available for worldwide remote contracts, high-impact full-stack development, and bespoke client solutions.',
    animationType: 'glow-pulse',
    accentGradient: 'orange-amber',
    enabled: true
  }
};

export const defaultCustomSections: CustomSection[] = [
  {
    id: 'custom-services',
    slug: 'services',
    badge: 'Core Solutions & Capabilities',
    badgeIcon: 'Zap',
    title: 'Specialized ',
    titleAccent: 'Engineering Services',
    titleSuffix: ' & Advisory',
    subtitle: 'Targeted technical offerings for modern startups, high-velocity agencies, and expanding digital businesses.',
    content: 'Delivering end-to-end software solutions tailored to speed, conversion, and architectural robustness.',
    items: [
      {
        id: 'item-1',
        title: 'Full-Stack Web App Engineering',
        description: 'Robust Django/PHP backend infrastructure paired with modern responsive interfaces and secure REST APIs.',
        badge: 'End-to-End',
        icon: 'Server'
      },
      {
        id: 'item-2',
        title: 'Custom WordPress & WooCommerce',
        description: 'Bespoke custom themes, Gutenberg block development, database tuning, and 95+ PageSpeed optimization.',
        badge: 'CMS Mastery',
        icon: 'Layout'
      },
      {
        id: 'item-3',
        title: 'AI Automation & Prompt Engineering',
        description: 'Integrating LLM workflows, automated data extractors, intelligent search, and autonomous business tooling.',
        badge: 'Next-Gen AI',
        icon: 'Cpu'
      }
    ],
    animationType: 'gradient-shimmer',
    accentGradient: 'orange-amber',
    placement: 'after-projects',
    enabled: true,
    createdAt: '2026-09-01T00:00:00Z'
  }
];

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Bijaya Tamang",
    tagline: "Software Developer & Full-Stack Engineer",
    subheadline: "Crafting scalable web systems, bespoke WordPress architectures, and AI-automated workflows with precision.",
    email: "bijay2310tamang@gmail.com",
    phone: "+977-9764634072",
    location: "Kathmandu, Nepal (Open to Global Remote)",
    linkedin: "https://www.linkedin.com/in/bijaya-tamang",
    github: "https://github.com/bijayatamang",
    twitter: "https://twitter.com/bijayatamang",
    whatsapp: "https://wa.me/9779764634072",
    website: "https://bijayatamang.dev",
    availability: "Available for Freelance & Full-time",
    yearsExperience: "2+ Years",
    bio: "Highly motivated and results-oriented Software Developer with 2+ years of hands-on experience delivering production-ready web applications and solving complex, real-world business problems. Skilled in full-stack development with a strong foundation in backend architecture and modern frontend technologies. Proven ability to design scalable systems, optimize performance, and deliver high-quality solutions under tight deadlines.",
    professionalSummary: "Experienced in the WordPress ecosystem, AI prompt engineering, and building efficient, user-centric digital products. Adept at transforming business requirements into elegant, high-throughput digital platforms with modern security and clean code standards.",
    education: {
      degree: "Certified Diploma",
      field: "Computer Software & Application",
      institution: "Technical Institute of Information Technology",
      details: "Comprehensive training in software algorithms, database design, full-stack web architecture, and application engineering."
    },
    keyStrengths: [
      "Strong problem-solving mindset with real-world project experience",
      "Fast learner with the ability to adapt to new technologies and frameworks",
      "Excellent time management and multitasking in high-pressure environments",
      "Detail-oriented approach with a focus on clean, scalable code",
      "Effective communicator with client-focused delivery mindset"
    ],
    coreCompetencies: [
      "Full-Stack Web Development",
      "Backend Architecture & API Development",
      "Responsive UI/UX Implementation",
      "WordPress Theme Development & Customization",
      "AI Prompt Engineering & Integration",
      "Debugging, Optimization & Performance Tuning",
      "Agile Task & Time Management"
    ]
  },
  skillCategories: [
    {
      id: "languages-backend",
      title: "Languages & Backend Architecture",
      description: "Scalable server systems, robust APIs, and performant data pipelines.",
      icon: "Server",
      skills: [
        { name: "Python (Django)", category: "languages", level: 92, badge: "Primary Backend" },
        { name: "PHP", category: "languages", level: 88, badge: "Core Server" },
        { name: "JavaScript (ES6+)", category: "languages", level: 94, badge: "Full-Stack" },
        { name: "REST API Development", category: "languages", level: 90, badge: "Architecture" },
        { name: "SQL & Database Design", category: "languages", level: 85, badge: "Data Models" }
      ]
    },
    {
      id: "frontend-ui",
      title: "Frontend Development & UI/UX",
      description: "High-performance, pixel-perfect user interfaces with smooth interactions.",
      icon: "Layout",
      skills: [
        { name: "Tailwind CSS", category: "frontend", level: 96, badge: "Styling Lead" },
        { name: "HTML5 & Modern CSS3", category: "frontend", level: 95, badge: "Standard" },
        { name: "Responsive & Mobile-First", category: "frontend", level: 95, badge: "UX Standard" },
        { name: "Modern React & SPA UI", category: "frontend", level: 88, badge: "Interactive" },
        { name: "UI Performance Optimization", category: "frontend", level: 90, badge: "Speed" }
      ]
    },
    {
      id: "cms-wordpress",
      title: "CMS & WordPress Engineering",
      description: "Custom themes, plugin integrations, and high-converting page builds.",
      icon: "Globe",
      skills: [
        { name: "WordPress Custom Theme Dev", category: "cms", level: 92, badge: "Specialist" },
        { name: "Elementor & Page Builders", category: "cms", level: 94, badge: "Custom Blocks" },
        { name: "WPBakery & Site Customizer", category: "cms", level: 88, badge: "Templates" },
        { name: "Headless CMS Architecture", category: "cms", level: 84, badge: "Modern Web" },
        { name: "WordPress Speed & SEO Tuning", category: "cms", level: 91, badge: "Performance" }
      ]
    },
    {
      id: "tools-ai",
      title: "Tools, AI & DevOps Practices",
      description: "Automated workflows, prompt engineering, and agile version control.",
      icon: "Cpu",
      skills: [
        { name: "AI Prompt Engineering", category: "tools", level: 93, badge: "Automation" },
        { name: "Workflow Automation (LLM/APIs)", category: "tools", level: 89, badge: "Productivity" },
        { name: "Git & Version Control", category: "tools", level: 90, badge: "Collaboration" },
        { name: "Debugging & Performance Tuning", category: "tools", level: 92, badge: "Code Quality" },
        { name: "Agile & Sprint Management", category: "tools", level: 88, badge: "Delivery" }
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Enterprise Custom Web Application System",
      slug: "enterprise-custom-web-application-system",
      category: "Full-Stack",
      summary: "End-to-end full-stack web application with role-based authentication, modular relational database management, and high-throughput backend logic.",
      fullDescription: "Architected and delivered an end-to-end business web portal engineered with Python (Django) and modern responsive frontend. Implemented secure role-based JWT authentication, complex relational schema optimization, asynchronous task queues, and customized reporting exports. Reduced database query latency by 42% through query indexing and intelligent caching.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
      ],
      techStack: ["Python", "Django", "PostgreSQL", "JavaScript (ES6+)", "Tailwind CSS", "REST API"],
      features: [
        "Secure Role-Based Access Control (RBAC) & OAuth/JWT auth",
        "Dynamic analytical charts and automated export pipelines",
        "Optimized Django ORM queries with zero N+1 bottlenecks",
        "Mobile-first responsive dashboard with real-time feedback"
      ],
      resultsOrMetrics: "Processed 100k+ records smoothly with <150ms average API response time.",
      liveUrl: "https://demo.bijayatamang.dev/enterprise-app",
      githubUrl: "https://github.com/bijayatamang/django-enterprise-portal",
      client: "Enterprise Business Client",
      duration: "3 Months",
      featured: true,
      date: "2024"
    },
    {
      id: "proj-2",
      title: "Advanced WordPress High-Performance Theme Suite",
      slug: "advanced-wordpress-high-performance-theme-suite",
      category: "WordPress",
      summary: "Delivered ultra-fast WordPress websites with bespoke custom theme architecture, custom post types, 98+ Google PageSpeed score, and SEO schema.",
      fullDescription: "Engineered a custom WordPress theme from the ground up without bloat. Created reusable Elementor dynamic widgets, custom Gutenberg blocks, structured schema markup, and advanced caching integration. Enhanced loading speed by 65% compared to commercial page builder templates.",
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80"
      ],
      techStack: ["PHP", "WordPress Core", "Elementor Pro", "Tailwind CSS", "JavaScript", "Webpack"],
      features: [
        "100% custom PHP template hierarchy without heavy builder overhead",
        "Dynamic custom fields (ACF Pro) and bespoke Elementor widgets",
        "Lighthouse performance score of 98+ on desktop and 94+ on mobile",
        "Comprehensive OpenGraph metadata and JSON-LD schema integration"
      ],
      resultsOrMetrics: "Achieved 98+ Google PageSpeed rating and 40% higher organic conversion.",
      liveUrl: "https://wp-demo.bijayatamang.dev",
      githubUrl: "https://github.com/bijayatamang/custom-wp-ultra-theme",
      client: "Digital Media & Agency Clients",
      duration: "2 Months",
      featured: true,
      date: "2024"
    },
    {
      id: "proj-3",
      title: "AI-Enhanced Workflow Automation & Prompt Engine",
      slug: "ai-enhanced-workflow-automation-prompt-engine",
      category: "AI Automation",
      summary: "Implemented intelligent AI-based solutions utilizing prompt engineering to automate repetitive user interactions, customer classification, and backend processing.",
      fullDescription: "Designed an automated generative AI pipeline that ingests customer inquiries, extracts structured JSON metadata, performs automated sentiment and priority classification, and drafts context-aware responses. Built with Python and integrated into production web apps via clean REST APIs.",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
      ],
      techStack: ["Python", "AI Prompt Engineering", "LLM APIs", "REST API", "JavaScript", "Tailwind"],
      features: [
        "Few-shot prompt templates with structured JSON output guarantees",
        "Automated inquiry triaging and webhook dispatchers",
        "Interactive dashboard for reviewing, fine-tuning, and auditing AI actions",
        "Graceful fallback handling for high-availability uptime"
      ],
      resultsOrMetrics: "Saved 15+ weekly hours of manual administrative triaging for client teams.",
      liveUrl: "https://ai-workflow.bijayatamang.dev",
      githubUrl: "https://github.com/bijayatamang/ai-prompt-automation-suite",
      client: "SaaS Business Clients",
      duration: "1.5 Months",
      featured: true,
      date: "2024"
    },
    {
      id: "proj-4",
      title: "RESTful E-Commerce & Service Booking Platform",
      slug: "restful-ecommerce-service-booking-platform",
      category: "Backend API",
      summary: "Scalable backend architecture with transactional inventory management, payment gateway webhooks, and automated SMS/Email notifications.",
      fullDescription: "Built a robust PHP & JavaScript API service handling real-time booking slots, payment transaction validation, automated invoice generation, and customer notification webhooks. Includes an admin panel for service providers to manage reservations.",
      coverImage: "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80"
      ],
      techStack: ["PHP", "JavaScript (ES6+)", "MySQL", "REST API", "Tailwind CSS", "Stripe API"],
      features: [
        "Idempotent payment webhook processing and audit logs",
        "Real-time calendar slot availability checking with concurrency locking",
        "Instant PDF receipt and automated email dispatch engine",
        "Lightweight, clean administrative control dashboard"
      ],
      resultsOrMetrics: "Zero double-booking incidents across 10,000+ completed transactions.",
      liveUrl: "https://booking.bijayatamang.dev",
      githubUrl: "https://github.com/bijayatamang/booking-engine-core",
      client: "Service Industry Partner",
      duration: "2.5 Months",
      featured: false,
      date: "2023"
    }
  ],
  workEntries: [
    {
      id: "work-1",
      role: "Software Developer & Full-Stack Engineer",
      organization: "Web & Digital Solutions",
      period: "2023 — Present",
      type: "Full-time",
      location: "Kathmandu, Nepal / Remote",
      description: "Leading the development of full-stack web applications, architecting Django backends, building custom WordPress themes, and integrating AI automated workflows.",
      highlights: [
        "Engineered 12+ production-grade web applications with secure backend architecture and high uptime.",
        "Created bespoke WordPress themes with custom Gutenberg blocks and dynamic Elementor components.",
        "Implemented automated prompt engineering pipelines reducing client manual workload by 40%.",
        "Conducted code reviews, performance profiling, and SQL query tuning across mission-critical systems."
      ],
      techStack: ["Python (Django)", "PHP", "JavaScript (ES6+)", "Tailwind CSS", "WordPress", "Git", "REST APIs"]
    },
    {
      id: "work-2",
      role: "Freelance Full-Stack & WordPress Developer",
      organization: "Independent Client Engagements",
      period: "2022 — 2023",
      type: "Freelance / Contract",
      location: "Remote",
      description: "Delivered customized digital solutions for international and local clients, focusing on responsive UI/UX, e-commerce integrations, and API systems.",
      highlights: [
        "Delivered 18+ high-performance websites for startups and small-to-medium businesses.",
        "Optimized client site speeds to consistently achieve 90+ mobile Google PageSpeed scores.",
        "Developed custom payment integrations, reservation systems, and automated email workflows.",
        "Maintained 100% client satisfaction rate with fast turnaround times and clear milestone delivery."
      ],
      techStack: ["PHP", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "WordPress", "MySQL"]
    },
    {
      id: "work-3",
      role: "Web Development Apprentice & Software Trainee",
      organization: "Software & Application Labs",
      period: "2021 — 2022",
      type: "Project Engagement",
      location: "Kathmandu, Nepal",
      description: "Completed rigorous practical software development training, focusing on fundamental algorithms, relational database design, and modern frontend styling.",
      highlights: [
        "Earned Certified Diploma in Computer Software & Application with top marks in web systems.",
        "Collaborated on agile development teams building internal CRM prototypes and REST API endpoints.",
        "Mastered Git version control workflows, automated linting, and modern JavaScript standards."
      ],
      techStack: ["JavaScript", "PHP", "HTML5/CSS3", "Git", "Software Architecture"]
    }
  ],
  blogPosts: [
    {
      id: "blog-1",
      title: "Architecting Scalable Django Backends: Zero N+1 Queries & Clean APIs",
      slug: "architecting-scalable-django-backends",
      excerpt: "A practical guide to structuring Django REST frameworks, optimizing database querysets with select_related/prefetch_related, and creating predictable APIs.",
      content: `## Why Backend Architecture Matters

When scaling web applications, backend bottlenecks usually emerge not from CPU limitations, but from inefficient database query patterns and unindexed relational joins.

### 1. Eliminating the N+1 Query Problem in Django ORM

Django's ORM is remarkably expressive, but careless relationship traversal can silently trigger hundreds of database queries per request.

\`\`\`python
# Avoid this: triggers a database query per project author
projects = Project.objects.all()
for proj in projects:
    print(proj.author.name)

# Solution: Prefetch foreign relationships in a single SQL JOIN
projects = Project.objects.select_related('author').prefetch_related('tags').all()
\`\`\`

### 2. Clean REST API Serialization

Keep your serializers lean and decouple business logic into service layers rather than stuffing fat logic inside views or serializers.

* **Validate at the Serializer level**
* **Execute business transactions in dedicated service modules**
* **Return standardized JSON responses with unified error codes**

### 3. Key Takeaways
Always log SQL queries during development using Django Debug Toolbar or custom middleware. Measuring before optimizing is the golden rule of backend engineering.`,
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "Django", "Backend", "REST API", "Database"],
      publishedAt: "Aug 18, 2024",
      readTime: "5 min read",
      author: "Bijaya Tamang",
      isPublished: true,
      views: 1420
    },
    {
      id: "blog-2",
      title: "Modern WordPress Custom Theme Engineering: Speed, Security & Clean PHP",
      slug: "modern-wordpress-custom-theme-engineering",
      excerpt: "How to build bespoke WordPress themes from scratch with modern tooling, zero bloat, custom Gutenberg blocks, and 98+ PageSpeed scores.",
      content: `## Beyond Off-The-Shelf Templates

Commercial themes often come packaged with dozens of unneeded scripts, sliders, and styling libraries that ruin Core Web Vitals. Building a custom theme gives you complete control over every byte sent down the wire.

### 1. Minimalist Asset Enqueuing
Only load assets on templates where they are explicitly needed. Conditional enqueuing drastically reduces initial render-blocking resources:

\`\`\`php
function bijaya_enqueue_custom_assets() {
    wp_enqueue_style('main-style', get_template_directory_uri() . '/dist/main.css', array(), '1.0.0');
    
    if (is_page('contact')) {
        wp_enqueue_script('contact-validator', get_template_directory_uri() . '/dist/contact.js', array(), '1.0.0', true);
    }
}
add_action('wp_enqueue_scripts', 'bijaya_enqueue_custom_assets');
\`\`\`

### 2. Custom Post Types & ACF Pro
Structure your content models semantically so editors can effortlessly manage team members, case studies, and testimonials without breaking layouts.

### 3. Image Optimization & Lazy Loading
Leverage modern WebP formats and native HTML \`loading="lazy"\` attributes to achieve blistering load speeds across mobile networks.`,
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      tags: ["WordPress", "PHP", "Web Performance", "SEO", "Custom Themes"],
      publishedAt: "Jul 24, 2024",
      readTime: "4 min read",
      author: "Bijaya Tamang",
      isPublished: true,
      views: 980
    },
    {
      id: "blog-3",
      title: "Leveraging AI Prompt Engineering to Automate Web Development Workflows",
      slug: "ai-prompt-engineering-web-development-workflows",
      excerpt: "Practical strategies for utilizing structured LLM prompts to accelerate code prototyping, generate schema migrations, and automate client triaging.",
      content: `## Practical AI for Working Developers

AI prompt engineering is not just about chatting; it is about building reliable, deterministic automated pipelines that integrate cleanly into web stacks.

### 1. Enforcing Structured JSON Outputs
When calling LLM APIs from backend code (such as Python or PHP), you must guarantee that the model responds in strict JSON:

* **Specify exact TypeScript or JSON schemas in the system prompt**
* **Provide one-shot or few-shot input/output examples**
* **Set low temperature (0.1 - 0.2) for analytical tasks**

### 2. Automated Customer Triage Engine
By piping incoming contact form submissions through a prompt pipeline, we can automatically categorize inquiries as *Urgent*, *Project Quote*, or *General Inquiry*, and extract budget constraints for instant Slack/CRM dispatch.

### 3. Conclusion
AI multiplies developer leverage when used as a deterministic coprocessor in business logic workflows.`,
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["AI & LLM", "Prompt Engineering", "Automation", "Python", "Productivity"],
      publishedAt: "Jun 12, 2024",
      readTime: "6 min read",
      author: "Bijaya Tamang",
      isPublished: true,
      views: 2150
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Enterprise Web App Analytics Dashboard",
      category: "Web Apps",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
      highResUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=3000&q=95",
      resolution: "4K (3840 x 2160)",
      aspectRatio: "16:9",
      description: "High-resolution interface view of real-time server metrics, database throughput telemetry, and interactive financial charts.",
      date: "2024",
      tags: ["Full-Stack", "Django", "Dashboard", "Analytics"]
    },
    {
      id: "gal-2",
      title: "Custom High-End WordPress Agency Template",
      category: "WordPress",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85",
      highResUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=3000&q=95",
      resolution: "Retina Ultra-HD",
      aspectRatio: "16:10",
      description: "Custom developed WordPress theme showcasing clean typography, bespoke Elementor dynamic blocks, and blazing fast mobile responsiveness.",
      date: "2024",
      tags: ["WordPress", "UI/UX", "Custom Theme", "Elementor"]
    },
    {
      id: "gal-3",
      title: "AI Prompt Automation Pipeline Architecture",
      category: "AI Systems",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
      highResUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=3000&q=95",
      resolution: "4K Studio",
      aspectRatio: "16:9",
      description: "Visual node mapping of automated prompt routing, context embedding generation, and structured JSON parsing pipelines.",
      date: "2024",
      tags: ["AI", "Architecture", "Python", "Automation"]
    },
    {
      id: "gal-4",
      title: "Clean Backend REST API & Database Schema Map",
      category: "Architecture",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=85",
      highResUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=3000&q=95",
      resolution: "High-Res Vector Render",
      aspectRatio: "16:9",
      description: "Microservice routing architecture with secure authentication layers, caching tiers, and optimized relational schemas.",
      date: "2024",
      tags: ["Backend", "PostgreSQL", "REST", "Architecture"]
    },
    {
      id: "gal-5",
      title: "Responsive Mobile-First UI/UX Wireframe & Design System",
      category: "UI/UX Mockups",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85",
      highResUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=3000&q=95",
      resolution: "Ultra-HD Mockup",
      aspectRatio: "4:3",
      description: "Comprehensive UI design system detailing color tokens, interactive button states, modal transitions, and typography scale.",
      date: "2023",
      tags: ["Design System", "Tailwind CSS", "Mobile", "UI/UX"]
    },
    {
      id: "gal-6",
      title: "E-Commerce Transaction & Booking Checkout Flow",
      category: "Web Apps",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1600&q=85",
      highResUrl: "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=3000&q=95",
      resolution: "Retina Display (2880 x 1800)",
      aspectRatio: "16:10",
      description: "Seamless checkout flow with live credit card validation, instant SMS confirmation dispatch, and downloadable PDF receipt.",
      date: "2023",
      tags: ["E-Commerce", "Checkout", "PHP", "Security"]
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Alex Sterling",
      email: "alex@techhorizon.io",
      subject: "Full-Stack Django & React Project Inquiry",
      serviceInterest: "Full-Stack Web Development",
      message: "Hi Bijaya, we came across your portfolio and we are looking for a skilled developer to build a custom business management portal with Django backend and Tailwind frontend. We loved your clean architecture approach. Are you available for a discovery call this week?",
      createdAt: "2024-08-28T14:30:00Z",
      status: "unread",
      starred: true
    },
    {
      id: "msg-2",
      name: "Sarah Jenkins",
      email: "sarah@digitalreach.agency",
      subject: "Custom WordPress Theme & Speed Optimization",
      serviceInterest: "WordPress Theme Development",
      message: "Hello Bijaya! We need a custom, ultra-fast WordPress theme built with Elementor integration for our marketing agency. Our current theme is very sluggish and we need to hit 95+ on PageSpeed. Would love to collaborate with you.",
      createdAt: "2024-08-20T09:15:00Z",
      status: "read",
      starred: false
    }
  ],
  settings: {
    primaryColor: "#FF7A29",
    accentColor: "#1E1B4B",
    themeMode: "dark",
    enableBlog: true,
    enableGallery: true,
    enableHireMeCta: true,
    customStatusBanner: ""
  },
  sectionConfigs: defaultSectionConfigs,
  heroAnimation: defaultHeroAnimation,
  customSections: defaultCustomSections,
  leads: [
    {
      id: "lead-1",
      title: "Custom CRM & Management Portal",
      clientName: "Alex Sterling",
      company: "TechHorizon Innovations",
      email: "alex@techhorizon.io",
      phone: "+1 (555) 349-8821",
      stage: "proposal",
      estimatedValue: 4500,
      currency: "USD",
      priority: "high",
      source: "Contact Form",
      notes: "Client needs Django REST Framework backend with Next.js frontend, role-based access, and client portal.",
      createdAt: "2024-08-28T14:30:00Z",
      expectedCloseDate: "2024-09-15"
    },
    {
      id: "lead-2",
      title: "Agency WordPress Speed & Theme Redesign",
      clientName: "Sarah Jenkins",
      company: "Digital Reach Agency",
      email: "sarah@digitalreach.agency",
      phone: "+44 20 7946 0912",
      stage: "negotiation",
      estimatedValue: 2800,
      currency: "USD",
      priority: "high",
      source: "Contact Form",
      notes: "Targeting 95+ Google PageSpeed score with custom Gutenberg blocks and WooCommerce integration.",
      createdAt: "2024-08-20T09:15:00Z",
      expectedCloseDate: "2024-09-10"
    },
    {
      id: "lead-3",
      title: "AI Chatbot & Document Search Integration",
      clientName: "Marcus Vance",
      company: "Apex Legal Partners",
      email: "m.vance@apexlegal.com",
      phone: "+1 (415) 890-1234",
      stage: "contacted",
      estimatedValue: 3600,
      currency: "USD",
      priority: "medium",
      source: "LinkedIn",
      notes: "Embeddings search for 500+ legal PDF documents with automated clause summarizer.",
      createdAt: "2024-08-15T11:00:00Z",
      expectedCloseDate: "2024-09-20"
    },
    {
      id: "lead-4",
      title: "E-Commerce Multi-Vendor Store",
      clientName: "Pooja Sharma",
      company: "Himalayan Goods Co.",
      email: "pooja@himalayangoods.np",
      phone: "+977-9801234567",
      stage: "won",
      estimatedValue: 2200,
      currency: "USD",
      priority: "high",
      source: "Referral",
      notes: "Contract finalized. Project kicked off under ERP tracker.",
      createdAt: "2024-08-01T10:00:00Z",
      expectedCloseDate: "2024-08-10"
    }
  ],
  clients: [
    {
      id: "client-1",
      name: "Alex Sterling",
      company: "TechHorizon Innovations",
      email: "alex@techhorizon.io",
      phone: "+1 (555) 349-8821",
      location: "San Francisco, USA",
      status: "prospective",
      totalBilled: 0,
      activeProjectsCount: 1,
      notes: "Very receptive to modern tech stack. Prefers weekly video progress demos.",
      createdAt: "2024-08-28T14:30:00Z",
      website: "https://techhorizon.io"
    },
    {
      id: "client-2",
      name: "Pooja Sharma",
      company: "Himalayan Goods Co.",
      email: "pooja@himalayangoods.np",
      phone: "+977-9801234567",
      location: "Kathmandu, Nepal",
      status: "active",
      totalBilled: 2200,
      activeProjectsCount: 1,
      notes: "Custom payment gateway integration (eSewa & Khalti) + international Stripe.",
      createdAt: "2024-08-01T10:00:00Z",
      website: "https://himalayangoods.np"
    },
    {
      id: "client-3",
      name: "David Chen",
      company: "Nexus FinTech Labs",
      email: "david.chen@nexuslabs.co",
      phone: "+65 6789 0123",
      location: "Singapore",
      status: "completed",
      totalBilled: 5400,
      activeProjectsCount: 0,
      notes: "Successfully deployed High-Throughput REST API Gateway. Open for Q4 retainer.",
      createdAt: "2024-05-12T08:00:00Z",
      website: "https://nexuslabs.co"
    }
  ],
  interactions: [
    {
      id: "int-1",
      clientId: "client-1",
      clientName: "Alex Sterling",
      type: "Meeting",
      date: "2024-08-30",
      summary: "30-min Zoom discovery session discussing project architecture and timeline.",
      nextFollowUp: "2024-09-05"
    },
    {
      id: "int-2",
      clientId: "client-2",
      clientName: "Pooja Sharma",
      type: "Contract",
      date: "2024-08-05",
      summary: "Signed freelance development agreement and received 50% milestone advance.",
      nextFollowUp: "2024-09-12"
    },
    {
      id: "int-3",
      clientId: "client-3",
      clientName: "David Chen",
      type: "Email",
      date: "2024-07-28",
      summary: "Delivered final API documentation and SSL security sign-off report.",
      nextFollowUp: "2024-10-01"
    }
  ],
  erpProjects: [
    {
      id: "erp-1",
      title: "Himalayan Goods Multi-Vendor Platform",
      clientId: "client-2",
      clientName: "Himalayan Goods Co.",
      status: "in-progress",
      startDate: "2024-08-05",
      deadline: "2024-09-25",
      budget: 2200,
      currency: "USD",
      progressPercent: 65,
      priority: "high",
      techStack: ["Django", "PostgreSQL", "Tailwind CSS", "Redis"],
      description: "Full-scale multi-vendor marketplace with real-time inventory management and payment gateway.",
      milestones: [
        { id: "m-1", title: "Database Schema & Multi-auth setup", completed: true, dueDate: "2024-08-12" },
        { id: "m-2", title: "Product Catalog & Cart Workflow", completed: true, dueDate: "2024-08-25" },
        { id: "m-3", title: "Payment Gateway & Order Processing", completed: false, dueDate: "2024-09-10" },
        { id: "m-4", title: "Vendor Dashboard & Final UAT", completed: false, dueDate: "2024-09-25" }
      ]
    },
    {
      id: "erp-2",
      title: "Nexus High-Throughput REST API Gateway",
      clientId: "client-3",
      clientName: "Nexus FinTech Labs",
      status: "completed",
      startDate: "2024-05-15",
      deadline: "2024-07-25",
      budget: 5400,
      currency: "USD",
      progressPercent: 100,
      priority: "high",
      techStack: ["Python", "FastAPI", "PostgreSQL", "Docker", "JWT"],
      description: "Scalable microservices backend handling 10,000+ daily financial transaction webhooks.",
      milestones: [
        { id: "m-201", title: "API Spec & Security Model", completed: true, dueDate: "2024-05-25" },
        { id: "m-202", title: "Core Endpoints & JWT Auth", completed: true, dueDate: "2024-06-15" },
        { id: "m-203", title: "Load Testing & Redis Cache Layer", completed: true, dueDate: "2024-07-10" },
        { id: "m-204", title: "Production Deployment & Docs", completed: true, dueDate: "2024-07-25" }
      ]
    },
    {
      id: "erp-3",
      title: "TechHorizon Custom Management Portal",
      clientId: "client-1",
      clientName: "TechHorizon Innovations",
      status: "planning",
      startDate: "2024-09-15",
      deadline: "2024-11-15",
      budget: 4500,
      currency: "USD",
      progressPercent: 10,
      priority: "high",
      techStack: ["Django REST", "React", "Tailwind CSS"],
      description: "Internal team ERP and workflow scheduler for 50+ remote team members.",
      milestones: [
        { id: "m-301", title: "Wireframes & API Contracts", completed: false, dueDate: "2024-09-22" },
        { id: "m-302", title: "Database Models & Authentication", completed: false, dueDate: "2024-10-05" },
        { id: "m-303", title: "Core Modules & Reporting", completed: false, dueDate: "2024-10-28" },
        { id: "m-304", title: "Testing & Handover", completed: false, dueDate: "2024-11-15" }
      ]
    }
  ],
  invoices: [
    {
      id: "inv-101",
      invoiceNumber: "INV-2024-001",
      clientName: "Pooja Sharma",
      clientEmail: "pooja@himalayangoods.np",
      clientCompany: "Himalayan Goods Co.",
      clientAddress: "Lazimpat, Kathmandu, Nepal",
      issueDate: "2024-08-05",
      dueDate: "2024-08-15",
      status: "paid",
      currency: "USD",
      subtotal: 1100,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 1100,
      paymentMethod: "Bank Wire Transfer",
      notes: "Milestone 1 Advance: Database architecture, product catalog & initial UI setup.",
      items: [
        { id: "ii-1", description: "Marketplace Initial Backend Architecture Setup", quantity: 1, unitPrice: 600, total: 600 },
        { id: "ii-2", description: "Frontend UI/UX Implementation & Catalog Module", quantity: 1, unitPrice: 500, total: 500 }
      ]
    },
    {
      id: "inv-102",
      invoiceNumber: "INV-2024-002",
      clientName: "Pooja Sharma",
      clientEmail: "pooja@himalayangoods.np",
      clientCompany: "Himalayan Goods Co.",
      clientAddress: "Lazimpat, Kathmandu, Nepal",
      issueDate: "2024-09-01",
      dueDate: "2024-09-15",
      status: "pending",
      currency: "USD",
      subtotal: 1100,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 1100,
      paymentMethod: "Bank Wire Transfer",
      notes: "Milestone 2: Payment gateway integration, checkout flow, and testing.",
      items: [
        { id: "ii-3", description: "eSewa, Khalti & Stripe Multi-Gateway Integration", quantity: 1, unitPrice: 600, total: 600 },
        { id: "ii-4", description: "Vendor Analytics & Final Deployment", quantity: 1, unitPrice: 500, total: 500 }
      ]
    },
    {
      id: "inv-103",
      invoiceNumber: "INV-2024-003",
      clientName: "David Chen",
      clientEmail: "david.chen@nexuslabs.co",
      clientCompany: "Nexus FinTech Labs",
      clientAddress: "71 Ayer Rajah Crescent, Singapore",
      issueDate: "2024-07-20",
      dueDate: "2024-07-30",
      status: "paid",
      currency: "USD",
      subtotal: 5400,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 5400,
      paymentMethod: "Stripe / International Wire",
      notes: "Full Contract Fee for High-Throughput REST API Gateway & Microservices.",
      items: [
        { id: "ii-5", description: "Microservices Architecture & REST API Endpoints", quantity: 1, unitPrice: 3200, total: 3200 },
        { id: "ii-6", description: "Redis Caching Layer, Dockerization & Load Testing", quantity: 1, unitPrice: 1600, total: 1600 },
        { id: "ii-7", description: "Technical Documentation & Security Audit Report", quantity: 1, unitPrice: 600, total: 600 }
      ]
    }
  ],
  erpTasks: [
    {
      id: "task-1",
      title: "Configure eSewa sandbox webhook signature verification",
      projectId: "erp-1",
      projectName: "Himalayan Goods Multi-Vendor Platform",
      priority: "high",
      status: "in_progress",
      estimatedHours: 6,
      loggedHours: 4,
      dueDate: "2024-09-08"
    },
    {
      id: "task-2",
      title: "Write unit test suite for order state machine transitions",
      projectId: "erp-1",
      projectName: "Himalayan Goods Multi-Vendor Platform",
      priority: "medium",
      status: "todo",
      estimatedHours: 8,
      loggedHours: 0,
      dueDate: "2024-09-12"
    },
    {
      id: "task-3",
      title: "Draft system architecture schema document for TechHorizon",
      projectId: "erp-3",
      projectName: "TechHorizon Custom Management Portal",
      priority: "high",
      status: "in_progress",
      estimatedHours: 5,
      loggedHours: 2,
      dueDate: "2024-09-18"
    },
    {
      id: "task-4",
      title: "Deploy SSL certs and automate daily PostgreSQL database backup",
      projectId: "erp-2",
      projectName: "Nexus High-Throughput REST API Gateway",
      priority: "urgent",
      status: "completed",
      estimatedHours: 4,
      loggedHours: 3.5,
      dueDate: "2024-07-24"
    }
  ],
  expenses: [
    {
      id: "exp-1",
      title: "Vultr High-Frequency Cloud VPS Server",
      category: "Hosting & Server",
      amount: 48,
      currency: "USD",
      date: "2024-08-01",
      status: "paid",
      vendor: "Vultr Cloud"
    },
    {
      id: "exp-2",
      title: "GitHub Copilot & OpenAI API Tokens",
      category: "Software & Subscriptions",
      amount: 35,
      currency: "USD",
      date: "2024-08-10",
      status: "paid",
      vendor: "OpenAI / GitHub"
    },
    {
      id: "exp-3",
      title: "Domain Renewals (dev portfolio & staging servers)",
      category: "Domain & SSL",
      amount: 28,
      currency: "USD",
      date: "2024-07-15",
      status: "paid",
      vendor: "Namecheap"
    }
  ]
};
