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
        this.enabled = true;
        if (color) this.color = color;
        if (font) this.font = font;
        currentScene.addSpriteToLayer(this, layer);
    }
    
    var offset;
    
    this.setOffset = function (value) {
        offset = value;
    };
    
    this.setText = function (value) {
        //console.log(value);
        this.text = value;
    };

    
    this.draw = function (renderer, isUsingCamera) {
        renderer.drawText(this, isUsingCamera, offset)
    };

    onCreate.call(this, parent, text, layer, color, font);
}