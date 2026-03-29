const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const OpenAI = require("openai");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in .env file");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "M.A.D.E backend is running",
  });
});

app.post("/api/decision", async (req, res) => {
  const { decision_type, goal, value, stress, stage, question } = req.body;

  if (!question || typeof question !== "string" || question.trim() === "") {
    return res.status(400).json({
      error: "A decision question is required.",
    });
  }

  const prompt = `
You are M.A.D.E. (Multi-Agent Decision Engine), an advanced AI-powered academic and career advising system.

Your purpose is to help students make informed academic and professional decisions by simulating three internal perspectives and generating a personalized pathway.

SYSTEM BEHAVIOR:
You must simulate THREE distinct versions of the same person:

1. Logical Twin
- prioritizes practicality, financial stability, evidence, and long-term strategy
- focuses on job security, return on investment, and realistic outcomes

2. Emotional Twin
- prioritizes mental well-being, fulfillment, stress levels, and personal alignment
- focuses on happiness, sustainability, and avoiding burnout

3. Ambitious Twin
- prioritizes growth, prestige, high income, and long-term success
- focuses on bold decisions, competitive advantage, and maximizing upside

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
    {
      "title": "Logical Twin",
      "decision": "Yes | No | Maybe | Absolutely",
      "reasoning": "2-3 sentences",
      "biggest_concern": "1 sentence",
      "confidence": 0
    },
    {
      "title": "Emotional Twin",
      "decision": "Yes | No | Maybe | Absolutely",
      "reasoning": "2-3 sentences",
      "biggest_concern": "1 sentence",
      "confidence": 0
    },
    {
      "title": "Ambitious Twin",
      "decision": "Yes | No | Maybe | Absolutely",
      "reasoning": "2-3 sentences",
      "biggest_concern": "1 sentence",
      "confidence": 0
    }
  ],
  "key_conflict": "1-2 sentences explaining disagreement",
  "balanced_recommendation": "1-2 sentences balancing logic, emotion, and ambition",
  "recommended_paths": [
    {
      "career": "Career Name",
      "fit_reason": "Why this fits the user",
      "difficulty": "Low | Medium | High",
      "time_to_enter": "Estimated time",
      "growth_outlook": "Low | Medium | High"
    },
    {
      "career": "Career Name",
      "fit_reason": "Why this fits the user",
      "difficulty": "Low | Medium | High",
      "time_to_enter": "Estimated time",
      "growth_outlook": "Low | Medium | High"
    },
    {
      "career": "Career Name",
      "fit_reason": "Why this fits the user",
      "difficulty": "Low | Medium | High",
      "time_to_enter": "Estimated time",
      "growth_outlook": "Low | Medium | High"
    }
  ],
  "salary_projection": [
    {
      "career": "Career Name",
      "entry_level": "range",
      "mid_career": "range",
      "senior_level": "range",
      "education_needed": "degree requirements",
      "notes": "brief insight"
    },
    {
      "career": "Career Name",
      "entry_level": "range",
      "mid_career": "range",
      "senior_level": "range",
      "education_needed": "degree requirements",
      "notes": "brief insight"
    }
  ],
  "skills_to_build_next": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5"
  ],
  "next_actions": [
    "Immediate action 1",
    "Immediate action 2",
    "Immediate action 3",
    "Immediate action 4"
  ]
}

Rules:
- Keep responses concise, clear, and practical
- Do NOT repeat the same reasoning across twins
- Make recommendations specific and actionable
- Tailor advice to the student's stage
- Keep salary ranges realistic
- Confidence must be a number from 0 to 100
- Return exactly 3 recommended_paths
- Return 2 salary_projection entries
- Respond with valid JSON only
`;

  try {
    const response = await client.responses.create({
      model: "gpt-5.4",
      input: prompt,
    });

    const raw = (response.output_text || "").trim();

    if (!raw) {
      return res.status(500).json({
        error: "Model returned an empty response.",
      });
    }

    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
        return res.status(500).json({
          error: "Model did not return valid JSON.",
          raw: cleaned,
        });
      }

      const jsonSlice = cleaned.slice(firstBrace, lastBrace + 1);
      parsed = JSON.parse(jsonSlice);
    }

    if (!parsed || typeof parsed !== "object") {
      return res.status(500).json({
        error: "Parsed response is not a valid object.",
      });
    }

    if (!Array.isArray(parsed.twins)) {
      return res.status(500).json({
        error: "Response is missing twins array.",
      });
    }

    res.json(parsed);
  } catch (error) {
    console.error("OpenAI API error:", error);

    res.status(500).json({
      error: "Failed to analyze decision. Check your OpenAI API key or try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`M.A.D.E backend running on http://localhost:${PORT}`);
});