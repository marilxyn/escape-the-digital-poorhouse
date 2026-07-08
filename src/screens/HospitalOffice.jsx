import { motion } from "framer-motion";
import { useGame } from "../game/state";

export default function HospitalOffice() {
  const { state, dispatch } = useGame();
  const flavor =
    state.health <= 40
      ? "You're still not right. It's been dragging on for days now."
      : "You've been running a fever for two days. It isn't getting better on its own.";

  return (
    <motion.div
      className="screen office-screen case-corners"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Hospital</h2>
      <p className="office-flavor">{flavor}</p>

      <div className="form-question">What do you do?</div>
      <button className="btn btn-primary" onClick={() => dispatch({ type: "HOSPITAL_ER" })}>
        Go to the ER
      </button>
      <button className="btn btn-secondary" onClick={() => dispatch({ type: "HOSPITAL_IGNORE" })}>
        Push through it
      </button>

      <p className="office-note">
        The ER costs money and most of the day, but you'll recover. Pushing through it is free —
        for now.
      </p>

      <button className="btn btn-secondary" onClick={() => dispatch({ type: "LEAVE_TO_MAP" })}>
        Leave
      </button>
    </motion.div>
  );
}
