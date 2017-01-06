
window.addEventListener("load", init);

function init () {
    var stage = new createjs.Stage("myCanvas");

    var enemy = new createjs.Shape();
    var partition = new createjs.Shape();
    //var g = new createjs.Graphics();
    var width = 640;
    var height = 480;
    var r = 20;
    var moveMax = 40;
    var speed = 4;
    var allPartition = [];

    // 白い丸(user)

    // 赤い丸(敵)
    enemy.graphics.beginFill("#a03c44");
    enemy.graphics.beginStroke("black");
    enemy.graphics.drawCircle(40, 100, r);
    stage.addChild(enemy);

    // 仕切りの描画
    partition.graphics.beginStroke("black");
    partition.graphics.moveTo(0, 80);
    partition.graphics.lineTo(width, 80);
    stage.addChild(partition);

    allMakePartition(allPartition);

    createjs.Ticker.addEventListener("tick", handleTick);
          function handleTick() {
            //  shape.x += 10;
            //  shape.y += 10;
              stage.update();
          }
}

function allMakePartition(){
    for(int i = 0; i < 16; i++){

    }
    for(int j = 0; j < 11; j++){
        var line = new createjs.Shape();
        line.graphics.beginStroke("black");
        line.graphics.moveTo(0, 80);
        line.graphics.lineTo(width, 80);
        stage.addChild(line);
    }
}
