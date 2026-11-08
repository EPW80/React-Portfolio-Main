import { execSync } from "node:child_process";
import { sanitizeLastmod } from "./env.js";

export function readContentLastmod() {
  try {
    const iso = execSync(
      "git log -1 --format=%cI -- src/data/content.js src/data/site.js src/components src/seo",
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    return sanitizeLastmod(iso);
  } catch {
    return undefined;
  }
}
