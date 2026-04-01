#!/bin/bash
# Generate a ship tileset PNG using ImageMagick
# 8 tiles wide, 4 tiles tall = 256x128 pixels (32x32 per tile)
#
# Tile layout (row, col) → tile ID:
# Row 0: 0=deep water, 1=water wave, 2=wood plank, 3=dark plank, 4=hull wall, 5=mast, 6=rope, 7=rail
# Row 1: 8=bow (pointed), 9=stern, 10=stairs, 11=cannon, 12=crate, 13=barrel, 14=sail white, 15=sail tan
# Row 2: 16=hull left, 17=hull right, 18=hull top, 19=hull bottom, 20=hull TL corner, 21=hull TR corner, 22=hull BL corner, 23=hull BR corner
# Row 3: 24=deck light, 25=deck dark (checkerboard), 26=hatch, 27=wheel, 28=lantern, 29=anchor, 30=flag red, 31=flag blue

OUT="$1"
if [ -z "$OUT" ]; then
    OUT="main/worlds/maps/ship-tiles.png"
fi

TILE=32
COLS=8
ROWS=4
W=$((TILE * COLS))  # 256
H=$((TILE * ROWS))  # 128

# Color definitions
DEEP_WATER="#1a3a5c"
WATER_MED="#2a5a8c"
WATER_LIGHT="#3a7abc"
WOOD="#8B6914"
WOOD_DARK="#654321"
WOOD_LIGHT="#A0822B"
HULL="#3d2b1f"
HULL_DARK="#2a1a0f"
MAST="#5c3a1e"
ROPE="#c4a35a"
RAIL="#6b4226"
SAIL="#f0e6d0"
SAIL_TAN="#d4b896"
CRATE="#7a5c2e"
BARREL="#5a3a1a"
CANNON="#333333"
STAIRS="#6b5030"
HATCH="#4a3520"
WHEEL="#8a6a3a"
LANTERN="#ffd700"
ANCHOR="#555555"
RED="#cc3333"
BLUE="#3355cc"
DECK_LIGHT="#a08050"
DECK_DARK="#8a6a3a"

cd "$(dirname "$0")/.."

# Start with deep water background
convert -size ${W}x${H} xc:"$DEEP_WATER" \
    \
    `# Row 0: Basic tiles` \
    `# 0: Deep water - already background` \
    `# 1: Water with wave pattern` \
    -fill "$WATER_MED" -draw "rectangle 32,0 63,31" \
    -fill "$WATER_LIGHT" -draw "rectangle 36,8 58,12" \
    -fill "$WATER_LIGHT" -draw "rectangle 40,20 54,24" \
    \
    `# 2: Wood plank` \
    -fill "$WOOD" -draw "rectangle 64,0 95,31" \
    -fill "$WOOD_DARK" -draw "rectangle 64,7 95,8" \
    -fill "$WOOD_DARK" -draw "rectangle 64,15 95,16" \
    -fill "$WOOD_DARK" -draw "rectangle 64,23 95,24" \
    -fill "$WOOD_DARK" -draw "rectangle 64,31 95,31" \
    \
    `# 3: Dark plank` \
    -fill "$WOOD_DARK" -draw "rectangle 96,0 127,31" \
    -fill "$HULL" -draw "rectangle 96,7 127,8" \
    -fill "$HULL" -draw "rectangle 96,15 127,16" \
    -fill "$HULL" -draw "rectangle 96,23 127,24" \
    \
    `# 4: Hull wall (solid)` \
    -fill "$HULL" -draw "rectangle 128,0 159,31" \
    -fill "$HULL_DARK" -draw "rectangle 128,0 159,2" \
    -fill "$HULL_DARK" -draw "rectangle 128,29 159,31" \
    \
    `# 5: Mast (vertical pole on wood)` \
    -fill "$WOOD" -draw "rectangle 160,0 191,31" \
    -fill "$MAST" -draw "rectangle 172,0 179,31" \
    -fill "$WOOD_DARK" -draw "rectangle 160,15 191,16" \
    \
    `# 6: Rope (on wood)` \
    -fill "$WOOD" -draw "rectangle 192,0 223,31" \
    -fill "$ROPE" -draw "line 192,0 223,31" \
    -fill "$ROPE" -draw "line 193,0 224,31" \
    \
    `# 7: Rail (wood rail on water side)` \
    -fill "$WOOD" -draw "rectangle 224,0 255,31" \
    -fill "$RAIL" -draw "rectangle 224,0 255,4" \
    -fill "$RAIL" -draw "rectangle 224,0 227,31" \
    -fill "$RAIL" -draw "rectangle 236,0 239,31" \
    -fill "$RAIL" -draw "rectangle 248,0 251,31" \
    \
    `# Row 1` \
    `# 8: Bow (pointed front of ship)` \
    -fill "$HULL" -draw "polygon 32,32 63,48 32,63" \
    -fill "$WOOD" -draw "polygon 33,35 60,48 33,60" \
    \
    `# 9: Stern (flat back)` \
    -fill "$HULL" -draw "rectangle 64,32 95,63" \
    -fill "$WOOD_DARK" -draw "rectangle 67,35 92,60" \
    -fill "$WOOD" -draw "rectangle 70,38 89,57" \
    \
    `# 10: Stairs (hatch opening)` \
    -fill "$WOOD" -draw "rectangle 96,32 127,63" \
    -fill "$STAIRS" -draw "rectangle 100,36 123,59" \
    -fill "$WOOD_DARK" -draw "rectangle 104,40 119,55" \
    -fill "$HULL" -draw "line 104,40 119,55" \
    -fill "$HULL" -draw "line 104,55 119,40" \
    \
    `# 11: Cannon` \
    -fill "$WOOD" -draw "rectangle 128,32 159,63" \
    -fill "$CANNON" -draw "rectangle 134,42 155,53" \
    -fill "$CANNON" -draw "circle 137,47 134,47" \
    -fill "#222222" -draw "rectangle 153,45 159,50" \
    \
    `# 12: Crate` \
    -fill "$WOOD" -draw "rectangle 160,32 191,63" \
    -fill "$CRATE" -draw "rectangle 166,38 185,57" \
    -fill "$WOOD_DARK" -draw "line 166,38 185,57" \
    -fill "$WOOD_DARK" -draw "line 166,57 185,38" \
    -fill "$ROPE" -draw "rectangle 173,38 178,57" \
    \
    `# 13: Barrel` \
    -fill "$WOOD" -draw "rectangle 192,32 223,63" \
    -fill "$BARREL" -draw "roundrectangle 198,36 217,59 4,4" \
    -fill "$ROPE" -draw "rectangle 198,44 217,46" \
    -fill "$ROPE" -draw "rectangle 198,51 217,53" \
    \
    `# 14: Sail (white)` \
    -fill "$SAIL" -draw "rectangle 224,32 255,63" \
    -fill "#e0d6c0" -draw "line 224,32 255,63" \
    \
    `# 15: Sail (tan)` \
    -fill "$SAIL_TAN" -draw "rectangle 0,32 31,63" \
    \
    `# Row 2: Hull edges` \
    `# 16: Hull left edge` \
    -fill "$WOOD" -draw "rectangle 0,64 31,95" \
    -fill "$HULL" -draw "rectangle 0,64 5,95" \
    -fill "$HULL_DARK" -draw "rectangle 0,64 2,95" \
    \
    `# 17: Hull right edge` \
    -fill "$WOOD" -draw "rectangle 32,64 63,95" \
    -fill "$HULL" -draw "rectangle 58,64 63,95" \
    -fill "$HULL_DARK" -draw "rectangle 61,64 63,95" \
    \
    `# 18: Hull top edge` \
    -fill "$WOOD" -draw "rectangle 64,64 95,95" \
    -fill "$HULL" -draw "rectangle 64,64 95,69" \
    -fill "$HULL_DARK" -draw "rectangle 64,64 95,66" \
    -fill "$RAIL" -draw "rectangle 72,64 75,69" \
    -fill "$RAIL" -draw "rectangle 84,64 87,69" \
    \
    `# 19: Hull bottom edge` \
    -fill "$WOOD" -draw "rectangle 96,64 127,95" \
    -fill "$HULL" -draw "rectangle 96,90 127,95" \
    -fill "$HULL_DARK" -draw "rectangle 96,93 127,95" \
    \
    `# 20: Hull top-left corner` \
    -fill "$HULL" -draw "rectangle 128,64 159,95" \
    -fill "$WOOD" -draw "rectangle 134,70 159,95" \
    -fill "$HULL" -draw "rectangle 128,64 133,95" \
    -fill "$HULL" -draw "rectangle 128,64 159,69" \
    \
    `# 21: Hull top-right corner` \
    -fill "$HULL" -draw "rectangle 160,64 191,95" \
    -fill "$WOOD" -draw "rectangle 160,70 185,95" \
    -fill "$HULL" -draw "rectangle 186,64 191,95" \
    -fill "$HULL" -draw "rectangle 160,64 191,69" \
    \
    `# 22: Hull bottom-left corner` \
    -fill "$HULL" -draw "rectangle 192,64 223,95" \
    -fill "$WOOD" -draw "rectangle 198,64 223,89" \
    -fill "$HULL" -draw "rectangle 192,64 197,95" \
    -fill "$HULL" -draw "rectangle 192,90 223,95" \
    \
    `# 23: Hull bottom-right corner` \
    -fill "$HULL" -draw "rectangle 224,64 255,95" \
    -fill "$WOOD" -draw "rectangle 224,64 249,89" \
    -fill "$HULL" -draw "rectangle 250,64 255,95" \
    -fill "$HULL" -draw "rectangle 224,90 255,95" \
    \
    `# Row 3` \
    `# 24: Deck light` \
    -fill "$DECK_LIGHT" -draw "rectangle 0,96 31,127" \
    -fill "$WOOD_DARK" -draw "rectangle 0,103 31,104" \
    -fill "$WOOD_DARK" -draw "rectangle 0,111 31,112" \
    -fill "$WOOD_DARK" -draw "rectangle 0,119 31,120" \
    \
    `# 25: Deck dark` \
    -fill "$DECK_DARK" -draw "rectangle 32,96 63,127" \
    -fill "$WOOD_DARK" -draw "rectangle 32,103 63,104" \
    -fill "$WOOD_DARK" -draw "rectangle 32,111 63,112" \
    -fill "$WOOD_DARK" -draw "rectangle 32,119 63,120" \
    \
    `# 26: Hatch/trapdoor` \
    -fill "$WOOD" -draw "rectangle 64,96 95,127" \
    -fill "$HATCH" -draw "rectangle 68,100 91,123" \
    -fill "#333" -draw "rectangle 76,108 83,115" \
    \
    `# 27: Ship wheel` \
    -fill "$WOOD" -draw "rectangle 96,96 127,127" \
    -fill "$WHEEL" -draw "circle 111,111 111,100" \
    -fill "$WOOD" -draw "circle 111,111 111,107" \
    -fill "$WHEEL" -draw "line 111,100 111,122" \
    -fill "$WHEEL" -draw "line 100,111 122,111" \
    -fill "$WHEEL" -draw "line 103,103 119,119" \
    -fill "$WHEEL" -draw "line 103,119 119,103" \
    \
    `# 28: Lantern` \
    -fill "$WOOD" -draw "rectangle 128,96 159,127" \
    -fill "$LANTERN" -draw "circle 143,107 143,101" \
    -fill "#ffed99" -draw "circle 143,107 143,103" \
    -fill "$CANNON" -draw "rectangle 141,113 145,120" \
    \
    `# 29: Anchor` \
    -fill "$WOOD" -draw "rectangle 160,96 191,127" \
    -fill "$ANCHOR" -draw "line 175,100 175,120" \
    -fill "$ANCHOR" -draw "line 168,114 182,114" \
    -fill "$ANCHOR" -draw "arc 168,114 182,124 0,180" \
    -fill "$ANCHOR" -draw "circle 175,100 175,97" \
    \
    `# 30: Flag red` \
    -fill none -draw "rectangle 192,96 223,127" \
    -fill "$CANNON" -draw "rectangle 194,96 196,127" \
    -fill "$RED" -draw "polygon 197,98 220,104 197,110" \
    \
    `# 31: Below deck floor (darker)` \
    -fill "$WOOD_DARK" -draw "rectangle 224,96 255,127" \
    -fill "$HULL" -draw "rectangle 224,103 255,104" \
    -fill "$HULL" -draw "rectangle 224,111 255,112" \
    -fill "$HULL" -draw "rectangle 224,119 255,120" \
    \
    "$OUT"

echo "Generated ship tileset: $OUT"
