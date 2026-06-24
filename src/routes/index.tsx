import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Target, Map, BarChart3, Rocket, BookOpen, Brain, CheckCircle2, ArrowRight, GraduationCap, Compass, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LearnMate AI — Personalized Learning Paths & Skill Development" },
      { name: "description", content: "Your AI-powered learning mentor. Build a personalized roadmap from where you are to where you want to be." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Map, title: "Personalized Roadmaps", desc: "Step-by-step paths tailored to your goals, skills, and timeline." },
  { icon: Brain, title: "Skill Gap Analysis", desc: "See exactly what's missing for your dream role — and what to learn next." },
  { icon: BarChart3, title: "Career Readiness Score", desc: "Track how close you are to landing the role you want." },
  { icon: BookOpen, title: "Curated Resources", desc: "Courses, books, channels & docs picked for each stage of your journey." },
  { icon: Rocket, title: "Project Recommendations", desc: "Portfolio-worthy projects calibrated to your level." },
  { icon: Target, title: "Daily Study Planner", desc: "Daily tasks, weekly goals & monthly milestones that fit your schedule." },
];

const steps = [
  { n: "01", title: "Tell us about you", desc: "Share your skills, interests & dream career." },
  { n: "02", title: "Set your pace", desc: "Choose your study time, learning style & target duration." },
  { n: "03", title: "Get your roadmap", desc: "Receive a phase-by-phase plan built for you." },
  { n: "04", title: "Learn & track", desc: "Complete topics, watch your readiness score grow." },
];

const benefits = [
  "Know exactly what to learn — and in what order",
  "Stop wasting time on generic tutorials",
  "Identify and close real skill gaps fast",
  "Build projects that actually impress recruiters",
  "Stay motivated with streaks and milestones",
  "Reach career readiness in a fraction of the time",
];

const phases = [
  { label: "Foundation", icon: GraduationCap },
  { label: "Core", icon: Compass },
  { label: "Intermediate", icon: BookOpen },
  { label: "Advanced", icon: Brain },
  { label: "Projects", icon: Rocket },
  { label: "Interview", icon: TrendingUp },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:pt-28 lg:pb-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-powered learning mentor
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Learn Smarter.
                <br />
                <span className="text-gradient">Grow Faster.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                LearnMate AI builds a personalized learning roadmap from your current skills to your dream career — with study plans, projects, and a real-time readiness score.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-hero text-primary-foreground shadow-glow hover:opacity-95">
                  <Link to="/onboarding">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> No signup required</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> 100% personalized</div>
              </div>
            </div>

            {/* Visualization */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-hero opacity-20 blur-3xl" />
              <Card className="relative shadow-elegant">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Learning Journey</span>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">Live</span>
                  </div>
                  <div className="space-y-3">
                    {phases.map((p, i) => (
                      <div key={p.label} className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${i < 2 ? "bg-hero text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                          <p.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{p.label}</span>
                            <span className="text-muted-foreground">{i < 2 ? "100%" : i === 2 ? "45%" : "0%"}</span>
                          </div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full bg-hero" style={{ width: i < 2 ? "100%" : i === 2 ? "45%" : "0%" }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-secondary/60 p-3">
                      <div className="text-2xl font-bold text-gradient">68%</div>
                      <div className="text-xs text-muted-foreground">Readiness</div>
                    </div>
                    <div className="rounded-lg bg-secondary/60 p-3">
                      <div className="text-2xl font-bold text-gradient">14</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="rounded-lg bg-secondary/60 p-3">
                      <div className="text-2xl font-bold text-gradient">26</div>
                      <div className="text-xs text-muted-foreground">Topics</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Everything you need to <span className="text-gradient">learn with intent</span></h2>
          <p className="mt-4 text-muted-foreground">Six AI modules working together to guide you from beginner to career-ready.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
            <Card key={f.title} className="group border-border/60 bg-card-gradient transition hover:-translate-y-1 hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-hero text-primary-foreground shadow-glow transition group-hover:scale-110">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">How it works</h2>
            <p className="mt-4 text-muted-foreground">From signup to your first study session in under 2 minutes.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <Card className="h-full bg-card-gradient">
                  <CardContent className="p-6">
                    <div className="text-sm font-bold text-gradient">{s.n}</div>
                    <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Why students <span className="text-gradient">love LearnMate</span></h2>
            <p className="mt-4 text-muted-foreground">Generic tutorials waste your time. LearnMate AI gives you a path that's truly yours.</p>
            <ul className="mt-8 space-y-3">
              {benefits.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 bg-hero text-primary-foreground shadow-glow">
              <Link to="/onboarding">Build my roadmap <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Personalized topics", value: "60+", icon: BookOpen },
              { label: "Career paths", value: "10", icon: Target },
              { label: "Avg time saved", value: "4×", icon: Rocket },
              { label: "Project ideas", value: "30+", icon: Brain },
            ].map(s => (
              <Card key={s.label} className="bg-card-gradient">
                <CardContent className="p-6">
                  <s.icon className="h-6 w-6 text-primary" />
                  <div className="mt-4 text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-hero p-10 text-center text-primary-foreground shadow-elegant sm:p-16">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Ready to learn with purpose?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">Build your personalized roadmap in two minutes — no signup required.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/onboarding">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
