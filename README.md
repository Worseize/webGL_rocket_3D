# OPEN GL => WEB GL => p5.js library => myScetch

## Options:
1. rotate camera(player) --> mouseMove
2. move camera(player) --> W | S | A | D
3. jump --> SPACE
4. reload --> R
5. pause --> ESC + mouseMove 

## Functionality:
1. gravity for player
2. player + scene colisions
3. forces available (friction)
4. Pointer Lock --> mouse will never move out of the canvas (only ESC helps)

### Last update:
1. [Code Structure] --> better to read
2. bug with pointer unlock fixed
3. 2 scenes [(MENU || PAUSE) && GamePlay]
4. [OPTIONS] pause --> ESC + mouseMove 

### Known Bugs:
1. before reload ends , pause will crash pointer lock.

## Future plans:
1. ~~Pointer Lock (mouse out of canvas biggest problem)~~ ---> Solved 
2. AI players
3. Player <---> primitives collision
4. Health
5. More bullets(guns)
6. Teleport spots
7. Big map area (connect many scenes to one big scene)
8. Loot , pick item , fold item , belt to keep stuff
9. Shop , money , items ... (aka Diablo 2)
