import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/state";

const LINES = [
  "SYSTEM ERROR",
  "RECALIBRATING INTERFACE...",
  "YOU ARE VIEWING: CITIZEN RECORD #4471-B",
  "HOUSING ↔ FOOD ↔ EMPLOYMENT ↔ HOSPITAL",
  "ALL AGENCIES REPORT TO THE SAME DATABASE",
];

const LINE_INTERVAL = 650;
const HOLD_AFTER_LAST = 900;

export default function GlitchScreen() {
  const { dispatch } = useGame();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= LINES.length) {
      const t = setTimeout(() => dispatch({ type: "ACK_GLITCH" }), HOLD_AFTER_LAST);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), LINE_INTERVAL);
    return () => clearTimeout(t);
  }, [step, dispatch]);

  return (
    <motion.div
      className="glitch-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => dispatch({ type: "ACK_GLITCH" })}
    >
      <div className="glitch-scanlines" />
      <div className="glitch-flash" />
      <div className="glitch-lines">
        {LINES.slice(0, step).map((line, i) => (
          <motion.div
            key={i}
            className="glitch-text"
            data-text={line}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
      <p className="glitch-skip">click to continue</p>
    </motion.div>
  );
}
