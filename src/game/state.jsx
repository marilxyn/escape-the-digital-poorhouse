import { createContext, useContext, useReducer } from "react";
import { applyRisk, FLAG_THRESHOLD } from "./risk";
import { isCorrectSelection } from "./documents";
import { resolveEnding } from "./endings";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const RENT_DUE_DAY = 8;
export const DAILY_COST_OF_LIVING = 15;
export const REVEAL_DAY = RENT_DUE_DAY - 1;

export function timeLabel(day) {
  return `${WEEKDAYS[(day - 1) % 7]}, Day ${day}`;
}

const initialState = {
  screen: "intro",
  day: 1,
  money: 185,
  food: 60,
  health: 100,
  stress: 30,
  housingStability: "at-risk",
  riskScore: 0,
  revealed: false,
  lastAction: null,
  truth: { receivedUnemployment: false },
  flags: {
    housingSubmitted: false,
    housingAnswer: null,
    foodApproved: false,
    foodAttempts: 0,
    flaggedShown: false,
    employmentApplications: 0,
    interviewPending: false,
    interviewResolved: false,
    jobSecured: false,
    erVisits: 0,
  },
  log: [],
  banner: null,
  ending: null,
};

function advanceDay(state) {
  let next = { ...state, day: state.day + 1 };
  next.money = Math.max(0, next.money - DAILY_COST_OF_LIVING);
  return next;
}

function checkFlagEvent(state) {
  if (!state.flags.flaggedShown && state.riskScore >= FLAG_THRESHOLD) {
    return { ...state, flags: { ...state.flags, flaggedShown: true }, screen: "flagged" };
  }
  return state;
}

function checkReveal(state) {
  if (!state.revealed && state.day >= REVEAL_DAY) {
    return { ...state, revealed: true, screen: "glitch" };
  }
  return state;
}

function checkRentDue(state) {
  if (state.day >= RENT_DUE_DAY && state.screen !== "flagged" && state.screen !== "glitch") {
    return { ...state, ending: resolveEnding(state), screen: "ending" };
  }
  return state;
}

function settle(state) {
  let next = checkFlagEvent(state);
  if (next.screen === "flagged") return next;
  next = checkReveal(next);
  if (next.screen === "glitch") return next;
  return checkRentDue(next);
}

function reducer(state, action) {
  if (state.screen === "ending" && action.type !== "CONTINUE_FROM_ENDING") return state;
  if (state.screen === "reveal") return state;

  switch (action.type) {
    case "START_GAME":
      return { ...state, screen: "map" };

    case "VISIT":
      return { ...state, screen: action.building, banner: null };

    case "LEAVE_TO_MAP":
      return { ...state, screen: "map" };

    case "ACK_FLAGGED":
      return settle({ ...state, screen: "map" });

    case "ACK_GLITCH":
      return settle({ ...state, screen: "map" });

    case "PASS_DAY":
      return settle(advanceDay({ ...state, banner: null }));

    case "HOUSING_SUBMIT": {
      let next = {
        ...state,
        flags: { ...state.flags, housingSubmitted: true, housingAnswer: action.answer },
        housingStability: "pending",
        lastAction: { building: "housing", ts: Date.now() },
      };
      const liedAboutUnemployment =
        action.answer === "yes" && !state.truth.receivedUnemployment;
      if (liedAboutUnemployment) {
        next = applyRisk(next, "INCOME_INCONSISTENT");
      }
      next.banner = {
        tone: "neutral",
        title: "Application Received",
        body: "Your housing application has been submitted for review. No further information needed at this time.",
      };
      next = advanceDay(next);
      next.screen = "map";
      return settle(next);
    }

    case "FOOD_SUBMIT": {
      const attempts = state.flags.foodAttempts + 1;
      const correct = isCorrectSelection(action.selectedIds);
      let next = {
        ...state,
        flags: { ...state.flags, foodAttempts: attempts },
        lastAction: { building: "food", ts: Date.now() },
      };

      if (correct) {
        next.flags.foodApproved = true;
        next.food = Math.min(100, next.food + 35);
        next.stress = Math.max(0, next.stress - 5);
        next.banner = {
          tone: "good",
          title: "Application Approved",
          body: "Food assistance approved. Benefits will be available within 24 hours.",
        };
      } else {
        next = applyRisk(next, "INCOMPLETE_DOCUMENTS");
        if (attempts >= 2) next = applyRisk(next, "MISSED_APPOINTMENT");
        if (attempts >= 3) next = applyRisk(next, "BENEFITS_REAPPLIED");
        next.stress = Math.min(100, next.stress + 10);
        next.banner = {
          tone: "bad",
          title: "Application Denied",
          body: "Documentation incomplete. Come back tomorrow with the correct paperwork.",
        };
      }

      next = advanceDay(next);
      next.screen = "map";
      return settle(next);
    }

    case "EMPLOYMENT_APPLY": {
      const applications = state.flags.employmentApplications + 1;
      let next = {
        ...state,
        flags: { ...state.flags, employmentApplications: applications },
        lastAction: { building: "employment", ts: Date.now() },
      };

      if (applications >= 2 && !state.flags.interviewResolved) {
        next.flags = { ...next.flags, interviewPending: true };
        next.banner = {
          tone: "neutral",
          title: "Interview Scheduled",
          body: "A warehouse wants to interview you — Thursday, 2pm. Your benefits review appointment is the same day, same time.",
        };
      } else {
        next.banner = {
          tone: "neutral",
          title: "Application Submitted",
          body: "Your job application has been received. No word yet.",
        };
      }

      next = advanceDay(next);
      next.screen = "map";
      return settle(next);
    }

    case "EMPLOYMENT_RESOLVE_CONFLICT": {
      let next = {
        ...state,
        flags: { ...state.flags, interviewResolved: true, interviewPending: false },
        lastAction: { building: "employment", ts: Date.now() },
      };

      if (action.choice === "interview") {
        next.flags = { ...next.flags, jobSecured: true };
        next = applyRisk(next, "MISSED_APPOINTMENT");
        next.banner = {
          tone: "good",
          title: "Interview Attended",
          body: "The interview went well — you'll likely be hired. Your benefits review appointment went unattended.",
        };
      } else {
        next.flags = { ...next.flags, jobSecured: false };
        next.banner = {
          tone: "bad",
          title: "Interview Missed",
          body: "You kept your benefits appointment instead. The employer filled the position with someone who showed up.",
        };
      }

      next = advanceDay(next);
      next.screen = "map";
      return settle(next);
    }

    case "HOSPITAL_ER": {
      const erVisits = state.flags.erVisits + 1;
      let next = {
        ...state,
        flags: { ...state.flags, erVisits },
        money: Math.max(0, state.money - 40),
        stress: Math.min(100, state.stress + 5),
        health: Math.min(100, state.health + 40),
        lastAction: { building: "hospital", ts: Date.now() },
      };

      if (erVisits === 2) {
        next = applyRisk(next, "ER_VISIT");
      }

      next.banner = {
        tone: "neutral",
        title: "Treated",
        body: "The ER patches you up. It cost most of the day and money you didn't have to spare, but you're steady again.",
      };

      next = advanceDay(next);
      next.screen = "map";
      return settle(next);
    }

    case "HOSPITAL_IGNORE": {
      let next = {
        ...state,
        health: Math.max(0, state.health - 25),
        stress: Math.min(100, state.stress + 15),
        lastAction: { building: "hospital", ts: Date.now() },
      };
      next = applyRisk(next, "MISSED_APPOINTMENT");
      next.banner = {
        tone: "bad",
        title: "Pushed Through It",
        body: "You go to work sick instead. By afternoon you're too wiped out to make your appointment.",
      };

      next = advanceDay(next);
      next.screen = "map";
      return settle(next);
    }

    case "CONTINUE_FROM_ENDING":
      return { ...state, screen: "reveal" };

    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
