import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Copilot from "./pages/Copilot";
import Inspections from "./pages/Inspections";
import Findings from "./pages/Findings";
import Actions from "./pages/Actions";
import Evidence from "./pages/Evidence";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./App.css";

function Layout() {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Header />

        <main className="page-container">
          <Routes>

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/documents"
              element={<Documents />}
            />

            <Route
              path="/copilot"
              element={<Copilot />}
            />

            <Route
              path="/inspections"
              element={<Inspections />}
            />

            <Route
              path="/findings"
              element={<Findings />}
            />

            <Route
              path="/actions"
              element={<Actions />}
            />

            <Route
              path="/evidence"
              element={<Evidence />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>
        </main>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}