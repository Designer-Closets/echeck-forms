# Reference: How Bosch MeasureOn constructs a room

> Notes captured from Bosch's official MeasureOn pages/listings (the PDF manual
> itself is not downloadable — Bosch blocks automated access). Used to inform our
> own measure tool's room-construction model.

## MeasureOn model

- **Workspace → Rooms.** A workspace contains many individually-sketched rooms.
- **Two sketch modes:**
  - **Quick Sketch** — simple rooms, **90° angles only**.
  - **Detailed Floor Plan** — full measurements incl. **wall thickness** and
    **non-90° angles**, doors and windows.
- **Drawing tools:** lines, rectangles, polylines, pre-defined wall shapes with
  per-corner adjustment.
- **Wall lengths:** transferred **live over Bluetooth** from a connected Bosch
  laser measure, or entered manually.
- **Non-90° angles:** derived **not by typing the angle** but by **measuring the
  diagonal corner-to-corner** and triangulating (a PRO feature).
- **Doors/windows:** select wall → *View Wall* → **+** to add and position.
- **Outputs:** auto-calculated floor area, wall area, perimeter.
- **Export:** PDF, JPEG, XLS.

## Implication for our tool

Our rooms are constrained so **every wall runs along a 45° multiple** (8 compass
directions). This removes the need for diagonal triangulation. A room reduces to:

    starting direction + ordered list of (wall length, turn to next wall)
    -> "walk" the turns/lengths -> closed polygon

Wall-numbering convention (from Andy):
- Start at the door you enter through.
- Wall 1 = wall immediately to your left on entering.
- Each next wall reached by a turn that is a multiple of 45°.
- Travel direction around the room: TBD (clockwise vs counter-clockwise).
