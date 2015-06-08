// guide
module.exports = [
    // speed and distance
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
];
