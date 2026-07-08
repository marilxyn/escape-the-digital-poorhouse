import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/state";
import { DOCUMENT_POOL } from "../game/documents";

const TIME_LIMIT = 30;

export default function FoodOffice() {
  const { state, dispatch } = useGame();
  const [selected, setSelected] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT);
  const submittedRef = useRef(false);

  const alreadyApproved = state.flags.foodApproved;

  useEffect(() => {
    if (alreadyApproved) return;
    if (secondsLeft <= 0) {
      if (!submittedRef.current) {
        submittedRef.current = true;
        dispatch({ type: "FOOD_SUBMIT", selectedIds: selected });
      }
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, alreadyApproved]);

  function toggle(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function submit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    dispatch({ type: "FOOD_SUBMIT", selectedIds: selected });
  }

  return (
    <motion.div
      className="screen office-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Food Assistance Office</h2>

      {alreadyApproved ? (
        <p>Your food assistance is already approved. There is nothing more to do here today.</p>
      ) : (
        <>
          <p className="office-flavor">
            "Upload the required documents. ID, proof of income, a current utility bill, and a
            bank statement. Anything else is your problem, not mine."
          </p>
          <p className="timer">Time remaining: {secondsLeft}s</p>

          <div className="document-grid">
            {DOCUMENT_POOL.map((doc) => (
              <button
                key={doc.id}
                className={`document-card ${selected.includes(doc.id) ? "document-selected" : ""}`}
                onClick={() => toggle(doc.id)}
              >
                {doc.label}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={submit} disabled={selected.length === 0}>
            Submit Documents
          </button>
        </>
      )}

      <button className="btn btn-secondary" onClick={() => dispatch({ type: "LEAVE_TO_MAP" })}>
        Leave
      </button>
    </motion.div>
  );
}
