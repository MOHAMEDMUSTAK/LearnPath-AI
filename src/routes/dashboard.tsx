import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useLearnMate } from "@/lib/store";
import {
  getRoadmap, nextRecommendation, projectsFor, readinessScore, resourcesFor, skillGap, studyPlan,
} from "@/lib/learnmate";
import {
  Award, BookOpen, Brain, CalendarCheck, CheckCircle2, ExternalLink, Flame, Map, Rocket,
  Sparkles, Target, TrendingUp, Trophy, Zap, AlertCircle,
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard — LearnMate AI" },
      { name: "description", content: "Track your personalized roadmap, study plan, and career readiness." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state, toggleTopic, reset } = useLearnMate();

  if (!state.profile || !state.preferences) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 font-display text-3xl font-bold">No roadmap yet</h2>
        <p className="mt-2 text-muted-foreground">Complete your profile to generate your personalized learning journey.</p>
        <Button asChild size="lg" className="mt-6 bg-hero text-primary-foreground shadow-glow">
          <Link to="/onboarding">Get started</Link>
        </Button>
      </div>
    );
  }

  const { profile, preferences, completed, streak } = state;
  const phases = useMemo(() => getRoadmap(profile.career), [profile.career]);
  const gap = useMemo(() => skillGap(profile.currentSkills, profile.career), [profile.currentSkills, profile.career]);
  const readiness = readinessScore(profile.currentSkills, completed, profile.career);
  const plan = useMemo(() => studyPlan(preferences, profile.career), [preferences, profile.career]);
  const resources = useMemo(() => resourcesFor(profile.career), [profile.career]);
  const projects = useMemo(() => projectsFor(profile.career, profile.skillLevel), [profile.career, profile.skillLevel]);
  const totalTopics = phases.reduce((a, p) => a + p.topics.length, 0);
  const completionPct = Math.round((completed.length / totalTopics) * 100);
  const nextRec = nextRecommendation(state);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="font-display text-4xl font-bold">
            {profile.name || "Learner"} <span className="text-gradient">·</span>{" "}
            <span className="text-gradient">{profile.career}</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.skillLevel} · {preferences.studyTime} · {preferences.learningStyle} · {preferences.duration}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/onboarding">Edit profile</Link></Button>
          <Button variant="ghost" onClick={() => { if (confirm("Reset all progress?")) reset(); }}>Reset</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPI icon={Trophy} label="Career Readiness" value={`${readiness}%`} sub={`${profile.career}`} tint="primary" />
        <KPI icon={CheckCircle2} label="Topics Completed" value={`${completed.length}/${totalTopics}`} sub={`${completionPct}% done`} tint="success" />
        <KPI icon={Flame} label="Learning Streak" value={`${streak} days`} sub={state.lastActive ? `Last: ${state.lastActive}` : "Start today!"} tint="warning" />
        <KPI icon={Zap} label="Next Up" value={nextRec.split(":")[1]?.trim() ?? nextRec} sub={nextRec.split(":")[0]} tint="accent" />
      </div>

      <Tabs defaultValue="roadmap" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="roadmap"><Map className="mr-1.5 h-4 w-4" />Roadmap</TabsTrigger>
          <TabsTrigger value="gap"><Brain className="mr-1.5 h-4 w-4" />Skill Gap</TabsTrigger>
          <TabsTrigger value="plan"><CalendarCheck className="mr-1.5 h-4 w-4" />Planner</TabsTrigger>
          <TabsTrigger value="resources"><BookOpen className="mr-1.5 h-4 w-4" />Resources</TabsTrigger>
          <TabsTrigger value="projects"><Rocket className="mr-1.5 h-4 w-4" />Projects</TabsTrigger>
          <TabsTrigger value="readiness"><Award className="mr-1.5 h-4 w-4" />Readiness</TabsTrigger>
        </TabsList>

        {/* ROADMAP */}
        <TabsContent value="roadmap" className="mt-6 space-y-4">
          {phases.map((p, i) => {
            const done = p.topics.filter(t => completed.includes(t.id)).length;
            const pct = Math.round((done / p.topics.length) * 100);
            return (
              <Card key={p.title} className="bg-card-gradient">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hero font-bold text-primary-foreground shadow-glow">{i + 1}</div>
                      <div>
                        <CardTitle className="text-lg">Phase {i + 1}: {p.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{done}/{p.topics.length}</Badge>
                  </div>
                  <Progress value={pct} className="mt-3 h-2" />
                </CardHeader>
                <CardContent className="grid gap-2 sm:grid-cols-2">
                  {p.topics.map(t => (
                    <label key={t.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition hover:bg-secondary/60 ${completed.includes(t.id) ? "border-success/40 bg-success/10" : ""}`}>
                      <Checkbox checked={completed.includes(t.id)} onCheckedChange={() => toggleTopic(t.id)} className="mt-0.5" />
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${completed.includes(t.id) ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                        <div className="text-xs text-muted-foreground">~{t.hours} hours</div>
                      </div>
                    </label>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* SKILL GAP */}
        <TabsContent value="gap" className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" />Skills you have</CardTitle></CardHeader>
            <CardContent>
              {profile.currentSkills.length === 0
                ? <p className="text-sm text-muted-foreground">You haven't listed any skills yet.</p>
                : <div className="flex flex-wrap gap-2">{profile.currentSkills.map(s => <Badge key={s} className="bg-success/15 text-success hover:bg-success/20">{s}</Badge>)}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-warning" />Skills you need</CardTitle></CardHeader>
            <CardContent>
              {gap.missing.length === 0
                ? <p className="text-sm text-muted-foreground">Amazing — you already have all the core skills!</p>
                : <div className="flex flex-wrap gap-2">{gap.missing.map(s => <Badge key={s} variant="outline">{s}</Badge>)}</div>}
            </CardContent>
          </Card>
          <Card className="md:col-span-2 border-primary/30 bg-card-gradient">
            <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Priority skills to learn next</CardTitle></CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {gap.priority.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hero text-xs font-bold text-primary-foreground">{i + 1}</span>
                    <span className="font-medium">{s}</span>
                    <span className="ml-auto text-xs text-muted-foreground">High impact</span>
                  </li>
                ))}
                {gap.priority.length === 0 && <p className="text-sm text-muted-foreground">No priority gaps — focus on advanced projects.</p>}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PLANNER */}
        <TabsContent value="plan" className="mt-6 grid gap-4 lg:grid-cols-3">
          <PlanCard title="Today" tasks={plan.today.map(t => t.title)} sub={`${plan.dailyHours}h focused study`} icon={Zap} />
          <PlanCard title="This Week" tasks={plan.week.map(t => t.title)} sub={`Goal: ${plan.weeklyGoal}h`} icon={CalendarCheck} />
          <PlanCard title="This Month" tasks={plan.month.map(t => t.title)} sub={`Milestone: complete ${plan.month.length} topics`} icon={Trophy} />
          <Card className="lg:col-span-3 bg-card-gradient">
            <CardHeader><CardTitle>Plan overview</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <Stat label="Total study hours" value={`${plan.totalHours}h`} />
                <Stat label="Days needed" value={`${plan.daysNeeded}`} />
                <Stat label="Estimated months" value={`${Math.ceil(plan.daysNeeded / 22)}`} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RESOURCES */}
        <TabsContent value="resources" className="mt-6 space-y-4">
          {resources.map(r => (
            <Card key={r.stage}>
              <CardHeader><CardTitle className="text-base">{r.stage}</CardTitle></CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {r.items.map(item => (
                  <a key={item.url} href={item.url} target="_blank" rel="noreferrer"
                     className="group flex items-center justify-between rounded-xl border p-3 transition hover:border-primary hover:bg-secondary/60">
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.type}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                  </a>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* PROJECTS */}
        <TabsContent value="projects" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <Card key={p.title} className="flex flex-col bg-card-gradient">
              <CardHeader>
                <Badge className="mb-2 w-fit" variant={p.difficulty === "Beginner" ? "secondary" : p.difficulty === "Intermediate" ? "default" : "destructive"}>{p.difficulty}</Badge>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Required skills</p>
                  <div className="flex flex-wrap gap-1">{p.skills.map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}</div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Learning outcomes</p>
                  <ul className="space-y-1 text-sm">
                    {p.outcomes.map(o => <li key={o} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />{o}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* READINESS */}
        <TabsContent value="readiness" className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1 bg-card-gradient">
            <CardHeader><CardTitle className="text-base">Career Readiness</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "score", value: readiness, fill: "var(--color-primary)" }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--color-secondary)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="-mt-44 text-center">
                  <div className="text-5xl font-bold text-gradient">{readiness}%</div>
                  <div className="text-sm text-muted-foreground">{profile.career}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Improvement areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Recommended next step</p>
                <p className="text-muted-foreground">{nextRec}</p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Missing competencies</p>
                <div className="flex flex-wrap gap-2">
                  {gap.missing.slice(0, 8).map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                  {gap.missing.length === 0 && <p className="text-sm text-muted-foreground">All core competencies covered. Sharpen with advanced projects.</p>}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Overall progress</p>
                <Progress value={completionPct} className="h-3" />
                <p className="mt-1 text-xs text-muted-foreground">{completed.length} of {totalTopics} topics completed</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function KPI({ icon: Icon, label, value, sub, tint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string; tint: "primary" | "success" | "warning" | "accent" }) {
  const tintMap = {
    primary: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    accent: "bg-accent/20 text-accent-foreground",
  };
  return (
    <Card className="bg-card-gradient">
      <CardContent className="flex items-start gap-4 p-5">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tintMap[tint]}`}><Icon className="h-5 w-5" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="truncate text-xl font-bold">{value}</p>
          <p className="truncate text-xs text-muted-foreground">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanCard({ title, tasks, sub, icon: Icon }: { title: string; tasks: string[]; sub: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Card className="bg-card-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map(t => (
            <li key={t} className="flex items-start gap-2 rounded-lg border bg-card p-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold text-gradient">{value}</div>
    </div>
  );
}
