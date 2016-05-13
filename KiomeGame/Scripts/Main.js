/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("Characters/character2");
FarofaGame.addSpriteSheet("TileSets/testeTileSet");
FarofaGame.addSpriteSheet("crossHair");

FarofaGame.setGlobalVariable("tileSize",60);

var gameScene = new GameScene();

FarofaGame.addScene(gameScene, "GameScene");
FarofaGame.setInicialScene("GameScene");
FarofaGame.start();