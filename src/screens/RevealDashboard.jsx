import { motion } from "framer-motion";
import { useGame } from "../game/state";
import SystemDocs from "../components/SystemDocs";

export default function RevealDashboard() {
  const { state, dispatch } = useGame();

  const grouped = state.log.reduce((acc, entry) => {
    acc[entry.reason] = (acc[entry.reason] || 0) + entry.amount;
    return acc;
  }, {});

  return (
    <motion.div
      className="screen reveal-screen case-corners cyber"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Digital Profile</h2>
      <p className="reveal-score">Risk Score: {state.riskScore}</p>

      <h3>Reasoning</h3>
      {Object.keys(grouped).length === 0 ? (
        <p className="reveal-empty">No risk factors were recorded.</p>
      ) : (
        <ul className="reveal-list">
          {Object.entries(grouped).map(([reason, amount]) => (
            <li key={reason}>
              <span>{reason}</span>
              <span className="reveal-leader" />
              <span className="reveal-amount">+{amount}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="reveal-note">
        None of these looked bad on their own. Together, they were the whole decision — made by
        a system no office ever admitted was watching.
      </p>

      <button className="btn btn-primary" onClick={() => dispatch({ type: "RESTART" })}>
        Play Again
      </button>

      <SystemDocs />
    </motion.div>
  );
}
