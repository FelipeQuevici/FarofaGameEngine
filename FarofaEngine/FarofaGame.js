/**
 * Created by Felipe on 07/05/2016.
 */

var FarofaGame = (function () {
    var canvas;
    var context;

    var loadDirectory = "";

    function gameLoop() {
        SceneManager.update();
        SceneManager.draw(context);
    }
    
    return {
        addScene: function (scene, name) {
            scene.onPreInitialize();
            SceneManager.addScene(scene, name);
        },
        
        start: function () {
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            InputManager.getInstance().initialize();
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

        getContext: function () {
            return context;
        }
    }
})();