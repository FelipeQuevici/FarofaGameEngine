/**
 * Created by Felipe on 07/05/2016.
 */

var SceneManager = (function () {
    var scenes = [];
    var scenesNames = {};
    var currentScene;
    var isInTransition = false;
    var millisecondsLastUpdate;
    var millisecondsBetweenUpdate = 1000/60;
    var renderer;

    function refreshCanvas() {
        FarofaGame.getCanvas().width = FarofaGame.getCanvas().width;
    }

    return {
        initialScene: "",

        initialize: function (newRenderer) {
            renderer = newRenderer;
            this.changeScene(this.initialScene);
            millisecondsLastUpdate = Date.now();
        },

        update: function () {
            var timeNow = Date.now();
            var deltaTime = timeNow - millisecondsLastUpdate;
            
            if (deltaTime > millisecondsBetweenUpdate) {
            	deltaTime = deltaTime/1000;                
                currentScene.onPreUpdate(deltaTime);
                currentScene.onUpdate(deltaTime);
                currentScene.onPostUpdate(deltaTime);
            }
        },

        draw: function () {
        	var timeNow = Date.now();
            var deltaTime = timeNow - millisecondsLastUpdate;
            
            if (deltaTime > millisecondsBetweenUpdate) {
            	millisecondsLastUpdate = timeNow;
	            renderer.refreshCanvas();
	            currentScene.onDraw(renderer);
            }
        },

        addScene : function (scene, name) {
            scenesNames[name] = scenes.length;
            scenes.push(scene);
        },

        changeScene : function (sceneName) {
            if (isInTransition) {
                Debug.log("Cant change scene during transition", 2, "sceneManager");
                return;
            }
            if (!scenesNames.hasOwnProperty(sceneName)) {
                Debug.log("The scene " + sceneName + " does not exits.", 3, "sceneManager");
                return;
            }

            isInTransition = true;

            if (currentScene)
                currentScene.onPreExit();

            currentScene = scenes[scenesNames[sceneName]];

            currentScene.onPreEnter();
            renderer.camera = currentScene.camera;
            console.log("Set Camera" );
            console.log(renderer);

            isInTransition = false;
        },

        getCurrentScene: function () {
            return currentScene;
        }
    };
})();