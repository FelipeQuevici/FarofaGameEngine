function SpriteSheet(image, sprites) {
    this.image = image;
    this.sprites = sprites;

    this.getSprite = function (name, rectangle) {
        if (!this.sprites.hasOwnProperty(name)) {
            Debug.log("Sprite " + name + " does not exist.", 5, "spriteName");
            return null;
        }

        return new Sprite(rectangle, image, this.sprites[name]);
    }
}