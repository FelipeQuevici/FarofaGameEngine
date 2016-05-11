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
            millisecondsLastUpdate = new Date().getTime();
        },

        update: function () {
            var date = new Date();
            var timeNow = date.getTime();
            if (timeNow - millisecondsLastUpdate > millisecondsBetweenUpdate) {
                millisecondsLastUpdate = timeNow;
                currentScene.onPreUpdate();
                currentScene.onUpdate();
                currentScene.onPostUpdate();
            }
        },

        draw: function () {
            //refreshCanvas();
            renderer.refreshCanvas();
            currentScene.onDraw(renderer);
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