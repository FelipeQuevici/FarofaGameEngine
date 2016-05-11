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

    var globalVariables = {};

    function gameLoop() {
        SceneManager.update();
        SceneManager.draw(renderer);
    }
    
    function loadJSON(callback, file) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");


        xobj.open('GET', loadDirectory + file + ".json", false);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    var objectToReturn;
    function returnObject(string) {
        objectToReturn = JSON.parse(string);
    }
    
    return {
        addScene: function (scene, name) {
            scene.onInternalInitialize();
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
        },

        loadObject: function (file) {
            loadJSON(returnObject,file);
            return objectToReturn;
        },
        setGlobalVariable: function (name, value) {
            globalVariables[name] = value;
        },
        getGlobalVariable: function (name) {
            return globalVariables[name];
        }
    }
})();