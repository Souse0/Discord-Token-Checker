@echo off
title Discord Token Checker
echo Discord Token Checker Baslatiliyor...
echo.

:: Set environment to production
set NODE_ENV=production

:: Start the application
npm run prod

echo.
echo Uygulama kapatildi.
pause