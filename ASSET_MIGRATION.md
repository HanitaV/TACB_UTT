# Asset Migration Guide

## Current Status

### ✅ Completed
- **JavaScript updated** to support new naming convention
- **Unit 1 photos** renamed: `1-a.png`, `1-b.png`, `1-c.png`, `1-d.png`

### ⚠️ Needs Manual Action

The following files need to be renamed/moved manually:

#### 1. Unit 5 Vocabulary Photos (assets/14/)
Current files might be in `assets/12/` or `assets/14/`. They should be:
- `assets/14/14-1.png` (sunset - spectacular)
- `assets/14/14-2.png` (view - awful)  
- `assets/14/14-3.png` (floor - filthy)
- `assets/14/14-4.png` (window - tiny)
- `assets/14/14-5.png` (room - freezing)
- `assets/14/14-6.png` (smell - disgusting)

#### 2. Unit 2 Memory Palace (assets/3/)
- Move/create: `assets/3/3-room.png` (bedroom illustration)

#### 3. Unit 4 Mindset Diagram (assets/9/)
- Rename: `assets/9/image.png` → `assets/9/9-mindset.png`

#### 4. Review Spork Image (assets/12/)
- Create: `assets/12/12-spork.png` (spork illustration)

## Quick Fix Commands

Run these in PowerShell from the TACB directory:

```powershell
# Create folder 3 if needed
New-Item -ItemType Directory -Path "assets\3" -Force

# Rename mindset diagram (if not done)
Rename-Item -Path "assets\9\image.png" -NewName "9-mindset.png" -ErrorAction SilentlyContinue

# If your files are in assets/12/ and need to be in assets/14/
# First check what's in assets/12/
Get-ChildItem "assets\12"

# If they're numbered 1-6.png, rename them:
1..6 | ForEach-Object { 
    $old = "assets\12\$_.png"
    $new = "assets\14\14-$_.png"
    if (Test-Path $old) {
        Move-Item $old $new -Force
    }
}
```

## Expected Final Structure

```
assets/
├── 1/
│   ├── 1-a.png ✅
│   ├── 1-b.png ✅
│   ├── 1-c.png ✅
│   └── 1-d.png ✅
├── 3/
│   └── 3-room.png ⚠️
├── 9/
│   └── 9-mindset.png ⚠️
├── 12/
│   └── 12-spork.png ⚠️
└── 14/
    ├── 14-1.png ⚠️
    ├── 14-2.png ⚠️
    ├── 14-3.png ⚠️
    ├── 14-4.png ⚠️
    ├── 14-5.png ⚠️
    └── 14-6.png ⚠️
```

## What's Already Working

The website code (`app.js`) has been updated to look for images with the new naming convention:
- `assets/1/1-a.png` through `1-d.png` for Unit 1 Reading
- `assets/14/14-1.png` through `14-6.png` for Unit 5 Vocabulary
- `assets/3/3-room.png` for Memory Palace
- `assets/9/9-mindset.png` for Mindset diagram
- `assets/12/12-spork.png` for Spork image

Once you complete the file renaming above, all images will load correctly!
