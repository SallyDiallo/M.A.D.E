import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Mock data — used when OPENAI_API_KEY is missing/invalid or the call fails
// ---------------------------------------------------------------------------
const MOCK_RESULT = {
  twins: [
    {
      title: "Logical Twin",
      decision: "Yes",
      reasoning:
        "The data supports this move. AI/ML roles are growing 35% YoY and command some of the highest starting salaries in tech. Switching now while you still have time to build foundational skills is strategically sound.",
      biggest_concern:
        "You may need 1-2 bridge courses to fill gaps in linear algebra and statistics.",
      confidence: 82,
    },
    {
      title: "Emotional Twin",
      decision: "Maybe",
      reasoning:
        "This is a big identity shift and it's okay to feel uncertain. If biology genuinely excites you, a hybrid path (computational biology, bioinformatics) might let you keep that spark while still entering high-demand territory.",
      biggest_concern:
        "Switching purely for salary without intrinsic interest often leads to burnout within 2-3 years.",
      confidence: 61,
    },
    {
      title: "Ambitious Twin",
      decision: "Absolutely",
      reasoning:
        "AI is the defining field of the next decade. Getting in early puts you ahead of 90% of your peers. The ceiling here — research scientist, AI product lead, founder — is nearly unlimited if you commit fully.",
      biggest_concern:
        "The field is competitive; you'll need projects, not just a degree, to stand out.",
      confidence: 95,
    },
  ],
  key_conflict:
    "The Emotional Twin urges caution about abandoning a genuine passion, while the Ambitious Twin sees an unmissable window. The core tension is between identity alignment and strategic positioning.",
  balanced_recommendation:
    "Pursue AI/ML but explore the intersection with your current major first — bioinformatics or health AI could give you a unique edge most pure CS students lack, while keeping you energized.",
  recommended_paths: [
    {
      career: "Machine Learning Engineer",
      fit_reason:
        "Combines strong math fundamentals from a science background with high-demand engineering skills.",
      difficulty: "High",
      time_to_enter: "1.5 – 2 years",
      growth_outlook: "High",
    },
    {
      career: "Computational Biologist",
      fit_reason:
        "Bridges your biology background with AI/data, a niche with very little competition and strong research funding.",
      difficulty: "Medium",
      time_to_enter: "1 – 1.5 years",
      growth_outlook: "High",
    },
    {
      career: "AI Product Manager",
      fit_reason:
        "Leverages strategic thinking and domain knowledge — no need to be the best coder in the room.",
      difficulty: "Medium",
      time_to_enter: "2 – 3 years",
      growth_outlook: "High",
    },
  ],
  salary_projection: [
    {
      career: "Machine Learning Engineer",
      entry_level: "$110k – $140k",
      mid_career: "$160k – $200k",
      senior_level: "$220k – $350k+",
      education_needed: "BS required, MS strongly preferred",
      notes:
        "FAANG and AI-native startups pay significantly above these ranges. Strong portfolio can substitute for advanced degree.",
    },
    {
      career: "Computational Biologist",
      entry_level: "$75k – $100k",
      mid_career: "$110k – $150k",
      senior_level: "$150k – $220k",
      education_needed: "BS minimum, PhD common for research roles",
      notes:
        "Pharma and biotech are the top payers. NIH-funded academic roles pay less but offer more flexibility.",
    },
  ],
  skills_to_build_next: [
    "Python (NumPy, Pandas, PyTorch)",
    "Linear Algebra & Probability",
    "SQL & Data Wrangling",
    "Git & Version Control",
    "Personal Project Portfolio",
  ],
  next_actions: [
    "Enroll in fast.ai or Andrew Ng's ML Specialization this semester",
    "Build one end-to-end project combining biology data + ML within 60 days",
    "Talk to 3 people currently working in AI — LinkedIn cold outreach works",
    "Map out which of your current courses count toward a CS minor or AI certificate",
  ],
};

// ---------------------------------------------------------------------------
// Actual API handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { decision_type, goal, value, stress, stage, question } = body;

  if (!question || typeof question !== "string" || !question.trim()) {
    return NextResponse.json(
      { error: "A decision question is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // ── Demo / fallback mode ────────────────────────────────────────────────
  if (!apiKey || apiKey.trim() === "" || apiKey === "your-key-here") {
    console.warn("[M.A.D.E] No valid OPENAI_API_KEY — returning demo data.");
    return NextResponse.json({ ...MOCK_RESULT, _demo: true });
  }

  // ── Live OpenAI call ────────────────────────────────────────────────────
  const prompt = `You are M.A.D.E. (Multi-Agent Decision Engine), an advanced AI-powered academic and career advising system.

Your purpose is to help students make informed academic and professional decisions by simulating three internal perspectives and generating a personalized pathway.

SYSTEM BEHAVIOR:
You must simulate THREE distinct versions of the same person:

1. Logical Twin — prioritizes practicality, financial stability, evidence, and long-term strategy
2. Emotional Twin — prioritizes mental well-being, fulfillment, stress levels, and personal alignment
3. Ambitious Twin — prioritizes growth, prestige, high income, and long-term success

USER PROFILE INPUT:
- Decision Type: ${decision_type || "Career"}
- Main Goal: ${goal || "Not specified"}
- Most Important Value Right Now: ${value || "Not specified"}
- Stress Level: ${stress || "Medium"}
- Current Stage: ${stage || "Undergraduate"}
- Decision Question: ${question}

Return ONLY valid JSON. No markdown. No backticks. No explanation outside the JSON.

Use this exact shape:
{
  "twins": [
    { "title": "Logical Twin", "decision": "Yes|No|Maybe|Absolutely", "reasoning": "2-3 sentences", "biggest_concern": "1 sentence", "confidence": 0 },
    { "title": "Emotional Twin", "decision": "Yes|No|Maybe|Absolutely", "reasoning": "2-3 sentences", "biggest_concern": "1 sentence", "confidence": 0 },
    { "title": "Ambitious Twin", "decision": "Yes|No|Maybe|Absolutely", "reasoning": "2-3 sentences", "biggest_concern": "1 sentence", "confidence": 0 }
  ],
  "key_conflict": "1-2 sentences",
  "balanced_recommendation": "1-2 sentences",
  "recommended_paths": [
    { "career": "Name", "fit_reason": "Why", "difficulty": "Low|Medium|High", "time_to_enter": "X years", "growth_outlook": "Low|Medium|High" },
    { "career": "Name", "fit_reason": "Why", "difficulty": "Low|Medium|High", "time_to_enter": "X years", "growth_outlook": "Low|Medium|High" },
    { "career": "Name", "fit_reason": "Why", "difficulty": "Low|Medium|High", "time_to_enter": "X years", "growth_outlook": "Low|Medium|High" }
  ],
  "salary_projection": [
    { "career": "Name", "entry_level": "range", "mid_career": "range", "senior_level": "range", "education_needed": "degree", "notes": "insight" },
    { "career": "Name", "entry_level": "range", "mid_career": "range", "senior_level": "range", "education_needed": "degree", "notes": "insight" }
  ],
  "skills_to_build_next": ["Skill 1","Skill 2","Skill 3","Skill 4","Skill 5"],
  "next_actions": ["Action 1","Action 2","Action 3","Action 4"]
}

Rules: concise, practical, non-repetitive across twins, confidence 0-100, exactly 3 paths, 2 salary entries, valid JSON only.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "unknown");
      console.error("[M.A.D.E] OpenAI error:", response.status, errText);
      // Fall back to demo data on API error
      return NextResponse.json({ ...MOCK_RESULT, _demo: true });
    }

    const data = await response.json();
    const raw = (data.choices?.[0]?.message?.content ?? "").trim();

    if (!raw) {
      return NextResponse.json({ ...MOCK_RESULT, _demo: true });
    }

    // Strip markdown fences if present
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Try to extract JSON object
      const first = cleaned.indexOf("{");
      const last = cleaned.lastIndexOf("}");
      if (first !== -1 && last > first) {
        parsed = JSON.parse(cleaned.slice(first, last + 1));
      } else {
        return NextResponse.json({ ...MOCK_RESULT, _demo: true });
      }
    }

    if (!parsed?.twins || !Array.isArray(parsed.twins)) {
      return NextResponse.json({ ...MOCK_RESULT, _demo: true });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[M.A.D.E] Unexpected error:", err);
    return NextResponse.json({ ...MOCK_RESULT, _demo: true });
  }
}
