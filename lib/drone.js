// Drone
var RollingSpider = require("rolling-spider");
var flightOptions = {
  speed: 50,
  steps: 50
};

module.exports = function(uuid, socket) {
  // init drone
  var drone = new RollingSpider(uuid);
  // hack below
  var randomFlip = function(drone) {
    console.log("↺ flip ↺");

    switch(Math.floor(Math.random() * 4)){
      case 0:
        drone.frontFlip();
        break;
      case 1:
        drone.backFlip();
        break;
      // ONLY DO THESE WITH NO WHEELS
      case 2:
        drone.leftFlip();
        break;
      case 3:
        drone.rightFlip();
        break;
    }
  };
  // hack below
  function signal() {
    drone.signalStrength(function(err, rssi) {
      console.log("drone signal:", rssi);
    });
  }

  drone.connect(function() {
    console.log("drone connect");
    drone.setup(function() {
      console.log("drone setup");

      drone.calibrate();
      drone.startPing();
      console.log("drone battery:", drone.status.battery);
      console.log("drone flying:", drone.status.flying);
      signal();
      // // add control listeners
      // fly.on("press", function() {
      //   console.log("↑ fly/land ↓");
      //   signal();
      //   if(drone.status.flying) {
      //     drone.land(function() {
      //       console.log("drone landed ↓");
      //     });
      //   }
      //   else {
      //     drone.takeOff(function() {
      //       console.log("drone took off ↑");
      //     });
      //   }
      // });

      socket.on("fly", function(){
        console.log("↑ fly/land ↓");
        signal();
        if(drone.status.flying) {
          drone.land(function() {
            console.log("drone landed ↓");
          });
        }
        else {
          drone.takeOff(function() {
            console.log("drone took off ↑");
          });
        }
      });
      socket.on("up", function(){
        console.log("↑↑↑");
        console.clear
        drone.up(flightOptions);

      });
      socket.on("down", function(){
        console.log("↓↓↓");
        console.clear
        drone.down(flightOptions);
      });
    });
  });
}




      // forward.on("press", function() {
      //   console.log("↑");
      //   console.clear
      //   drone.forward(flightOptions);
      // });
  //     backward.on("press", function() {
  //       console.log("↓");
  //       console.clear
  //       drone.backward(flightOptions);
  //     });
  //     left.on("press", function() {
  //       console.log("←");
  //       console.clear
  //       drone.turnLeft(flightOptions);
  //     });
  //     right.on("press", function() {
  //       console.log("→");
  //       console.clear
  //       drone.turnRight(flightOptions);
  //     });
  //     up.on("press", function() {
  //       console.log("↑↑↑");
  //       console.clear
  //       drone.up(flightOptions);
  //     });
  //     down.on("press", function() {
  //       console.log("↓↓↓");
  //       console.clear
  //       drone.down(flightOptions);
  //     });
  //     flip.on("press", function() {
  //       console.log("↺");
  //       console.clear
  //       randomFlip(drone);
  //     });
  //   });
  // });
