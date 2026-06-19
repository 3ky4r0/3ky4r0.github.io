$owner = "duyxyz"
$repo = "CMD"

$api = "https://api.github.com/repos/$owner/$repo/contents"

$files = Invoke-RestMethod $api |
    Where-Object { $_.name -like "*.cmd" }

Write-Host ""
Write-Host "=== Duy CMD Menu ==="
Write-Host ""

for ($i = 0; $i -lt $files.Count; $i++) {
    Write-Host "$($i+1). $($files[$i].name)"
}

$choice = Read-Host "Chon lenh"

if ($choice -match '^\d+$') {
    $index = [int]$choice - 1

    if ($index -ge 0 -and $index -lt $files.Count) {
        $temp = "$env:TEMP\$($files[$index].name)"

        Invoke-WebRequest $files[$index].download_url `
            -OutFile $temp

        Start-Process cmd "/c `"$temp`"" -Wait
    }
}
