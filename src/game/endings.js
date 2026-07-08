import { FLAG_THRESHOLD } from "./risk";

export function resolveEnding(state) {
  const { riskScore, flags, money, health } = state;

  if (money <= 0) {
    return {
      id: "evicted",
      title: "Evicted",
      body: "The money ran out before the paperwork ever caught up. The system doesn't send a reason for this one — just a notice taped to the door.",
    };
  }

  if (riskScore >= FLAG_THRESHOLD) {
    return {
      id: "evicted",
      title: "Evicted",
      body: "Your applications were technically on time. Every form was filled out correctly. It didn't matter — somewhere behind the counter, a number had already decided the answer.",
    };
  }

  if (!flags.housingSubmitted || !flags.foodApproved) {
    return {
      id: "evicted",
      title: "Evicted",
      body: "There wasn't enough time to get everything approved before rent came due. Every office needed one more day you didn't have.",
    };
  }

  const lines = ["Rent is covered.", "The fridge isn't empty."];
  if (flags.jobSecured) {
    lines.push("You start the new job next week — one fewer form to fill out, for now.");
  }
  if (health <= 40) {
    lines.push("You're still worn down from pushing through being sick, but you're upright.");
  }
  lines.push(
    "For now, the paperwork worked the way it was supposed to — you just don't know why it worked this time, either."
  );

  return {
    id: "stable",
    title: "Stable",
    body: lines.join(" "),
  };
}
