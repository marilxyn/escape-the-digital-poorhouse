import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../game/state";
import { JOBS } from "../game/jobs";

export default function EmploymentOffice() {
  const { state, dispatch } = useGame();
  const [posting, setPosting] = useState(null);
  const { interviewPending, interviewResolved, jobSecured, injuryOccurred } = state.flags;

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
          {jobSecured
            ? injuryOccurred
              ? "You're still working there, medical debt and all. There is nothing more to do here today."
              : "You start next week. There is nothing more to do here today."
            : "No new leads today. There is nothing more to do here today."}
        </p>
      ) : (
        <>
          <p className="office-flavor">
            {state.flags.employmentApplications > 0
              ? "\"One application on file isn't enough to get a call back. Apply to another opening.\""
              : "\"Fill out an application. Doesn't guarantee anything, but it's something.\""}
          </p>
          {state.flags.employmentApplications > 0 && (
            <p className="office-note">
              Applications submitted so far: {state.flags.employmentApplications}
            </p>
          )}
          <div className="form-question">Pick a posting</div>
          <div className="form-options">
            {Object.values(JOBS).map((job) => (
              <label
                key={job.id}
                className={`radio ${posting === job.id ? "radio-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="posting"
                  checked={posting === job.id}
                  onChange={() => setPosting(job.id)}
                />
                {job.label}
              </label>
            ))}
          </div>
          <button
            className="btn btn-primary"
            disabled={!posting}
            onClick={() => dispatch({ type: "EMPLOYMENT_APPLY", posting })}
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
