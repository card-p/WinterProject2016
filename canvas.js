
window.addEventListener("load", init);

function init () {
    var stage = new createjs.Stage("myCanvas");

    var shape = new createjs.Shape();
    //var g = new createjs.Graphics();
    var r = 20;
    var moveMax = 40;
    var speed = 4;

    shape.graphics.beginFill("#a03c44");
    shape.graphics.beginStroke("black");
    shape.graphics.drawCircle(20, 20, r);
    stage.addChild(shape);

    createjs.Ticker.addEventListener("tick", handleTick);
          function handleTick() {
            //  shape.x += 10;
            //  shape.y += 10;
              stage.update();
          }

}
