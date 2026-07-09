const FACTS = [
  "Automated eligibility systems have denied benefits over technicalities — a missed call, a data-entry mismatch — that have nothing to do with whether someone actually qualifies.",
  "In Michigan, an automated fraud-detection system falsely accused tens of thousands of people of unemployment fraud over a two-year span before the state admitted the system was wrong the vast majority of the time.",
  "Predictive risk-scoring tools used in child welfare combine records from housing, health, and criminal-justice databases — information families never agreed to share in one place.",
  "Most people flagged by these systems are never told a score exists, what data produced it, or how to challenge it.",
  "Being poor generates more data than being wealthy: more agencies, more forms, more contact points — which means more opportunities for a system to flag you.",
];

const ARTICLES = [
  {
    title: "What happened when states turned their public benefits systems over to AI",
    source: "Fast Company",
    url: "https://www.fastcompany.com/91265363/states-are-turning-their-public-benefits-systems-over-to-ai-the-results-have-often-led-to-immense-suffering",
  },
  {
    title: "Thousands of Michiganders falsely accused of unemployment fraud get $20M settlement",
    source: "Michigan Advance",
    url: "https://michiganadvance.com/briefs/thousands-of-michiganders-falsely-accused-of-unemployment-fraud-get-20m-settlement/",
  },
  {
    title: "AP report: DOJ examining AI screening tool used by Pa. child welfare agency",
    source: "PBS NewsHour / AP",
    url: "https://www.pbs.org/newshour/nation/ap-report-doj-examining-ai-screening-tool-used-by-pa-child-welfare-agency",
  },
  {
    title: "DWP 'fairness analysis' reveals bias in AI fraud detection system",
    source: "Computer Weekly",
    url: "https://www.computerweekly.com/news/366616983/DWP-fairness-analysis-reveals-bias-in-AI-fraud-detection-system",
  },
];

export default function SystemDocs() {
  return (
    <div className="system-docs">
      <div className="system-docs-header">// System Documentation</div>
      <ul className="system-docs-list">
        {FACTS.map((fact, i) => (
          <li key={i}>
            <span className="prompt">&gt;</span> {fact}
          </li>
        ))}
      </ul>
      <p className="system-docs-credit">
        This game was inspired by{" "}
        <a
          href="https://harpers.org/archive/2018/01/the-digital-poorhouse/"
          target="_blank"
          rel="noopener noreferrer"
        >
          "The Digital Poorhouse"
        </a>{" "}
        by Virginia Eubanks (Harper's Magazine, January 2018), adapted from her book{" "}
        <em>Automating Inequality</em>. The agencies, risk score, and hidden database in this
        game are fiction — the systems they're modeled on are not.
      </p>

      <div className="system-docs-header">// Related Articles</div>
      <ul className="related-articles">
        {ARTICLES.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <span className="related-source">{article.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
