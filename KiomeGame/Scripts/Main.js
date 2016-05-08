/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("witchTileSet");

//FarofaGame.addScene(new Scene());
//FarofaGame.start();

var gameScene = new GameScene();

FarofaGame.addScene(gameScene);
FarofaGame.start();