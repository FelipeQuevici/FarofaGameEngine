/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    var player;

    this.onPreInitialize = function () {
        this.addLayer("background");
        this.addLayer("lowerEffects");
        player = new PlayerGameObject(this, new Vector2(10,10),0);
        this.addObject(player);
        player.onInitialize();
        console.log("GameScenePreInitialized");
    };

   /* var borderSize = 20;
    var allCanvasSize = 500+2*borderSize;
    var amplitude = 5;
    var freq = 2 * 2 * Math.PI * 0.01;
    var elapsed = 0;*/

    this.onPostDraw = function (context) {
        /*context.fillText(fps.getFPS(),10,10);
        context.fill();
        console.log("ASD");
        var imageData = context.getImageData(-borderSize,-borderSize,allCanvasSize,allCanvasSize);
        var data = imageData.data;
        var newData = [];

        for (var y = 0; y < allCanvasSize; y++) {
            var translate = Math.floor((amplitude * Math.sin(freq * (y + elapsed))))*4;
            //console.log(translate);
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
                    data[pixelIndex+3] = 0;
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
                    data[pixelIndex+3] = 0;
                }
            }
        }
        elapsed++;
        context.putImageData(imageData,-borderSize,- borderSize);*/
    };


    this.onEnter = function () {
    };
}

GameScene.inheritsFrom(Scene);