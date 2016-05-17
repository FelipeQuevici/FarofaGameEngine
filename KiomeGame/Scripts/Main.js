/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("characters/character2");
FarofaGame.addSpriteSheet("tileSets/testeTileSet");
FarofaGame.addSpriteSheet("crossHair");

FarofaGame.addAnimation("characters/characterAnimation");

FarofaGame.setGlobalVariable("tileSize",32);

var gameScene = new GameScene();

FarofaGame.addScene(gameScene, "GameScene");
FarofaGame.setInicialScene("GameScene");
FarofaGame.start();