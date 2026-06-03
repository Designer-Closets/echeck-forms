# Measure Tool — Room Notation Spec (working draft)

A room is recorded as a single string of alternating **direction tokens** and
**lengths**:

    D<n> L1  D<n> L2  D<n> L3 ...

- **`D`** = "Direction"; **`n`** = number of 45° sectors (so `D2` = 90°,
  `D4` = 180°, `D3` = 135°).
- The first `D<n>` sets Wall 1's start angle; each following `D<n>` is the angle
  to the next wall.

Example: `D4 27.5 D2 64`  (L-shape: 27½" straight left, 90° turn, 64").

> Older drafts used a `-n-` dash form (`-4- 27.5 -2- 64`); `D<n>` replaces it.

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

## String format (comma-separated)

Items are separated by commas for readability:

    <doorHeight><doorCode>, D<sector>,<height>,<width>, D<sector>,<height>,<width>, ...

Example: `72RI,D4,H108,27.5,D2,63,D2,104`
- `72RI` → 72"-tall door, Right hinge, swing In
- `D4`   → direction 180° (straight from door molding)
- `H108` → wall height 108"
- `27.5` → wall width 27½"
- `D2,63` → 90° turn, width 63" (height blank ⇒ still 108")
- `D2,104` → 90° turn, width 104" (still 108")

Token prefixes (order within a wall: `D` then height/slope then width):
- `D<sector>` = direction / turn (45° sectors)
- `H<height>` = flat wall height. **Sticky:** carries forward until changed.
- `/<height>` = **rising** wall to end-height `<height>`
- `\<height>` = **dropping** wall to end-height `<height>`
- bare number = wall width

Vaulted / raked walls:
- `/` rises, `\` drops; the number is the **end** height of that wall.
- The **start height is inherited** from the previous wall's end height
  (so a vault rising to a ridge and dropping back just chains `/…` then `\…`).
- Area of a sloped wall = (startH + endH) / 2 × width.

Example with a vault: `D4,H108,27.5,/142,65,\108,65`
= flat 108"×27½", then rise 108→142 over 65" (ridge at 142"), then drop
142→108 over 65".

Rules:
- Leading number = door **height** (elevation/3D, not the plan footprint). The
  door **width** comes from the opening geometry (the leftover at the closing
  connection point = door + moldings, default molding 2.25").
- Flat wall area = height × width.

## Door codes (prefix the run)

The string starts with a door-type code describing the entry:

All codes are **2 characters**. The leading letter selects the type:

| Type | Codes | Meaning |
|---|---|---|
| Hinged (swing) | `LI LO RI RO` | 1st = hinge side entering room (`L`/`R`); 2nd = swing `I`n/`O`ut. `H` is dropped — hinge is assumed. |
| Bifold | `BL BR` | |
| Pocket | `PL PR` | |
| Sliding | `S1 S2 …` | digit = number of panels |
| Archway / open | `A0` | no door, no swing (`0` = zero panels) |
| Barn door | `XL XR` | surface-mounted on a track (`X`); parks/slides left or right |

- A code starting with `L`/`R` = hinged; `B` = bifold; `P` = pocket; `S` = sliding.
- Hand/swing reference: standing at the door, facing into the room.
- Door *width* is still derived from the opening geometry (opening − moldings);
  the code adds type/hand/swing.

Example: `LI D4 27.5 D2 64`

### Double / multi-panel doors

A double door = two single codes joined. Sliding uses a panel count.

| Kind | Code | Meaning |
|---|---|---|
| Double swing in | `LIRI` | left leaf hinge-left swing-in, right leaf hinge-right swing-in |
| Double swing out | `LORO` | both leaves swing out |
| Double bifold | `BLBR` | bifold-left + bifold-right; bifolds always fold **outward** |
| Double pocket | `PLPR` | pocket sliding into the wall on **both** sides |
| Sliding (n panels) | `S1 S2 S3 …` | n bypass panels, slide both ways, overlapping |

- Sliding: with `n` panels, **1/n of the opening is always blocked** (bypass
  overlap); usable opening = (n−1)/n.

## Worked examples (in repo)

- `example-two-walls.svg` — `-4- 27.5 -2- 67`
- `example-room.svg`      — `27.5 -2- 64 -2- 142 -2- 63.78 -2- 83` (rectangle)
- `leading-sector.svg`    — `-3- 27.5` (angled Wall 1 start)
