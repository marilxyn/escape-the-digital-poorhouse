import { motion } from "framer-motion";
import { useGame } from "../game/state";

export default function HospitalOffice() {
  const { state, dispatch } = useGame();
  const { injuryOccurred, injuryDebt } = state.flags;

  return (
    <motion.div
      className="screen office-screen case-corners"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Hospital</h2>

      {injuryOccurred ? (
        <p>
          You're carrying ${injuryDebt} in medical debt from the workplace injury. There is
          nothing more to do here today.
        </p>
      ) : (
        <p>Nothing to report today.</p>
      )}

      <button className="btn btn-secondary" onClick={() => dispatch({ type: "LEAVE_TO_MAP" })}>
        Leave
      </button>
    </motion.div>
  );
}
