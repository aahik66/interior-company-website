import { execSync } from "child_process";

console.log("🚀 Starting automatic GitHub sync...");

try {
  // 1. Build production assets so Hostinger gets latest compiled dist
  console.log("📦 Building production bundle (dist)...");
  execSync("npm run build", { stdio: "inherit" });

  // 2. Check for changes
  const status = execSync("git status --porcelain").toString().trim();
  if (!status) {
    console.log("✨ No changes to sync. Working tree clean!");
    process.exit(0);
  }

  // 3. Stage changes
  console.log("📝 Staging changes...");
  execSync("git add .", { stdio: "inherit" });

  // 4. Commit with custom or timestamped message
  const customMessage = process.argv.slice(2).join(" ");
  const commitMsg = customMessage || `Auto-update website: ${new Date().toLocaleString()}`;
  console.log(`💾 Committing: "${commitMsg}"`);
  execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });

  // 5. Push to GitHub
  console.log("☁️ Pushing to GitHub (origin/main)...");
  execSync("git push origin main", { stdio: "inherit" });

  console.log("\n✅ SUCCESS! All changes pushed to GitHub:");
  console.log("🔗 https://github.com/aahik66/interior-company-website\n");
} catch (error) {
  console.error("\n❌ GitHub sync failed:", error.message);
  process.exit(1);
}
