/**
 * Created by Felipe on 25/05/2016.
 */

function GameOverScene() {
    this.onPostDraw = function (renderer) {
        var context = renderer.getContext();
        context.fillStyle = "black";
        context.fillText("GameOver", 10, 10);
    }
}