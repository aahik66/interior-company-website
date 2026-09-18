import * as ftp from "basic-ftp";
import fs from "fs";

/**
 * Uploads a local file directly to Hostinger's public_html/uploads directory via FTP.
 * Returns the full Hostinger CDN/web URL: https://dimensioncomposition.com/uploads/filename.jpg
 */
export async function uploadFileToHostinger(localPath, filename) {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 60000; // 60s timeout

  try {
    const ftpHost = process.env.FTP_HOST || "145.79.25.212";
    const ftpUser = process.env.FTP_USER || "u488507743.dimension";
    const ftpPass = process.env.FTP_PASS || "Worldwide7171@";
    const publicDomain = process.env.PUBLIC_DOMAIN || "https://dimensioncomposition.com";

    console.log(`Connecting to Hostinger FTP (${ftpHost}) to upload ${filename}...`);
    await client.access({
      host: ftpHost,
      user: ftpUser,
      password: ftpPass,
      secure: false,
    });

    // Ensure Hostinger public_html/uploads directory exists
    await client.ensureDir("/uploads");

    // Upload file
    await client.uploadFrom(localPath, filename);
    console.log(`Successfully uploaded ${filename} to Hostinger storage!`);

    return `${publicDomain}/uploads/${filename}`;
  } catch (err) {
    console.warn("Hostinger FTP upload warning, using local fallback:", err.message);
    return `/uploads/${filename}`;
  } finally {
    client.close();
  }
}
