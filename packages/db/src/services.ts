export async function getPlanLimit(tier: "free" | "pro"): Promise<number> {
  return tier === "free" ? 1 : 5;
}

export async function enforceFreeTierBranding(
  tier: "free" | "pro"
): Promise<boolean> {
  return tier === "free";
}
