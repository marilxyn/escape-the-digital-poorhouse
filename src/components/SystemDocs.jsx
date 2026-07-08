const FACTS = [
  "Automated eligibility systems have denied benefits over technicalities — a missed call, a data-entry mismatch — that have nothing to do with whether someone actually qualifies.",
  "In Michigan, an automated fraud-detection system falsely accused tens of thousands of people of unemployment fraud over a two-year span before the state admitted the system was wrong the vast majority of the time.",
  "Predictive risk-scoring tools used in child welfare combine records from housing, health, and criminal-justice databases — information families never agreed to share in one place.",
  "Most people flagged by these systems are never told a score exists, what data produced it, or how to challenge it.",
  "Being poor generates more data than being wealthy: more agencies, more forms, more contact points — which means more opportunities for a system to flag you.",
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
    </div>
  );
}
