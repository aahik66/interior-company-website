$user = 'u488507743.dimension'
$pass = 'Worldwide7171@'
$hostIp = '145.79.25.212'

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
