/**
 * Created by Felipe on 18/05/2016.
 */

TextComponent.inheritsFrom(Component);

function TextComponent(parent, text, layer, color, font) {
    function onCreate(parent, text, layer, color, font) {
        this.parent = parent;
        var currentScene = parent.scene;
        this.layer = layer;
        this.text = text;
        if (color) this.color = color;
        if (font) this.font = font;
        currentScene.addSpriteToLayer(this, layer);
    }
    
    this.setText = function (value) {
        console.log(value);
        this.text = value;
    };

    
    this.draw = function (renderer, isUsingCamera) {
        renderer.drawText(this, isUsingCamera)
    };

    onCreate.call(this, parent, text, layer, color, font);
}