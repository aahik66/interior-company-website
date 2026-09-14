@echo off
title Sync Interior Website to GitHub
cd /d "%~dp0"
echo ========================================================
echo   Auto-Syncing Dimension Composition to GitHub
echo ========================================================
echo.
node scripts/sync.js %*
echo.
echo Press any key to close this window...
pause >nul
