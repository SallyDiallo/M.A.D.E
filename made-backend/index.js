const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/analyze", async (req, res) => {
  // Temporary fake JSON for frontend testing
  res.json({
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
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));