#!/bin/bash
# Generate Jamestown tileset PNG
# 8 tiles wide, 4 tiles tall = 256x128 (32x32 per tile)
#
# Row 0: 0=grass, 1=grass2, 2=dirt, 3=dirt path, 4=water, 5=water wave, 6=sand, 7=mud
# Row 1: 8=tree trunk, 9=tree top, 10=log pile, 11=hay bale, 12=mud pile, 13=palisade wall, 14=construction site, 15=stone
# Row 2: 16=house wall, 17=house roof, 18=door, 19=storehouse, 20=lookout base, 21=lookout top, 22=campfire, 23=flag pole
# Row 3: 24=forest dense, 25=bush, 26=flowers, 27=axe on stump, 28=wood plank floor, 29=fence, 30=gate, 31=sign

cd "$(dirname "$0")/.."
OUT="main/worlds/maps/jamestown-tiles.png"

convert -size 256x128 xc:'#4a7a2e' \
    \
    `# Row 0` \
    `# 0: grass (base) - already the background` \
    `# 1: grass variant` \
    -fill '#3d6e24' -draw "rectangle 32,0 63,31" \
    -fill '#4a7a2e' -draw "rectangle 36,4 40,8" \
    -fill '#5a8a3e' -draw "rectangle 48,12 52,16" \
    -fill '#3d6e24' -draw "rectangle 56,22 60,26" \
    \
    `# 2: dirt` \
    -fill '#8B7355' -draw "rectangle 64,0 95,31" \
    -fill '#7a6245' -draw "rectangle 70,8 80,12" \
    -fill '#9a8365' -draw "rectangle 82,20 90,24" \
    \
    `# 3: dirt path` \
    -fill '#9a8365' -draw "rectangle 96,0 127,31" \
    -fill '#8B7355' -draw "rectangle 96,0 127,2" \
    -fill '#8B7355' -draw "rectangle 96,29 127,31" \
    \
    `# 4: water` \
    -fill '#2a5a8c' -draw "rectangle 128,0 159,31" \
    -fill '#3a7abc' -draw "rectangle 132,8 154,12" \
    -fill '#3a7abc' -draw "rectangle 136,20 150,24" \
    \
    `# 5: water wave` \
    -fill '#1a4a7c' -draw "rectangle 160,0 191,31" \
    -fill '#3a7abc' -draw "rectangle 164,6 186,10" \
    -fill '#4a8acc' -draw "rectangle 168,18 182,22" \
    \
    `# 6: sand/beach` \
    -fill '#d4b896' -draw "rectangle 192,0 223,31" \
    -fill '#c4a886' -draw "rectangle 196,8 210,12" \
    \
    `# 7: mud` \
    -fill '#5a4a30' -draw "rectangle 224,0 255,31" \
    -fill '#4a3a20' -draw "rectangle 228,6 248,14" \
    -fill '#6a5a40' -draw "rectangle 232,18 244,26" \
    \
    `# Row 1` \
    `# 8: tree trunk` \
    -fill '#4a7a2e' -draw "rectangle 0,32 31,63" \
    -fill '#5a3a1e' -draw "rectangle 12,40 19,63" \
    -fill '#2d5a16' -draw "circle 15,40 15,28" \
    -fill '#3d6e24' -draw "circle 15,40 15,32" \
    \
    `# 9: tree top (dense canopy)` \
    -fill '#2d5a16' -draw "rectangle 32,32 63,63" \
    -fill '#1d4a06' -draw "circle 47,47 47,36" \
    -fill '#2d5a16' -draw "circle 47,47 47,40" \
    \
    `# 10: log pile` \
    -fill '#4a7a2e' -draw "rectangle 64,32 95,63" \
    -fill '#6a4a1e' -draw "roundrectangle 68,42 92,48 2,2" \
    -fill '#7a5a2e' -draw "roundrectangle 70,48 90,54 2,2" \
    -fill '#5a3a1e' -draw "roundrectangle 72,54 88,60 2,2" \
    -fill '#c4a35a' -draw "circle 68,45 68,43" \
    -fill '#c4a35a' -draw "circle 92,45 92,43" \
    \
    `# 11: hay bale` \
    -fill '#4a7a2e' -draw "rectangle 96,32 127,63" \
    -fill '#d4a030' -draw "roundrectangle 100,40 124,60 4,4" \
    -fill '#c49020' -draw "rectangle 100,48 124,50" \
    -fill '#e4b040' -draw "rectangle 108,40 110,60" \
    \
    `# 12: mud pile` \
    -fill '#4a7a2e' -draw "rectangle 128,32 159,63" \
    -fill '#5a4a30' -draw "polygon 132,60 144,40 156,60" \
    -fill '#4a3a20' -draw "polygon 136,58 144,44 152,58" \
    \
    `# 13: palisade wall` \
    -fill '#6a4a1e' -draw "rectangle 160,32 191,63" \
    -fill '#5a3a1e' -draw "rectangle 162,32 166,63" \
    -fill '#5a3a1e' -draw "rectangle 170,32 174,63" \
    -fill '#5a3a1e' -draw "rectangle 178,32 182,63" \
    -fill '#5a3a1e' -draw "rectangle 186,32 190,63" \
    -fill '#7a5a2e' -draw "rectangle 160,32 191,35" \
    \
    `# 14: construction site (unfinished)` \
    -fill '#4a7a2e' -draw "rectangle 192,32 223,63" \
    -fill '#8B7355' -draw "rectangle 196,48 220,60" \
    -fill '#6a4a1e' -draw "rectangle 198,44 204,60" \
    -fill '#6a4a1e' -draw "rectangle 214,44 220,60" \
    -fill '#c4a35a' -draw "rectangle 204,42 214,44" \
    \
    `# 15: stone` \
    -fill '#4a7a2e' -draw "rectangle 224,32 255,63" \
    -fill '#888888' -draw "roundrectangle 230,44 250,58 3,3" \
    -fill '#999999' -draw "roundrectangle 232,46 248,56 3,3" \
    \
    `# Row 2` \
    `# 16: house wall` \
    -fill '#7a5a2e' -draw "rectangle 0,64 31,95" \
    -fill '#6a4a1e' -draw "rectangle 0,64 31,67" \
    -fill '#6a4a1e' -draw "rectangle 0,92 31,95" \
    -fill '#5a3a1e' -draw "rectangle 12,72 19,88" \
    \
    `# 17: house roof` \
    -fill '#8B4513' -draw "rectangle 32,64 63,95" \
    -fill '#7a3503' -draw "polygon 32,95 47,64 63,95" \
    -fill '#6a2503' -draw "polygon 34,93 47,68 61,93" \
    \
    `# 18: door` \
    -fill '#7a5a2e' -draw "rectangle 64,64 95,95" \
    -fill '#5a3a1e' -draw "rectangle 72,72 88,95" \
    -fill '#c4a35a' -draw "circle 85,83 85,81" \
    \
    `# 19: storehouse (large)` \
    -fill '#6a4a1e' -draw "rectangle 96,64 127,95" \
    -fill '#5a3a1e' -draw "rectangle 96,64 127,70" \
    -fill '#7a5a2e' -draw "rectangle 100,70 124,92" \
    -fill '#5a3a1e' -draw "rectangle 108,78 116,92" \
    \
    `# 20: lookout base` \
    -fill '#4a7a2e' -draw "rectangle 128,64 159,95" \
    -fill '#5a3a1e' -draw "rectangle 136,64 152,95" \
    -fill '#6a4a1e' -draw "rectangle 138,66 150,93" \
    -fill '#5a3a1e' -draw "rectangle 140,74 148,86" \
    \
    `# 21: lookout top (flag)` \
    -fill '#4a7a2e' -draw "rectangle 160,64 191,95" \
    -fill '#5a3a1e' -draw "rectangle 173,64 178,95" \
    -fill '#cc3333' -draw "polygon 179,66 191,72 179,78" \
    \
    `# 22: campfire` \
    -fill '#4a7a2e' -draw "rectangle 192,64 223,95" \
    -fill '#888888' -draw "circle 207,82 207,76" \
    -fill '#ff6600' -draw "polygon 204,78 207,66 210,78" \
    -fill '#ffcc00' -draw "polygon 205,78 207,70 209,78" \
    \
    `# 23: flag pole` \
    -fill '#4a7a2e' -draw "rectangle 224,64 255,95" \
    -fill '#5a3a1e' -draw "rectangle 238,64 241,95" \
    -fill '#3355cc' -draw "polygon 242,66 255,72 242,78" \
    \
    `# Row 3` \
    `# 24: forest dense` \
    -fill '#1d4a06' -draw "rectangle 0,96 31,127" \
    -fill '#2d5a16' -draw "circle 10,110 10,100" \
    -fill '#1d4a06' -draw "circle 22,108 22,98" \
    -fill '#2d5a16' -draw "circle 16,116 16,106" \
    \
    `# 25: bush` \
    -fill '#4a7a2e' -draw "rectangle 32,96 63,127" \
    -fill '#2d6a16' -draw "roundrectangle 36,106 60,124 6,6" \
    -fill '#3d7a26' -draw "roundrectangle 38,108 58,122 5,5" \
    \
    `# 26: flowers` \
    -fill '#4a7a2e' -draw "rectangle 64,96 95,127" \
    -fill '#ff6699' -draw "circle 72,108 72,106" \
    -fill '#ffcc33' -draw "circle 82,114 82,112" \
    -fill '#ff6699' -draw "circle 88,104 88,102" \
    -fill '#ffcc33' -draw "circle 76,120 76,118" \
    \
    `# 27: axe on stump` \
    -fill '#4a7a2e' -draw "rectangle 96,96 127,127" \
    -fill '#5a3a1e' -draw "roundrectangle 104,110 120,124 2,2" \
    -fill '#8B7355' -draw "rectangle 108,100 112,118" \
    -fill '#aaaaaa' -draw "polygon 112,100 120,106 112,108" \
    \
    `# 28: wood plank floor` \
    -fill '#8B6914' -draw "rectangle 128,96 159,127" \
    -fill '#7a5904' -draw "rectangle 128,103 159,104" \
    -fill '#7a5904' -draw "rectangle 128,111 159,112" \
    -fill '#7a5904' -draw "rectangle 128,119 159,120" \
    \
    `# 29: fence` \
    -fill '#4a7a2e' -draw "rectangle 160,96 191,127" \
    -fill '#8B7355' -draw "rectangle 160,106 191,110" \
    -fill '#8B7355' -draw "rectangle 160,116 191,120" \
    -fill '#6a5335' -draw "rectangle 164,100 168,124" \
    -fill '#6a5335' -draw "rectangle 180,100 184,124" \
    \
    `# 30: gate` \
    -fill '#4a7a2e' -draw "rectangle 192,96 223,127" \
    -fill '#6a4a1e' -draw "rectangle 196,100 220,124" \
    -fill '#5a3a1e' -draw "rectangle 200,104 216,120" \
    -fill '#c4a35a' -draw "circle 213,112 213,110" \
    \
    `# 31: sign post` \
    -fill '#4a7a2e' -draw "rectangle 224,96 255,127" \
    -fill '#5a3a1e' -draw "rectangle 237,108 241,127" \
    -fill '#8B6914' -draw "rectangle 230,100 248,112" \
    -fill '#5a3a1e' -draw "rectangle 232,102 246,110" \
    \
    "$OUT"

echo "Generated Jamestown tileset: $OUT"
