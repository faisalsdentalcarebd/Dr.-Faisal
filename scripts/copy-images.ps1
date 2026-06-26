# Run this script from the CODE directory to copy all client images into the project
# Usage: .\scripts\copy-images.ps1

$sourceBase = "E:\My Business\Benzadid Intelligence\Agent Builder\Antigravity\BI Mock Websites for Health Professionals\CLIENTS\2. Clients 2_Dr.Faisal_Faisal Dental care\1. Necessary Documents\1. Images"
$destDoctors = ".\public\images\doctors"
$destServices = ".\public\images\services"

# Create directories
New-Item -ItemType Directory -Force -Path $destDoctors | Out-Null
New-Item -ItemType Directory -Force -Path $destServices | Out-Null

# Doctor photos
$doctorSource = "$sourceBase\1. Doctor Photos"
$doctorPhotos = @(
  "Dr. Faisal At his Chamber.jpeg",
  "Dr. Faisal At his chamber 2.jpeg",
  "Dr. Faisal Checking instruments.jpeg",
  "Dr. Faisal Checking prosthodontic apliance.jpeg",
  "Dr. Faisal Planning Implant.jpeg",
  "Dr. Faisal Thinking about prosthodontic.jpeg",
  "1. Implant Shot.jpeg",
  "Dr. Chamber with apliance.jpeg"
)

foreach ($photo in $doctorPhotos) {
  $src = "$doctorSource\$photo"
  $dst = "$destDoctors\$photo"
  if (Test-Path $src) {
    Copy-Item -Path $src -Destination $dst -Force
    Write-Host "Copied: $photo" -ForegroundColor Green
  } else {
    Write-Host "NOT FOUND: $photo" -ForegroundColor Red
  }
}

# Service images
$serviceSource = "$sourceBase\3. Service Photos"
$servicePhotos = @(
  "1. Crown & Bridge.jpg",
  "2. Dental Implant.jpg",
  "3. Fixed Orthodontics.jpg",
  "4. Root Canal Treatments.jpg",
  "5. Dental Scaling.jpg",
  "6. Tooth Extaction.jpg",
  "7. Dental Fillings.jpg"
)

foreach ($photo in $servicePhotos) {
  $src = "$serviceSource\$photo"
  $dst = "$destServices\$photo"
  if (Test-Path $src) {
    Copy-Item -Path $src -Destination $dst -Force
    Write-Host "Copied: $photo" -ForegroundColor Green
  } else {
    Write-Host "NOT FOUND: $photo" -ForegroundColor Red
  }
}

Write-Host "`nImage copy complete. Run 'npm run dev' to start the development server." -ForegroundColor Cyan
