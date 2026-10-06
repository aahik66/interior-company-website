# Credentials are read from the gitignored root .env file
$envFile = Join-Path $PSScriptRoot '..\.env'
$vars = @{}
Get-Content $envFile | Where-Object { $_ -match '^\s*([A-Z_]+)=(.*)$' } | ForEach-Object { $vars[$Matches[1]] = $Matches[2].Trim() }
$user = $vars['FTP_USER']
$pass = $vars['FTP_PASSWORD']
$hostIp = $vars['FTP_HOST']

$content = "Dimension Composition test deployment connection successful! " + (Get-Date).ToString()
$bytes = [System.Text.Encoding]::UTF8.GetBytes($content)

$ftp = [System.Net.FtpWebRequest]::Create("ftp://$hostIp/test_connection.txt")
$ftp.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
$ftp.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
$ftp.UsePassive = $true
$ftp.KeepAlive = $false
$ftp.UseBinary = $true
$ftp.Timeout = 15000

$stream = $ftp.GetRequestStream()
$stream.Write($bytes, 0, $bytes.Length)
$stream.Close()

$response = $ftp.GetResponse()
Write-Host "Upload Status: " $response.StatusDescription
$response.Close()
