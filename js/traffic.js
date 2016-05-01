
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

    for (var i = 48; i < 56; i += 4) {
        canvas.addChild(canvas.display.line({
            start: { x: 0, y: i },
            end: { x: 600, y: i },
            stroke: "2px #FFFF00"
        }));
    }

    for (var i = 0; i < 600; i += 40) {
        for (var j = 24; j < 128; j += 52) {
            canvas.addChild(canvas.display.line({
                start: { x: i, y: j },
                end: { x: i + 20, y: j },
                stroke: "2px #FFFFFF"
            }));
        }
    }
}

function init() {
    ctx = $("#centerStage")[0].getContext("2d");
    setTitle();
    setupCanvas();
}

$(document).ready(init);
