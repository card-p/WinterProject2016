window.addEventListener("load", init);

var width = 640;
var height = 480;
var rockNum = 50;
var r = 20;
var actionFlag = true;
var gameOverFlag = false;

//ユーザークラス
var User = function(posx, posy, stage) {
    this.posx = posx;
    this.posy = posy;

    this.enemy = new createjs.Shape();
    this.enemy.graphics.beginFill("#ffffff");
    this.enemy.graphics.beginStroke("black");
    this.enemy.graphics.drawCircle(posx, posy, 20);
    stage.addChild(this.enemy);

    // ユーザー移動メソッド
    this.move = function(keyCode, stage, rocks) {
        var info = [true, true, true, true];
        for(var i=0; i<40; i++) {
            // window.setTimeout( function() {
            for(var j=0; j<rockNum; j++) {
                rocks[j].judgement(this, info);
            }
            if (keyCode == 37 && this.enemy.x > 0 && info[0] == true) {
                this.enemy.x -= 1;
                this.posx -= 1;
            }
            if (keyCode == 38 && this.enemy.y > -360 && info[1] == true) {
                this.enemy.y -= 1;
                this.posy -= 1;
            }
            if (keyCode == 39 && this.enemy.x <560 && info[2] == true) {
                this.enemy.x += 1;
                this.posx += 1;
            }
            if (keyCode == 40 && this.enemy.y < 0 && info[3] == true) {
                this.enemy.y += 1;
                this.posy += 1;
            }
        }
    }
    this.init = function(stage) {
        this.posx = 40;
        this.posy = 460;
        this.enemy.x = 0;
        this.enemy.y = 0;

    }
}
//敵クラス
var Enemy = function(posx, posy, stage) {
    this.posx = posx;
    this.posy = posy;

    this.enemy = new createjs.Shape();
    this.enemy.graphics.beginFill("#a03c44");
    this.enemy.graphics.beginStroke("black");
    this.enemy.graphics.drawCircle(posx, posy, 20);
    stage.addChild(this.enemy);
}

// 障害物クラス
var Rock = function(posx, posy, stage) {
    this.posx = posx;
    this.posy = posy;

    this.rock = new createjs.Shape();
    this.rock.graphics.beginFill("#c1541c");
    this.rock.graphics.beginStroke("black");
    this.rock.graphics.drawRoundRect(posx, posy, 40, 40, 10);
    stage.addChild(this.rock);

    this.judgement = function(human, info) {
        if ((human.posx == this.posx + 60) && (human.posy == this.posy + 20)) {
            info[0] = false;
        }
        if ((human.posx == this.posx + 20) && (human.posy == this.posy + 60)) {
            info[1] = false;
        }
        if ((human.posx == this.posx - 20) && (human.posy == this.posy + 20)) {
            info[2] = false;
        }
        if ((human.posx == this.posx + 20) && (human.posy == this.posy - 20)) {
            info[3] = false;
        }
    }

    this.init = function(stage) {
        var randx = Math.floor(Math.random() * 13) + 2;
        var randy = Math.floor(Math.random() * 9);
        var rockx = 20 + 40 * randx;
        var rocky = 80 + 40 * randy;
        var diffx = rockx - this.posx;
        var diffy = rocky - this.posy;
        this.posx = rockx;
        this.posy = rocky;
        this.rock.x += diffx;
        this.rock.y += diffy;
    }
}

// ゲームオーバークラス
var GameOver = function(stage) {
    var gameOverText = new createjs.Text("Game Over!", "24px serif", "DarkRed");
    var spaceText = new createjs.Text("Space: Restart", "24px serif", "Black");
    spaceText.y += 30;
    stage.addChild(gameOverText);
    stage.addChild(spaceText);

    this.action = function(keyCode, stage, user, rocks) {
        if (keyCode == 32) {
            user.init(stage);
            stage.removeChild(gameOverText);
            stage.removeChild(spaceText);
            actionFlag = true;
            gameOverFlag = false;
            for (var i=0; i<rockNum; i++) {
                rocks[i].init(stage);
            }
        }
    }
}

function init () {

    var stage = new createjs.Stage("myCanvas");
    var partition = new createjs.Shape();
    var gameOver;

    var randx;
    var randy;
    var rockx;
    var rocky;

    //var g = new createjs.Graphics();
    var moveMax = 40;
    var speed = 4;
    var allYPartition = [];

    // 白い丸(user)
    var user = new User(40, 460, stage);
    // 赤い丸(敵)
    var enemy1 =new Enemy(40, 100, stage);
    var rocks = [];

    for (i=0; i<rockNum; i++) {
        randx = Math.floor(Math.random() * 13) + 2;
        randy = Math.floor(Math.random() * 9);
        rockx = 20 + 40 * randx;
        rocky = 80 + 40 * randy;
        rocks[i] = new Rock(rockx, rocky, stage);
    }


    // 仕切りの描画
    partition.graphics.beginStroke("black");
    partition.graphics.moveTo(0, 80);
    partition.graphics.lineTo(width, 80);
    stage.addChild(partition);

    window.addEventListener("keydown", handleKeydown);
    function handleKeydown (event) {
        var keyCode = event.keyCode;
        if(actionFlag) {
            user.move(keyCode, stage, rocks);
        }
        if(gameOverFlag) {
            gameOver.action(keyCode, stage, user,rocks);
        }
    }

    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
        if ((user.posx == enemy1.posx) && (user.posy == enemy1.posy)) {
            actionFlag = false;
            gameOverFlag = true;
            gameOver = new GameOver(stage);
            user.posx += 1;
        }
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
