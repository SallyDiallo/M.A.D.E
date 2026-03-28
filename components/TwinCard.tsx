type TwinCardProps = {
  title: string;
  decision: string;
  reasoning: string;
  biggestConcern: string;
  confidence: number;
};

export default function TwinCard({
  title,
  decision,
  reasoning,
  biggestConcern,
  confidence,
}: TwinCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
          {decision}
        </span>
      </div>

      <p className="mb-4 text-sm leading-7 text-gray-300">{reasoning}</p>

      <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
        <p className="text-sm text-gray-400">Biggest concern</p>
        <p className="mt-1 text-sm text-white">{biggestConcern}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-400">Confidence</span>
          <span>{confidence}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/10">
          <div
            className="h-3 rounded-full bg-cyan-300"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}