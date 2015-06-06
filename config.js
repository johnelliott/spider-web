var os = require('os');

process.env.PORT = 8000;
process.env.SOCKPORT = 3000;
process.env.DRONE = "RS_B181299";

// default serial port to Raspberry Pi model b USB
process.env.LOCALSERIALPORT = os.platform() === "darwin" ?
    "/dev/cu.usbmodem1421" : "/dev/ttyACM0";
