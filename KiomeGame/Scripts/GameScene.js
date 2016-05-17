/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    var player;
    var crossHair;

    this.declareCamera = function () {
        this.camera = new CameraFollowWithMargins(this,150,150);
    };

    var enemies = [];

    this.declareObjects = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");
        this.addLayer("background");
        this.addLayer("lowerEffects");
        this.addLayer("objectsLayer", true);
        this.addLayer("hud");

        crossHair = new CrossHairGameObject(this);
        this.addObject(crossHair);

        player = new PlayerGameObject(this, new Vector2(0,0),crossHair);
        this.addObject(player);
        this.camera.setTarget(player);
        this.camera.position.sum(new Vector2(150,150));

        var enemy1 = new EnemyGameObject(this, new Vector2(0,130),270);
        enemies.push(enemy1);
        this.addObject(enemy1);

        var enemy2 = new EnemyGameObject(this, new Vector2(130, 0), 180);
        enemies.push(enemy2);
        this.addObject(enemy2);

        var enemy3 = new EnemyGameObject(this, new Vector2(130,130),215);
        this.addObject(enemy3);

        //var sprite = SpriteSheetManager.getSprite("poo",new Rectangle(0,0,16,16));
        //var bulletTest = new ProjectileGameObject(this, new Vector2(50,50),sprite,polarToVector(1,50));
        //his.addObject(bulletTest);

        var maps = FarofaGame.loadObject("Maps/maps");
        var atlas = maps["atlas"];
        var level01 = maps["level01"];
        for (var column in level01["background"]) {
            for (var row in level01["background"][column]) {
                var tile = new TileGameObject(this, new Vector2((row-5)*tileSize,(column-5)*tileSize),
                    0,
                    atlas[level01["background"][column][row]]);
                this.addObject(tile);
            }
        }
    };

   /* var borderSize = 50;
    var allCanvasSize = 500+2*borderSize;
    var amplitude = 5;
    var freq = 1 * 2 * Math.PI * 0.01;
    var elapsed = 0;
    var elapsedChange = 20  ;*/

    this.onPostDraw = function (renderer) {
       /* var context = renderer.getContext();

        context.fillText(fps.getFPS(),10,10);
        context.fill();

        
        var imageData = context.getImageData(-borderSize,-borderSize,allCanvasSize,allCanvasSize);
        var data = imageData.data;

        for (var y = 0; y < allCanvasSize; y++) {
            var translate = Math.floor((amplitude * Math.sin(freq * (y + elapsed))))*4;
            var x;

            if (translate > 0) {
                for (x = allCanvasSize-1; x > translate; x--) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = data[pixelIndex-translate];
                    data[pixelIndex+1] = data[pixelIndex-translate+1];
                    data[pixelIndex+2] = data[pixelIndex-translate+2];
                    data[pixelIndex+3] = data[pixelIndex-translate+3];
                }
                for (x = translate; x >= 0; x--) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = 0;
                    data[pixelIndex+1] = 0;
                    data[pixelIndex+2] = 0;
                    data[pixelIndex+3] = 255;
                }
            }
            else if (translate < 0) {
                for (x = 0; x < allCanvasSize-1 - translate; x++) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = data[pixelIndex-translate];
                    data[pixelIndex+1] = data[pixelIndex-translate+1];
                    data[pixelIndex+2] = data[pixelIndex-translate+2];
                    data[pixelIndex+3] = data[pixelIndex-translate+3];
                }
                for (x = allCanvasSize - translate; x < allCanvasSize-1; x++) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = 255;
                    data[pixelIndex+1] = 255;
                    data[pixelIndex+2] = 255;
                    data[pixelIndex+3] = 255;
                }
            }
        }
        elapsed+=elapsedChange;

        context.putImageData(imageData,-borderSize,- borderSize);
            */
    };
}

GameScene.inheritsFrom(Scene);