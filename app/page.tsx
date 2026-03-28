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

const mockTwins: Twin[] = [
  {
    title: "Logical Twin",
    decision: "Maybe",
    reasoning:
      "This path makes sense if it improves long-term job stability and gives a strong return on investment. It is worth pursuing, but only if the cost, workload, and timeline stay realistic.",
    biggest_concern: "The biggest risk is spending time and money on a path that does not clearly improve outcomes.",
    confidence: 84,
  },
  {
    title: "Emotional Twin",
    decision: "Yes",
    reasoning:
      "This option feels more aligned with personal fulfillment and long-term happiness. It seems more sustainable if it reduces burnout and helps the student stay motivated.",
    biggest_concern: "The biggest concern is choosing something impressive on paper that becomes emotionally draining in real life.",
    confidence: 79,
  },
  {
    title: "Ambitious Twin",
    decision: "Absolutely",
    reasoning:
      "This choice creates stronger momentum, opens more competitive opportunities, and increases future upside. It is the kind of move that can compound into bigger wins over time.",
    biggest_concern: "The biggest concern is thinking too small and missing a higher-upside opportunity.",
    confidence: 91,
  },
];

const mockPaths: CareerPath[] = [
  {
    career: "AI Product Manager",
    fit_reason:
      "Blends strategy, technology, and user-centered thinking. Great for someone who likes decisions, leadership, and innovation.",
    difficulty: "Medium",
    time_to_enter: "2-4 years",
    growth_outlook: "High",
  },
  {
    career: "Data Scientist",
    fit_reason:
      "Strong fit for analytical students who enjoy problem-solving, research, and technical work with real-world impact.",
    difficulty: "High",
    time_to_enter: "2-5 years",
    growth_outlook: "High",
  },
  {
    career: "UX Researcher",
    fit_reason:
      "Good for students who care about people, behavior, and building tools that actually help users.",
    difficulty: "Medium",
    time_to_enter: "1-3 years",
    growth_outlook: "Medium",
  },
];

const mockSalaries: SalaryProjection[] = [
  {
    career: "AI Product Manager",
    entry_level: "$85k-$115k",
    mid_career: "$120k-$165k",
    senior_level: "$170k-$240k+",
    education_needed: "Bachelor's; master's can help",
    notes: "Strong path for leadership, product thinking, and tech strategy.",
  },
  {
    career: "Data Scientist",
    entry_level: "$80k-$110k",
    mid_career: "$115k-$155k",
    senior_level: "$160k-$220k+",
    education_needed: "Bachelor's; master's often preferred",
    notes: "Best fit if the student enjoys math, models, and analysis.",
  },
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [decisionType, setDecisionType] = useState("Career");
  const [goal, setGoal] = useState("Financial stability and long-term success");
  const [value, setValue] = useState("Growth");
  const [stress, setStress] = useState("Medium");
  const [stage, setStage] = useState("Undergraduate");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fillExample = (text: string) => {
    setQuestion(text);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
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
                    fillExample("Should I take a high-paying internship or stay focused on research?")
                  }
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition hover:bg-white hover:text-black"
                >
                  Internship decision
                </button>
                <button
                  onClick={() =>
                    fillExample("Should I go straight into graduate school after undergrad?")
                  }
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition hover:bg-white hover:text-black"
                >
                  Graduate school
                </button>
              </div>

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

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-sm text-cyan-100">
                  This section can later become a real student profile tied to
                  academic stage, budget, salary goals, interests, and
                  lifestyle preferences.
                </p>
              </div>
            </div>
          </div>
        </div>

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

        {showResults && (
          <>
            <section className="mb-10">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Twin Analysis</h2>
                <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300">
                  Mock frontend preview
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {mockTwins.map((twin) => (
                  <div
                    key={twin.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold">{twin.title}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
                        {twin.decision}
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-7 text-gray-300">
                      {twin.reasoning}
                    </p>

                    <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-gray-400">Biggest concern</p>
                      <p className="mt-1 text-sm text-white">
                        {twin.biggest_concern}
                      </p>
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

            <section className="mb-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 text-2xl font-semibold">Key Conflict</h2>
                <p className="text-gray-300 leading-7">
                  The main disagreement is between safety and upside. The
                  logical side wants proof and stability, the emotional side
                  wants peace and sustainability, while the ambitious side wants
                  the path with the highest future ceiling.
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6">
                <h2 className="mb-4 text-2xl font-semibold">
                  Balanced Recommendation
                </h2>
                <p className="leading-7 text-cyan-50">
                  Choose the path that creates strong long-term opportunity
                  without overwhelming your current capacity. A smart next move
                  is to test the ambitious option in a lower-risk way through a
                  project, internship, or trial semester before fully
                  committing.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-6 text-3xl font-bold">Recommended Paths</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {mockPaths.map((path) => (
                  <div
                    key={path.career}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <h3 className="text-xl font-semibold">{path.career}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-300">
                      {path.fit_reason}
                    </p>

                    <div className="mt-5 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Difficulty</span>
                        <span>{path.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time to Enter</span>
                        <span>{path.time_to_enter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Outlook</span>
                        <span>{path.growth_outlook}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-6 text-3xl font-bold">Salary Projection</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {mockSalaries.map((salary) => (
                  <div
                    key={salary.career}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <h3 className="mb-4 text-xl font-semibold">
                      {salary.career}
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Entry Level</span>
                        <span>{salary.entry_level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mid Career</span>
                        <span>{salary.mid_career}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Senior Level</span>
                        <span>{salary.senior_level}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">Education</span>
                        <span className="text-right">
                          {salary.education_needed}
                        </span>
                      </div>
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
                <h2 className="mb-4 text-2xl font-semibold">
                  Skills to Build Next
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Communication",
                    "Data Analysis",
                    "AI Literacy",
                    "Leadership",
                    "Product Thinking",
                    "Networking",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 text-2xl font-semibold">Next Actions</h2>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>• Compare 2-3 possible paths based on cost, timeline, and salary ceiling.</li>
                  <li>• Talk to one student or professional already in the field.</li>
                  <li>• Try one low-risk experiment such as a project, club, or internship.</li>
                  <li>• Re-run the decision after gathering more evidence.</li>
                </ul>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}