// Drone
var RollingSpider = require("rolling-spider");

// constants
var flightOptions = {
	speed: 50,
	steps: 5
};

module.exports = function(uuid) {
	// create drone
	var spider = new RollingSpider(uuid);
	// setup
	this.connect = function() {
		spider.connect(function() {
			console.log("spider connect");
			spider.setup(function() {
				console.log("spider setup");

				spider.calibrate();
				spider.startPing();
				console.log("spider battery:", spider.status.battery);
				console.log("spider flying:", spider.status.flying);
			});
		});
	};
	// drone info
	this.uuid = uuid;
	this.signal = function() {
		spider.signalStrength(function(err, rssi) {
			return err ? err : rssi;
		});
	};
	// flight controls
	this.fly = function() {
		console.log("fly");
		if(spider.status.flying) {
			spider.land(function() {
				console.log("landed ↓");
			});
		}
		else {
			spider.takeOff(function() {
				console.log("took off ↑");
			});
		}
	};
	this.land = function() {
		console.log("land");
		spider.land(function() {
			console.log("landed ↓");
		});
	};
	this.up = function() {
		console.log("↑↑↑");
		spider.up(flightOptions);
	};
	this.down = function() {
		console.log("↓↓↓");
		spider.down(flightOptions);
	};
	this.forward = function() {
		console.log("↑");
		spider.forward(flightOptions);
	};
	this.back = function() {
		console.log("↓");
		spider.backward(flightOptions);
	};
	this.left = function() {
		console.log("←");
		spider.turnLeft(flightOptions);
	};
	this.right = function() {
		console.log("→");
		spider.turnRight(flightOptions);
	};
	this.flip = function() {
		console.log("↺");
		spider.leftFlip();
	};
};
