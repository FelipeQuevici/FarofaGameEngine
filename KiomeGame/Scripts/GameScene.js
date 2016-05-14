/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    var player;
    var crossHair;

    this.declareCamera = function () {
        this.camera = new CameraFollowWithMargins(this,150,150);
        console.log("SET CAMERA");
    };

    this.declareObjects = function () {
        const tileSize = FarofaGame.getGlobalVariable("tileSize");
        this.addLayer("background");
        this.addLayer("lowerEffects");
        this.addLayer("objectsLayer");
        this.addLayer("hud");
        player = new PlayerGameObject(this, new Vector2(0,0),0);
        this.addObject(player);
        this.camera.setTarget(player);
        console.log("SET TARGET");
        console.log(this.camera.getTarget());

        crossHair = new CrossHairGameObject(this);
        this.addObject(crossHair);

        var maps = FarofaGame.loadObject("Maps/maps");
        var atlas = maps["atlas"];
        var level01 = maps["level01"];
        for (var column in level01["background"]) {
            for (var row in level01["background"][column]) {
                var tile = new TileGameObject(this, new Vector2(row*tileSize,column*tileSize),
                    0,
                    atlas[level01["background"][column][row]]);
                this.addObject(tile);
            }
        }
    };

    /*    var borderSize = 20;
    var allCanvasSize = 500+2*borderSize;
    var amplitude = 5;
    var freq = 1 * 2 * Math.PI * 0.01;
    var elapsed = 0;*/

    this.onPostDraw = function (renderer) {
        /*var context = renderer.getContext();

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
        elapsed+=4;

        context.putImageData(imageData,-borderSize,- borderSize);*/

    };
}

GameScene.inheritsFrom(Scene);