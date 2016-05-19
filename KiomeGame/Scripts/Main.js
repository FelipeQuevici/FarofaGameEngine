/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("Characters/character2");
FarofaGame.addSpriteSheet("Characters/playerIdle");
FarofaGame.addSpriteSheet("TileSets/testeTileSet");
FarofaGame.addSpriteSheet("crossHair");
FarofaGame.addSpriteSheet("Characters/enemy");
FarofaGame.addSpriteSheet("oldPoo");
FarofaGame.addSpriteSheet("Hud");
FarofaGame.addSpriteSheet("poo");


FarofaGame.addAnimation("Characters/characterAnimation");

FarofaGame.setGlobalVariable("tileSize",32);

var gameScene = new GameScene();

FarofaGame.addScene(gameScene, "GameScene");
FarofaGame.setInicialScene("GameScene");
FarofaGame.start();