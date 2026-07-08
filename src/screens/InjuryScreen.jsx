import { motion } from "framer-motion";
import { useGame } from "../game/state";
import { getJob } from "../game/jobs";

export default function InjuryScreen() {
  const { state, dispatch } = useGame();
  const job = getJob(state.flags.postingType);

  return (
    <motion.div
      className="screen office-screen case-corners injury-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>First Day On The Job</h2>
      <p className="office-flavor">{job.injury.flavor}</p>
      <p className="office-note injury-warning">A coworker calls an ambulance before you can say anything about it.</p>

      <button className="btn btn-primary" onClick={() => dispatch({ type: "ACK_INJURY" })}>
        Go to the Hospital
      </button>
    </motion.div>
  );
}
