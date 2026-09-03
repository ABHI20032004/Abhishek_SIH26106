import {
  FileText,
  ClipboardCheck,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import { getDocuments } from "../services/api";

export default function Dashboard() {

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getDocuments()
      .then((data) => {
        setDocuments(
          data.documents || []
        );
      })
      .catch(console.error)
      .finally(() =>
        setLoading(false)
      );

  }, []);


  const pages =
    documents.reduce(
      (sum, item) =>
        sum + (item.pages || 0),
      0
    );

  const chunks =
    documents.reduce(
      (sum, item) =>
        sum + (item.chunks || 0),
      0
    );


  return (
    <div>

      <div className="hero">

        <div className="hero-label">
          OFFLINE INDUSTRIAL INSPECTION INTELLIGENCE
        </div>

        <div className="hero-title">
          Inspection intelligence,
          <br />
          running entirely on your system.
        </div>

        <div className="hero-description">
          InspectAI combines local AI, document
          intelligence and inspection workflows
          to help teams identify risks, analyze
          evidence and manage corrective actions
          without sending sensitive data to the cloud.
        </div>

      </div>


      <div className="stats-grid">

        <StatCard
          title="Documents"
          value={documents.length}
          description="Indexed locally"
          icon={FileText}
        />

        <StatCard
          title="Inspections"
          value="0"
          description="Ready to create"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Open Findings"
          value="0"
          description="No findings yet"
          icon={AlertTriangle}
          color="orange"
        />

        <StatCard
          title="Critical Risks"
          value="0"
          description="Requires attention"
          icon={ShieldAlert}
          color="red"
        />

      </div>


      <div className="two-column">

        <div className="card">

          <div className="card-padding">

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >

              <div>
                <div className="card-title">
                  Knowledge Base
                </div>

                <div className="card-subtitle">
                  Local document intelligence
                </div>
              </div>

              <FileText
                size={18}
                color="#2563eb"
              />

            </div>


            <div
              style={{
                marginTop: 25,
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
                gap: 15,
              }}
            >

              <Metric
                label="Indexed Pages"
                value={pages}
              />

              <Metric
                label="AI Chunks"
                value={chunks}
              />

            </div>

          </div>

        </div>


        <div className="card">

          <div className="card-padding">

            <div className="card-title">
              System Status
            </div>

            <div className="card-subtitle">
              Local services
            </div>


            <div
              style={{
                marginTop: 18,
                display: "grid",
                gap: 10,
              }}
            >

              <System
                name="FastAPI"
                status="Online"
              />

              <System
                name="SQLite"
                status="Connected"
              />

              <System
                name="ChromaDB"
                status="Connected"
              />

              <System
                name="Ollama"
                status="Online"
              />

            </div>

          </div>

        </div>

      </div>


      <div
        className="card"
        style={{
          marginTop: 18,
        }}
      >

        <div className="card-padding">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <div>
              <div className="card-title">
                Recent Documents
              </div>

              <div className="card-subtitle">
                Latest indexed inspection documents
              </div>
            </div>

            <a
              href="/documents"
              style={{
                color: "#2563eb",
                fontSize: 11,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View all <ArrowRight size={12} />
            </a>

          </div>


          {loading ? (

            <div className="empty-state">
              Loading documents...
            </div>

          ) : documents.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                <FileText size={22} />
              </div>

              <strong>
                No inspection documents
              </strong>

              <p>
                Upload your first PDF to start.
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table className="data-table">

                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Pages</th>
                    <th>Chunks</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {documents
                    .slice(0, 5)
                    .map((doc) => (

                      <tr key={doc.id}>

                        <td>
                          <strong>
                            {doc.filename}
                          </strong>
                        </td>

                        <td>
                          {doc.pages || 0}
                        </td>

                        <td>
                          {doc.chunks || 0}
                        </td>

                        <td>
                          <RiskBadge
                            level={
                              doc.status ===
                              "ready"
                                ? "LOW"
                                : "MEDIUM"
                            }
                          />
                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


function Metric({
  label,
  value,
}) {

  return (
    <div>

      <div className="stat-label">
        {label}
      </div>

      <div
        style={{
          fontSize: 23,
          fontWeight: 800,
          marginTop: 5,
        }}
      >
        {value}
      </div>

    </div>
  );
}


function System({
  name,
  status,
}) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "9px 0",
        borderBottom:
          "1px solid #f1f5f9",
      }}
    >

      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {name}
      </span>

      <span className="badge badge-green">
        ● {status}
      </span>

    </div>
  );
}