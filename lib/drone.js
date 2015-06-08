// Drone
var RollingSpider = require("rolling-spider");

module.exports = function(uuid) {
	// create drone
	var spider = new RollingSpider(uuid);
	this.uuid = uuid;
	// setup default flight options
	this.flightOptions = {
		speed: 50,
		steps: 10
	};

	this.connect = function() {
		spider.connect(function() {
			console.log(uuid + " connected");
			spider.setup(function() {
				console.log(uuid + " set up");

				spider.calibrate();
				spider.startPing();
			});
		});
	};
	// drone info
	this.status = spider.status;
	//expose signal strength function
	this.signalStrength = function(callback) {
		spider.signalStrength(callback);
	};
	this.addBatteryEmitter = function(callback) {
		spider.on("battery", callback);
	};
	this.addStatusEmitter = function(callback) {
		spider.on("stateChange", callback);
	};
	// takeoff/landing
	this.fly = function() {
		console.log("fly");
		if(spider.status.flying) {
			// TODO replace with this.land to DRY
			spider.land(function() {
				console.log("landed ↓");
			});
		}
		// TODO make this more robust
		// else if(spider.status.flying === false){
		else {
			spider.takeOff(function() {
				console.log("took off ↑");
			});
		}
		// else {
		// 	console.log("couldn't take off");
		// }
	};
	this.land = function() {
		if(spider.status.flying) {
			console.log("landing");
			spider.land(function() {
				console.log("landed ↓");
			});
		}
	};
	// speed and distance
	this.faster = () => {
		console.log("faster");
		this.flightOptions.speed = this.flightOptions.speed >= 90 ? 100 : this.flightOptions.speed + 10;
	};
	this.slower = () => {
		console.log("slower");
		// 10 is minimum
		this.flightOptions.speed = this.flightOptions.speed <= 20 ? 10 : this.flightOptions.speed - 10;
	};
	this.longer = function() {
		console.log("longer");
		this.flightOptions.steps = this.flightOptions.steps >= 90 ? 100 : this.flightOptions.steps + 10;
	};
	this.shorter = function() {
		console.log("shorter");
		this.flightOptions.steps = this.flightOptions.steps <= 20 ? 10 : this.flightOptions.steps - 10;
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
