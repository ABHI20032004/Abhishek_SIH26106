import {
  Image,
  Upload,
  FolderOpen,
} from "lucide-react";

export default function Evidence() {

  return (
    <div>

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Evidence
          </h1>

          <p className="page-description">
            Store inspection photographs, documents
            and supporting evidence.
          </p>

        </div>

        <button className="btn btn-primary">
          <Upload size={14} />
          Add Evidence
        </button>

      </div>


      <div className="card">

        <div className="empty-state">

          <div className="empty-icon">
            <FolderOpen size={23} />
          </div>

          <strong>
            Evidence repository is empty
          </strong>

          <p>
            Inspection evidence will be organized
            by inspection and finding.
          </p>

        </div>

      </div>

    </div>
  );
}