var SpriteSheetManager = (function () {
    var spriteSheets = {};
    //const JSON_PATH = "http://people.ucsc.edu/~earrais/CMPM_120/Snake/Images/";
    const JSON_PATH = "Sprites/";

    function loadJSON(callback, file) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");


        xobj.open('GET', JSON_PATH + file + ".json", false);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    return {
        loadSpriteSheet: function (name) {
            if (spriteSheets.hasOwnProperty(name)) {
                Debug.log("Sprite sheet already loaded", 0, "spriteName");
                return;
            }

            var image = ImagePool.getImage(name);
            var json = "";

            function loadCallback(file) {
                json = JSON.parse(file);
                spriteSheets[name] = new SpriteSheet(image, json);
            }

            loadJSON(loadCallback, name);
        },

        getSpriteFromSpriteSheet: function (spriteName, spriteSheetName, rectangle, direction) {
            direction = direction || "";
            rectangle = rectangle || new Rectangle();

            if (!spriteSheets.hasOwnProperty(spriteSheetName)) {
                this.loadSpriteSheet(spriteSheetName);
            }
            return spriteSheets[spriteSheetName].getSprite(spriteName+direction, rectangle);
        },

        getSprite: function (spriteName, rectangle, direction) {

        }
    };
})();

