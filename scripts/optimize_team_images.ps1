[System.Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null

function Optimize-Image {
    param (
        [string]$Url,
        [string]$OutputPath,
        [int]$MaxWidth = 640,
        [long]$Quality = 82
    )

    Write-Host "Downloading $Url..."
    $tempFile = [System.IO.Path]::GetTempFileName()
    Invoke-WebRequest -Uri $Url -OutFile $tempFile -UserAgent "Mozilla/5.0"

    $origSize = (Get-Item $tempFile).Length
    Write-Host "Original size: $([math]::Round($origSize / 1MB, 2)) MB"

    $img = [System.Drawing.Image]::FromFile($tempFile)

    $newWidth = $img.Width
    $newHeight = $img.Height

    if ($newWidth -gt $MaxWidth) {
        $newHeight = [int]($img.Height * ($MaxWidth / $img.Width))
        $newWidth = $MaxWidth
    }

    $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)

    $bmp.Save($OutputPath, $encoder, $encoderParams)

    $graphics.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Remove-Item $tempFile

    $newSize = (Get-Item $OutputPath).Length
    Write-Host "Optimized saved to ${OutputPath}: $([math]::Round($newSize / 1KB, 1)) KB (Reduced by $([math]::Round((1 - ($newSize / $origSize)) * 100, 1))%)"
}

Optimize-Image -Url "https://swapnopuron.com/wp-content/uploads/2026/08/swapno-puron-5-scaled.png" -OutputPath "public/assets/team/kawsar-ahmed.jpg"
Optimize-Image -Url "https://swapnopuron.com/wp-content/uploads/2026/08/swapno-puron-8.png" -OutputPath "public/assets/team/anisur-rahman.jpg"
Optimize-Image -Url "https://dimensioncomposition.com/uploads/5167_1789711710134_69034.jpg" -OutputPath "public/assets/team/shohid-sumon.jpg"
