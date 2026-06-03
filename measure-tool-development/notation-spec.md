# Measure Tool — Room Notation Spec (working draft)

A room is recorded as a single string of alternating **lengths** and **sectors**:

    [leadingSector] L1 - sector - L2 - sector - L3 ...

Example: `-4- 27.5 -2- 67`

## Rules

1. **Traversal is always clockwise.**
2. **Wall 1** is the first wall to the **left** of the entry door used. With
   multiple doors, the one entered through is the start (point A).
3. **Lengths** are in inches (decimals or fractions, e.g. `27.5` / `27 1/2`).
4. **Sectors** = number of 45° steps for the angle. 360° / 45° = 8 sectors.

### Sector values

| Sector | Degrees | Meaning (as interior angle, clockwise) | Allowed |
|:---:|:---:|:---|:---:|
| 1 | 45  | —                                  | NO |
| 2 | 90  | square corner (turn right 90°)     | yes |
| 3 | 135 | 45° angled wall (turn right 45°)   | yes |
| 4 | 180 | wall continues straight            | yes |
| 5 | 225 | 45° angled wall (turn left 45°, concave) | yes |
| 6 | 270 | square notch (turn left 90°, concave)    | yes |
| 7 | 315 | —                                  | NO |
| 8 | 360 | full turn / close                  | (special) |

Sectors **1 and 7 never occur**.

### Leading sector (start angle of Wall 1)

The optional first sector aims Wall 1 relative to the **entry wall**, measured the
same way (interior angle from the entry wall on the door's right side, swinging
up into the room):

- `-4-` (180°) = Wall 1 runs **straight/continuous** from the end of the door
  molding (flat left). This is the default when no leading sector is given.
- `-3-` (135°) = Wall 1 leaves the door as a 45° diagonal up into the room.
- etc.

### Corners between walls

Each sector between two lengths is the angle the next wall forms with the current
one. Because traversal is always clockwise and Wall 1's start is fixed, the
sector count alone fully determines the geometry (no separate left/right needed).

### Closing & the doorway

Walking the lengths/turns from the door eventually returns near the start; the
remaining gap back to point A is the **doorway** in the entry wall.

## Worked examples (in repo)

- `example-two-walls.svg` — `-4- 27.5 -2- 67`
- `example-room.svg`      — `27.5 -2- 64 -2- 142 -2- 63.78 -2- 83` (rectangle)
- `leading-sector.svg`    — `-3- 27.5` (angled Wall 1 start)
