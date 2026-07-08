import { useGame } from "../game/state";
import { timeLabel } from "../game/state";

export default function StatsBar() {
  const { state } = useGame();
  return (
    <div className="stats-bar case-corners">
      <div className="form-header">
        <span>Form 12-B // Applicant Profile</span>
        <span>Case No. 4471-B</span>
      </div>
      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Money</span>
          <span className={`stat-value ${state.money < 0 ? "stat-negative" : ""}`}>
            {state.money < 0 ? `-$${Math.abs(state.money)}` : `$${state.money}`}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Food</span>
          <div className="meter">
            <div className="meter-fill" style={{ width: `${state.food}%` }} />
          </div>
        </div>
        <div className="stat">
          <span className="stat-label">Health</span>
          <div className="meter">
            <div className="meter-fill" style={{ width: `${state.health}%` }} />
          </div>
        </div>
        <div className="stat">
          <span className="stat-label">Housing</span>
          <span className="stat-value stat-tag">{state.housingStability}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Stress</span>
          <div className="meter meter-stress">
            <div className="meter-fill" style={{ width: `${state.stress}%` }} />
          </div>
        </div>
        <div className="stat">
          <span className="stat-label">Time</span>
          <span className="stat-value">{timeLabel(state.day)}</span>
        </div>
      </div>
    </div>
  );
}
