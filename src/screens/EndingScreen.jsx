import { motion } from "framer-motion";
import { useGame } from "../game/state";

export default function EndingScreen() {
  const { state, dispatch } = useGame();
  const ending = state.ending;

  return (
    <motion.div
      className={`screen ending-screen case-corners ending-${ending.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>{ending.title}</h2>
      <p className="ending-reason">{ending.reason}</p>
      <p className="ending-body">{ending.body}</p>
      <button className="btn btn-primary" onClick={() => dispatch({ type: "CONTINUE_FROM_ENDING" })}>
        See Your Profile
      </button>
    </motion.div>
  );
}
