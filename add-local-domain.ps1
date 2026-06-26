# Chay script nay bang quyen Administrator
# Cach 1: Right-click file -> "Run with PowerShell" (neu UAC cho phep)
# Cach 2: Mo PowerShell as Administrator -> cd vao thu muc -> .\add-local-domain.ps1

$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$current = Get-Content $hostsPath -Raw

if ($current -match 'webchoviet\.com') {
    Write-Host "Da co san entry webchoviet.com trong hosts file." -ForegroundColor Yellow
} else {
    $lines = "`r`n# WebChoViet local dev`r`n127.0.0.1   webchoviet.com`r`n127.0.0.1   www.webchoviet.com"
    Add-Content -Path $hostsPath -Value $lines -Encoding ASCII
    Write-Host "Thanh cong! Da them webchoviet.com vao hosts file." -ForegroundColor Green
}

Write-Host ""
Write-Host "Bay gio chay: npm run dev" -ForegroundColor Cyan
Write-Host "Sau do mo trinh duyet: http://webchoviet.com:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Nhan phim bat ky de dong..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
