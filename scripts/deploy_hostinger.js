import * as ftp from "basic-ftp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

// Get all files recursively from local directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 180000; // 3 minutes per socket operation

  try {
    console.log("==================================================");
    console.log("Connecting to Hostinger (dimensioncomposition.com)...");
    await client.access({
      host: "145.79.25.212",
      user: "u488507743.dimension",
      password: "Worldwide7171@",
      secure: false,
    });
    console.log("Connected successfully!");

    const allFiles = getAllFiles(distDir);
    console.log(`Found ${allFiles.length} files to synchronize.\n`);

    let uploadedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < allFiles.length; i++) {
      const localFilePath = allFiles[i];
      const relativePath = path.relative(distDir, localFilePath).replace(/\\/g, "/");
      const remoteDir = path.dirname(relativePath).replace(/\\/g, "/");
      const fileName = path.basename(localFilePath);
      const localSize = fs.statSync(localFilePath).size;

      // Navigate to target remote directory
      if (remoteDir === "." || remoteDir === "") {
        await client.cd("/");
      } else {
        await client.ensureDir("/" + remoteDir);
      }

      // Check if file already exists with identical size
      let needsUpload = true;
      try {
        const remoteSize = await client.size(fileName);
        if (remoteSize === localSize) {
          needsUpload = false;
          skippedCount++;
          console.log(`[${i + 1}/${allFiles.length}] Already up to date: ${relativePath}`);
        }
      } catch (e) {
        // File doesn't exist remotely, proceed to upload
        needsUpload = true;
      }

      if (needsUpload) {
        let attempts = 0;
        let success = false;
        while (attempts < 3 && !success) {
          attempts++;
          try {
            console.log(`[${i + 1}/${allFiles.length}] Uploading (${(localSize / 1024 / 1024).toFixed(2)} MB): ${relativePath}...`);
            await client.uploadFrom(localFilePath, fileName);
            uploadedCount++;
            success = true;
            console.log(`  -> Done!`);
          } catch (uploadErr) {
            console.warn(`  Warning: Attempt ${attempts} failed for ${relativePath}: ${uploadErr.message}`);
            if (attempts < 3) {
              console.log("  Reconnecting and retrying in 3s...");
              await new Promise(res => setTimeout(res, 3000));
              await client.access({
                host: "145.79.25.212",
                user: "u488507743.dimension",
                password: "Worldwide7171@",
                secure: false,
              });
              if (remoteDir === "." || remoteDir === "") {
                await client.cd("/");
              } else {
                await client.ensureDir("/" + remoteDir);
              }
            } else {
              throw uploadErr;
            }
          }
        }
      }
    }

    // Clean up Hostinger's placeholder default.php if present
    console.log("\nChecking for default placeholder files...");
    await client.cd("/");
    try {
      await client.remove("default.php");
      console.log("Removed default.php placeholder.");
    } catch (e) {
      // Not present or already removed
    }

    console.log("\n==================================================");
    console.log("🎉 DEPLOYMENT 100% SUCCESSFUL!");
    console.log(`Uploaded: ${uploadedCount} files`);
    console.log(`Verified up-to-date: ${skippedCount} files`);
    console.log("Visit your live website now:");
    console.log("🌐 https://dimensioncomposition.com");
    console.log("==================================================");
  } catch (err) {
    console.error("\nDeployment failed:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
