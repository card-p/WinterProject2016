
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

    this.move = function(keyCode, stage) {
        for(var i=0; i<40; i++) {
            // window.setTimeout( function() {
                if (keyCode == 37 && this.enemy.x >0) {
                    this.enemy.x -= 1;
                    stage.addChild(this.enemy);
                }
                if (keyCode == 38 && this.enemy.y > 100) {
                    console.log(keyCode);
                    this.enemy.y -= 1;
                    stage.addChild(this.enemy);
                }
                if (keyCode == 39 && this.enemy.x <560) {
                    this.enemy.x += 1;
                    stage.addChild(this.enemy);
                }
                if (keyCode == 40 && this.enemy.y < 460) {
                    this.enemy.y += 1;
                    stage.addChild(this.enemy);
                }
            // }, 5 );
        }
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
    var enemy = new createjs.Shape();
    var partition = new createjs.Shape();
    //var g = new createjs.Graphics();
    var moveMax = 40;
    var speed = 4;
    var allYPartition = [];

    // 白い丸(user)
    var user = new User(40, 460, stage);
    // 赤い丸(敵)
    var enemy1 =new Enemy(40, 100, stage);

    // 仕切りの描画
    partition.graphics.beginStroke("black");
    partition.graphics.moveTo(0, 80);
    partition.graphics.lineTo(width, 80);
    stage.addChild(partition);

    window.addEventListener("keydown", handleKeydown);
    function handleKeydown (event) {
        var keyCode = event.keyCode;
        user.move(keyCode, stage);
    }

    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
        stage.update();
    }

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
    }

    // createjs.Ticker.addEventListener("tick", handleTick);
    //       function handleTick() {
    //           stage.update();
    //       }
}
