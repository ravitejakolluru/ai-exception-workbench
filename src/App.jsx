import { useMemo, useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  LogOut,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  X,
  XCircle,
  Zap,
} from "lucide-react";

import "./App.css";

/* ============================================================
   EXCEPTIONAI
   AI EXCEPTION RESOLUTION WORKBENCH
   ============================================================ */

/* ============================================================
   DEMO TRANSACTION DATA
   ============================================================ */

const initialTransactions = [
  {
    id: "TXN-1042",
    title: "Duplicate Payment",
    vendor: "Acme Supplies",
    amount: "$4,280.00",
    invoice: "INV-8821",
    severity: "High",
    date: "2026-08-22",
    reason:
      "A matching payment was detected for the same vendor and invoice within a short time window.",
    recommendation:
      "Verify the duplicate transaction and hold the second payment.",
    confidence: 96,
    status: "Flagged",
  },

  {
    id: "TXN-1043",
    title: "Unusual Amount",
    vendor: "Global Logistics",
    amount: "$18,750.00",
    invoice: "INV-9134",
    severity: "Medium",
    date: "2026-08-22",
    reason:
      "The transaction amount is significantly higher than this vendor's normal payment pattern.",
    recommendation:
      "Review the invoice and vendor history before approving.",
    confidence: 91,
    status: "Flagged",
  },

  {
    id: "TXN-1044",
    title: "Missing Invoice",
    vendor: "TechNova Systems",
    amount: "$7,450.00",
    invoice: "INV-7712",
    severity: "Medium",
    date: "2026-08-22",
    reason:
      "The payment record exists, but the expected invoice document could not be matched.",
    recommendation:
      "Request the missing invoice before processing the transaction.",
    confidence: 88,
    status: "Flagged",
  },

  {
    id: "TXN-1045",
    title: "Vendor Mismatch",
    vendor: "Prime Industrial",
    amount: "$12,600.00",
    invoice: "INV-6650",
    severity: "High",
    date: "2026-08-22",
    reason:
      "Banking information does not match the vendor profile currently stored in the system.",
    recommendation:
      "Escalate for manual verification of vendor banking details.",
    confidence: 94,
    status: "Flagged",
  },
];

/* ============================================================
   MAIN APPLICATION
   ============================================================ */

function App() {
  /* ==========================================================
     LOGIN STATE
     ========================================================== */

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("exceptionai_logged_in") === "true"
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);

  /* ==========================================================
     APPLICATION STATE
     ========================================================== */

  const [transactions, setTransactions] = useState(initialTransactions);

  const [selectedId, setSelectedId] = useState("TXN-1042");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [message, setMessage] = useState("");

  /* ==========================================================
     LOGIN HANDLER
     ========================================================== */

  const handleLogin = (event) => {
    event.preventDefault();

    setLoginError("");

    if (!username.trim() || !password.trim()) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setLoginLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("exceptionai_logged_in", "true");

        setIsLoggedIn(true);

        setLoginError("");

        setLoginLoading(false);
      } else {
        setLoginError("Invalid username or password.");

        setLoginLoading(false);
      }
    }, 500);
  };

  /* ==========================================================
     LOGOUT HANDLER
     ========================================================== */

  const handleLogout = () => {
    sessionStorage.removeItem("exceptionai_logged_in");

    setIsLoggedIn(false);

    setUsername("");

    setPassword("");

    setLoginError("");

    setShowPassword(false);
  };

  /* ==========================================================
     SELECTED TRANSACTION
     ========================================================== */

  const selected = transactions.find(
    (transaction) => transaction.id === selectedId
  );

  /* ==========================================================
     FILTER + SEARCH
     ========================================================== */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const normalizedSearch = search.toLowerCase().trim();

      const matchesSearch =
        transaction.id.toLowerCase().includes(normalizedSearch) ||
        transaction.title.toLowerCase().includes(normalizedSearch) ||
        transaction.vendor.toLowerCase().includes(normalizedSearch) ||
        transaction.invoice.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === "All" || transaction.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  /* ==========================================================
     DASHBOARD STATISTICS
     ========================================================== */

  const flagged = transactions.filter(
    (transaction) => transaction.status === "Flagged"
  ).length;

  const resolved = transactions.filter(
    (transaction) => transaction.status === "Resolved"
  ).length;

  const escalated = transactions.filter(
    (transaction) => transaction.status === "Escalated"
  ).length;

  /* ==========================================================
     RESOLVE TRANSACTION
     ========================================================== */

  const resolveTransaction = () => {
    if (!selected) {
      return;
    }

    setTransactions((previousTransactions) =>
      previousTransactions.map((transaction) =>
        transaction.id === selected.id
          ? {
              ...transaction,
              status: "Resolved",
            }
          : transaction
      )
    );

    setMessage(
      `${selected.id} successfully resolved using the AI recommendation.`
    );
  };

  /* ==========================================================
     ESCALATE TRANSACTION
     ========================================================== */

  const escalateTransaction = () => {
    if (!selected) {
      return;
    }

    setTransactions((previousTransactions) =>
      previousTransactions.map((transaction) =>
        transaction.id === selected.id
          ? {
              ...transaction,
              status: "Escalated",
            }
          : transaction
      )
    );

    setMessage(
      `${selected.id} escalated for human review and approval.`
    );
  };

  /* ==========================================================
     RESET DEMO
     ========================================================== */

  const resetDemo = () => {
    setTransactions(initialTransactions);

    setSelectedId("TXN-1042");

    setMessage("");

    setFilter("All");

    setSearch("");
  };

  /* ==========================================================
     SELECT TRANSACTION
     ========================================================== */

  const selectTransaction = (transactionId) => {
    setSelectedId(transactionId);

    setMessage("");
  };

  /* ==========================================================
     LOGIN PAGE
     ========================================================== */

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-background-glow glow-one"></div>

        <div className="login-background-glow glow-two"></div>

        <div className="login-card">
          {/* LOGIN BRAND */}

          <div className="login-brand">
            <div className="login-brand-icon">
              <ShieldCheck size={34} />
            </div>

            <div>
              <h1>ExceptionAI</h1>

              <p>AI Exception Resolution Workbench</p>
            </div>
          </div>

          {/* LOGIN HEADING */}

          <div className="login-heading">
            <div className="login-lock-icon">
              <LockKeyhole size={22} />
            </div>

            <div>
              <h2>Secure Login</h2>

              <p>
                Sign in to access the exception resolution
                dashboard.
              </p>
            </div>
          </div>

          {/* LOGIN FORM */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >
            {/* USERNAME */}

            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  autoComplete="username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setLoginError("");
                  }}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setLoginError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* LOGIN ERROR */}

            {loginError && (
              <div className="login-error">
                <XCircle size={18} />

                <span>{loginError}</span>
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <span className="button-spinner"></span>

                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={19} />

                  Login to ExceptionAI
                </>
              )}
            </button>
          </form>

          {/* DEMO CREDENTIALS */}

          <div className="demo-credentials">
            <div className="demo-credentials-title">
              <ShieldCheck size={17} />

              <span>Demo Credentials</span>
            </div>

            <div className="credential-row">
              <span>Username</span>

              <strong>admin</strong>
            </div>

            <div className="credential-row">
              <span>Password</span>

              <strong>admin123</strong>
            </div>
          </div>

          {/* LOGIN FOOTER */}

          <div className="login-footer">
            <span>
              <span className="secure-dot"></span>

              Secure Human-in-the-Loop Access
            </span>

            <span>v1.0 Demo</span>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     MAIN DASHBOARD
     ========================================================== */

  return (
    <div className="app">
      {/* ======================================================
          HEADER
          ====================================================== */}

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={27} />
          </div>

          <div>
            <h2>ExceptionAI</h2>

            <p>AI Exception Resolution Workbench</p>
          </div>
        </div>

        <div className="topbar-right">
          {/* ONLINE STATUS */}

          <div className="online">
            <span></span>

            AI Engine Online
          </div>

          {/* LOGGED-IN USER */}

          <div className="logged-user">
            <div className="logged-user-avatar">
              <User size={15} />
            </div>

            <span>Admin</span>
          </div>

          {/* LOGOUT */}

          <button
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={17} />

            Logout
          </button>
        </div>
      </header>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <main>
        {/* ====================================================
            HERO SECTION
            ==================================================== */}

        <section className="hero">
          <div className="hero-label">
            <Sparkles size={17} />

            HUMAN-IN-THE-LOOP AI
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Resolve transaction{" "}
                <span>exceptions faster.</span>
              </h1>

              <p>
                AI analyzes flagged transactions, explains
                the issue, recommends an action, and lets
                reviewers stay in control.
              </p>
            </div>

            <div className="threshold">
              <div className="threshold-icon">
                <Zap size={23} />
              </div>

              <div>
                <small>
                  AUTO-RESOLUTION THRESHOLD
                </small>

                <strong>
                  90% confidence
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            STATISTICS
            ==================================================== */}

        <section className="stats">
          <Stat
            icon={<AlertTriangle />}
            label="Flagged"
            value={flagged}
          />

          <Stat
            icon={<CheckCircle2 />}
            label="Resolved"
            value={resolved}
          />

          <Stat
            icon={<Clock3 />}
            label="Escalated"
            value={escalated}
          />

          <Stat
            icon={<ShieldCheck />}
            label="AI Accuracy"
            value="94.2%"
          />
        </section>

        {/* ====================================================
            SUCCESS / ACTION MESSAGE
            ==================================================== */}

        {message && (
          <div className="action-message">
            <CheckCircle2 size={19} />

            <span>{message}</span>

            <button
              onClick={() => setMessage("")}
              aria-label="Close message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ====================================================
            WORKBENCH
            ==================================================== */}

        <section className="workbench">
          {/* ==================================================
              LEFT QUEUE
              ================================================== */}

          <aside className="queue">
            <div className="queue-header">
              <div>
                <h3>Exception Queue</h3>

                <span>
                  {transactions.length} transactions
                </span>
              </div>

              <div className="queue-count">
                {flagged} active
              </div>
            </div>

            {/* SEARCH */}

            <div className="search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search exceptions..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            {/* FILTERS */}

            <div className="filters">
              {[
                "All",
                "Flagged",
                "Resolved",
                "Escalated",
              ].map((item) => (
                <button
                  key={item}
                  className={
                    filter === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setFilter(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            {/* TRANSACTION LIST */}

            <div className="transaction-list">
              {filteredTransactions.map(
                (transaction) => (
                  <button
                    key={transaction.id}
                    className={`transaction ${
                      selectedId === transaction.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      selectTransaction(
                        transaction.id
                      )
                    }
                  >
                    <div className="transaction-top">
                      <strong>
                        {transaction.id}
                      </strong>

                      <Status
                        status={
                          transaction.status
                        }
                      />
                    </div>

                    <h4>
                      {transaction.title}
                    </h4>

                    <p>
                      {transaction.vendor}
                    </p>

                    <div className="transaction-bottom">
                      <span>
                        {transaction.amount}
                      </span>

                      <span
                        className={`severity-text ${transaction.severity.toLowerCase()}`}
                      >
                        {transaction.severity}
                      </span>
                    </div>
                  </button>
                )
              )}

              {filteredTransactions.length === 0 && (
                <div className="empty">
                  <Search size={22} />

                  <span>
                    No matching exceptions found.
                  </span>
                </div>
              )}
            </div>
          </aside>

          {/* ==================================================
              RIGHT DETAILS
              ================================================== */}

          <section className="details">
            {selected ? (
              <>
                {/* ==========================================
                    DETAIL HEADING
                    ========================================== */}

                <div className="details-heading">
                  <div>
                    <div className="id">
                      <AlertTriangle size={18} />

                      {selected.id}
                    </div>

                    <h2>
                      {selected.title}
                    </h2>

                    <p>
                      Detected on{" "}
                      {selected.date} ·{" "}
                      {selected.vendor}
                    </p>
                  </div>

                  <Status
                    status={selected.status}
                  />
                </div>

                {/* ==========================================
                    TRANSACTION INFORMATION
                    ========================================== */}

                <div className="info-grid">
                  <Info
                    label="VENDOR"
                    value={selected.vendor}
                  />

                  <Info
                    label="AMOUNT"
                    value={selected.amount}
                  />

                  <Info
                    label="INVOICE"
                    value={selected.invoice}
                  />

                  <Info
                    label="SEVERITY"
                    value={selected.severity}
                  />
                </div>

                {/* ==========================================
                    AI ANALYSIS
                    ========================================== */}

                <div className="ai-panel">
                  <div className="ai-heading">
                    <div className="ai-heading-left">
                      <div className="ai-icon">
                        <Sparkles size={20} />
                      </div>

                      <div>
                        <h3>
                          AI Analysis
                        </h3>

                        <p>
                          Automated exception
                          reasoning
                        </p>
                      </div>
                    </div>

                    <div className="confidence">
                      <strong>
                        {selected.confidence}%
                      </strong>

                      <span>
                        confidence
                      </span>
                    </div>
                  </div>

                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${selected.confidence}%`,
                      }}
                    ></div>
                  </div>

                  <div className="analysis-content">
                    <div className="analysis-section">
                      <div className="analysis-number">
                        01
                      </div>

                      <div>
                        <h4>
                          Why was this flagged?
                        </h4>

                        <p>
                          {selected.reason}
                        </p>
                      </div>
                    </div>

                    <div className="analysis-divider"></div>

                    <div className="analysis-section">
                      <div className="analysis-number">
                        02
                      </div>

                      <div>
                        <h4>
                          Recommended action
                        </h4>

                        <p>
                          {
                            selected.recommendation
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ==========================================
                    ACTION BUTTONS
                    ========================================== */}

                <div className="actions">
                  <button
                    className="resolve"
                    onClick={
                      resolveTransaction
                    }
                    disabled={
                      selected.status !==
                      "Flagged"
                    }
                  >
                    <CheckCircle2 size={19} />

                    Resolve Exception
                  </button>

                  <button
                    className="escalate"
                    onClick={
                      escalateTransaction
                    }
                    disabled={
                      selected.status !==
                      "Flagged"
                    }
                  >
                    <XCircle size={19} />

                    Escalate to Human
                  </button>
                </div>

                {/* ==========================================
                    FOOTER CONTROLS
                    ========================================== */}

                <div className="demo-footer">
                  <span>
                    <ShieldCheck size={16} />

                    Human approval remains in
                    control
                  </span>

                  <button
                    onClick={resetDemo}
                  >
                    Reset Demo
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-details">
                <AlertTriangle size={34} />

                <h3>
                  No exception selected
                </h3>

                <p>
                  Select an exception from the
                  queue to inspect it.
                </p>
              </div>
            )}
          </section>
        </section>

        {/* ====================================================
            SYSTEM FOOTER
            ==================================================== */}

        <footer className="system-footer">
          <div>
            <span className="footer-dot"></span>

            ExceptionAI System Operational
          </div>

          <div>
            Human-in-the-loop decision support
          </div>

          <div>
            Secure Demo Environment
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ============================================================
   STAT COMPONENT
   ============================================================ */

function Stat({ icon, label, value }) {
  return (
    <div className="stat">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <span>{label}</span>

        <strong>{value}</strong>
      </div>
    </div>
  );
}

/* ============================================================
   INFORMATION COMPONENT
   ============================================================ */

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

/* ============================================================
   STATUS COMPONENT
   ============================================================ */

function Status({ status }) {
  return (
    <span
      className={`status ${status.toLowerCase()}`}
    >
      {status}
    </span>
  );
}

/* ============================================================
   EXPORT
   ============================================================ */

export default App;