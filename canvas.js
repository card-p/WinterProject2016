
window.addEventListener("load", init);

var width = 640;
var height = 480;
var r = 20;

function init () {

    var stage = new createjs.Stage("myCanvas");
    var enemy = new createjs.Shape();
    var partition = new createjs.Shape();
    //var g = new createjs.Graphics();
    var moveMax = 40;
    var speed = 4;
    var allYPartition = [];

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

    // 縦横マス目の線
    for(var i = 0; i < 16; i++){
        var lineX = new createjs.Shape();
        lineX.graphics.beginStroke("black");
        lineX.graphics.moveTo(2*r*(i+1)-r, 80);
        lineX.graphics.lineTo(2*r*(i+1)-r, height);
        stage.addChild(lineX);
    }
    for(var j = 0; j < 10; j++){
        var lineY = new createjs.Shape();
        lineY.graphics.beginStroke("black");
        lineY.graphics.moveTo(20, 80+2*r*(j+1));
        lineY.graphics.lineTo(width-20, 80+2*r*(j+1));
        stage.addChild(lineY);

        allYPartition[j] = lineY;
    //  allMakePartition(stage, j);
    }

    createjs.Ticker.addEventListener("tick", handleTick);
          function handleTick() {
              stage.update();
          }
}

/*function allMakePartition(st, num){
    var line = new createjs.Shape();
    line.graphics.beginStroke("black");
    line.graphics.moveTo(20, 80+2*r*(num+1));
    line.graphics.lineTo(width-20, 80+2*r*(num+1));
    st.addChild(line);
}*/
