# Credentials are read from the gitignored root .env file
$envFile = Join-Path $PSScriptRoot '..\.env'
$vars = @{}
Get-Content $envFile | Where-Object { $_ -match '^\s*([A-Z_]+)=(.*)$' } | ForEach-Object { $vars[$Matches[1]] = $Matches[2].Trim() }
$user = $vars['FTP_USER']
$pass = $vars['FTP_PASSWORD']

Write-Host "Testing $user with UsePassive = false..."
try {
    $ftp = [System.Net.FtpWebRequest]::Create("ftp://145.79.25.212/")
    $ftp.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
    $ftp.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
    $ftp.UsePassive = $false
    $ftp.Timeout = 10000
    $response = $ftp.GetResponse()
    Write-Host ">>> SUCCESS with UsePassive = false!"
    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    Write-Host $reader.ReadToEnd()
    $reader.Close()
    $response.Close()
    exit 0
} catch {
    Write-Host "Failed with false: " $_.Exception.Message
}

Write-Host "Testing $user with KeepAlive = false..."
try {
    $ftp = [System.Net.FtpWebRequest]::Create("ftp://145.79.25.212/")
    $ftp.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
    $ftp.Method = [System.Net.WebRequestMethods+Ftp]::PrintWorkingDirectory
    $ftp.UsePassive = $true
    $ftp.KeepAlive = $false
    $ftp.Timeout = 10000
    $response = $ftp.GetResponse()
    Write-Host ">>> SUCCESS with PWD: " $response.StatusDescription
    $response.Close()
    exit 0
} catch {
    Write-Host "Failed with PWD: " $_.Exception.Message
}
