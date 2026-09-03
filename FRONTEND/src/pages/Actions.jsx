import {
  ListChecks,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function Actions() {

  return (
    <div>

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Corrective Actions
          </h1>

          <p className="page-description">
            Track remediation and corrective work.
          </p>

        </div>

        <button className="btn btn-primary">
          <Plus size={14} />
          New Action
        </button>

      </div>


      <div className="stats-grid">

        <Stat
          icon={ListChecks}
          title="Total Actions"
          value="0"
        />

        <Stat
          icon={Clock}
          title="Pending"
          value="0"
        />

        <Stat
          icon={CheckCircle2}
          title="Completed"
          value="0"
        />

        <Stat
          icon={Clock}
          title="Overdue"
          value="0"
        />

      </div>


      <div
        className="card empty-state"
        style={{
          marginTop: 18,
        }}
      >

        <div className="empty-icon">
          <ListChecks size={23} />
        </div>

        <strong>
          No corrective actions
        </strong>

        <p>
          Actions created from inspection findings
          will appear here.
        </p>

      </div>

    </div>
  );
}


function Stat({
  icon: Icon,
  title,
  value,
}) {

  return (
    <div className="stat-card">

      <div className="stat-top">

        <div>
          <div className="stat-label">
            {title}
          </div>

          <div className="stat-value">
            {value}
          </div>
        </div>

        <div className="stat-icon">
          <Icon size={18} />
        </div>

      </div>

    </div>
  );
}