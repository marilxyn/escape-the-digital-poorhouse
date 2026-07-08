import { motion } from "framer-motion";
import { useGame, RENT_DUE_DAY } from "../game/state";

export default function IntroScreen() {
  const { dispatch } = useGame();
  const daysUntilDue = RENT_DUE_DAY - 1;
  return (
    <motion.div
      className="screen intro-screen case-corners"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Escape the Digital Poorhouse</h1>
      <p className="intro-line">You've been laid off.</p>
      <p className="intro-line">Bills arrive.</p>
      <p className="intro-line">Rent is due in {daysUntilDue} days.</p>
      <p className="intro-line intro-money">You have $185.</p>
      <button className="btn btn-primary" onClick={() => dispatch({ type: "START_GAME" })}>
        Begin
      </button>
    </motion.div>
  );
}
