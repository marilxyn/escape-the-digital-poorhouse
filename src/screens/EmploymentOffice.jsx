import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/state";

const POSTINGS = [
  { id: "warehouse", label: "Warehouse Associate — $14/hr" },
  { id: "cashier", label: "Retail Cashier — $13.50/hr" },
  { id: "driver", label: "Delivery Driver — $15/hr" },
];

export default function EmploymentOffice() {
  const { state, dispatch } = useGame();
  const [posting, setPosting] = useState(null);
  const { interviewPending, interviewResolved } = state.flags;

  return (
    <motion.div
      className="screen office-screen case-corners"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Employment Center</h2>

      {interviewPending ? (
        <>
          <p className="office-flavor">
            "You've got an interview Thursday at 2pm. Says here your benefits review is Thursday
            at 2pm too. Can't help you with that — pick one."
          </p>
          <div className="form-question">Which one do you attend?</div>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "EMPLOYMENT_RESOLVE_CONFLICT", choice: "interview" })}
          >
            Attend the interview
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => dispatch({ type: "EMPLOYMENT_RESOLVE_CONFLICT", choice: "appointment" })}
          >
            Attend the benefits appointment
          </button>
        </>
      ) : interviewResolved ? (
        <p>
          {state.flags.jobSecured
            ? "You start next week. There is nothing more to do here today."
            : "No new leads today. There is nothing more to do here today."}
        </p>
      ) : (
        <>
          <p className="office-flavor">
            "Fill out an application. Doesn't guarantee anything, but it's something."
          </p>
          <div className="form-question">Pick a posting</div>
          <div className="form-options">
            {POSTINGS.map((p) => (
              <label
                key={p.id}
                className={`radio ${posting === p.id ? "radio-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="posting"
                  checked={posting === p.id}
                  onChange={() => setPosting(p.id)}
                />
                {p.label}
              </label>
            ))}
          </div>
          <button
            className="btn btn-primary"
            disabled={!posting}
            onClick={() => dispatch({ type: "EMPLOYMENT_APPLY" })}
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
