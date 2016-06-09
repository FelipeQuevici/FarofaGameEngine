/**
 * Created by Felipe on 26/05/2016.
 */

CreditsScene.inheritsFrom(Scene);

function CreditsScene() {
    var item1;

    this.declareObjects = function () {
        this.addLayer("GUI",false,true);
    };
    
    function mouseClicked(args) {
        var mousePosition = args["position"];
        var boundingRect = canvas.getBoundingClientRect();
        mousePosition =  new Vector2(mousePosition.x - boundingRect.left, mousePosition.y - boundingRect.top);
        
        if (item1.isPointInside(mousePosition)) {
            backToMenu();
        }
    }

    this.onExit = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("mouse1Clicked",mouseClicked, this);

    };

    this.onEnter = function () {
        var backgroundImage = new BackgroundImageObject(this,"Credits_Screen");
        this.addObject(backgroundImage);

        item1 = new Rectangle(0,8,137,98);

        EventCenterInstance.getInstance().subscribeEvent("mouse1Clicked",mouseClicked, this);
        
        this.initializeObjects();
    };


    function backToMenu() {
        SceneManager.changeScene("MenuScene");
    }
}