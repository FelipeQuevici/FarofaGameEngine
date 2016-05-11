/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("Characters/character2");
FarofaGame.addSpriteSheet("TileSets/testeTileSet");

FarofaGame.setGlobalVariable("tileSize",32);

var gameScene = new GameScene();

FarofaGame.addScene(gameScene);
FarofaGame.start();