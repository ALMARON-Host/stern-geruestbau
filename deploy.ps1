# Builds the preview and publishes it to GitHub Pages (branch gh-pages).
# Usage:  powershell -ExecutionPolicy Bypass -File .\deploy.ps1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

$env:PAGES_PREVIEW = 'true'
npx astro build
if ($LASTEXITCODE -ne 0) { throw 'Build fehlgeschlagen' }
$env:PAGES_PREVIEW = $null

# GitHub Pages ignores folders starting with "_" (like _astro) unless this file exists.
New-Item -ItemType File -Force 'dist\.nojekyll' | Out-Null

$remote = git remote get-url origin
Push-Location dist
try {
  if (Test-Path .git) { Remove-Item .git -Recurse -Force }
  git init -q -b gh-pages
  git add -A
  git commit -q -m "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  git push -q -f $remote gh-pages
  if ($LASTEXITCODE -ne 0) { throw 'Push fehlgeschlagen' }
  Remove-Item .git -Recurse -Force
}
finally {
  Pop-Location
}
Write-Host 'Online in 1-2 Minuten: https://almaron-host.github.io/stern-geruestbau/'
