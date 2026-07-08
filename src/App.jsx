import { AnimatePresence } from "framer-motion";
import { GameProvider, useGame } from "./game/state";
import { FLAG_THRESHOLD } from "./game/risk";
import StatsBar from "./components/StatsBar";
import IntroScreen from "./screens/IntroScreen";
import MapScreen from "./screens/MapScreen";
import HousingOffice from "./screens/HousingOffice";
import FoodOffice from "./screens/FoodOffice";
import FlaggedScreen from "./screens/FlaggedScreen";
import EndingScreen from "./screens/EndingScreen";
import RevealDashboard from "./screens/RevealDashboard";
import "./App.css";

const SCREENS = {
  intro: IntroScreen,
  map: MapScreen,
  housing: HousingOffice,
  food: FoodOffice,
  flagged: FlaggedScreen,
  ending: EndingScreen,
  reveal: RevealDashboard,
};

function GameShell() {
  const { state } = useGame();
  const Screen = SCREENS[state.screen] ?? MapScreen;
  const mood = Math.min(1, state.riskScore / (FLAG_THRESHOLD * 2));
  const showStats = state.screen !== "intro" && state.screen !== "reveal";

  return (
    <div className="game-shell" style={{ "--mood": mood }}>
      {showStats && <StatsBar />}
      <AnimatePresence mode="wait">
        <Screen key={state.screen} />
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  );
}
