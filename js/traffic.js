
var title = "Traffic Sim";
var canvas = null;

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

function init() {
    ctx = $("#centerStage")[0].getContext("2d");
    setTitle();
    setupCanvas();
}

$(document).ready(init);
