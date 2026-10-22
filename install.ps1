param([Parameter(Mandatory=$true)][string]$Project, [string]$Restore)
$ErrorActionPreference = 'Stop'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js 22+ is required. Install Node, then rerun this command.' }
$taskArgs = @((Join-Path $PSScriptRoot 'scripts/install.mjs'), '--project', $Project)
if ($Restore) { $taskArgs += @('--restore', $Restore) }
& node @taskArgs
if ($LASTEXITCODE -ne 0) { throw "Colabio installation failed (exit $LASTEXITCODE). Read the error above; do not report success." }
