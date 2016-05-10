var SpriteSheetManager = (function () {
    var spriteSheets = {};

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
        loadSpriteSheet: function (name) {
            console.log("Loadgin Spritesheet:" + name);

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
            rectangle = rectangle || new Rectangle();
            direction = direction != null ? "-"+direction : "";
            for (var spriteSheetName in spriteSheets) {
                var currentSpriteSheet = spriteSheets[spriteSheetName];
                if (!currentSpriteSheet.hasOwnProperty("sprites")) continue;

                if (currentSpriteSheet.sprites.hasOwnProperty(spriteName+direction)) {
                    return currentSpriteSheet.getSprite(spriteName+direction, rectangle);
                }
            }
            console.log("Nao existe esse sprite!");
        }
    };
})();

