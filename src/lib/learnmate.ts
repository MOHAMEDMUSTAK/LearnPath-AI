// Domain types and intelligent content generator for LearnMate AI
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";
export type LearningStyle = "Video Based" | "Reading Based" | "Practical Projects" | "Mixed Learning";
export type StudyTime = "1 Hour/Day" | "2 Hours/Day" | "3 Hours/Day" | "4+ Hours/Day";
export type Duration = "1 Month" | "3 Months" | "6 Months" | "12 Months";

export const INTERESTS = [
  "AI/ML", "Data Science", "Web Development", "Mobile Development",
  "Cybersecurity", "Cloud Computing", "DevOps", "UI/UX Design", "Blockchain",
] as const;

export const CAREERS = [
  "AI Engineer", "Data Scientist", "Software Engineer", "Full Stack Developer",
  "Cloud Engineer", "Cybersecurity Analyst", "Mobile Developer",
  "DevOps Engineer", "UI/UX Designer", "Blockchain Developer",
] as const;

export type Career = (typeof CAREERS)[number];

export interface Profile {
  name: string;
  educationLevel: string;
  department: string;
  currentYear: string;
  skillLevel: SkillLevel;
  interests: string[];
  currentSkills: string[];
  career: Career;
}

export interface Preferences {
  studyTime: StudyTime;
  learningStyle: LearningStyle;
  duration: Duration;
}

export interface AppState {
  profile: Profile | null;
  preferences: Preferences | null;
  completed: string[]; // topic IDs completed
  streak: number;
  lastActive: string | null;
}

// ---- Required skills per career ----
export const CAREER_SKILLS: Record<Career, string[]> = {
  "AI Engineer": ["Python", "NumPy", "Pandas", "Statistics", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "MLOps", "SQL"],
  "Data Scientist": ["Python", "Statistics", "SQL", "Pandas", "NumPy", "Data Visualization", "Machine Learning", "A/B Testing", "Power BI / Tableau", "Communication"],
  "Software Engineer": ["Data Structures", "Algorithms", "Git", "OOP", "System Design", "SQL", "Testing", "REST APIs", "One Backend Language", "Linux Basics"],
  "Full Stack Developer": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "REST APIs", "SQL", "MongoDB", "Git", "Deployment"],
  "Cloud Engineer": ["Linux", "Networking", "AWS / Azure / GCP", "Terraform", "Docker", "Kubernetes", "CI/CD", "Bash Scripting", "Python", "Security Basics"],
  "Cybersecurity Analyst": ["Networking", "Linux", "Python", "OWASP Top 10", "SIEM Tools", "Cryptography", "Penetration Testing", "Incident Response", "Cloud Security"],
  "Mobile Developer": ["Dart / Kotlin / Swift", "Flutter / React Native", "REST APIs", "State Management", "SQLite", "Firebase", "UI Design", "App Deployment"],
  "DevOps Engineer": ["Linux", "Bash", "Docker", "Kubernetes", "Terraform", "AWS", "CI/CD", "Monitoring", "Networking", "Git"],
  "UI/UX Designer": ["Figma", "Design Systems", "Typography", "Color Theory", "User Research", "Wireframing", "Prototyping", "Accessibility", "Interaction Design"],
  "Blockchain Developer": ["Solidity", "JavaScript", "Ethereum", "Smart Contracts", "Web3.js", "Hardhat", "Cryptography Basics", "DApp Architecture"],
};

interface Topic { id: string; title: string; hours: number; }
interface Phase { title: string; description: string; topics: Topic[]; }

// ---- Roadmap templates per career ----
const ROADMAPS: Record<Career, Phase[]> = {
  "AI Engineer": [
    { title: "Foundation Skills", description: "Programming and math fundamentals", topics: [
      { id: "py-basics", title: "Python Programming Basics", hours: 12 },
      { id: "math-linalg", title: "Linear Algebra Essentials", hours: 8 },
      { id: "stats-prob", title: "Statistics & Probability", hours: 10 },
      { id: "git-cli", title: "Git & Command Line", hours: 4 },
    ]},
    { title: "Core Concepts", description: "Data handling and analysis", topics: [
      { id: "numpy", title: "NumPy for Numerical Computing", hours: 6 },
      { id: "pandas", title: "Pandas for Data Manipulation", hours: 8 },
      { id: "viz", title: "Data Visualization (Matplotlib, Seaborn)", hours: 6 },
      { id: "sql", title: "SQL for Data Querying", hours: 8 },
    ]},
    { title: "Intermediate Skills", description: "Classical machine learning", topics: [
      { id: "ml-supervised", title: "Supervised Learning Algorithms", hours: 14 },
      { id: "ml-unsupervised", title: "Unsupervised Learning", hours: 10 },
      { id: "ml-eval", title: "Model Evaluation & Tuning", hours: 8 },
      { id: "feature-eng", title: "Feature Engineering", hours: 6 },
    ]},
    { title: "Advanced Topics", description: "Deep learning and modern AI", topics: [
      { id: "dl-nn", title: "Neural Networks Fundamentals", hours: 12 },
      { id: "dl-tf", title: "TensorFlow / PyTorch", hours: 14 },
      { id: "cv", title: "Computer Vision (CNNs)", hours: 10 },
      { id: "nlp", title: "Natural Language Processing & Transformers", hours: 14 },
    ]},
    { title: "Projects", description: "Apply your skills to real problems", topics: [
      { id: "proj-1", title: "End-to-End ML Project", hours: 20 },
      { id: "proj-2", title: "Deep Learning Capstone", hours: 30 },
      { id: "proj-3", title: "MLOps Deployment Project", hours: 16 },
    ]},
    { title: "Interview Preparation", description: "Land the role", topics: [
      { id: "ip-dsa", title: "DSA for ML Interviews", hours: 20 },
      { id: "ip-ml", title: "ML System Design", hours: 10 },
      { id: "ip-mock", title: "Mock Interviews & Portfolio", hours: 12 },
    ]},
  ],
  "Data Scientist": defaultRoadmap("Data Scientist"),
  "Software Engineer": defaultRoadmap("Software Engineer"),
  "Full Stack Developer": [
    { title: "Foundation Skills", description: "Web fundamentals", topics: [
      { id: "html", title: "HTML5 Semantic Markup", hours: 6 },
      { id: "css", title: "CSS Layout, Flexbox & Grid", hours: 10 },
      { id: "js", title: "Modern JavaScript (ES6+)", hours: 14 },
      { id: "git", title: "Git & GitHub Workflow", hours: 4 },
    ]},
    { title: "Core Concepts", description: "Frontend with React", topics: [
      { id: "ts", title: "TypeScript Essentials", hours: 8 },
      { id: "react", title: "React Components & Hooks", hours: 14 },
      { id: "react-state", title: "State Management & Routing", hours: 10 },
      { id: "tailwind", title: "Tailwind CSS & Design Systems", hours: 6 },
    ]},
    { title: "Intermediate Skills", description: "Backend & databases", topics: [
      { id: "node", title: "Node.js & Express", hours: 12 },
      { id: "rest", title: "REST API Design", hours: 8 },
      { id: "sql-db", title: "SQL & Postgres", hours: 10 },
      { id: "mongo", title: "MongoDB & NoSQL", hours: 6 },
    ]},
    { title: "Advanced Topics", description: "Production-grade engineering", topics: [
      { id: "auth", title: "Authentication & Security", hours: 8 },
      { id: "testing", title: "Testing (Unit, Integration, E2E)", hours: 10 },
      { id: "perf", title: "Performance & Caching", hours: 8 },
      { id: "deploy", title: "CI/CD & Cloud Deployment", hours: 10 },
    ]},
    { title: "Projects", description: "Build a portfolio", topics: [
      { id: "fs-proj-1", title: "Full Stack Social App", hours: 30 },
      { id: "fs-proj-2", title: "SaaS Dashboard with Payments", hours: 35 },
      { id: "fs-proj-3", title: "Realtime Collaboration App", hours: 25 },
    ]},
    { title: "Interview Preparation", description: "Ace the interview", topics: [
      { id: "fs-dsa", title: "DSA in JavaScript", hours: 20 },
      { id: "fs-sd", title: "System Design Basics", hours: 10 },
      { id: "fs-mock", title: "Mock Interviews", hours: 10 },
    ]},
  ],
  "Cloud Engineer": defaultRoadmap("Cloud Engineer"),
  "Cybersecurity Analyst": defaultRoadmap("Cybersecurity Analyst"),
  "Mobile Developer": defaultRoadmap("Mobile Developer"),
  "DevOps Engineer": defaultRoadmap("DevOps Engineer"),
  "UI/UX Designer": defaultRoadmap("UI/UX Designer"),
  "Blockchain Developer": defaultRoadmap("Blockchain Developer"),
};

function defaultRoadmap(c: Career): Phase[] {
  const skills = CAREER_SKILLS[c];
  const chunk = (arr: string[], from: number, to: number) => arr.slice(from, to);
  const toTopics = (arr: string[], h: number, prefix: string): Topic[] =>
    arr.map((s, i) => ({ id: `${prefix}-${i}`, title: s, hours: h }));
  return [
    { title: "Foundation Skills", description: "Build a strong base", topics: toTopics(chunk(skills, 0, 3), 10, c.slice(0,3).toLowerCase()+"f") },
    { title: "Core Concepts", description: "Essential working knowledge", topics: toTopics(chunk(skills, 3, 6), 12, c.slice(0,3).toLowerCase()+"c") },
    { title: "Intermediate Skills", description: "Real-world tooling", topics: toTopics(chunk(skills, 6, 9), 14, c.slice(0,3).toLowerCase()+"i") },
    { title: "Advanced Topics", description: "Deep specialization", topics: toTopics(chunk(skills, 9, 12).length ? chunk(skills, 9, 12) : [skills[skills.length-1]], 16, c.slice(0,3).toLowerCase()+"a") },
    { title: "Projects", description: "Portfolio-grade builds", topics: [
      { id: c+"-p1", title: `Beginner ${c} Project`, hours: 20 },
      { id: c+"-p2", title: `Intermediate ${c} Project`, hours: 30 },
      { id: c+"-p3", title: `Advanced ${c} Capstone`, hours: 40 },
    ]},
    { title: "Interview Preparation", description: "Ready for the role", topics: [
      { id: c+"-ip1", title: "Role-specific Interview Topics", hours: 16 },
      { id: c+"-ip2", title: "System Design / Domain Design", hours: 10 },
      { id: c+"-ip3", title: "Mock Interviews & Portfolio Polish", hours: 12 },
    ]},
  ];
}

export function getRoadmap(career: Career): Phase[] {
  return ROADMAPS[career];
}

// ---- Skill gap ----
export function skillGap(currentSkills: string[], career: Career) {
  const required = CAREER_SKILLS[career];
  const have = new Set(currentSkills.map(s => s.toLowerCase().trim()));
  const missing = required.filter(s => !Array.from(have).some(h => s.toLowerCase().includes(h) || h.includes(s.toLowerCase().split(" ")[0])));
  const priority = missing.slice(0, Math.min(5, missing.length));
  return { required, missing, priority };
}

// ---- Readiness score ----
export function readinessScore(currentSkills: string[], completed: string[], career: Career) {
  const { required, missing } = skillGap(currentSkills, career);
  const skillScore = ((required.length - missing.length) / required.length) * 60;
  const phases = getRoadmap(career);
  const totalTopics = phases.reduce((a, p) => a + p.topics.length, 0);
  const progressScore = (completed.length / Math.max(totalTopics, 1)) * 40;
  return Math.round(Math.max(0, Math.min(100, skillScore + progressScore)));
}

// ---- Study plan ----
const HOURS: Record<StudyTime, number> = {
  "1 Hour/Day": 1, "2 Hours/Day": 2, "3 Hours/Day": 3, "4+ Hours/Day": 4,
};

export function studyPlan(prefs: Preferences, career: Career) {
  const dailyHours = HOURS[prefs.studyTime];
  const phases = getRoadmap(career);
  const allTopics = phases.flatMap(p => p.topics.map(t => ({ ...t, phase: p.title })));
  const totalHours = allTopics.reduce((a, t) => a + t.hours, 0);
  const daysNeeded = Math.ceil(totalHours / dailyHours);
  const weeklyGoal = dailyHours * 6;
  const today = allTopics.slice(0, Math.max(1, Math.round(dailyHours / 2)));
  const week = allTopics.slice(0, Math.min(allTopics.length, Math.ceil(weeklyGoal / 4)));
  const month = allTopics.slice(0, Math.min(allTopics.length, Math.ceil((dailyHours * 22) / 6)));
  return { dailyHours, totalHours, daysNeeded, weeklyGoal, today, week, month };
}

// ---- Resources ----
export interface Resource { title: string; type: string; url: string; }
const RESOURCES: Record<Career, Record<string, Resource[]>> = {} as any;

export function resourcesFor(career: Career): { stage: string; items: Resource[] }[] {
  // Generic high-quality resource lists, tailored by career keywords
  const base: Record<string, Resource[]> = {
    "Foundation": [
      { title: "freeCodeCamp", type: "Course", url: "https://www.freecodecamp.org" },
      { title: "MDN Web Docs", type: "Docs", url: "https://developer.mozilla.org" },
      { title: "Khan Academy", type: "Course", url: "https://www.khanacademy.org" },
    ],
    "Core": [
      { title: "Coursera Specializations", type: "Course", url: "https://www.coursera.org" },
      { title: "The Odin Project", type: "Course", url: "https://www.theodinproject.com" },
      { title: "freeCodeCamp YouTube", type: "YouTube", url: "https://www.youtube.com/@freecodecamp" },
    ],
    "Intermediate": [
      { title: "LeetCode Practice", type: "Practice", url: "https://leetcode.com" },
      { title: "HackerRank Skill Tracks", type: "Practice", url: "https://www.hackerrank.com" },
      { title: "GitHub Awesome Lists", type: "Reference", url: "https://github.com/sindresorhus/awesome" },
    ],
    "Advanced": [
      { title: "Designing Data-Intensive Applications", type: "Book", url: "https://dataintensive.net" },
      { title: "System Design Primer", type: "Docs", url: "https://github.com/donnemartin/system-design-primer" },
      { title: "Frontend Masters", type: "Course", url: "https://frontendmasters.com" },
    ],
    "Projects": [
      { title: "build-your-own-x", type: "Reference", url: "https://github.com/codecrafters-io/build-your-own-x" },
      { title: "Kaggle Datasets", type: "Practice", url: "https://www.kaggle.com" },
      { title: "Devpost Project Ideas", type: "Reference", url: "https://devpost.com" },
    ],
    "Interview": [
      { title: "NeetCode 150", type: "Practice", url: "https://neetcode.io" },
      { title: "Pramp Mock Interviews", type: "Practice", url: "https://www.pramp.com" },
      { title: "Tech Interview Handbook", type: "Docs", url: "https://www.techinterviewhandbook.org" },
    ],
  };
  void RESOURCES; void career;
  return [
    { stage: "Foundation Skills", items: base.Foundation },
    { stage: "Core Concepts", items: base.Core },
    { stage: "Intermediate Skills", items: base.Intermediate },
    { stage: "Advanced Topics", items: base.Advanced },
    { stage: "Projects", items: base.Projects },
    { stage: "Interview Preparation", items: base.Interview },
  ];
}

// ---- Project recommendations ----
export interface ProjectIdea {
  title: string; description: string; difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[]; outcomes: string[];
}
const PROJECT_BANK: Partial<Record<Career, ProjectIdea[]>> = {
  "AI Engineer": [
    { title: "House Price Predictor", description: "Build a regression model to predict housing prices.", difficulty: "Beginner", skills: ["Python", "Pandas", "Scikit-learn"], outcomes: ["Data cleaning", "Model evaluation"] },
    { title: "Image Classifier", description: "Train a CNN to classify images into categories.", difficulty: "Intermediate", skills: ["TensorFlow", "CNNs", "Data augmentation"], outcomes: ["Deep learning workflows", "Transfer learning"] },
    { title: "LLM-powered Q&A Bot", description: "Build a retrieval-augmented chatbot over your own docs.", difficulty: "Advanced", skills: ["Transformers", "Embeddings", "Vector DB"], outcomes: ["RAG architecture", "Deploying LLM apps"] },
  ],
  "Full Stack Developer": [
    { title: "Personal Blog Platform", description: "Markdown blog with CMS and comments.", difficulty: "Beginner", skills: ["React", "Node.js", "SQL"], outcomes: ["CRUD", "Routing", "Deployment"] },
    { title: "Realtime Chat App", description: "Multi-room chat with presence & typing indicators.", difficulty: "Intermediate", skills: ["WebSockets", "React", "Auth"], outcomes: ["Realtime sync", "State management"] },
    { title: "SaaS Starter with Billing", description: "Multi-tenant SaaS with subscriptions and dashboards.", difficulty: "Advanced", skills: ["Stripe", "RLS", "TypeScript"], outcomes: ["Production architecture", "Billing flows"] },
  ],
};

export function projectsFor(career: Career, level: SkillLevel): ProjectIdea[] {
  const bank = PROJECT_BANK[career] ?? [
    { title: `Starter ${career} Project`, description: `An entry-level project to apply your ${career} fundamentals.`, difficulty: "Beginner", skills: CAREER_SKILLS[career].slice(0, 3), outcomes: ["Hands-on practice", "Portfolio piece"] },
    { title: `Intermediate ${career} Project`, description: `A medium-complexity build that ties together core ${career} skills.`, difficulty: "Intermediate", skills: CAREER_SKILLS[career].slice(2, 6), outcomes: ["Integration skills", "Deeper understanding"] },
    { title: `Advanced ${career} Capstone`, description: `A capstone-grade project demonstrating senior-level ${career} ability.`, difficulty: "Advanced", skills: CAREER_SKILLS[career].slice(4, 9), outcomes: ["End-to-end ownership", "Interview talking points"] },
  ];
  if (level === "Beginner") return bank;
  if (level === "Intermediate") return [...bank.filter(b => b.difficulty !== "Beginner"), bank[0]];
  return [...bank.filter(b => b.difficulty === "Advanced"), ...bank.filter(b => b.difficulty !== "Advanced")];
}

export function nextRecommendation(state: AppState): string {
  if (!state.profile) return "Complete your profile to get started.";
  const phases = getRoadmap(state.profile.career);
  for (const phase of phases) {
    for (const t of phase.topics) {
      if (!state.completed.includes(t.id)) return `${phase.title}: ${t.title}`;
    }
  }
  return "You've completed every topic — time for interviews!";
}
