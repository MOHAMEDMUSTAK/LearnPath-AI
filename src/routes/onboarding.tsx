import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLearnMate } from "@/lib/store";
import { CAREERS, INTERESTS, type Career, type Duration, type LearningStyle, type SkillLevel, type StudyTime } from "@/lib/learnmate";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Create your profile — LearnMate AI" },
      { name: "description", content: "Tell LearnMate AI about your goals to generate a personalized learning roadmap." },
    ],
  }),
  component: Onboarding,
});

const SKILL_LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];
const STUDY_TIMES: StudyTime[] = ["1 Hour/Day", "2 Hours/Day", "3 Hours/Day", "4+ Hours/Day"];
const STYLES: LearningStyle[] = ["Video Based", "Reading Based", "Practical Projects", "Mixed Learning"];
const DURATIONS: Duration[] = ["1 Month", "3 Months", "6 Months", "12 Months"];

function Onboarding() {
  const navigate = useNavigate();
  const { state, setProfile, setPreferences } = useLearnMate();
  const [step, setStep] = useState(1);

  const [name, setName] = useState(state.profile?.name ?? "");
  const [educationLevel, setEducationLevel] = useState(state.profile?.educationLevel ?? "Undergraduate");
  const [department, setDepartment] = useState(state.profile?.department ?? "");
  const [currentYear, setCurrentYear] = useState(state.profile?.currentYear ?? "");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(state.profile?.skillLevel ?? "Beginner");
  const [interests, setInterests] = useState<string[]>(state.profile?.interests ?? []);
  const [skills, setSkills] = useState<string[]>(state.profile?.currentSkills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [career, setCareer] = useState<Career>(state.profile?.career ?? "Full Stack Developer");

  const [studyTime, setStudyTime] = useState<StudyTime>(state.preferences?.studyTime ?? "2 Hours/Day");
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(state.preferences?.learningStyle ?? "Mixed Learning");
  const [duration, setDuration] = useState<Duration>(state.preferences?.duration ?? "6 Months");

  const toggleInterest = (i: string) => setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  const addSkill = () => {
    const t = skillInput.trim();
    if (!t || skills.includes(t)) return;
    setSkills(prev => [...prev, t]); setSkillInput("");
  };

  const canNext1 = name.trim() && interests.length > 0 && career;

  const finish = () => {
    setProfile({ name, educationLevel, department, currentYear, skillLevel, interests, currentSkills: skills, career });
    setPreferences({ studyTime, learningStyle, duration });
    toast.success("Roadmap generated!", { description: "Welcome to your personalized learning journey." });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium">Step {step} of 2</span>
          <span>{step === 1 ? "Student profile" : "Learning preferences"}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-hero transition-all" style={{ width: `${step * 50}%` }} />
        </div>
      </div>

      <Card className="shadow-elegant">
        <CardContent className="p-6 sm:p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold">Tell us about you</h2>
                <p className="text-sm text-muted-foreground">A few quick details so we can personalize your roadmap.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Alex Kumar" />
                </Field>
                <Field label="Education level">
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["High School", "Diploma", "Undergraduate", "Postgraduate", "Working Professional"].map(o =>
                        <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Department / Field">
                  <Input value={department} onChange={e => setDepartment(e.target.value)} placeholder="Computer Science" />
                </Field>
                <Field label="Current year">
                  <Input value={currentYear} onChange={e => setCurrentYear(e.target.value)} placeholder="3rd Year" />
                </Field>
              </div>

              <Field label="Current skill level">
                <div className="grid grid-cols-3 gap-2">
                  {SKILL_LEVELS.map(l => (
                    <ChoiceChip key={l} active={skillLevel === l} onClick={() => setSkillLevel(l)}>{l}</ChoiceChip>
                  ))}
                </div>
              </Field>

              <Field label="Areas of interest">
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(i => (
                    <ChoiceChip key={i} active={interests.includes(i)} onClick={() => toggleInterest(i)}>{i}</ChoiceChip>
                  ))}
                </div>
              </Field>

              <Field label="Current skills">
                <div className="flex gap-2">
                  <Input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                         onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                         placeholder="e.g. Python, React, SQL — press Enter to add" />
                  <Button type="button" onClick={addSkill} variant="outline">Add</Button>
                </div>
                {skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map(s => (
                      <Badge key={s} variant="secondary" className="gap-1 py-1 pl-3 pr-2">
                        {s}
                        <button onClick={() => setSkills(skills.filter(x => x !== s))} className="ml-1 rounded-full hover:bg-background/50">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </Field>

              <Field label="Dream career">
                <Select value={career} onValueChange={v => setCareer(v as Career)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CAREERS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              <div className="flex justify-end pt-2">
                <Button onClick={() => setStep(2)} disabled={!canNext1} className="bg-hero text-primary-foreground shadow-glow">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold">Set your learning pace</h2>
                <p className="text-sm text-muted-foreground">How you study shapes the plan we build.</p>
              </div>

              <Field label="Available study time">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {STUDY_TIMES.map(t => <ChoiceChip key={t} active={studyTime === t} onClick={() => setStudyTime(t)}>{t}</ChoiceChip>)}
                </div>
              </Field>

              <Field label="Learning style">
                <div className="grid grid-cols-2 gap-2">
                  {STYLES.map(s => <ChoiceChip key={s} active={learningStyle === s} onClick={() => setLearningStyle(s)}>{s}</ChoiceChip>)}
                </div>
              </Field>

              <Field label="Target duration">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DURATIONS.map(d => <ChoiceChip key={d} active={duration === d} onClick={() => setDuration(d)}>{d}</ChoiceChip>)}
                </div>
              </Field>

              <div className="rounded-xl border bg-secondary/40 p-4 text-sm">
                <div className="mb-2 flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Your plan preview</div>
                <p className="text-muted-foreground">
                  We'll generate a {duration.toLowerCase()} roadmap to become a <b>{career}</b>, with {studyTime.toLowerCase()} of {learningStyle.toLowerCase()} sessions.
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={finish} className="bg-hero text-primary-foreground shadow-glow">
                  Generate my roadmap <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function ChoiceChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
        active ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border bg-card hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
