// Drone
var RollingSpider = require("rolling-spider");

module.exports = function(uuid) {
	// create drone
	var spider = new RollingSpider(uuid);
	// setup
	this.flightOptions = {
		speed: 50,
		steps: 10
	};
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
	// takeoff/landing
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
	// speed and distance
	this.faster = function() {
		console.log("go faster is not implemented");
		// spider.ACTION;
	};
	this.slower = function() {
		console.log("go slower is not implemented");
		// spider.ACTION;
	};
	this.longer = function() {
		console.log("go longer is not implemented");
		// spider.ACTION;
	};
	this.shorter = function() {
		console.log("go shorter is not implemented");
		// spider.ACTION;
	};
	// altitude
	this.up = function() {
		console.log("↑↑↑");
		spider.up(this.flightOptions);
	}.bind(this);
	this.down = function() {
		console.log("↓↓↓");
		spider.down(this.flightOptions);
	}.bind(this);
	// turns
	this.turnLeft = function() {
		console.log("t←");
		spider.turnLeft(this.flightOptions);
	}.bind(this);
	this.turnRight = function() {
		console.log("t→");
		spider.turnRight(this.flightOptions);
	}.bind(this);

	// walk
	this.forward = function() {
		console.log("↑");
		spider.forward(this.flightOptions);
	}.bind(this);
	this.back = function() {
		console.log("↓");
		spider.backward(this.flightOptions);
	}.bind(this);
	this.left = function() {
		console.log("←");
		spider.left(this.flightOptions);
	}.bind(this);
	this.right = function() {
		console.log("→");
		spider.right(this.flightOptions);
	}.bind(this);

	// other
	this.flip = function() {
		console.log("↺");
		spider.leftFlip();
	};
};
