
window.addEventListener("load", init);

var width = 640;
var height = 480;
var r = 20;
//ユーザークラス
var User = function(posx, posy, stage) {
    this.enemy = new createjs.Shape();
    this.enemy.graphics.beginFill("#ffffff");
    this.enemy.graphics.beginStroke("black");
    this.enemy.graphics.drawCircle(posx, posy, 20);
    stage.addChild(this.enemy);

    this.moveRight = function(stage) {
        this.enemy.x += 1;
        stage.addChild(this.enemy);
    }
}
//敵クラス
var Enemy = function(posx, posy, stage) {
    this.enemy = new createjs.Shape();
    this.enemy.graphics.beginFill("#a03c44");
    this.enemy.graphics.beginStroke("black");
    this.enemy.graphics.drawCircle(posx, posy, 20);
    stage.addChild(this.enemy);
}

function init () {
    var stage = new createjs.Stage("myCanvas");

    var partition = new createjs.Shape();
    //var g = new createjs.Graphics();
    var moveMax = 40;
    var speed = 4;
    var allPartition = [];

    // 白い丸(user)
    var user = new User(40, 460, stage);
    // 赤い丸(敵)
    var enemy1 =new Enemy(40, 100, stage);

    // 仕切りの描画
    partition.graphics.beginStroke("black");
    partition.graphics.moveTo(0, 80);
    partition.graphics.lineTo(width, 80);
    stage.addChild(partition);

//    allMakePartition(allPartition);

    createjs.Ticker.addEventListener("tick", handleTick);
        function handleTick() {
            //  shape.x += 10;
            //  shape.y += 10;
            user.moveRight(stage);
            stage.update();
        }
}

// function allMakePartition(){
//     for(int i = 0; i < 16; i++){
//
//     }
//     for(int j = 0; j < 11; j++){
//         var line = new createjs.Shape();
//         line.graphics.beginStroke("black");
//         line.graphics.moveTo(0, 80);
//         line.graphics.lineTo(width, 80);
//         stage.addChild(line);
//     }
