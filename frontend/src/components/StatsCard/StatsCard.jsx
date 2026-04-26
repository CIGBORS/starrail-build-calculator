import { Stts } from "../../../../shared/variables";

export default function StatsCard({ stats }) {
  const summaryStats = Object.values(Stts).filter(
    (stat) => stat.Summary !== undefined,
  );

  return (
    <div className="stats-summary-card">
      {summaryStats.map((stat, index) => (
        <p key={index}>
          {stat.Summary}: {stats?.[stat.field] ?? 0}
          {stat.percent ? "%" : ""}
        </p>
      ))}
    </div>
  );
}
