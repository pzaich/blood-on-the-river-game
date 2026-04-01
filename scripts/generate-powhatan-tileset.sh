#!/bin/bash
# Generate Powhatan village tileset PNG
# 8x4 = 32 tiles at 32x32 = 256x128
#
# Row 0: 0=grass, 1=packed earth, 2=dirt path, 3=garden, 4=corn field, 5=water pond, 6=reed mat, 7=fire pit
# Row 1: 8=longhouse wall, 9=longhouse roof, 10=totem, 11=drying rack, 12=pottery, 13=hide on frame, 14=woven basket, 15=canoe
# Row 2: 16=archery target, 17=goal post, 18=ball, 19=feather banner, 20=tree, 21=wildflower, 22=sitting log, 23=drum
# Row 3: 24=dense trees, 25=tall grass, 26=deer hide, 27=sinew, 28=feast table, 29=torch, 30=ceremonial post, 31=peace pipe

cd "$(dirname "$0")/.."
OUT="main/worlds/maps/powhatan-tiles.png"

convert -size 256x128 xc:'#5a8a3e' \
    \
    `# Row 0` \
    `# 0: grass - background` \
    `# 1: packed earth` \
    -fill '#9a8365' -draw "rectangle 32,0 63,31" \
    -fill '#8a7355' -draw "rectangle 36,6 58,10" \
    -fill '#aa9375' -draw "rectangle 40,18 56,22" \
    \
    `# 2: dirt path` \
    -fill '#8a7355' -draw "rectangle 64,0 95,31" \
    -fill '#7a6345' -draw "rectangle 64,0 95,3" \
    -fill '#7a6345' -draw "rectangle 64,28 95,31" \
    \
    `# 3: garden (with small plants)` \
    -fill '#4a7a2e' -draw "rectangle 96,0 127,31" \
    -fill '#6aaa3e' -draw "rectangle 100,6 104,14" \
    -fill '#6aaa3e' -draw "rectangle 110,4 114,12" \
    -fill '#6aaa3e' -draw "rectangle 120,8 124,16" \
    -fill '#6aaa3e' -draw "rectangle 102,18 106,26" \
    -fill '#6aaa3e' -draw "rectangle 114,20 118,28" \
    \
    `# 4: corn field` \
    -fill '#4a7a2e' -draw "rectangle 128,0 159,31" \
    -fill '#7aaa2e' -draw "rectangle 132,0 134,24" \
    -fill '#7aaa2e' -draw "rectangle 140,0 142,22" \
    -fill '#7aaa2e' -draw "rectangle 148,0 150,26" \
    -fill '#7aaa2e' -draw "rectangle 156,0 158,20" \
    -fill '#e8c840' -draw "roundrectangle 131,6 135,12 1,1" \
    -fill '#e8c840' -draw "roundrectangle 147,4 151,10 1,1" \
    \
    `# 5: water pond` \
    -fill '#3a7abc' -draw "rectangle 160,0 191,31" \
    -fill '#4a8acc' -draw "circle 175,15 175,6" \
    \
    `# 6: reed mat (floor)` \
    -fill '#c4a060' -draw "rectangle 192,0 223,31" \
    -fill '#b49050' -draw "rectangle 192,7 223,8" \
    -fill '#b49050' -draw "rectangle 192,15 223,16" \
    -fill '#b49050' -draw "rectangle 192,23 223,24" \
    \
    `# 7: fire pit` \
    -fill '#9a8365' -draw "rectangle 224,0 255,31" \
    -fill '#666666' -draw "circle 239,16 239,8" \
    -fill '#ff6600' -draw "polygon 236,14 239,4 242,14" \
    -fill '#ffcc00' -draw "polygon 237,14 239,7 241,14" \
    \
    `# Row 1` \
    `# 8: longhouse wall` \
    -fill '#8a6a3a' -draw "rectangle 0,32 31,63" \
    -fill '#7a5a2a' -draw "rectangle 0,32 31,36" \
    -fill '#7a5a2a' -draw "rectangle 0,59 31,63" \
    -fill '#6a4a1a' -draw "rectangle 10,40 20,56" \
    \
    `# 9: longhouse roof (curved)` \
    -fill '#5a8a3e' -draw "rectangle 32,32 63,63" \
    -fill '#8a6a3a' -draw "polygon 32,63 47,36 63,63" \
    -fill '#7a5a2a' -draw "polygon 34,61 47,40 61,61" \
    -fill '#9a7a4a' -draw "rectangle 44,36 50,40" \
    \
    `# 10: totem pole` \
    -fill '#5a8a3e' -draw "rectangle 64,32 95,63" \
    -fill '#6a4a1a' -draw "rectangle 75,32 83,63" \
    -fill '#cc3333' -draw "rectangle 73,36 85,44" \
    -fill '#ffcc33' -draw "rectangle 73,46 85,54" \
    -fill '#3355cc' -draw "rectangle 73,56 85,63" \
    \
    `# 11: drying rack` \
    -fill '#5a8a3e' -draw "rectangle 96,32 127,63" \
    -fill '#6a4a1a' -draw "rectangle 100,40 104,63" \
    -fill '#6a4a1a' -draw "rectangle 120,40 124,63" \
    -fill '#6a4a1a' -draw "rectangle 98,40 126,43" \
    -fill '#8a6a4a' -draw "rectangle 106,44 118,50" \
    \
    `# 12: pottery` \
    -fill '#5a8a3e' -draw "rectangle 128,32 159,63" \
    -fill '#aa6633' -draw "roundrectangle 136,44 152,60 4,4" \
    -fill '#994422' -draw "roundrectangle 138,40 150,46 2,2" \
    -fill '#cc8844' -draw "rectangle 140,48 148,52" \
    \
    `# 13: hide on frame` \
    -fill '#5a8a3e' -draw "rectangle 160,32 191,63" \
    -fill '#6a4a1a' -draw "rectangle 164,40 168,60" \
    -fill '#6a4a1a' -draw "rectangle 184,40 188,60" \
    -fill '#c4a080' -draw "rectangle 168,42 184,58" \
    -fill '#b49070' -draw "rectangle 170,44 182,56" \
    \
    `# 14: woven basket` \
    -fill '#5a8a3e' -draw "rectangle 192,32 223,63" \
    -fill '#b49050' -draw "roundrectangle 198,44 218,60 3,3" \
    -fill '#a48040' -draw "rectangle 198,48 218,50" \
    -fill '#a48040' -draw "rectangle 198,54 218,56" \
    \
    `# 15: canoe` \
    -fill '#5a8a3e' -draw "rectangle 224,32 255,63" \
    -fill '#6a4a1a' -draw "polygon 226,50 239,38 252,50" \
    -fill '#8a6a3a' -draw "polygon 228,48 239,40 250,48" \
    \
    `# Row 2` \
    `# 16: archery target` \
    -fill '#5a8a3e' -draw "rectangle 0,64 31,95" \
    -fill '#6a4a1a' -draw "rectangle 13,76 18,95" \
    -fill '#f0e0c0' -draw "circle 15,74 15,64" \
    -fill '#cc3333' -draw "circle 15,74 15,67" \
    -fill '#f0e0c0' -draw "circle 15,74 15,70" \
    -fill '#cc3333' -draw "circle 15,74 15,72" \
    \
    `# 17: goal post` \
    -fill '#5a8a3e' -draw "rectangle 32,64 63,95" \
    -fill '#6a4a1a' -draw "rectangle 36,64 40,95" \
    -fill '#6a4a1a' -draw "rectangle 56,64 60,95" \
    -fill '#6a4a1a' -draw "rectangle 36,64 60,68" \
    \
    `# 18: ball` \
    -fill '#5a8a3e' -draw "rectangle 64,64 95,95" \
    -fill '#c4a060' -draw "circle 79,79 79,72" \
    -fill '#b49050' -draw "line 75,75 83,83" \
    -fill '#b49050' -draw "line 75,83 83,75" \
    \
    `# 19: feather banner` \
    -fill '#5a8a3e' -draw "rectangle 96,64 127,95" \
    -fill '#6a4a1a' -draw "rectangle 109,64 113,95" \
    -fill '#cc3333' -draw "polygon 114,66 124,72 114,78" \
    -fill '#ffcc33' -draw "polygon 114,78 124,84 114,90" \
    \
    `# 20: village tree` \
    -fill '#5a8a3e' -draw "rectangle 128,64 159,95" \
    -fill '#5a3a1e' -draw "rectangle 140,80 146,95" \
    -fill '#2d6a16' -draw "circle 143,76 143,64" \
    -fill '#3d7a26' -draw "circle 143,76 143,68" \
    \
    `# 21: wildflower` \
    -fill '#5a8a3e' -draw "rectangle 160,64 191,95" \
    -fill '#ff6699' -draw "circle 168,78 168,76" \
    -fill '#ffcc33' -draw "circle 176,82 176,80" \
    -fill '#9966cc' -draw "circle 184,76 184,74" \
    -fill '#ff6699' -draw "circle 172,86 172,84" \
    \
    `# 22: sitting log` \
    -fill '#5a8a3e' -draw "rectangle 192,64 223,95" \
    -fill '#6a4a1a' -draw "roundrectangle 194,78 222,88 3,3" \
    -fill '#8a6a3a' -draw "circle 194,83 194,80" \
    -fill '#8a6a3a' -draw "circle 222,83 222,80" \
    \
    `# 23: drum` \
    -fill '#5a8a3e' -draw "rectangle 224,64 255,95" \
    -fill '#8a5a2a' -draw "roundrectangle 232,72 250,90 3,3" \
    -fill '#c4a060' -draw "roundrectangle 232,68 250,74 2,2" \
    -fill '#6a4a1a' -draw "rectangle 234,70 236,72" \
    -fill '#6a4a1a' -draw "rectangle 246,70 248,72" \
    \
    `# Row 3` \
    `# 24: dense trees` \
    -fill '#1d5a06' -draw "rectangle 0,96 31,127" \
    -fill '#2d6a16' -draw "circle 10,110 10,100" \
    -fill '#1d5a06' -draw "circle 22,108 22,98" \
    -fill '#2d6a16' -draw "circle 16,118 16,108" \
    \
    `# 25: tall grass` \
    -fill '#5a8a3e' -draw "rectangle 32,96 63,127" \
    -fill '#6a9a4e' -draw "line 38,96 38,118" -fill '#6a9a4e' -draw "line 44,98 44,120" \
    -fill '#6a9a4e' -draw "line 50,96 50,116" -fill '#6a9a4e' -draw "line 56,100 56,122" \
    \
    `# 26: deer hide (collectible)` \
    -fill '#5a8a3e' -draw "rectangle 64,96 95,127" \
    -fill '#c4a080' -draw "polygon 68,120 79,100 90,120" \
    -fill '#b49070' -draw "polygon 70,118 79,104 88,118" \
    \
    `# 27: sinew (collectible)` \
    -fill '#5a8a3e' -draw "rectangle 96,96 127,127" \
    -fill '#d4c4a0' -draw "roundrectangle 102,106 122,114 2,2" \
    -fill '#c4b490' -draw "roundrectangle 104,108 120,112 1,1" \
    \
    `# 28: feast table` \
    -fill '#9a8365' -draw "rectangle 128,96 159,127" \
    -fill '#6a4a1a' -draw "rectangle 132,104 156,120" \
    -fill '#cc8844' -draw "circle 138,110 138,107" \
    -fill '#cc8844' -draw "circle 148,110 148,107" \
    -fill '#2d6a16' -draw "rectangle 140,114 146,118" \
    \
    `# 29: torch` \
    -fill '#5a8a3e' -draw "rectangle 160,96 191,127" \
    -fill '#6a4a1a' -draw "rectangle 173,104 178,127" \
    -fill '#ff6600' -draw "polygon 172,104 175,94 178,104" \
    -fill '#ffcc00' -draw "polygon 173,104 175,97 177,104" \
    \
    `# 30: ceremonial post` \
    -fill '#5a8a3e' -draw "rectangle 192,96 223,127" \
    -fill '#6a4a1a' -draw "rectangle 204,96 210,127" \
    -fill '#cc3333' -draw "polygon 210,98 220,104 210,110" \
    -fill '#3355cc' -draw "polygon 204,98 194,104 204,110" \
    -fill '#ffcc33' -draw "circle 207,118 207,114" \
    \
    `# 31: peace pipe` \
    -fill '#5a8a3e' -draw "rectangle 224,96 255,127" \
    -fill '#8a6a3a' -draw "roundrectangle 228,108 248,114 2,2" \
    -fill '#aa8a5a' -draw "rectangle 226,106 232,116" \
    -fill '#888888' -draw "polygon 244,108 248,102 248,108" \
    \
    "$OUT"

echo "Generated Powhatan village tileset: $OUT"
