/**
 * Created by Felipe on 07/05/2016.
 */

var SceneManager = (function () {
    var scenes = [];
    var scenesNames = {};
    var currentScene;
    var isInTransition = false;
    var renderer;

    function refreshCanvas() {
        FarofaGame.getCanvas().width = FarofaGame.getCanvas().width;
    }

    return {
        initialScene: "",

        initialize: function (newRenderer) {
            renderer = newRenderer;
            this.changeScene(this.initialScene);
        },
        
        pause: function () {
              
        },

        update: function (deltaTime) {
            deltaTime = deltaTime/1000;
            currentScene.onInternalPreUpdate(deltaTime);
            currentScene.onPreUpdate(deltaTime);
            currentScene.onUpdate(deltaTime);
            currentScene.onPostUpdate(deltaTime);
        },

        draw: function () {
            renderer.refreshCanvas();
            currentScene.onDraw(renderer);
        },
        
        drawCollisions: function () {
        	currentScene.onDrawCollisions(renderer);
        },

        addScene : function (scene, name) {
            scenesNames[name] = scenes.length;
            scene.onInternalInitialize();
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
            Debug.log("Set Camera",0,"sceneManager" );

            isInTransition = false;
        },

        getCurrentScene: function () {
            return currentScene;
        }
    };
})();