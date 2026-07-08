import { motion } from "framer-motion";
import { useGame } from "../game/state";
import { HUB, NETWORK_NODES } from "../game/network";

export default function NetworkMap() {
  const { state, dispatch } = useGame();
  const nodes = NETWORK_NODES.map((n) =>
    n.id === "hospital" ? { ...n, active: state.flags.jobSecured } : n
  );
  const pulseNode = state.lastAction
    ? nodes.find((n) => n.id === state.lastAction.building)
    : null;

  return (
    <div className="network-map">
      <svg className="network-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((node) => (
          <line
            key={node.id}
            x1={HUB.x}
            y1={HUB.y}
            x2={node.x}
            y2={node.y}
            className={`network-line ${node.active ? "network-line-active" : "network-line-dormant"}`}
          />
        ))}
        <circle cx={HUB.x} cy={HUB.y} r="10" className="hub-glow" />
        <circle cx={HUB.x} cy={HUB.y} r="4.5" className="hub-core" />
      </svg>

      {pulseNode && (
        <motion.div
          key={state.lastAction.ts}
          className="network-pulse"
          initial={{ left: `${pulseNode.x}%`, top: `${pulseNode.y}%`, opacity: 1 }}
          animate={{ left: `${HUB.x}%`, top: `${HUB.y}%`, opacity: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
        />
      )}

      <div className="network-hub-label" style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}>
        DATABASE
      </div>

      {nodes.map((node) => (
        <button
          key={node.id}
          className={`network-node ${node.active ? "network-node-active" : "network-node-dormant"}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          disabled={!node.active}
          onClick={() => node.active && dispatch({ type: "VISIT", building: node.id })}
        >
          {node.label}
        </button>
      ))}
    </div>
  );
}
