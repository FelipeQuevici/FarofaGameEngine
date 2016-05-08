/**
 * Created by Felipe on 07/05/2016.
 */

var SceneManager = (function () {
    var scenes = [];
    var scenesNames = {};
    var currentScene;
    var isInTransition = false;

    return {
        initialize: function () {
            currentScene = scenes[0];
        },

        update: function () {
            currentScene.onPreUpdate();
            currentScene.onUpdate();
            currentScene.onPostUpdate();
        },

        draw: function () {
            currentScene.onDraw();
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

            isInTransition = false;
        },

        getCurrentScene: function () {
            return currentScene;
        }
    };
})();