<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.9" tiledversion="1.9.2" name="ship-tiles" tilewidth="32" tileheight="32" tilecount="64" columns="8">
 <image source="ship-tiles.png" width="256" height="256"/>
 <!-- LAND TILES (0-31) -->
 <!-- Row 0: 0=grass, 1=grass2, 2=dirt, 3=path, 4=river, 5=shallow, 6=sand, 7=mud -->
 <tile id="0"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="1"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="2"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="3"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="4"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="5"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="6"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="7"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <!-- Row 1: 8=pine, 9=oak, 10=palisade-v, 11=palisade-h, 12=gate, 13=house, 14=storehouse, 15=watchtower -->
 <tile id="8"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="9"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="10"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="11"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="12"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="13"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="14"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="15"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <!-- Row 2: 16=campfire, 17=log, 18=hay, 19=mud pile, 20=crate, 21=barrel, 22=construction, 23=cannon -->
 <tile id="16"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="17"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="18"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="19"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="20"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="21"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="22"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="23"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <!-- Row 3: 24=flowers, 25=bush, 26=sign, 27=well, 28=dense forest, 29=river bank, 30=corner wall, 31=dock -->
 <tile id="24"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="25"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="26"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="27"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="28"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="29"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="30"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="31"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <!-- SHIP TILES (32-63) -->
 <!-- Row 4: 32=deep ocean, 33=waves, 34=wood deck, 35=dark deck, 36=hull wall, 37=mast, 38=rope, 39=rail -->
 <tile id="32"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="33"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="34"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="35"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="36"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="37"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="38"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="39"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <!-- Row 5: 40=bow, 41=stern, 42=hatch, 43=cannon, 44=crate, 45=barrel, 46=sail, 47=rigging -->
 <tile id="40"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="41"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="42"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="43"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="44"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="45"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="46"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="47"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <!-- Row 6: 48=hull-L, 49=hull-R, 50=hull-T, 51=hull-B, 52=TL, 53=TR, 54=BL, 55=BR -->
 <tile id="48"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="49"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="50"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="51"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="52"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="53"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="54"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="55"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <!-- Row 7: 56=deck-light, 57=deck-dark, 58=hatch-door, 59=wheel, 60=lantern, 61=anchor, 62=flag, 63=below-deck -->
 <tile id="56"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="57"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="58"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="59"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="60"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="61"><properties><property name="collision" type="bool" value="true"/></properties></tile>
 <tile id="62"><properties><property name="collision" type="bool" value="false"/></properties></tile>
 <tile id="63"><properties><property name="collision" type="bool" value="false"/></properties></tile>
</tileset>
