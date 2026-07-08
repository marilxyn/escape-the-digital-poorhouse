import { motion } from "framer-motion";
import { useGame, RENT_DUE_DAY } from "../game/state";
import NetworkMap from "../components/NetworkMap";

const BUILDINGS = [
  { id: "hospital", label: "Hospital", area: "hospital", active: false },
  { id: "school", label: "School", area: "school", active: false },
  { id: "hub", label: "Government Hub", area: "hub", active: false },
  { id: "food", label: "Food Office", area: "food", active: true },
  { id: "housing", label: "Housing Office", area: "housing", active: true },
  { id: "employment", label: "Employment Center", area: "employment", active: true },
];

export default function MapScreen() {
  const { state, dispatch } = useGame();

  return (
    <motion.div
      className={`screen map-screen case-corners ${state.revealed ? "map-screen-revealed" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {state.banner && (
        <div className={`banner banner-${state.banner.tone}`}>
          <strong>{state.banner.title}</strong>
          <p>{state.banner.body}</p>
        </div>
      )}

      <p className="map-hint">
        {state.revealed
          ? "Live feed: Citizen Record #4471-B. Every office reports to the same database."
          : `Rent is due at the start of Day ${RENT_DUE_DAY}. Choose where to go.`}
      </p>

      {state.revealed ? (
        <NetworkMap />
      ) : (
        <div className="city-map">
          {BUILDINGS.map((b) => (
            <button
              key={b.id}
              className={`building building-${b.area} ${b.active ? "building-active" : "building-disabled"}`}
              disabled={!b.active}
              onClick={() => b.active && dispatch({ type: "VISIT", building: b.id })}
            >
              {b.label}
              {!b.active && <span className="building-note">Not yet open</span>}
            </button>
          ))}
        </div>
      )}

      <button className="btn btn-secondary" onClick={() => dispatch({ type: "PASS_DAY" })}>
        Wait for tomorrow
      </button>
    </motion.div>
  );
}
