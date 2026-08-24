import { formatRuntimeSummary } from "../../shared/desktop-api";

export const App = () => (
  <main className="app-shell">
    <section className="hero">
      <p className="eyebrow">LOCAL-FIRST JOB SEARCH</p>
      <h1>Your search, in one quiet place.</h1>
      <p className="intro">
        Avesd is ready for its first workflow. Your job-search data will stay
        local unless you explicitly choose otherwise.
      </p>
      <p className="runtime">{formatRuntimeSummary(window.avesd.runtime)}</p>
    </section>
  </main>
);

