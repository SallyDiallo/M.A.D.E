type TwinCardProps = {
  title: string;
  decision: string;
  reasoning: string;
  biggestConcern: string;
  confidence: number;
};

const TWIN_COLORS: Record<string, string> = {
  "Logical Twin": "from-blue-500/20 to-blue-900/10 border-blue-400/30",
  "Emotional Twin": "from-fuchsia-500/20 to-fuchsia-900/10 border-fuchsia-400/30",
  "Ambitious Twin": "from-amber-500/20 to-amber-900/10 border-amber-400/30",
};

const TWIN_BADGE: Record<string, string> = {
  "Logical Twin": "bg-blue-400 text-blue-950",
  "Emotional Twin": "bg-fuchsia-400 text-fuchsia-950",
  "Ambitious Twin": "bg-amber-400 text-amber-950",
};

const TWIN_BAR: Record<string, string> = {
  "Logical Twin": "bg-blue-400",
  "Emotional Twin": "bg-fuchsia-400",
  "Ambitious Twin": "bg-amber-400",
};

export default function TwinCard({
  title,
  decision,
  reasoning,
  biggestConcern,
  confidence,
}: TwinCardProps) {
  const gradient = TWIN_COLORS[title] ?? "from-white/5 to-white/5 border-white/10";
  const badge = TWIN_BADGE[title] ?? "bg-white text-black";
  const bar = TWIN_BAR[title] ?? "bg-cyan-300";

  return (
    <div
      className={`rounded-3xl border bg-gradient-to-br ${gradient} p-6 shadow-xl`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badge}`}
        >
          {decision}
        </span>
      </div>

      <p className="mb-4 text-sm leading-7 text-gray-300">{reasoning}</p>

      <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Biggest concern
        </p>
        <p className="mt-1 text-sm text-white">{biggestConcern}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-400">Confidence</span>
          <span className="font-semibold">{confidence}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${bar}`}
            style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
