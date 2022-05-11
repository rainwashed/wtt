$fileHash = Get-FileHash .\build\wintt.exe
$fileHash = $fileHash | Format-List
$fileHash = Out-String -InputObject $fileHash -Width 50

echo "Attempting to generate hash using Powershell Script"

Set-Content -Path .\build\wintt.pschecksum -Value $fileHash