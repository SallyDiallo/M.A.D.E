"use client";

import TwinCard from "@/components/TwinCard";
import { useState } from "react";
import axios from "axios";

type Twin = {
  name: string;
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

export default function Home() {
  // Input states
  const [decisionType, setDecisionType] = useState("Career");
  const [stage, setStage] = useState("Undergraduate");
  const [goal, setGoal] = useState("Financial stability and long-term success");
  const [value, setValue] = useState("Growth");
  const [stress, setStress] = useState("Medium");
  const [question, setQuestion] = useState("");

  // Output states (from backend)
  const [twins, setTwins] = useState<Twin[]>([]);
  const [coreConflict, setCoreConflict] = useState("");
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [recommendedDirection, setRecommendedDirection] = useState("");
  const [executionPlan, setExecutionPlan] = useState<any>({});
  const [tradeoffs, setTradeoffs] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fillExample = (text: string) => {
    setQuestion(text);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setShowResults(false);

    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        question,
        decisionType,
        stage,
        goal,
        value,
        stress,
      });

      const data = response.data;

      // Fill frontend states with backend data
      setTwins(data.twins || []);
      setCoreConflict(data.core_conflict || "");
      setPaths(data.best_fit_paths || []);
      setRecommendedDirection(data.recommended_direction || "");
      setExecutionPlan(data.execution_plan || {});
      setTradeoffs(data.tradeoffs || "");

      setShowResults(true);
    } catch (err) {
      console.error("Error calling backend:", err);
      alert("Something went wrong. Check backend or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
                M.A.D.E
              </p>
              <h1 className="text-4xl font-bold md:text-6xl">
                Multi-Agent Decision Engine
              </h1>
              <p className="mt-4 max-w-3xl text-base text-gray-300 md:text-lg">
                An AI-powered academic and career advising experience that
                simulates three internal perspectives to help students make
                smarter decisions.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              Personalized pathways • Salary outlook • Clear next steps
            </div>
          </div>

          {/* Decision Input */}
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <h2 className="mb-4 text-2xl font-semibold">Decision Input</h2>
              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    fillExample("Should I switch from biology to AI?")
                  }
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition hover:bg-white hover:text-black"
                >
                  Major switch
                </button>
                <button
                  onClick={() =>
                    fillExample(
                      "Should I take a high-paying internship or stay focused on research?"
                    )
                  }
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition hover:bg-white hover:text-black"
                >
                  Internship decision
                </button>
                <button
                  onClick={() =>
                    fillExample(
                      "Should I go straight into graduate school after undergrad?"
                    )
                  }
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition hover:bg-white hover:text-black"
                >
                  Graduate school
                </button>
              </div>

              {/* Inputs */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Decision Type
                  </label>
                  <input
                    value={decisionType}
                    onChange={(e) => setDecisionType(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Current Stage
                  </label>
                  <input
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Main Goal
                  </label>
                  <input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Most Important Value
                  </label>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-gray-300">
                    Stress Level
                  </label>
                  <input
                    value={stress}
                    onChange={(e) => setStress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm text-gray-300">
                  Decision Question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Example: Should I double major in mathematics and AI, or focus on one and build experience outside class?"
                  className="min-h-[160px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
                />
              </div>

              <button
                onClick={handleAnalyze}
                className="mt-5 w-full rounded-2xl bg-white py-4 text-lg font-semibold text-black transition hover:scale-[1.01]"
              >
                Analyze Decision
              </button>
            </div>

            {/* Profile Snapshot */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-fuchsia-500/10 p-6">
              <h2 className="mb-4 text-2xl font-semibold">Profile Snapshot</h2>

              <div className="space-y-3 text-sm text-gray-200">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <span className="text-gray-400">Decision Type:</span>{" "}
                  {decisionType}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <span className="text-gray-400">Stage:</span> {stage}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <span className="text-gray-400">Main Goal:</span> {goal}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <span className="text-gray-400">Core Value:</span> {value}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <span className="text-gray-400">Stress Level:</span> {stress}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-xl font-semibold text-cyan-200">
              M.A.D.E is simulating your three internal decision twins...
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-300" />
              <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-300 [animation-delay:150ms]" />
              <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-300 [animation-delay:300ms]" />
            </div>
          </section>
        )}

        {/* Results */}
        {showResults && (
          <section className="mb-10">
            <h2 className="mb-6 text-3xl font-bold">Twin Analysis</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {twins.map((twin) => (
                <div
                  key={twin.name}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold">{twin.name}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
                      {twin.decision}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-7 text-gray-300">
                    {twin.reasoning}
                  </p>

                  <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-gray-400">Biggest concern</p>
                    <p className="mt-1 text-sm text-white">{twin.biggest_concern}</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-400">Confidence</span>
                      <span>{twin.confidence}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-white/10">
                      <div
                        className="h-3 rounded-full bg-cyan-300"
                        style={{ width: `${twin.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}