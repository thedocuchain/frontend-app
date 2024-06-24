export function getScaleFactor(pageRatio: number): number {
  if (pageRatio < 0.5) return 0.05
  if (pageRatio > 0.5 && pageRatio < 0.82) return 0.1
  if (pageRatio < 0.82) return 0.15
  return 0.2
}
