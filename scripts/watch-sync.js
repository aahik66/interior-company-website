import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT_DIR = process.cwd();
const WATCH_DIRS = ["src", "server", "public"];
const WATCH_FILES = ["index.html", "package.json", "tailwind.config.js", "vite.config.js"];
const IGNORE_PATTERNS = [/node_modules/, /\.git/, /dist/, /dist-ssr/, /\.log$/, /package-lock\.json$/];

let timeoutId = null;
let isSyncing = false;

function triggerSync() {
  if (isSyncing) return;
  isSyncing = true;

  console.log("\n🔄 File change detected. Triggering auto-sync to GitHub...");
  try {
    // 1. Build dist
    console.log("📦 Building production bundle (dist)...");
    execSync("npm run build", { stdio: "inherit" });

    // 2. Check if git has changes
    const status = execSync("git status --porcelain").toString().trim();
    if (!status) {
      console.log("✨ Working tree clean. No new changes to push.");
      isSyncing = false;
      return;
    }

    // 3. Stage changes
    console.log("📝 Staging changes...");
    execSync("git add .", { stdio: "inherit" });

    // 4. Commit
    const timeString = new Date().toLocaleTimeString();
    const dateString = new Date().toLocaleDateString();
    const commitMsg = `Live auto-sync update [${dateString} ${timeString}]`;
    console.log(`💾 Committing: "${commitMsg}"`);
    execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });

    // 5. Push
    console.log("☁️ Pushing to GitHub (origin/main)...");
    execSync("git push origin main", { stdio: "inherit" });

    console.log("✅ Auto-sync completed successfully! Live on GitHub.\n");
  } catch (err) {
    console.error("⚠️ Auto-sync error:", err.message);
  } finally {
    isSyncing = false;
  }
}

function queueSync() {
  if (timeoutId) clearTimeout(timeoutId);
  // Debounce for 8 seconds after the last file edit
  timeoutId = setTimeout(() => {
    triggerSync();
  }, 8000);
}

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some((pattern) => pattern.test(filePath));
}

function watchDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  fs.watch(dirPath, { recursive: true }, (_eventType, filename) => {
    if (!filename) return;
    const fullPath = path.join(dirPath, filename);
    if (shouldIgnore(fullPath)) return;

    queueSync();
  });
}

console.log("👁️ GitHub Live Auto-Sync Watcher is running...");
console.log("Watching for changes in src/, server/, public/, and config files...");
console.log("Any save will automatically build, commit, and push to GitHub within 8 seconds.");

// Watch target directories recursively
WATCH_DIRS.forEach((d) => {
  const full = path.join(ROOT_DIR, d);
  watchDirectory(full);
});

// Watch individual root files
WATCH_FILES.forEach((f) => {
  const full = path.join(ROOT_DIR, f);
  if (fs.existsSync(full)) {
    fs.watch(full, () => queueSync());
  }
});

// Keep process alive indefinitely
setInterval(() => {}, 1000 * 60 * 60);
