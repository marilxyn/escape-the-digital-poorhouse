export const JOBS = {
  warehouse: {
    id: "warehouse",
    label: "Warehouse Associate — $14/hr",
    wagePerDay: 50,
    injury: {
      flavor:
        "A pallet was stacked wrong and nobody flagged it. You feel your back give out halfway through the lift.",
      cost: 180,
      healthLoss: 30,
      stressGain: 20,
    },
  },
  cashier: {
    id: "cashier",
    label: "Retail Cashier — $13.50/hr",
    wagePerDay: 48,
    injury: {
      flavor:
        "A spill near the registers never got mopped up. You go down hard and land wrong on your wrist.",
      cost: 120,
      healthLoss: 15,
      stressGain: 10,
    },
  },
  driver: {
    id: "driver",
    label: "Delivery Driver — $15/hr",
    wagePerDay: 55,
    injury: {
      flavor:
        "A car runs the light while you're halfway through a delivery. The other driver has insurance. You don't have time to argue about it.",
      cost: 260,
      healthLoss: 45,
      stressGain: 30,
    },
  },
};

export function getJob(postingType) {
  return JOBS[postingType] ?? JOBS.warehouse;
}
