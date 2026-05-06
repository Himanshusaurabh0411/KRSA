type Metric = { key: string; value: number; unit?: string };

export function buildPerformanceSuggestions(metrics: Metric[], injuryStatus?: string) {
  const suggestions: string[] = [];
  const attendance = metrics.find((metric) => metric.key.toLowerCase().includes("attendance"));
  const endurance = metrics.find((metric) => metric.key.toLowerCase().includes("endurance"));
  const speed = metrics.find((metric) => metric.key.toLowerCase().includes("speed"));

  if (attendance && attendance.value < 80) suggestions.push("Improve weekly attendance consistency before increasing training load.");
  if (endurance && endurance.value < 70) suggestions.push("Add two low-intensity aerobic sessions and track recovery response.");
  if (speed && speed.value < 75) suggestions.push("Schedule acceleration drills twice weekly with full recovery between reps.");
  if (injuryStatus && injuryStatus !== "cleared") suggestions.push("Keep workload below match intensity until medical clearance is updated.");
  if (suggestions.length === 0) suggestions.push("Maintain current load and add one competitive simulation this week.");

  return suggestions;
}
