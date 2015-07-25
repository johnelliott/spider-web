Spider-web
===========
A fun way to fly rolling spider from your laptop.

![alt tag](https://cloud.githubusercontent.com/assets/5633265/8890663/0db4be16-32d7-11e5-80a6-4973150f5a1b.png)

- get this repository on your local machine
- npm install
- npm run build
- turn on drone
- npm start
- load localhost:8000 on your laptop

Controls: https://github.com/johnelliott/spider-web/blob/master/app/src/keyboard-controls.js

    {key: "=", command: "faster"},
    {key: "-", command: "slower"},
    {key: "]", command: "longer"},
    {key: "[", command: "shorter"},
    // altitude
    {key: "j", command: "down"},
    {key: "k", command: "up"},
    // turning
    {key: "h", command: "turnLeft"},
    {key: "l", command: "turnRight"},
    // moving around
    {key: "w", command: "forward"},
    {key: "s", command: "back"},
    {key: "a", command: "left"},
    {key: "d", command: "right"},
    // fly/land
    {key: "f", command: "fly"},
    // Tricks :)
    {key: "g", command: "flip"}
