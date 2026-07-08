import { useGame } from "../game/state";
import { timeLabel } from "../game/state";

export default function StatsBar() {
  const { state } = useGame();
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-label">Money</span>
        <span className="stat-value">${state.money}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Food</span>
        <div className="meter">
          <div className="meter-fill" style={{ width: `${state.food}%` }} />
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
  );
}
