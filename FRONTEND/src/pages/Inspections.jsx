import {
  ClipboardCheck,
  Plus,
  Calendar,
  MapPin,
} from "lucide-react";

import RiskBadge from "../components/RiskBadge";

export default function Inspections() {

  return (
    <div>

      <div className="page-header">

        <div>
          <h1 className="page-title">
            Inspections
          </h1>

          <p className="page-description">
            Manage inspection activities and
            compliance assessments.
          </p>
        </div>

        <button className="btn btn-primary">
          <Plus size={14} />
          New Inspection
        </button>

      </div>


      <div className="stats-grid">

        <Mini
          title="Total Inspections"
          value="0"
        />

        <Mini
          title="In Progress"
          value="0"
        />

        <Mini
          title="Completed"
          value="0"
        />

        <Mini
          title="At Risk"
          value="0"
        />

      </div>


      <div
        className="card"
        style={{ marginTop: 18 }}
      >

        <div className="card-padding">

          <div className="card-title">
            Inspection Register
          </div>

          <div className="card-subtitle">
            All inspection activities
          </div>

        </div>


        <div className="empty-state">

          <div className="empty-icon">
            <ClipboardCheck size={23} />
          </div>

          <strong>
            No inspections created
          </strong>

          <p>
            Create an inspection to begin
            tracking findings and compliance.
          </p>

        </div>

      </div>

    </div>
  );
}


function Mini({
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