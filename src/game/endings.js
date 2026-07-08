import { FLAG_THRESHOLD } from "./risk";

export function resolveEnding(state) {
  const { riskScore, flags, money } = state;

  const neverEngaged =
    !flags.housingSubmitted && !flags.foodApproved && flags.employmentApplications === 0;

  if (neverEngaged) {
    return {
      id: "invisible",
      title: "Invisible",
      reason: "Stopped Applying",
      body: "You stopped filling out the forms. No denial letter arrives, because you never finished an application for anyone to deny. The system doesn't register you as evicted. It just stops registering you at all.",
    };
  }

  if (flags.injuryOccurred && money <= 0) {
    return {
      id: "evicted",
      title: "Evicted",
      reason: "Medical Debt",
      body: "The job was supposed to be the thing that fixed everything. Then a shift went wrong, and one ER bill undid months of paperwork in an afternoon. Rent didn't stand a chance after that.",
    };
  }

  if (riskScore >= FLAG_THRESHOLD) {
    return {
      id: "evicted",
      title: "Evicted",
      reason: "High Risk Profile",
      body: "Your applications were technically on time. Every form was filled out correctly. It didn't matter — somewhere behind the counter, a number had already decided the answer.",
    };
  }

  if (!flags.housingSubmitted || !flags.foodApproved) {
    return {
      id: "evicted",
      title: "Evicted",
      reason: "Out of Time",
      body: "There wasn't enough time to get everything approved before rent came due. Every office needed one more day you didn't have.",
    };
  }

  if (money <= 0) {
    return {
      id: "evicted",
      title: "Evicted",
      reason: "Ran Out of Money",
      body: "The money ran out before the paperwork ever caught up. The system doesn't send a reason for this one — just a notice taped to the door.",
    };
  }

  const lines = [];
  if (flags.injuryOccurred) {
    lines.push("The job injury set you back for a while, but you recovered financially.");
  }
  lines.push(
    "Every application went through. The risk score stayed under whatever line mattered. None of that turned out to be the thing that decided it."
  );
  lines.push(
    "The building sold. The program ran out of funding. The appeal window closed a day early. There was never a version of this where the paperwork was the actual obstacle."
  );

  return {
    id: "evicted",
    title: "Evicted",
    reason: "Anyway",
    body: lines.join(" "),
  };
}
