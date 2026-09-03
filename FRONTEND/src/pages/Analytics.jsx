import {
  BarChart3,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

export default function Analytics() {

  return (
    <div>

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Analytics
          </h1>

          <p className="page-description">
            Understand inspection performance,
            risks and compliance trends.
          </p>

        </div>

      </div>


      <div className="stats-grid">

        <Stat
          title="Compliance Score"
          value="—"
        />

        <Stat
          title="Risk Index"
          value="—"
        />

        <Stat
          title="Open Findings"
          value="0"
        />

        <Stat
          title="Actions Closed"
          value="0"
        />

      </div>


      <div className="two-column">

        <ChartCard
          title="Compliance Trend"
          icon={TrendingUp}
        />

        <ChartCard
          title="Risk Distribution"
          icon={ShieldAlert}
        />

      </div>


      <div
        className="card"
        style={{
          marginTop: 18,
        }}
      >

        <div className="empty-state">

          <div className="empty-icon">
            <BarChart3 size={23} />
          </div>

          <strong>
            Analytics will populate automatically
          </strong>

          <p>
            Complete inspections to generate
            meaningful operational metrics.
          </p>

        </div>

      </div>

    </div>
  );
}


function Stat({
  title,
  value,
}) {

  return (
    <div className="stat-card">

      <div className="stat-label">
        {title}
      </div>

      <div className="stat-value">
        {value}
      </div>

    </div>
  );
}


function ChartCard({
  title,
  icon: Icon,
}) {

  return (
    <div className="card card-padding">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        <div>
          <div className="card-title">
            {title}
          </div>

          <div className="card-subtitle">
            Inspection performance data
          </div>
        </div>

        <Icon
          size={18}
          color="#2563eb"
        />

      </div>


      <div
        style={{
          height: 190,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          fontSize: 11,
        }}
      >
        Data will appear after inspections
      </div>

    </div>
  );
}