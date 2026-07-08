export const RISK_RULES = {
  MISSED_APPOINTMENT: { amount: 1, reason: "Missed appointment" },
  INCOME_INCONSISTENT: { amount: 2, reason: "Income inconsistent" },
  BENEFITS_REAPPLIED: { amount: 2, reason: "Applied for benefits three times" },
  INCOMPLETE_DOCUMENTS: { amount: 2, reason: "Incomplete documents" },
  ADDRESS_CHANGED: { amount: 3, reason: "Address changed twice" },
  ER_VISIT: { amount: 2, reason: "Emergency room visit" },
};

export const FLAG_THRESHOLD = 5;

export function applyRisk(state, ruleKey) {
  const rule = RISK_RULES[ruleKey];
  return {
    ...state,
    riskScore: state.riskScore + rule.amount,
    log: [...state.log, { reason: rule.reason, amount: rule.amount, day: state.day }],
  };
}
