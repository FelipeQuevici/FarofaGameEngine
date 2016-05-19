function SpriteSheet(image, sprites) {
    this.image = image;
    this.sprites = sprites;

    this.getSprite = function (name) {
        if (!this.sprites.hasOwnProperty(name)) {
            Debug.log("Sprite " + name + " does not exist.", 5, "spriteName");
            return null;
        }

        return new Sprite(image, this.sprites[name]);
    }
}