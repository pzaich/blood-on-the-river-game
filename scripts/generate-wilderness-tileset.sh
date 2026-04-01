#!/bin/bash
# Generate wilderness tileset PNG
# 8x4 = 32 tiles at 32x32 = 256x128
#
# Row 0: 0=grass, 1=tall grass, 2=dirt trail, 3=sand, 4=water, 5=shallow water, 6=rocks, 7=cliff
# Row 1: 8=tree pine, 9=tree oak, 10=dead tree, 11=bush, 12=mushroom, 13=berry bush, 14=fallen log, 15=stump
# Row 2: 16=target, 17=sword rack, 18=musket rack, 19=bow rack, 20=rabbit, 21=deer, 22=crab, 23=mussel
# Row 3: 24=dense forest, 25=fern, 26=campsite, 27=fish, 28=seaweed, 29=driftwood, 30=training dummy, 31=footprints

cd "$(dirname "$0")/.."
OUT="main/worlds/maps/wilderness-tiles.png"

convert -size 256x128 xc:'#4a7a2e' \
    \
    `# Row 0` \
    `# 0: grass - background` \
    `# 1: tall grass` \
    -fill '#3d6e24' -draw "rectangle 32,0 63,31" \
    -fill '#5a8a3e' -draw "line 38,0 38,20" -fill '#5a8a3e' -draw "line 42,2 42,18" \
    -fill '#5a8a3e' -draw "line 50,0 50,22" -fill '#4a7a2e' -draw "line 54,4 54,16" \
    -fill '#5a8a3e' -draw "line 58,0 58,20" \
    \
    `# 2: dirt trail` \
    -fill '#8B7355' -draw "rectangle 64,0 95,31" \
    -fill '#7a6245' -draw "rectangle 68,8 78,12" \
    \
    `# 3: sand` \
    -fill '#d4b896' -draw "rectangle 96,0 127,31" \
    -fill '#c4a886' -draw "rectangle 100,10 118,14" \
    \
    `# 4: water` \
    -fill '#2a5a8c' -draw "rectangle 128,0 159,31" \
    -fill '#3a7abc' -draw "rectangle 132,8 154,12" \
    \
    `# 5: shallow water` \
    -fill '#4a8aac' -draw "rectangle 160,0 191,31" \
    -fill '#5a9abc' -draw "rectangle 164,10 186,14" \
    \
    `# 6: rocks` \
    -fill '#4a7a2e' -draw "rectangle 192,0 223,31" \
    -fill '#777777' -draw "roundrectangle 196,10 212,26 3,3" \
    -fill '#888888' -draw "roundrectangle 198,12 210,24 3,3" \
    -fill '#666666' -draw "roundrectangle 210,16 220,26 2,2" \
    \
    `# 7: cliff edge` \
    -fill '#666655' -draw "rectangle 224,0 255,31" \
    -fill '#555544' -draw "rectangle 224,0 255,8" \
    -fill '#4a7a2e' -draw "rectangle 224,26 255,31" \
    \
    `# Row 1` \
    `# 8: pine tree` \
    -fill '#4a7a2e' -draw "rectangle 0,32 31,63" \
    -fill '#5a3a1e' -draw "rectangle 13,50 18,63" \
    -fill '#1d5a06' -draw "polygon 4,54 15,32 27,54" \
    -fill '#2d6a16' -draw "polygon 6,50 15,36 25,50" \
    \
    `# 9: oak tree` \
    -fill '#4a7a2e' -draw "rectangle 32,32 63,63" \
    -fill '#6a4a1e' -draw "rectangle 44,48 50,63" \
    -fill '#2d6a16' -draw "circle 47,42 47,30" \
    -fill '#3d7a26' -draw "circle 47,42 47,34" \
    \
    `# 10: dead tree` \
    -fill '#4a7a2e' -draw "rectangle 64,32 95,63" \
    -fill '#5a4a3a' -draw "rectangle 77,38 81,63" \
    -fill '#5a4a3a' -draw "line 77,44 70,36" \
    -fill '#5a4a3a' -draw "line 81,48 90,40" \
    \
    `# 11: bush` \
    -fill '#4a7a2e' -draw "rectangle 96,32 127,63" \
    -fill '#2d6a16' -draw "roundrectangle 100,44 124,60 6,6" \
    -fill '#3d7a26' -draw "roundrectangle 102,46 122,58 5,5" \
    \
    `# 12: mushroom` \
    -fill '#4a7a2e' -draw "rectangle 128,32 159,63" \
    -fill '#d4d4c4' -draw "rectangle 141,54 145,60" \
    -fill '#cc3333' -draw "polygon 136,54 143,44 150,54" \
    -fill '#ffffff' -draw "circle 140,50 140,48" \
    -fill '#ffffff' -draw "circle 146,50 146,48" \
    \
    `# 13: berry bush` \
    -fill '#4a7a2e' -draw "rectangle 160,32 191,63" \
    -fill '#2d6a16' -draw "roundrectangle 164,44 188,60 5,5" \
    -fill '#cc3355' -draw "circle 170,50 170,48" \
    -fill '#cc3355' -draw "circle 176,52 176,50" \
    -fill '#cc3355' -draw "circle 182,48 182,46" \
    \
    `# 14: fallen log` \
    -fill '#4a7a2e' -draw "rectangle 192,32 223,63" \
    -fill '#6a4a1e' -draw "roundrectangle 194,48 222,56 3,3" \
    -fill '#c4a35a' -draw "circle 194,52 194,49" \
    \
    `# 15: stump` \
    -fill '#4a7a2e' -draw "rectangle 224,32 255,63" \
    -fill '#6a4a1e' -draw "roundrectangle 232,50 248,60 3,3" \
    -fill '#8a6a3e' -draw "roundrectangle 234,48 246,52 2,2" \
    \
    `# Row 2` \
    `# 16: target` \
    -fill '#4a7a2e' -draw "rectangle 0,64 31,95" \
    -fill '#5a3a1e' -draw "rectangle 13,76 18,95" \
    -fill '#ffffff' -draw "circle 15,74 15,64" \
    -fill '#cc3333' -draw "circle 15,74 15,67" \
    -fill '#ffffff' -draw "circle 15,74 15,70" \
    -fill '#cc3333' -draw "circle 15,74 15,72" \
    \
    `# 17: sword rack` \
    -fill '#4a7a2e' -draw "rectangle 32,64 63,95" \
    -fill '#5a3a1e' -draw "rectangle 36,78 60,82" \
    -fill '#5a3a1e' -draw "rectangle 40,70 44,90" \
    -fill '#5a3a1e' -draw "rectangle 52,70 56,90" \
    -fill '#aaaaaa' -draw "rectangle 42,66 44,78" \
    -fill '#aaaaaa' -draw "rectangle 54,66 56,78" \
    \
    `# 18: musket rack` \
    -fill '#4a7a2e' -draw "rectangle 64,64 95,95" \
    -fill '#5a3a1e' -draw "rectangle 68,78 92,82" \
    -fill '#5a3a1e' -draw "rectangle 72,70 76,90" \
    -fill '#5a3a1e' -draw "rectangle 84,70 88,90" \
    -fill '#555555' -draw "rectangle 73,64 75,78" \
    -fill '#555555' -draw "rectangle 85,64 87,78" \
    \
    `# 19: bow rack` \
    -fill '#4a7a2e' -draw "rectangle 96,64 127,95" \
    -fill '#5a3a1e' -draw "rectangle 100,78 124,82" \
    -fill '#8a6a3e' -draw "arc 106,68 118,88 180,360" \
    -fill '#c4a35a' -draw "line 112,68 112,88" \
    \
    `# 20: rabbit` \
    -fill '#4a7a2e' -draw "rectangle 128,64 159,95" \
    -fill '#a08060' -draw "roundrectangle 134,76 154,88 4,4" \
    -fill '#b09070' -draw "circle 150,78 150,74" \
    -fill '#a08060' -draw "rectangle 148,68 150,76" \
    -fill '#a08060' -draw "rectangle 152,68 154,76" \
    -fill '#ffffff' -draw "circle 152,77 152,76" \
    \
    `# 21: deer` \
    -fill '#4a7a2e' -draw "rectangle 160,64 191,95" \
    -fill '#8a6a3a' -draw "roundrectangle 164,74 186,90 3,3" \
    -fill '#9a7a4a' -draw "circle 184,74 184,68" \
    -fill '#6a4a1e' -draw "line 182,64 184,68" \
    -fill '#6a4a1e' -draw "line 186,64 184,68" \
    -fill '#ffffff' -draw "circle 185,73 185,72" \
    \
    `# 22: crab` \
    -fill '#d4b896' -draw "rectangle 192,64 223,95" \
    -fill '#cc5533' -draw "roundrectangle 200,76 216,86 3,3" \
    -fill '#cc5533' -draw "line 200,78 194,72" \
    -fill '#cc5533' -draw "line 216,78 222,72" \
    -fill '#dd6644' -draw "line 194,72 192,68" \
    -fill '#dd6644' -draw "line 222,72 224,68" \
    \
    `# 23: mussel` \
    -fill '#d4b896' -draw "rectangle 224,64 255,95" \
    -fill '#333355' -draw "roundrectangle 234,74 250,86 5,5" \
    -fill '#444466' -draw "roundrectangle 236,76 248,84 4,4" \
    \
    `# Row 3` \
    `# 24: dense forest` \
    -fill '#1d4a06' -draw "rectangle 0,96 31,127" \
    -fill '#2d5a16' -draw "circle 10,110 10,100" \
    -fill '#1d4a06' -draw "circle 22,108 22,98" \
    -fill '#2d5a16' -draw "circle 16,118 16,108" \
    \
    `# 25: fern` \
    -fill '#4a7a2e' -draw "rectangle 32,96 63,127" \
    -fill '#3d8a24' -draw "polygon 36,120 47,100 47,120" \
    -fill '#3d8a24' -draw "polygon 47,120 58,100 58,120" \
    \
    `# 26: campsite` \
    -fill '#8B7355' -draw "rectangle 64,96 95,127" \
    -fill '#777777' -draw "circle 79,115 79,108" \
    -fill '#ff6600' -draw "polygon 76,112 79,100 82,112" \
    -fill '#ffcc00' -draw "polygon 77,112 79,104 81,112" \
    \
    `# 27: fish` \
    -fill '#2a5a8c' -draw "rectangle 96,96 127,127" \
    -fill '#aaaacc' -draw "polygon 102,111 120,105 120,117" \
    -fill '#8888aa' -draw "polygon 120,108 126,111 120,114" \
    -fill '#222244' -draw "circle 106,110 106,109" \
    \
    `# 28: seaweed` \
    -fill '#2a5a8c' -draw "rectangle 128,96 159,127" \
    -fill '#2d6a16' -draw "line 136,127 134,106" \
    -fill '#3d7a26' -draw "line 142,127 144,108" \
    -fill '#2d6a16' -draw "line 148,127 146,110" \
    \
    `# 29: driftwood` \
    -fill '#d4b896' -draw "rectangle 160,96 191,127" \
    -fill '#8a7a5a' -draw "roundrectangle 162,112 190,120 3,3" \
    -fill '#7a6a4a' -draw "line 166,112 170,106" \
    \
    `# 30: training dummy` \
    -fill '#4a7a2e' -draw "rectangle 192,96 223,127" \
    -fill '#5a3a1e' -draw "rectangle 205,108 209,127" \
    -fill '#c4a35a' -draw "rectangle 198,104 216,112" \
    -fill '#d4b896' -draw "circle 207,100 207,94" \
    \
    `# 31: footprints` \
    -fill '#4a7a2e' -draw "rectangle 224,96 255,127" \
    -fill '#3d6e24' -draw "roundrectangle 230,100 236,108 1,1" \
    -fill '#3d6e24' -draw "roundrectangle 240,110 246,118 1,1" \
    -fill '#3d6e24' -draw "roundrectangle 232,118 238,126 1,1" \
    \
    "$OUT"

echo "Generated wilderness tileset: $OUT"
