export const DOCUMENT_POOL = [
  { id: "id-valid", label: "Government ID", valid: true },
  { id: "id-expired", label: "Expired ID (2019)", valid: false },
  { id: "pay-stub", label: "Proof of Income (Pay Stub)", valid: true },
  { id: "utility-current", label: "Utility Bill (This Month)", valid: true },
  { id: "utility-old", label: "Utility Bill (3 Months Old)", valid: false },
  { id: "bank-statement", label: "Bank Statement", valid: true },
  { id: "reference-letter", label: "Personal Reference Letter", valid: false },
];

export const REQUIRED_DOC_IDS = DOCUMENT_POOL.filter((d) => d.valid).map((d) => d.id);

export function isCorrectSelection(selectedIds) {
  if (selectedIds.length !== REQUIRED_DOC_IDS.length) return false;
  const set = new Set(selectedIds);
  return REQUIRED_DOC_IDS.every((id) => set.has(id));
}
