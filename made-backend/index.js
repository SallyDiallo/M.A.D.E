// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cohere = require("cohere-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

cohere.init(process.env.COHERE_API_KEY);

app.post("/analyze", async (req, res) => {
  const question = req.body.question || "Default question";

  try {
    const prompt = `
You are a career and academic advisor AI.
Analyze the following decision question and return a JSON object with:

- twins: Logical, Emotional, Ambitious (each with title, decision, reasoning, biggest_concern, confidence)
- best_fit_paths: array of { career, fit_reason, difficulty, time_to_enter, growth_outlook }
- salary_projection: array of { career, entry_level, mid_career, senior_level, education_needed, notes }

Respond **ONLY** with valid JSON. Do NOT include any extra text.
Question: "${question}"
`;

    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt,
      max_tokens: 600,
      temperature: 0.7,
      stop_sequences: ["\n\n"]
    });

    const outputText = response.body.generations[0].text;

    // Try parsing AI output into JSON
    let jsonOutput;
    try {
      jsonOutput = JSON.parse(outputText);
    } catch {
      return res.status(500).json({ error: "AI returned invalid JSON", raw: outputText });
    }

    res.json(jsonOutput);

  } catch (err) {
    console.error("AI request failed", err);
    res.status(500).json({ error: "Cohere API call failed", details: err.message });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));