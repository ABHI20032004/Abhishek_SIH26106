import {
  FileBarChart,
  FileText,
  Download,
  Plus,
} from "lucide-react";

export default function Reports() {

  return (
    <div>

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Reports
          </h1>

          <p className="page-description">
            Generate professional inspection reports.
          </p>

        </div>

        <button className="btn btn-primary">
          <Plus size={14} />
          Generate Report
        </button>

      </div>


      <div className="three-column">

        <ReportType
          title="Inspection Report"
          description="Complete inspection summary"
        />

        <ReportType
          title="Findings Report"
          description="Detailed findings and risks"
        />

        <ReportType
          title="Compliance Report"
          description="Compliance assessment"
        />

      </div>


      <div
        className="card"
        style={{ marginTop: 18 }}
      >

        <div className="card-padding">

          <div className="card-title">
            Generated Reports
          </div>

          <div className="card-subtitle">
            Previously generated reports
          </div>

        </div>


        <div className="empty-state">

          <div className="empty-icon">
            <FileBarChart size={23} />
          </div>

          <strong>
            No reports generated
          </strong>

          <p>
            Generate your first inspection report.
          </p>

        </div>

      </div>

    </div>
  );
}


function ReportType({
  title,
  description,
}) {

  return (
    <div className="card card-padding">

      <div className="empty-icon">
        <FileText size={20} />
      </div>

      <div className="card-title">
        {title}
      </div>

      <div className="card-subtitle">
        {description}
      </div>

      <button
        className="btn btn-secondary"
        style={{
          marginTop: 15,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Download size={13} />
        Create
      </button>

    </div>
  );
}