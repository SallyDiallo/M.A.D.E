"use client";

import TwinCard from "@/components/TwinCard";
import { useState } from "react";

type Twin = {
  title: string;
  decision: string;
  reasoning: string;
  biggest_concern: string;
  confidence: number;
};

type CareerPath = {
  career: string;
  fit_reason: string;
  difficulty: string;
  time_to_enter: string;
  growth_outlook: string;
};

type SalaryProjection = {
  career: string;
  entry_level: string;
  mid_career: string;
  senior_level: string;
  education_needed: string;
  notes: string;
};

type DecisionResult = {
  twins: Twin[];
  key_conflict: string;
  balanced_recommendation: string;
  recommended_paths: CareerPath[];
  salary_projection: SalaryProjection[];
  skills_to_build_next: string[];
  next_actions: string[];
  _demo?: boolean;
};

const PREVIEW_TWINS = [
  {
    title: "Logical Twin",
    color: "from-blue-500/20 to-blue-900/10 border-blue-400/30",
    icon: "🧠",
    desc: "Analyzes facts, ROI, and long-term strategy to find the most practical path forward.",
  },
  {
    title: "Emotional Twin",
    color: "from-fuchsia-500/20 to-fuchsia-900/10 border-fuchsia-400/30",
    icon: "💜",
    desc: "Weighs your well-being, stress, and personal fulfillment above all else.",
  },
  {
    title: "Ambitious Twin",
    color: "from-amber-500/20 to-amber-900/10 border-amber-400/30",
    icon: "🔥",
    desc: "Pushes for growth, prestige, and bold moves that maximize your upside.",
  },
];

const DECISION_TYPES = [
  "Career",
  "Academic",
  "Internship",
  "Graduate School",
  "Major / Minor",
  "Personal Development",
  "Financial",
  "Other",
];

const STAGES = [
  { label: "High School", value: "High School" },
  { label: "Undergrad", value: "Undergraduate" },
  { label: "Grad", value: "Graduate" },
  { label: "Postgrad", value: "Postgraduate" },
  { label: "PhD", value: "PhD" },
];

const GOALS = [
  "Financial stability and long-term success",
  "Land a top internship or job",
  "Get into a prestigious graduate program",
  "Find a career I am passionate about",
  "Build my own company or startup",
  "Achieve work-life balance",
  "Make a social or community impact",
  "Gain skills and experience fast",
];

const VALUES = [
  "Growth",
  "Stability",
  "Creativity",
  "Prestige",
  "Freedom",
  "Impact",
  "Wealth",
  "Balance",
  "Connection",
  "Learning",
];

const STRESS_LABELS = ["Very Low", "Low", "Medium", "High", "Very High"];

const EXAMPLES = [
  { label: "Major switch", text: "Should I switch from biology to AI?" },
  {
    label: "Internship decision",
    text: "Should I take a high-paying internship or stay focused on research?",
  },
  {
    label: "Graduate school",
    text: "Should I go straight into graduate school after undergrad?",
  },
];

export default function Home() {
  const [screen, setScreen] = useState<"landing" | "form">("landing");
  const [question, setQuestion] = useState("");
  const [decisionType, setDecisionType] = useState("Career");
  const [goal, setGoal] = useState(GOALS[0]);
  const [value, setValue] = useState("Growth");
  const [stressIndex, setStressIndex] = useState(2);
  const [stage, setStage] = useState("Undergraduate");

  const [result, setResult] = useState<DecisionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stress = STRESS_LABELS[stressIndex];

  const handleAnalyze = async () => {
    if (!question.trim()) {
      setError("Please enter a decision question before analyzing.");
      setResult(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch("/api/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision_type: decisionType,
          goal,
          value,
          stress,
          stage,
          question,
        }),
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        throw new Error("The server did not return valid JSON.");
      }

      if (!res.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Failed to analyze decision.";
        throw new Error(message);
      }

      setResult(data as DecisionResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing your decision."
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // ── Landing Screen ────────────────────────────────────────────────────────
  if (screen === "landing") {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-400 font-semibold">
          M.A.D.E
        </p>

        <h1 className="text-center text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
          Multi-Agent
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400">
            Decision Engine
          </span>
        </h1>

        <p className="mt-6 text-center text-gray-400 text-lg max-w-xl leading-relaxed">
          Three AI perspectives. One clear path. Built for students at every
          stage of their journey.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-3 w-full max-w-3xl">
          {PREVIEW_TWINS.map((twin) => (
            <div
              key={twin.title}
              className={`rounded-3xl border bg-gradient-to-br ${twin.color} p-6 flex flex-col gap-3`}
            >
              <span className="text-3xl">{twin.icon}</span>
              <h3 className="text-lg font-semibold">{twin.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{twin.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setScreen("form")}
          className="mt-12 rounded-2xl bg-white px-10 py-4 text-lg font-bold text-black transition hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        >
          Get Started →
        </button>

        <p className="mt-5 text-xs text-gray-600">
          No account needed · Works for high school through PhD
        </p>
      </main>
    );
  }

  // ── Main App Screen ───────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-400 mb-1">M.A.D.E</p>
            <h1 className="text-3xl font-bold">Multi-Agent Decision Engine</h1>
          </div>
          <button
            onClick={() => { setScreen("landing"); setResult(null); setError(""); }}
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
        </div>

        {/* Input card */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Left: form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Your Decision</h2>

              {/* Quick fill */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Quick examples</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex.label}
                      onClick={() => { setQuestion(ex.text); setError(""); }}
                      className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-gray-300 transition hover:bg-white hover:text-black"
                      type="button"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decision Type */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">Decision Type</label>
                <select
                  value={decisionType}
                  onChange={(e) => setDecisionType(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 p-3 text-white outline-none focus:border-cyan-400/50 cursor-pointer"
                >
                  {DECISION_TYPES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Current Stage */}
              <div>
                <label className="mb-3 block text-sm text-gray-400">Current Stage</label>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setStage(s.value)}
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                        stage === s.value
                          ? "bg-cyan-400 text-black border-cyan-400"
                          : "border-white/15 text-gray-300 hover:border-white/40"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Goal */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">Main Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 p-3 text-white outline-none focus:border-cyan-400/50 cursor-pointer"
                >
                  {GOALS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Most Important Value */}
              <div>
                <label className="mb-3 block text-sm text-gray-400">Most Important Value</label>
                <div className="flex flex-wrap gap-2">
                  {VALUES.map((v) => (
                    <button
                      key={v}
                      onClick={() => setValue(v)}
                      type="button"
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition border ${
                        value === v
                          ? "bg-fuchsia-400 text-black border-fuchsia-400"
                          : "border-white/15 text-gray-300 hover:border-white/40"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Level slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm text-gray-400">Stress Level</label>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    stressIndex <= 1
                      ? "bg-green-400/20 text-green-300"
                      : stressIndex === 2
                      ? "bg-amber-400/20 text-amber-300"
                      : "bg-red-400/20 text-red-300"
                  }`}>
                    {STRESS_LABELS[stressIndex]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={stressIndex}
                  onChange={(e) => setStressIndex(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  {STRESS_LABELS.map((l) => (
                    <span key={l} className="text-xs text-gray-600">{l}</span>
                  ))}
                </div>
              </div>

              {/* Decision Question */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">Decision Question</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Example: Should I double major in mathematics and AI, or focus on one and build experience outside class?"
                  className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-zinc-900 p-4 outline-none focus:border-cyan-400/50 resize-none"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
              >
                {loading ? "Analyzing…" : "Analyze Decision →"}
              </button>
            </div>

            {/* Right: profile snapshot */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-fuchsia-500/10 p-6 h-fit lg:sticky lg:top-6">
              <h2 className="mb-5 text-xl font-semibold">Your Profile</h2>
              <div className="space-y-3 text-sm">
                {[
                  ["Decision Type", decisionType],
                  ["Stage", stage],
                  ["Goal", goal],
                  ["Core Value", value],
                  ["Stress", stress],
                ].map(([label, val]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
                    <p className="text-white mt-0.5 font-medium">{val}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-xs text-cyan-200 leading-relaxed">
                  Your profile shapes how each twin weighs your decision. The more specific your question, the sharper the advice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-xl font-semibold text-cyan-200">
              Simulating your three decision twins…
            </p>
            <div className="mt-5 flex justify-center gap-2">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="h-3 w-3 animate-bounce rounded-full bg-cyan-300"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {!loading && result && (
          <>
            {result._demo && (
              <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-200 text-sm">
                ⚡ <strong>Demo mode</strong> — Showing sample data. Add an{" "}
                <code className="rounded bg-black/40 px-1">OPENAI_API_KEY</code>{" "}
                to <code className="rounded bg-black/40 px-1">.env</code> for live results.
              </div>
            )}

            <section className="mb-10">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Twin Analysis</h2>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
                  {result._demo ? "Sample data" : "Live AI analysis"}
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {result.twins?.map((twin) => (
                  <TwinCard
                    key={twin.title}
                    title={twin.title}
                    decision={twin.decision}
                    reasoning={twin.reasoning}
                    biggestConcern={twin.biggest_concern}
                    confidence={twin.confidence}
                  />
                ))}
              </div>
            </section>

            <section className="mb-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 text-2xl font-semibold">Key Conflict</h2>
                <p className="leading-7 text-gray-300">{result.key_conflict}</p>
              </div>
              <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6">
                <h2 className="mb-4 text-2xl font-semibold">Balanced Recommendation</h2>
                <p className="leading-7 text-cyan-50">{result.balanced_recommendation}</p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-6 text-3xl font-bold">Recommended Paths</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {result.recommended_paths?.map((path) => (
                  <div key={path.career} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h3 className="text-xl font-semibold">{path.career}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-300">{path.fit_reason}</p>
                    <div className="mt-5 space-y-2 text-sm">
                      {[
                        ["Difficulty", path.difficulty],
                        ["Time to Enter", path.time_to_enter],
                        ["Growth Outlook", path.growth_outlook],
                      ].map(([label, val]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-gray-400">{label}</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-6 text-3xl font-bold">Salary Projection</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {result.salary_projection?.map((salary) => (
                  <div key={salary.career} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-4 text-xl font-semibold">{salary.career}</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        ["Entry Level", salary.entry_level],
                        ["Mid Career", salary.mid_career],
                        ["Senior Level", salary.senior_level],
                        ["Education", salary.education_needed],
                      ].map(([label, val]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <span className="text-gray-400">{label}</span>
                          <span className="text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-300">
                      {salary.notes}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 text-2xl font-semibold">Skills to Build Next</h2>
                <div className="flex flex-wrap gap-3">
                  {result.skills_to_build_next?.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 text-2xl font-semibold">Next Actions</h2>
                <ul className="space-y-3 text-sm text-gray-300">
                  {result.next_actions?.map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
