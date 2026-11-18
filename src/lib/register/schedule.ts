export interface SyllabusDayItem {
  day: string;
  title: string;
  topics: string[];
  lab: string;
  isExam?: boolean;
}

export interface SyllabusStage {
  id: string;
  stepNumber: number;
  title: string;
  dayRangeLabel: string;
  summaryPoints: string[];
  days: SyllabusDayItem[];
  examNote?: string;
}

export interface FullStackSyllabusData {
  courseSlug: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  highlights: { label: string; value: string }[];
  stack: string[];
  stages: SyllabusStage[];
}

export const FULLSTACK_AI_SYLLABUS: FullStackSyllabusData = {
  courseSlug: 'fullstack-ai',
  eyebrow: 'SYLLABUS',
  heading: 'How the course runs',
  subtitle:
    'Fourteen live days (1 hour/day) from zero to a deployed full-stack app with React, Node.js, Express, and Supabase on AWS — followed by a 4-day minor project and a 10-day team hackathon.',
  highlights: [
    { label: 'Total Journey', value: '29 Days' },
    { label: 'Format', value: '100% Live · No Recordings' },
    { label: 'Hackathon Prize', value: 'Up to ₹10,000 Stipend' },
  ],
  stack: [
    'React (Vite)',
    'Node.js & Express',
    'Supabase (PostgreSQL & Auth)',
    'Postman',
    'Git & GitHub',
    'AWS (EC2, S3, CloudFront)',
  ],
  stages: [
    {
      id: 'stage-1',
      stepNumber: 1,
      title: 'Live training — Foundations & Backend',
      dayRangeLabel: 'DAYS 1 TO 7',
      summaryPoints: [
        'Live theory & daily hands-on labs with the Lenienttree founders and team',
        'Every day ends with a working lab commit pushed to GitHub',
        'Week 1 Exam at the end of Day 7 (covers Days 1–7, marked by your mentor)',
      ],
      examNote: 'Week 1 Exam · End of Day 7 · Marked by your mentor',
      days: [
        {
          day: '01',
          title: 'Introduction to Full Stack',
          topics: [
            'How the web works: client, server, HTTP, request/response, DNS',
            'Frontend vs backend vs database; MERN pattern with Supabase replacing MongoDB',
            'Tool setup: Node.js (LTS), npm, VS Code, extensions, terminal basics',
          ],
          lab: 'Install tools, run a first Node.js script, create a GitHub account.',
        },
        {
          day: '02',
          title: 'Git Fundamentals',
          topics: [
            'Version control, repository, working tree, staging area',
            'git init, status, add, commit, log, diff, .gitignore',
            'Branching: branch, checkout/switch, merge, resolving simple conflicts',
          ],
          lab: 'Create a local repo, make 5 commits, branch, merge and fix a conflict.',
        },
        {
          day: '03',
          title: 'GitHub and Git Push',
          topics: [
            'Remotes: git remote add, push, pull, clone, fetch',
            'SSH keys vs HTTPS tokens for authentication',
            'Collaboration: forks, pull requests, code review, README writing',
          ],
          lab: 'Push the Day 2 repo to GitHub, open a pull request, merge it.',
        },
        {
          day: '04',
          title: 'Databases with Supabase',
          topics: [
            'SQL vs NoSQL; tables, rows, primary and foreign keys, relationships',
            'SQL basics: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, JOIN',
            'Supabase: project, Table Editor, SQL Editor, API keys, Row Level Security (RLS)',
          ],
          lab: 'Design the course project schema (users, tasks/products) and seed sample data.',
        },
        {
          day: '05',
          title: 'Node.js and Express Server',
          topics: [
            'Node.js modules, npm packages, package.json, nodemon',
            'Express setup: routes, req/res, JSON responses, port and dotenv',
            'Project structure: routes, controllers, middleware folders',
          ],
          lab: 'Build a running Express server with a health-check and sample routes.',
        },
        {
          day: '06',
          title: 'REST APIs and Postman',
          topics: [
            'REST principles, HTTP methods (GET, POST, PUT/PATCH, DELETE), status codes',
            'Route params, query params, request body, validation basics',
            'Postman: requests, collections, environments, variables, saving tests',
          ],
          lab: 'Build in-memory CRUD APIs and test every endpoint in a Postman collection.',
        },
        {
          day: '07',
          title: 'Connecting Express to Supabase & Week 1 Exam',
          topics: [
            '@supabase/supabase-js client setup; anon key vs service role key',
            'Replace in-memory data with real Supabase queries for full CRUD',
            'Error-handling middleware, async/await patterns, CORS',
          ],
          lab: 'Full CRUD API backed by Supabase, verified in Postman + Week 1 Exam.',
          isExam: true,
        },
      ],
    },
    {
      id: 'stage-2',
      stepNumber: 2,
      title: 'Live training — Auth, React & AWS Deployment',
      dayRangeLabel: 'DAYS 8 TO 14',
      summaryPoints: [
        'Full-stack React integration with Supabase JWT authentication',
        'Live cloud deployment on AWS (EC2, S3/CloudFront or Amplify) & CI/CD',
        'Week 2 Final Training Exam at the end of Day 14',
      ],
      examNote: 'Week 2 Exam · End of Day 14 · Covers Days 8 to 14',
      days: [
        {
          day: '08',
          title: 'Authentication and Security',
          topics: [
            'Supabase Auth: sign up, login, sessions, JWT access tokens',
            'Express middleware to verify tokens and protect routes',
            'Row Level Security policies so users only see their own data',
          ],
          lab: 'Protected API routes tested in Postman with a Bearer token.',
        },
        {
          day: '09',
          title: 'React Fundamentals',
          topics: [
            'Create a project with Vite; folder structure, JSX, components',
            'Props, state with useState, event handling, conditional rendering, lists and keys',
            'Styling options: CSS modules or Tailwind CSS',
          ],
          lab: 'Build static UI components for the project: navbar, cards, forms.',
        },
        {
          day: '10',
          title: 'React Hooks, Routing and Forms',
          topics: [
            'useEffect, custom hooks, lifting state, Context API for auth state',
            'React Router: pages, navigation, dynamic routes, protected routes',
            'Controlled forms and client-side validation',
          ],
          lab: 'A multi-page app with login, signup and dashboard screens.',
        },
        {
          day: '11',
          title: 'Frontend-Backend Integration',
          topics: [
            'Calling the Express API with Axios/fetch; loading and error states',
            'Sending the Supabase JWT in request headers; handling 401s and logout',
            'Environment variables in Vite (VITE_ prefix), CORS configuration',
          ],
          lab: 'Connect every screen to the backend for full CRUD with auth.',
        },
        {
          day: '12',
          title: 'Capstone Project Build',
          topics: [
            'Build the complete Task Manager / product app end to end',
            'File uploads with Supabase Storage (optional stretch)',
            'Code cleanup, README, Git branching workflow with pull requests',
          ],
          lab: 'A feature-complete app pushed to GitHub, running locally.',
        },
        {
          day: '13',
          title: 'AWS Cloud Deployment Session',
          topics: [
            'Cloud basics: regions, pricing, Free Tier, billing alerts',
            'IAM: users, roles, least-privilege access, MFA',
            'EC2 (Ubuntu, security groups, SSH, Node.js, PM2, Nginx) & S3/CloudFront or Amplify',
          ],
          lab: 'Deploy the Express backend on EC2 and the React frontend on S3/CloudFront or Amplify.',
        },
        {
          day: '14',
          title: 'Deployment Wrap-up, Demo & Week 2 Exam',
          topics: [
            'Production environment variables, HTTPS, custom domain basics (Route 53)',
            'Intro to CI/CD with GitHub Actions: auto-deploy on push',
            'CloudWatch logging basics & Demo Day live presentation',
          ],
          lab: 'Each participant presents a live, deployed app + Week 2 Exam.',
          isExam: true,
        },
      ],
    },
    {
      id: 'stage-3',
      stepNumber: 3,
      title: 'Minor project & live review',
      dayRangeLabel: 'DAYS 15 TO 19',
      summaryPoints: [
        '4-day independent build (Days 15–18) putting your full-stack skills to work',
        'Live class review and discussion on Day 19',
        'Dedicated Minor Project Certificate issued upon completion',
      ],
      days: [
        {
          day: '15–18',
          title: '4-Day Independent Full-Stack Build',
          topics: [
            'Apply foundations, Express backend, React frontend, and AWS deployment',
            'Push clean, documented code to GitHub with a complete README',
          ],
          lab: 'Submit your live deployed minor project repository.',
        },
        {
          day: '19',
          title: 'Live Class Discussion & Certification',
          topics: [
            'Live code walkthrough and mentor feedback session',
            'Minor project evaluation contributing to final mark',
          ],
          lab: 'Earn your Minor Project Completion Certificate.',
        },
      ],
    },
    {
      id: 'stage-4',
      stepNumber: 4,
      title: 'Major project — 10-day team hackathon',
      dayRangeLabel: 'DAYS 20 TO 29',
      summaryPoints: [
        'Batch-wide real 10-day team hackathon evaluated by mentors',
        'Live screening presentation & written project report on Day 29',
        'Up to ₹10,000 stipend awarded to the winning team',
      ],
      days: [
        {
          day: '20',
          title: 'Hackathon Day 1 — Topic & Team Formation',
          topics: [
            'Batch problem statement revealed and discussed live',
            'Cross-functional student teams formed within your cohort',
          ],
          lab: 'Initialize team GitHub repository and architecture plan.',
        },
        {
          day: '21–28',
          title: 'Hackathon Days 2–9 — 8-Day Team Build Sprint',
          topics: [
            'Solve the problem statement end to end as a team',
            'Full-stack React + Node/Express + Supabase implementation deployed live on AWS',
          ],
          lab: 'Working production deployment + written project report.',
        },
        {
          day: '29',
          title: 'Hackathon Day 10 — Live Screening & Demo',
          topics: [
            'Live screening presentation in front of mentors and panel',
            'Final mark awarded on certificate + winning team stipend announcement',
          ],
          lab: 'Submit final project report and present live demo.',
        },
      ],
    },
  ],
};
