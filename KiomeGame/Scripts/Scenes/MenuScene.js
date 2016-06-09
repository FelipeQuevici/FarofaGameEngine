/**
 * Created by Felipe on 26/05/2016.
 */

MenuScene.inheritsFrom(Scene);

function MenuScene() {
    var item1;
    var item2;
    var item3;

    this.declareObjects = function () {
        this.addLayer("GUI",false,true);
    };

    function goToInstructions() {
        SceneManager.changeScene("InstructionsScene");
    }

    function goToCredits() {
        SceneManager.changeScene("CreditsScene");
    }

    function mouseClicked(args) {
        var mousePosition = args["position"];
        var boundingRect = canvas.getBoundingClientRect();
        mousePosition =  new Vector2(mousePosition.x - boundingRect.left, mousePosition.y - boundingRect.top);
        
        if (item1.isPointInside(mousePosition)) {
            startGame();
        }
        if (item2.isPointInside(mousePosition)){
            goToInstructions();
        }
        if (item3.isPointInside(mousePosition)) {
            goToCredits();
        }
    }

    this.onExit = function () {
        EventCenterInstance.getInstance().unsubscribeEvent("mouse1Clicked",mouseClicked, this);
    };

    this.onEnter = function () {
        var backgroundImage = new BackgroundImageObject(this,"Menu_Screen");
        this.addObject(backgroundImage);

        item1 = new Rectangle(682,420,204,115);
        item2 = new Rectangle(480,565,609,112);
        item3 = new Rectangle(613, 706,342, 112);

        var mainSong = FarofaGame.getGlobalVariable("MainMusic");
        var volume = FarofaGame.getGlobalVariable("MainMusicVolume");
        AudioManager.setVolume(mainSong,volume);
        AudioManager.playAudio(mainSong, true, false);

        EventCenterInstance.getInstance().subscribeEvent("mouse1Clicked",mouseClicked, this);
        
        this.initializeObjects();
    };

    this.onUpdate = function () {
    };

    function startGame() {
        SceneManager.changeScene("GameScene");
    }
}