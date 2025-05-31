export function getRandomProductMode(): "list" | "grid" {
  const modes: Array<"list" | "grid"> = ["list", "grid"];
  return modes[Math.floor(Math.random() * modes.length)];
}
