$owner = "duyxyz"
$repo = "CMD"
$api = "https://api.github.com/repos/$owner/$repo/contents"
try {
    $files = Invoke-RestMethod -Uri $api | Sort-Object name
    if ($files.Count -eq 0) {
        Write-Host "Khong tim thay file nao!"
        pause
        exit
    }
    Clear-Host
    for ($i = 0; $i -lt $files.Count; $i++) {
        $displayName = ($files[$i].name -replace '\.cmd$','') -replace '[._]',' '
        Write-Host "[$($i + 1)] $displayName"
    }
    Write-Host ""
    $choice = Read-Host ">"
    if ($choice -notmatch '^\d+$') {
        Write-Host "Lua chon khong hop le!"
        pause
        exit
    }
    $index = [int]$choice - 1
    if ($index -lt 0 -or $index -ge $files.Count) {
        Write-Host "Lua chon khong hop le!"
        pause
        exit
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
    Write-Host "Loi: $($_.Exception.Message)"
    pause
}
