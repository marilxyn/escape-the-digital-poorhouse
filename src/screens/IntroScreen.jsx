import { motion } from "framer-motion";
import { useGame } from "../game/state";

export default function IntroScreen() {
  const { dispatch } = useGame();
  return (
    <motion.div
      className="screen intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Escape the Digital Poorhouse</h1>
      <p className="intro-line">You've been laid off.</p>
      <p className="intro-line">Bills arrive.</p>
      <p className="intro-line">Rent is due in 5 days.</p>
      <p className="intro-line intro-money">You have $185.</p>
      <button className="btn btn-primary" onClick={() => dispatch({ type: "START_GAME" })}>
        Begin
      </button>
    </motion.div>
  );
}
