var ImagePool = (function () {
    var images = {};
    const IMAGE_EXTENSION = ".png";

    return {
        loadImage: function (name) {
            if (images.hasOwnProperty(name)) {
                Debug.log("Image already loaded", 0, "imagePool");
                return;
            }
            var currentPath = FarofaGame.getLoadDirectory();
            var currentExtension = IMAGE_EXTENSION;
            var image = new Image();
            image.src = currentPath + name + currentExtension;
            images[name] = image;
        },

        getImage: function (name) {
            if (!images.hasOwnProperty(name)) {
                this.loadImage(name);
            }
            return images[name];
        }
    };
})();