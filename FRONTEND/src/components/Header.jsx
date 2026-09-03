import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": [
    "Dashboard",
    "Inspection intelligence overview",
  ],

  "/inspections": [
    "Inspections",
    "Manage industrial inspection workflows",
  ],

  "/documents": [
    "Documents",
    "Inspection document intelligence",
  ],

  "/findings": [
    "Findings",
    "Track identified inspection issues",
  ],

  "/actions": [
    "Corrective Actions",
    "Manage remediation activities",
  ],

  "/evidence": [
    "Evidence",
    "Inspection evidence repository",
  ],

  "/copilot": [
    "AI Copilot",
    "Ask your local inspection intelligence",
  ],

  "/reports": [
    "Reports",
    "Generate and manage inspection reports",
  ],

  "/analytics": [
    "Analytics",
    "Operational inspection intelligence",
  ],

  "/settings": [
    "Settings",
    "Configure InspectAI",
  ],
};

export default function Header() {

  const location = useLocation();

  const current =
    titles[location.pathname] ||
    titles["/dashboard"];

  return (
    <header className="header">

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        <button
          className="mobile-menu btn btn-secondary"
        >
          <Menu size={16} />
        </button>

        <div>

          <div className="header-title">
            {current[0]}
          </div>

          <div className="header-subtitle">
            {current[1]}
          </div>

        </div>

      </div>


      <div className="header-right">

        <div className="search-box" style={{ width: 190 }}>

          <Search
            size={14}
            color="#94a3b8"
          />

          <input
            placeholder="Search..."
          />

        </div>


        <div className="header-status">
          <span className="online-dot" />
          Local AI
        </div>


        <Bell
          size={17}
          color="#64748b"
        />


        <div className="avatar">
          AI
        </div>

      </div>

    </header>
  );
}