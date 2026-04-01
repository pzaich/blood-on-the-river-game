#!/bin/bash
# Generate spritesheets for RPG-JS (3 cols x 4 rows, 32x32 each = 96x128)
cd "$(dirname "$0")/.."
CHARS="main/spritesheets/characters"

# --- BARREL ---
convert -size 96x128 xc:none \
    -fill '#5a3a1a' -draw "roundrectangle 4,4 28,28 4,4" -fill '#c4a35a' -draw "rectangle 4,12 28,14" -fill '#c4a35a' -draw "rectangle 4,19 28,21" \
    -fill '#5a3a1a' -draw "roundrectangle 36,4 60,28 4,4" -fill '#c4a35a' -draw "rectangle 36,12 60,14" -fill '#c4a35a' -draw "rectangle 36,19 60,21" \
    -fill '#5a3a1a' -draw "roundrectangle 68,4 92,28 4,4" -fill '#c4a35a' -draw "rectangle 68,12 92,14" -fill '#c4a35a' -draw "rectangle 68,19 92,21" \
    -fill '#5a3a1a' -draw "roundrectangle 4,36 28,60 4,4" -fill '#c4a35a' -draw "rectangle 4,44 28,46" -fill '#c4a35a' -draw "rectangle 4,51 28,53" \
    -fill '#5a3a1a' -draw "roundrectangle 36,36 60,60 4,4" -fill '#c4a35a' -draw "rectangle 36,44 60,46" -fill '#c4a35a' -draw "rectangle 36,51 60,53" \
    -fill '#5a3a1a' -draw "roundrectangle 68,36 92,60 4,4" -fill '#c4a35a' -draw "rectangle 68,44 92,46" -fill '#c4a35a' -draw "rectangle 68,51 92,53" \
    -fill '#5a3a1a' -draw "roundrectangle 4,68 28,92 4,4" -fill '#c4a35a' -draw "rectangle 4,76 28,78" -fill '#c4a35a' -draw "rectangle 4,83 28,85" \
    -fill '#5a3a1a' -draw "roundrectangle 36,68 60,92 4,4" -fill '#c4a35a' -draw "rectangle 36,76 60,78" -fill '#c4a35a' -draw "rectangle 36,83 60,85" \
    -fill '#5a3a1a' -draw "roundrectangle 68,68 92,92 4,4" -fill '#c4a35a' -draw "rectangle 68,76 92,78" -fill '#c4a35a' -draw "rectangle 68,83 92,85" \
    -fill '#5a3a1a' -draw "roundrectangle 4,100 28,124 4,4" -fill '#c4a35a' -draw "rectangle 4,108 28,110" -fill '#c4a35a' -draw "rectangle 4,115 28,117" \
    -fill '#5a3a1a' -draw "roundrectangle 36,100 60,124 4,4" -fill '#c4a35a' -draw "rectangle 36,108 60,110" -fill '#c4a35a' -draw "rectangle 36,115 60,117" \
    -fill '#5a3a1a' -draw "roundrectangle 68,100 92,124 4,4" -fill '#c4a35a' -draw "rectangle 68,108 92,110" -fill '#c4a35a' -draw "rectangle 68,115 92,117" \
    "$CHARS/barrel.png"
echo "Generated barrel.png"

# --- CRATE ---
convert -size 96x128 xc:none \
    -fill '#7a5c2e' -draw "rectangle 4,4 28,28" -fill '#654321' -draw "line 4,4 28,28" -fill '#654321' -draw "line 4,28 28,4" -fill '#c4a35a' -draw "rectangle 12,4 20,28" \
    -fill '#7a5c2e' -draw "rectangle 36,4 60,28" -fill '#654321' -draw "line 36,4 60,28" -fill '#654321' -draw "line 36,28 60,4" -fill '#c4a35a' -draw "rectangle 44,4 52,28" \
    -fill '#7a5c2e' -draw "rectangle 68,4 92,28" -fill '#654321' -draw "line 68,4 92,28" -fill '#654321' -draw "line 68,28 92,4" -fill '#c4a35a' -draw "rectangle 76,4 84,28" \
    -fill '#7a5c2e' -draw "rectangle 4,36 28,60" -fill '#654321' -draw "line 4,36 28,60" -fill '#654321' -draw "line 4,60 28,36" -fill '#c4a35a' -draw "rectangle 12,36 20,60" \
    -fill '#7a5c2e' -draw "rectangle 36,36 60,60" -fill '#654321' -draw "line 36,36 60,60" -fill '#654321' -draw "line 36,60 60,36" -fill '#c4a35a' -draw "rectangle 44,36 52,60" \
    -fill '#7a5c2e' -draw "rectangle 68,36 92,60" -fill '#654321' -draw "line 68,36 92,60" -fill '#654321' -draw "line 68,60 92,36" -fill '#c4a35a' -draw "rectangle 76,36 84,60" \
    -fill '#7a5c2e' -draw "rectangle 4,68 28,92" -fill '#654321' -draw "line 4,68 28,92" -fill '#654321' -draw "line 4,92 28,68" -fill '#c4a35a' -draw "rectangle 12,68 20,92" \
    -fill '#7a5c2e' -draw "rectangle 36,68 60,92" -fill '#654321' -draw "line 36,68 60,92" -fill '#654321' -draw "line 36,92 60,68" -fill '#c4a35a' -draw "rectangle 44,68 52,92" \
    -fill '#7a5c2e' -draw "rectangle 68,68 92,92" -fill '#654321' -draw "line 68,68 92,92" -fill '#654321' -draw "line 68,92 92,68" -fill '#c4a35a' -draw "rectangle 76,68 84,92" \
    -fill '#7a5c2e' -draw "rectangle 4,100 28,124" -fill '#654321' -draw "line 4,100 28,124" -fill '#654321' -draw "line 4,124 28,100" -fill '#c4a35a' -draw "rectangle 12,100 20,124" \
    -fill '#7a5c2e' -draw "rectangle 36,100 60,124" -fill '#654321' -draw "line 36,100 60,124" -fill '#654321' -draw "line 36,124 60,100" -fill '#c4a35a' -draw "rectangle 44,100 52,124" \
    -fill '#7a5c2e' -draw "rectangle 68,100 92,124" -fill '#654321' -draw "line 68,100 92,124" -fill '#654321' -draw "line 68,124 92,100" -fill '#c4a35a' -draw "rectangle 76,100 84,124" \
    "$CHARS/crate.png"
echo "Generated crate.png"

# --- SAMUEL (blue shirt, brown hair) ---
# Helper: for each cell, draw head circle + body rect + hair
# Using a simple approach: draw all 12 cells explicitly
convert -size 96x128 xc:none \
    -fill '#3355cc' -draw "rectangle 9,14 23,28" -fill '#ffcc99' -draw "circle 16,10 16,4" -fill '#664422' -draw "rectangle 10,3 22,6" \
    -fill '#3355cc' -draw "rectangle 41,14 55,28" -fill '#ffcc99' -draw "circle 48,10 48,4" -fill '#664422' -draw "rectangle 42,3 54,6" \
    -fill '#3355cc' -draw "rectangle 73,14 87,28" -fill '#ffcc99' -draw "circle 80,10 80,4" -fill '#664422' -draw "rectangle 74,3 86,6" \
    -fill '#3355cc' -draw "rectangle 9,46 23,60" -fill '#ffcc99' -draw "circle 16,42 16,36" -fill '#664422' -draw "rectangle 10,35 22,38" \
    -fill '#3355cc' -draw "rectangle 41,46 55,60" -fill '#ffcc99' -draw "circle 48,42 48,36" -fill '#664422' -draw "rectangle 42,35 54,38" \
    -fill '#3355cc' -draw "rectangle 73,46 87,60" -fill '#ffcc99' -draw "circle 80,42 80,36" -fill '#664422' -draw "rectangle 74,35 86,38" \
    -fill '#3355cc' -draw "rectangle 9,78 23,92" -fill '#ffcc99' -draw "circle 16,74 16,68" -fill '#664422' -draw "rectangle 10,67 22,70" \
    -fill '#3355cc' -draw "rectangle 41,78 55,92" -fill '#ffcc99' -draw "circle 48,74 48,68" -fill '#664422' -draw "rectangle 42,67 54,70" \
    -fill '#3355cc' -draw "rectangle 73,78 87,92" -fill '#ffcc99' -draw "circle 80,74 80,68" -fill '#664422' -draw "rectangle 74,67 86,70" \
    -fill '#3355cc' -draw "rectangle 9,110 23,124" -fill '#ffcc99' -draw "circle 16,106 16,100" -fill '#664422' -draw "rectangle 10,99 22,102" \
    -fill '#3355cc' -draw "rectangle 41,110 55,124" -fill '#ffcc99' -draw "circle 48,106 48,100" -fill '#664422' -draw "rectangle 42,99 54,102" \
    -fill '#3355cc' -draw "rectangle 73,110 87,124" -fill '#ffcc99' -draw "circle 80,106 80,100" -fill '#664422' -draw "rectangle 74,99 86,102" \
    "$CHARS/samuel.png"
echo "Generated samuel.png"

# --- CAPTAIN SMITH (red coat, black hat) ---
convert -size 96x128 xc:none \
    -fill '#cc3333' -draw "rectangle 8,14 24,28" -fill '#ffcc99' -draw "circle 16,10 16,4" -fill '#333333' -draw "rectangle 8,2 24,5" \
    -fill '#cc3333' -draw "rectangle 40,14 56,28" -fill '#ffcc99' -draw "circle 48,10 48,4" -fill '#333333' -draw "rectangle 40,2 56,5" \
    -fill '#cc3333' -draw "rectangle 72,14 88,28" -fill '#ffcc99' -draw "circle 80,10 80,4" -fill '#333333' -draw "rectangle 72,2 88,5" \
    -fill '#cc3333' -draw "rectangle 8,46 24,60" -fill '#ffcc99' -draw "circle 16,42 16,36" -fill '#333333' -draw "rectangle 8,34 24,37" \
    -fill '#cc3333' -draw "rectangle 40,46 56,60" -fill '#ffcc99' -draw "circle 48,42 48,36" -fill '#333333' -draw "rectangle 40,34 56,37" \
    -fill '#cc3333' -draw "rectangle 72,46 88,60" -fill '#ffcc99' -draw "circle 80,42 80,36" -fill '#333333' -draw "rectangle 72,34 88,37" \
    -fill '#cc3333' -draw "rectangle 8,78 24,92" -fill '#ffcc99' -draw "circle 16,74 16,68" -fill '#333333' -draw "rectangle 8,66 24,69" \
    -fill '#cc3333' -draw "rectangle 40,78 56,92" -fill '#ffcc99' -draw "circle 48,74 48,68" -fill '#333333' -draw "rectangle 40,66 56,69" \
    -fill '#cc3333' -draw "rectangle 72,78 88,92" -fill '#ffcc99' -draw "circle 80,74 80,68" -fill '#333333' -draw "rectangle 72,66 88,69" \
    -fill '#cc3333' -draw "rectangle 8,110 24,124" -fill '#ffcc99' -draw "circle 16,106 16,100" -fill '#333333' -draw "rectangle 8,98 24,101" \
    -fill '#cc3333' -draw "rectangle 40,110 56,124" -fill '#ffcc99' -draw "circle 48,106 48,100" -fill '#333333' -draw "rectangle 40,98 56,101" \
    -fill '#cc3333' -draw "rectangle 72,110 88,124" -fill '#ffcc99' -draw "circle 80,106 80,100" -fill '#333333' -draw "rectangle 72,98 88,101" \
    "$CHARS/smith.png"
echo "Generated smith.png"

# --- REVEREND HUNT (black robe, white collar) ---
convert -size 96x128 xc:none \
    -fill '#222222' -draw "rectangle 8,14 24,28" -fill '#ffcc99' -draw "circle 16,10 16,4" -fill '#ffffff' -draw "rectangle 14,14 18,18" \
    -fill '#222222' -draw "rectangle 40,14 56,28" -fill '#ffcc99' -draw "circle 48,10 48,4" -fill '#ffffff' -draw "rectangle 46,14 50,18" \
    -fill '#222222' -draw "rectangle 72,14 88,28" -fill '#ffcc99' -draw "circle 80,10 80,4" -fill '#ffffff' -draw "rectangle 78,14 82,18" \
    -fill '#222222' -draw "rectangle 8,46 24,60" -fill '#ffcc99' -draw "circle 16,42 16,36" -fill '#ffffff' -draw "rectangle 14,46 18,50" \
    -fill '#222222' -draw "rectangle 40,46 56,60" -fill '#ffcc99' -draw "circle 48,42 48,36" -fill '#ffffff' -draw "rectangle 46,46 50,50" \
    -fill '#222222' -draw "rectangle 72,46 88,60" -fill '#ffcc99' -draw "circle 80,42 80,36" -fill '#ffffff' -draw "rectangle 78,46 82,50" \
    -fill '#222222' -draw "rectangle 8,78 24,92" -fill '#ffcc99' -draw "circle 16,74 16,68" -fill '#ffffff' -draw "rectangle 14,78 18,82" \
    -fill '#222222' -draw "rectangle 40,78 56,92" -fill '#ffcc99' -draw "circle 48,74 48,68" -fill '#ffffff' -draw "rectangle 46,78 50,82" \
    -fill '#222222' -draw "rectangle 72,78 88,92" -fill '#ffcc99' -draw "circle 80,74 80,68" -fill '#ffffff' -draw "rectangle 78,78 82,82" \
    -fill '#222222' -draw "rectangle 8,110 24,124" -fill '#ffcc99' -draw "circle 16,106 16,100" -fill '#ffffff' -draw "rectangle 14,110 18,114" \
    -fill '#222222' -draw "rectangle 40,110 56,124" -fill '#ffcc99' -draw "circle 48,106 48,100" -fill '#ffffff' -draw "rectangle 46,110 50,114" \
    -fill '#222222' -draw "rectangle 72,110 88,124" -fill '#ffcc99' -draw "circle 80,106 80,100" -fill '#ffffff' -draw "rectangle 78,110 82,114" \
    "$CHARS/hunt.png"
echo "Generated hunt.png"

# --- RICHARD MUTTON (brown clothes, smaller body) ---
convert -size 96x128 xc:none \
    -fill '#8B6914' -draw "rectangle 10,16 22,28" -fill '#ffcc99' -draw "circle 16,12 16,7" \
    -fill '#8B6914' -draw "rectangle 42,16 54,28" -fill '#ffcc99' -draw "circle 48,12 48,7" \
    -fill '#8B6914' -draw "rectangle 74,16 86,28" -fill '#ffcc99' -draw "circle 80,12 80,7" \
    -fill '#8B6914' -draw "rectangle 10,48 22,60" -fill '#ffcc99' -draw "circle 16,44 16,39" \
    -fill '#8B6914' -draw "rectangle 42,48 54,60" -fill '#ffcc99' -draw "circle 48,44 48,39" \
    -fill '#8B6914' -draw "rectangle 74,48 86,60" -fill '#ffcc99' -draw "circle 80,44 80,39" \
    -fill '#8B6914' -draw "rectangle 10,80 22,92" -fill '#ffcc99' -draw "circle 16,76 16,71" \
    -fill '#8B6914' -draw "rectangle 42,80 54,92" -fill '#ffcc99' -draw "circle 48,76 48,71" \
    -fill '#8B6914' -draw "rectangle 74,80 86,92" -fill '#ffcc99' -draw "circle 80,76 80,71" \
    -fill '#8B6914' -draw "rectangle 10,112 22,124" -fill '#ffcc99' -draw "circle 16,108 16,103" \
    -fill '#8B6914' -draw "rectangle 42,112 54,124" -fill '#ffcc99' -draw "circle 48,108 48,103" \
    -fill '#8B6914' -draw "rectangle 74,112 86,124" -fill '#ffcc99' -draw "circle 80,108 80,103" \
    "$CHARS/richard.png"
echo "Generated richard.png"

echo "All sprites generated!"
