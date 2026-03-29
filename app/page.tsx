"use client";

import axios from "axios";
import { useState } from "react";
import TwinCard from "@/components/TwinCard";

type Twin = { title: string; decision: string; reasoning: string; biggest_concern: string; confidence: number; };
type CareerPath = { career: string; fit_reason: string; difficulty: string; time_to_enter: string; growth_outlook: string; };
type SalaryProjection = { career: string; entry_level: string; mid_career: string; senior_level: string; education_needed: string; notes: string; };

export default function Home() {
  const [question, setQuestion] = useState("");
  const [decisionType, setDecisionType] = useState("Career");
  const [goal, setGoal] = useState("Financial stability and long-term success");
  const [value, setValue] = useState("Growth");
  const [stress, setStress] = useState("Medium");
  const [stage, setStage] = useState("Undergraduate");

  const [twins, setTwins] = useState<Twin[]>([]);
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [salaries, setSalaries] = useState<SalaryProjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fillExample = (text: string) => setQuestion(text);

  const handleAnalyze = async () => {
  setLoading(true);
  setShowResults(false);

  try {
    const res = await axios.post("http://localhost:5000/analyze", { question });
    console.log("AI response:", res.data); // Debugging

    const data = res.data;

    setTwins(data.twins || []);
    setPaths(data.best_fit_paths || []);
    setSalaries(data.salary_projection || []);

  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("AI request failed:", err.response?.data || err.message);
      alert("AI request failed: " + (err.response?.data?.error || err.message));
    } else {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err);
    }
  } finally {
    setLoading(false);
    setShowResults(true);
  }
};

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">M.A.D.E</p>
              <h1 className="text-4xl font-bold md:text-6xl">Multi-Agent Decision Engine</h1>
              <p className="mt-4 max-w-3xl text-base text-gray-300 md:text-lg">
                AI-powered academic and career advising experience simulating three perspectives.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              Personalized pathways • Salary outlook • Clear next steps
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <h2 className="mb-4 text-2xl font-semibold">Decision Input</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">Decision Type</label>
                  <input value={decisionType} onChange={(e)=>setDecisionType(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-300">Stage</label>
                  <input value={stage} onChange={(e)=>setStage(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-300">Main Goal</label>
                  <input value={goal} onChange={(e)=>setGoal(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-300">Core Value</label>
                  <input value={value} onChange={(e)=>setValue(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-gray-300">Stress Level</label>
                  <input value={stress} onChange={(e)=>setStress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none" />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm text-gray-300">Decision Question</label>
                <textarea value={question} onChange={(e)=>setQuestion(e.target.value)}
                  placeholder="Type your decision question here"
                  className="min-h-[160px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none" />
              </div>

              <button onClick={handleAnalyze}
                className="mt-5 w-full rounded-2xl bg-white py-4 text-lg font-semibold text-black transition hover:scale-[1.01]">
                Analyze Decision
              </button>
            </div>

            {/* Profile Snapshot */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-fuchsia-500/10 p-6">
              <h2 className="mb-4 text-2xl font-semibold">Profile Snapshot</h2>
              <div className="space-y-3 text-sm text-gray-200">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">Decision Type: {decisionType}</div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">Stage: {stage}</div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">Main Goal: {goal}</div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">Core Value: {value}</div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">Stress Level: {stress}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && <p className="text-cyan-300 mb-4 text-lg">Analyzing with AI...</p>}

        {/* AI Results */}
        {showResults && (
          <>
            {/* Twin Analysis */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Twin Analysis</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {twins.map((twin) => (
                  <div key={twin.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
                    <h3 className="text-xl font-semibold">{twin.title} - {twin.decision}</h3>
                    <p className="text-gray-300 mt-2">{twin.reasoning}</p>
                    <p className="text-sm text-gray-400 mt-1">Concern: {twin.biggest_concern}</p>
                    <p className="text-sm text-gray-400 mt-1">Confidence: {twin.confidence}%</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Paths */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Recommended Paths</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {paths.map((path) => (
                  <div key={path.career} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h3 className="text-xl font-semibold">{path.career}</h3>
                    <p className="text-gray-300 mt-2">{path.fit_reason}</p>
                    <p className="text-sm text-gray-400">Difficulty: {path.difficulty}</p>
                    <p className="text-sm text-gray-400">Time to Enter: {path.time_to_enter}</p>
                    <p className="text-sm text-gray-400">Growth Outlook: {path.growth_outlook}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Salary Projection */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Salary Projection</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {salaries.map((s) => (
                  <div key={s.career} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h3 className="text-xl font-semibold">{s.career}</h3>
                    <p className="text-gray-300 mt-2">Entry: {s.entry_level}, Mid: {s.mid_career}, Senior: {s.senior_level}</p>
                    <p className="text-sm text-gray-400">Education: {s.education_needed}</p>
                    <p className="text-gray-300 mt-2">{s.notes}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}