# Measure Tool — Room Notation Spec

A room/run is recorded as one comma-separated string, read **clockwise from the
door you entered**. The string is:

    [trim prefix], <door>, <wall>, <wall>, <wall>, ...

Example (full):

    B5.5,QR,84RI,H109,27.5,>>,+115,27.5,>>,-109,27,>>,27.5

Read as: 5½" baseboard + quarter round on every wall; an 84"-tall right-hinge
swing-in door; then walls walked clockwise (`>>` = right-90° turns).

---

## 1. Core rules

1. **Traversal is always clockwise.**
2. **Wall 1** is the first wall to the **left** of the entry door used (if several
   doors, the one you came through). Point **A** = the door/start.
3. Measurements are in **inches** (decimals or fractions: `27.5` or `27 1/2`).
4. Walls run only along **45° multiples** (8 compass directions). Angles are given
   as 45° "sectors" (see §3).
5. Turns are written as chevrons (`>` right, `<` left), each = 45° (see §3).
6. **Closing & the doorway:** walking the walls returns near point A; the leftover
   gap back to A is the **doorway**. The door **width** = that leftover (minus
   moldings); see §6.

---

## 2. Trim prefix (optional, room-wide)

Comes first, before the door:

- `B<height>` — baseboard of that height on **every** wall (thickness assumed ¾").
- `QR` — quarter round present (always ¾"×¾") between baseboard and floor.
  Omit `QR` = no quarter round.

`B`+number = baseboard (here, room prefix); `BL`/`BR` bifold lives in the door
slot, so position disambiguates.

---

## 3. Direction — turn chevrons (`>` / `<`)

The turn to the next wall is written with chevrons that **point the way you turn**;
each chevron = 45°.

Each chevron = **45° of turn**; `>` = right, `<` = left. "Follow your nose."

| Chevrons | Turn | Corner formed | (old `D`) |
|:---:|:---|:---|:---:|
| *(none)*   | straight     | 180°               | `D4` |
| `>` / `<`  | 45° right/left  | **135° obtuse**  | `D3` / `D5` |
| `>>` / `<<`| 90° right/left  | **90° square**   | `D2` / `D6` |

- **Max two chevrons each way.** Three chevrons (135° turn) would force an acute
  45° corner, which never occurs in wall construction.
- A single chevron is normal — it's the gentle 45° turn that makes a **135°
  obtuse corner**.
- A wall with **no chevron continues straight** (collinear) — handy when one
  straight wall is split into segments only because its ceiling height changes.
- A **leading** chevron sets Wall 1's start angle off the door molding (no chevron
  = straight/continuous from the molding, the default).

> Older drafts used `D<sector>` where the digit was the interior angle in 45°
> steps; chevrons replace it. Some reference SVGs still show `D…`.

---

## 4. Wall dimensions — height, slope, width

Order within a wall: turn chevrons `>`/`<` (optional) then height/slope (optional)
then width.

- `H<height>` — flat wall height. **Sticky:** carries forward to following walls
  until changed.
- `+<height>` — wall **rises** to that **end** height. (replaces `/`)
- `-<height>` — wall **drops** to that **end** height. (replaces `\`)
  Heights are always positive, so `-110` is unambiguous = drop to 110.
- bare number — wall **width**.
- A **bare width** with no height/slope = a **level** wall at the current
  inherited height.

**Vaulted / raked walls:** the **start height is inherited** from the previous
wall's end height, so a vault just chains `+…` up to the ridge then `-…` back
down. Sloped-wall area = (startH + endH) / 2 × width. Flat area = height × width.

Example: `H108,27.5,+142,65,-108,65` = (straight) flat 108"×27½", rise 108→142
over 65" (ridge 142"), drop 142→108 over 65".

---

## 5. Door codes

The door follows the trim prefix. A **leading number = door HEIGHT** (for
elevation/3D, not the plan footprint); the letters are the type/hand/swing.

Single doors — all 2 characters:

| Type | Codes | Meaning |
|---|---|---|
| Hinged (swing) | `LI LO RI RO` | hinge side entering room (`L`/`R`) + swing `I`n/`O`ut (`H` dropped, hinge assumed) |
| Bifold | `BL BR` | stack/fold side left or right |
| Pocket | `PL PR` | slides into wall, left or right |
| Sliding | `S1 S2 …` | digit = number of panels |
| Archway / open | `A0` | no door, no swing |
| Barn door | `XL XR` | surface track (`X`), parks left or right |

Double / multi-panel — two single codes joined:

| Kind | Code | Meaning |
|---|---|---|
| Double swing in | `LIRI` | both leaves swing in |
| Double swing out | `LORO` | both leaves swing out |
| Double bifold | `BLBR` | bifold L + bifold R (fold outward) |
| Double pocket | `PLPR` | pocket into wall both sides |
| Sliding (n panels) | `S1 S2 S3 …` | n bypass panels |

- Hand/swing reference: standing at the door, facing into the room.
- Sliding: with `n` panels, **1/n of the opening is always blocked** (overlap);
  usable opening = (n−1)/n.

---

## 6. Door width

The leading door number is **height**. Door **width** is derived from the plan:
the leftover gap at the closing connection point = door + moldings (default
molding **2.25"** each side).

---

## 7. Worked example, fully decoded

`B5.5,QR,84RI,H109,27.5,>>,+115,27.5,>>,-109,27,>>,27.5`

| Part | Token | Meaning |
|---|---|---|
| trim | `B5.5` | 5½" baseboard, all walls |
| trim | `QR` | quarter round, all walls |
| door | `84RI` | 84"-tall, right hinge, swing in |
| wall 1 | `H109,27.5` | straight (default), flat 109", 27½" wide |
| wall 2 | `>>,+115,27.5` | right-90° turn, rise 109→115, 27½" wide |
| wall 3 | `>>,-109,27` | right-90° turn, drop 115→109, 27" wide |
| wall 4 | `>>,27.5` | right-90° turn, level 109", 27½" wide |

(Numbers here are illustrative — they don't leave a realistic door width.)

---

## 8. Open items / next session

- **Slope token with no width** (e.g. `+114` immediately before `-110`): treat as
  a dropped width (typo) or as a zero-width ridge apex? — TBD.
- Bifold/pocket `L`/`R` exact meaning (fold/stack side vs slide-into side) — assumed
  but unconfirmed.
- French doors = treat as double swing? Mixed-swing double (`LIRO`) allowed?
- **Build:** a parser + live drawing tool (web app, PC + Android) that renders any
  string per this spec.

---

## 9. Reference drawings (in this folder)

| File | Shows |
|---|---|
| `door-codes.svg` | hinged `LI LO RI RO` |
| `double-door-codes.svg` | `LIRI LORO BLBR S2` |
| `archway-barn-codes.svg` | `A0 XL XR` |
| `turn-chevrons.svg` | turn chevrons `>` `>>` `<` `<<` |
| `example-left-turn.svg` | a room with a left-turn (`<`) wall |
| `example-L-Dnotation.svg` | L-shape (shown in old `D` form) |
| `example-room.svg` | rectangle room |
| `example-niche.svg` | open run with door+moldings |
| `wall-height-area.svg` | flat vs raked wall area |
| `vaulted-wall.svg` | vault to a ridge (`+ / -`) |
| `vault-stepped.svg` | stepped rising ceiling |
| `baseboard-qr.svg` | baseboard + quarter round detail |
