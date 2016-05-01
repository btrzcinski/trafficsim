
var title = "Traffic Sim";
var canvas = null;
var cars = [];

function setTitle() {
    $(document).find("title").text(title);
    $("#titleString").html(title);
}

function setupCanvas() {
    canvas = oCanvas.create({
        canvas: "#centerStage",
        background: "#000000",
        fps: 60
    });

    var width = $("#centerStage").width();

    for (var i = 0; i < width; i += 40) {
        canvas.addChild(canvas.display.line({
            start: { x: i, y: 50 },
            end: { x: i + 20, y: 50 },
            stroke: "2px #FFFFFF"
        }));
    }
}

var Car = function (color, lane, speed) {
    this.color = color;
    this.lane = lane;
    this.speed = speed;
    this.x = 0;

    this.updateLocation = function () {
        this.x += this.speed;
        this.y = (this.lane == 1) ? 15 : 65;
        this.rect.x = this.x;
        this.rect.y = this.y;
    };

    this.rect = canvas.display.rectangle({
        x: this.x,
        y: this.y,
        width: 35,
        height: 20,
        fill: this.color
    });

    this.updateLocation();

    canvas.addChild(this.rect);
};

function addRedCarInLaneOne() {
    cars.push(new Car("#FF0000", 1, 1));
}

function runSim() {
    canvas.setLoop(function () {
        for (var i = 0; i < cars.length; i++) {
            c = cars[i];
            c.updateLocation();
        }
    }).start();
}

function init() {
    ctx = $("#centerStage")[0].getContext("2d");
    setTitle();
    setupCanvas();
    addRedCarInLaneOne();
    runSim();
}

$(document).ready(init);
