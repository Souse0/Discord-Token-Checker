# Discord Token Checker - PowerShell Script

Write-Host "Discord Token Checker Baslatiliyor..." -ForegroundColor Cyan
Write-Host ""

# Check if node is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js surumu: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Hata: Node.js bulunamadi!" -ForegroundColor Red
    Write-Host "Lutfen once Node.js'i indirip yukleyin: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm surumu: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Hata: npm bulunamadi!" -ForegroundColor Red
    Write-Host "Lutfen once Node.js'i indirip yukleyin: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (!(Test-Path "node_modules")) {
    Write-Host "Bagimliliklar yukleniyor..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Hata: Bagimliliklar yuklenemedi!" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "Bagimliliklar basariyla yuklendi." -ForegroundColor Green
    Write-Host ""
}

# Start the application
Write-Host "Uygulama baslatiliyor..." -ForegroundColor Yellow
npm start
if ($LASTEXITCODE -ne 0) {
    Write-Host "Hata: Uygulama baslatilamadi!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "Uygulama kapatildi." -ForegroundColor Cyan
pause