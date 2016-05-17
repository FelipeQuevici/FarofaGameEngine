var AnimationManager = (function () {
    var animations = {};

    function loadJSON(callback, file) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");


        xobj.open('GET', FarofaGame.getLoadDirectory() + file + ".json", false);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    return {
        loadAnimation: function (name) {
            Debug.log("Loading Animation:" + name, 0, "animation");

            if (animations.hasOwnProperty(name)) {
                Debug.log("Animation already loaded", 0, "animation");
                return;
            }
            
            var json = "";

            function loadCallback(file) {
                json = JSON.parse(file);
                for(var animationName in json){
                	animations[animationName] = new Animation(animationName, json);
                }                
            }

            loadJSON(loadCallback, name);
        },
        
        getAnimation: function (animationName) {
        	return animations[animationName];
            Debug.log("The sprite " + animationName + " does not exist", 5, "generic");
        }
    };
})();

