import {
  SearchCheck,
  Filter,
} from "lucide-react";

import FindingCard from "../components/FindingCard";

export default function Findings() {

  const findings = [];

  return (
    <div>

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Findings
          </h1>

          <p className="page-description">
            Identify and track inspection findings.
          </p>

        </div>

        <button className="btn btn-secondary">
          <Filter size={14} />
          Filters
        </button>

      </div>


      <div className="stats-grid">

        <Mini title="Critical" value="0" />

        <Mini title="High" value="0" />

        <Mini title="Medium" value="0" />

        <Mini title="Low" value="0" />

      </div>


      <div
        style={{
          marginTop: 18,
        }}
      >

        {findings.length === 0 ? (

          <div className="card empty-state">

            <div className="empty-icon">
              <SearchCheck size={23} />
            </div>

            <strong>
              No findings
            </strong>

            <p>
              AI-generated and manually identified
              findings will appear here.
            </p>

          </div>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(300px,1fr))",
              gap: 15,
            }}
          >

            {findings.map(
              (finding) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                />
              )
            )}

          </div>

        )}

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