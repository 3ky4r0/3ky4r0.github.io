$owner = "duyxyz"
$repo = "My-Script-Collection"
$api = "https://api.github.com/repos/$owner/$repo/contents"
try {
    $files = Invoke-RestMethod -Uri $api | Sort-Object name
    if ($files.Count -eq 0) {
        Write-Host "No files found!"
        pause
        exit
    }
    Clear-Host
    for ($i = 0; $i -lt $files.Count; $i++) {
        $displayName = ($files[$i].name -replace '\.cmd$','') -replace '[._]',' '
        Write-Host "[$($i + 1)] $displayName"
    }
    Write-Host ""

    $index = -1
    while ($true) {
        $choice = Read-Host ">"
        if ($choice -match '^\d+$') {
            $tryIndex = [int]$choice - 1
            if ($tryIndex -ge 0 -and $tryIndex -lt $files.Count) {
                $index = $tryIndex
                break
            }
        }
        Write-Host "Invalid choice, try again!"
    }

    $selected = $files[$index]
    $tempFile = Join-Path $env:TEMP $selected.name
    Invoke-WebRequest `
        -Uri $selected.download_url `
        -OutFile $tempFile
    Start-Process cmd.exe "/c `"$tempFile`"" -Wait
    Remove-Item $tempFile -Force
}
catch {
    Write-Host "Error: $($_.Exception.Message)"
    pause
}
