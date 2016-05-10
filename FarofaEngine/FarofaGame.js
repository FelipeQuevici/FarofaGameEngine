/**
 * Created by Felipe on 07/05/2016.
 */

var FarofaGame = (function () {
    var canvas;
    var context;
    var fpsCounter;

    var loadDirectory = "";
    var tileSetsToLoad = [];
    
    var renderer;
    
    function gameLoop() {
        SceneManager.update();
        SceneManager.draw(renderer);
    }
    
    return {
        addScene: function (scene, name) {
            scene.onPreInitialize();
            SceneManager.addScene(scene, name);
        },
        
        addSpriteSheet: function (name) {
            SpriteSheetManager.loadSpriteSheet(name);
        },
        
        start: function () {
            canvas = document.getElementById("canvas");
            fpsCounter = document.getElementById("fps");
            SceneManager.initialize();
            InputManager.initialize();
            renderer = new CanvasRenderer(canvas);
            setInterval(gameLoop,1);
        },

        setLoadDirectory : function (value) {
            loadDirectory = value;
        },

        getLoadDirectory : function () {
            return loadDirectory;
        },

        getCanvas: function () {
            return canvas;
        }
    }
})();

function DefineRequesites() {
    
}