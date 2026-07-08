import { motion } from "framer-motion";
import { useGame } from "../game/state";

export default function FlaggedScreen() {
  const { dispatch } = useGame();
  return (
    <motion.div
      className="screen flagged-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Notice</h2>
      <p className="flagged-line">Your application has been flagged.</p>
      <p className="flagged-line">Reason: Unknown.</p>
      <p className="flagged-line flagged-sub">You ask why. The screen only says:</p>
      <p className="flagged-risk">HIGH RISK PROFILE</p>
      <button className="btn btn-primary" onClick={() => dispatch({ type: "ACK_FLAGGED" })}>
        Continue
      </button>
    </motion.div>
  );
}
