import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/state";

export default function HousingOffice() {
  const { state, dispatch } = useGame();
  const [answer, setAnswer] = useState(null);
  const alreadySubmitted = state.flags.housingSubmitted;

  return (
    <motion.div
      className="screen office-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Housing Office</h2>

      {alreadySubmitted ? (
        <p>Your application is already on file and pending review. There is nothing more to do here today.</p>
      ) : (
        <>
          <p className="office-flavor">
            A clerk slides a form across the counter without looking up.
          </p>
          <div className="form-question">
            <p>Did you receive unemployment benefits?</p>
            <div className="form-options">
              <label className={`radio ${answer === "yes" ? "radio-selected" : ""}`}>
                <input
                  type="radio"
                  name="unemployment"
                  checked={answer === "yes"}
                  onChange={() => setAnswer("yes")}
                />
                Yes
              </label>
              <label className={`radio ${answer === "no" ? "radio-selected" : ""}`}>
                <input
                  type="radio"
                  name="unemployment"
                  checked={answer === "no"}
                  onChange={() => setAnswer("no")}
                />
                No
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary"
            disabled={!answer}
            onClick={() => dispatch({ type: "HOUSING_SUBMIT", answer })}
          >
            Submit Application
          </button>
        </>
      )}

      <button className="btn btn-secondary" onClick={() => dispatch({ type: "LEAVE_TO_MAP" })}>
        Leave
      </button>
    </motion.div>
  );
}
