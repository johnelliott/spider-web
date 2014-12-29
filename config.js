// jslint
'use strict';

process.env.PORT = 8000;
process.env.SOCKPORT = 3000;
;
process.env.LOCALSERIALPORT = os.platform()=="darwin" ? "/dev/cu.usbmodem1421" : "/dev/ttyACM0"; // default to Ras. Pi USB

