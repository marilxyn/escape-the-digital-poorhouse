import { AnimatePresence } from "framer-motion";
import { GameProvider, useGame } from "./game/state";
import { FLAG_THRESHOLD } from "./game/risk";
import StatsBar from "./components/StatsBar";
import IntroScreen from "./screens/IntroScreen";
import MapScreen from "./screens/MapScreen";
import HousingOffice from "./screens/HousingOffice";
import FoodOffice from "./screens/FoodOffice";
import EmploymentOffice from "./screens/EmploymentOffice";
import HospitalOffice from "./screens/HospitalOffice";
import InjuryScreen from "./screens/InjuryScreen";
import FlaggedScreen from "./screens/FlaggedScreen";
import GlitchScreen from "./screens/GlitchScreen";
import EndingScreen from "./screens/EndingScreen";
import RevealDashboard from "./screens/RevealDashboard";
import "./App.css";

const SCREENS = {
  intro: IntroScreen,
  map: MapScreen,
  housing: HousingOffice,
  food: FoodOffice,
  employment: EmploymentOffice,
  hospital: HospitalOffice,
  injury: InjuryScreen,
  flagged: FlaggedScreen,
  glitch: GlitchScreen,
  ending: EndingScreen,
  reveal: RevealDashboard,
};

function GameShell() {
  const { state } = useGame();
  const Screen = SCREENS[state.screen] ?? MapScreen;
  const mood = Math.min(1, state.riskScore / (FLAG_THRESHOLD * 2));
  const showStats = !["intro", "reveal", "glitch"].includes(state.screen);

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
