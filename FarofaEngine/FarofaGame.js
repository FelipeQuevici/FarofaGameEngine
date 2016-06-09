/**
 * Created by Felipe on 07/05/2016.
 */

var FarofaGame = (function () {
    var canvas;
    var fpsCounter;

    var loadDirectory = "";

    var renderer;

    var globalVariables = {};

    var millisecondsLastUpdate;
    var millisecondsBetweenUpdate = 1000/60;

    function gameLoop() {
        var timeNow = Date.now();
        var deltaTime = timeNow - millisecondsLastUpdate;
        if (deltaTime > millisecondsBetweenUpdate) {
            millisecondsLastUpdate = timeNow;
            SceneManager.update(deltaTime);
            SceneManager.draw(renderer);
            //SceneManager.drawCollisions(renderer);
        }
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

    var isPaused = false;
    function pause() {
        //console.log("ASD");
        isPaused = true;
    }

    function unPause() {
        isPaused = false;
    }

    var bgColor = "#5F61C2";
    return {
        setBgColor: function (color) {
            bgColor = color;
        },
        addScene: function (scene, name) {
            //scene.onInternalInitialize();
            SceneManager.addScene(scene, name);
        },
        setInitialScene: function (name) {
            SceneManager.initialScene = name;
        },
        
        addSpriteSheet: function (name) {
            SpriteSheetManager.loadSpriteSheet(name);
        },
        
        addAnimation: function (name) {
            AnimationManager.loadAnimation(name);
        },

        addAudio: function (name, directory) {
            AudioManager.loadAudio(name, directory);
        },
        
        start: function () {
            canvas = document.getElementById("canvas");
            fpsCounter = document.getElementById("fps");
            renderer = new CanvasRenderer(canvas);
            renderer.setBackgroundColor(bgColor);
            SceneManager.initialize(renderer);
            InputManager.initialize();
            millisecondsLastUpdate = Date.now();
            window.oncontextmenu = function ()
            {
                return false;
            };
            canvas.focus();
            canvas.addEventListener("onfocusout", pause, true);

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