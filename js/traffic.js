
var title = "Traffic Sim";
var canvas = null;
var cars = [];

function setTitle() {
    $(document).find("title").text(title);
    $("#titleString").html(title);
}

function setupCanvas() {
    var width = $("#centerStage").width();

    for (var i = 0; i < width; i += 40) {
        canvas.addChild(canvas.display.line({
            start: { x: i, y: 50 },
            end: { x: i + 20, y: 50 },
            stroke: "2px #FFFFFF"
        }));
    }
}



var Car = function (color, initialLane, initialX, laneStrategy, speedStrategy) {
    this.getYValueForLane = function (lane) {
        return (lane == 1) ? 15 : 65;
    };
    
    this.updateRect = function () {
        this.rect.x = this.x;
        this.rect.y = this.y;
    };
    
    this.updateLocation = function () {
        this.x += this.speedStrategy();
        this.lane = this.laneStrategy();
        this.y = this.getYValueForLane(this.lane);
        this.updateRect();
    };
    
    this.color = color;
    this.lane = initialLane;
    this.x = initialX;
    this.y = this.getYValueForLane(this.lane);
    this.laneStrategy = laneStrategy;
    this.speedStrategy = speedStrategy;

    this.rect = canvas.display.rectangle({
        x: this.x,
        y: this.y,
        width: 35,
        height: 20,
        fill: this.color
    });

    canvas.addChild(this.rect);
};

function addInitialCars() {
    stayInLeftLaneStrategy = function() { return 1; };
    switchLanesAfter50ItersStrategy = function() {
        if (!this.t) { this.t = 0; }
        this.t++;
        if (this.t >= 50)
        {
            return 2;
        }  
        return 1;
    };
    
    constantSpeedStrategy = function() { return 1; };
    
    cars.push(new Car("#FF0000", 1, 0,
        stayInLeftLaneStrategy,
        constantSpeedStrategy));
    cars.push(new Car("#00FF00", 1, 50,
        switchLanesAfter50ItersStrategy,
        constantSpeedStrategy));
    cars.push(new Car("#FFFF00", 1, 100,
        stayInLeftLaneStrategy,
        constantSpeedStrategy));
}

function runSim() {
    canvas.setLoop(function () {
        for (var i = 0; i < cars.length; i++) {
            c = cars[i];
            c.updateLocation();
        }
    }).start();
}

function resetSim() {
    canvas.reset();
    setupCanvas();
    cars = [];
    
    addInitialCars();
}

function init() {
    canvas = oCanvas.create({
        canvas: "#centerStage",
        background: "#000000",
        fps: 60
    });
    
    setTitle();
    setupCanvas();
    addInitialCars();
    runSim();
}

$(document).ready(init);
