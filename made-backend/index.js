const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const USE_OPENAI = true;

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/analyze", async (req, res) => {
  const question = req.body.question || "Default question";

  // Fake JSON for testing
  if (!USE_OPENAI) {
    return res.json({
      twins: [
        { name: "Logical", decision: "Option A", confidence: 80, reasoning: "Reason 1", biggest_concern: "Concern 1" },
        { name: "Emotional", decision: "Option B", confidence: 70, reasoning: "Reason 2", biggest_concern: "Concern 2" },
        { name: "Ambitious", decision: "Option C", confidence: 90, reasoning: "Reason 3", biggest_concern: "Concern 3" }
      ],
      core_conflict: "Stability vs Growth vs Interest",
      best_fit_paths: ["Path 1", "Path 2"],
      recommended_direction: "Option B",
      execution_plan: { now: "Step 1", next: "Step 2", later: "Step 3" },
      tradeoffs: "Tradeoffs summary"
    });
  }

  // Real OpenAI call
  try {
    const prompt = `
    You are M.A.D.E backend.
    Analyze this decision question and return JSON with:
    - twins (Logical, Emotional, Ambitious) with decision, confidence, reasoning, biggest_concern
    - core_conflict
    - best_fit_paths
    - recommended_direction
    - execution_plan (now, next, later)
    - tradeoffs
    Respond ONLY with valid JSON.
    Question: "${question}"
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const output = completion.choices[0].message.content;
    const jsonOutput = JSON.parse(output); // make sure OpenAI returns valid JSON

    res.json(jsonOutput);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI call failed. Check API key or response." });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));