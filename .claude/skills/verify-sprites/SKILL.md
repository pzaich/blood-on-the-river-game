---
name: verify-sprites
description: Verify all sprite registrations, event references, and PNG dimensions are correct
---

# Verify Sprites

Run a comprehensive check of all sprites in the project. Report any issues found.

## Checks to perform

### 1. Sprite ID conflicts
- Read `main/spritesheets/characters/characters.ts` and extract all sprite IDs
- **FAIL** if any sprite ID contains a hyphen followed by common suffixes like `-sprite`, `-icon`, `-img` — these cause rendering failures in RPG-JS. The fix is to remove the suffix (e.g., `crab-sprite` → `crab`)
- **WARN** if a sprite ID matches an event name prefix (e.g., sprite `wheat` with events `wheat-1`, `wheat-2` is OK, but sprite `wheat-1` would conflict)

### 2. Missing sprite registrations
- Grep all `setGraphic('...')` calls in `main/events/` to find every sprite ID referenced by events
- Cross-reference with registered IDs in `characters.ts`
- **FAIL** if any event references a sprite ID that isn't registered

### 3. Unused sprites
- Find registered sprites that no event references
- **WARN** for unused sprites (not a build failure, but worth noting)

### 4. PNG dimensions
- For each registered sprite, check the PNG file exists and verify dimensions
- Standard `RMSpritesheet(3, 4)` expects `width % 3 == 0` and `height % 4 == 0`
- Each cell should be `width/3` x `height/4` — typically 32x32 (96x128 PNG)
- **FAIL** if PNG is missing or dimensions don't divide evenly

### 5. TMX event-sprite wiring
- For each TMX map, extract object names from the Events layer
- Check that each object name has a matching `.ts` file in `main/events/` with a matching `@EventData({ name: '...' })`
- **WARN** if a TMX object has no matching event file (it will create a default empty event)

## Output format

Print a summary table:
```
SPRITES VERIFICATION
====================
Registered sprites: N
Event sprite refs:  N
✓ All sprite IDs are clean (no problematic suffixes)
✓ All event references match registered sprites
✗ FAIL: event "foo" references sprite "bar" which is not registered
⚠ WARN: sprite "baz" is registered but unused
✓ All PNGs have correct dimensions
✓ All TMX objects have matching event files
```
