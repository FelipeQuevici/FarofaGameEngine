/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("Characters/Player/playerIdle");
FarofaGame.addSpriteSheet("Characters/Player/playerWalking");
FarofaGame.addSpriteSheet("Characters/Player/playerAttack");
FarofaGame.addAnimation("Characters/Player/playerAnimation");

FarofaGame.addSpriteSheet("Characters/Enemy/enemyIdle");
FarofaGame.addSpriteSheet("Characters/Enemy/enemyWalking");
FarofaGame.addSpriteSheet("Characters/Enemy/enemyAttack");
FarofaGame.addAnimation("Characters/Enemy/enemyAnimation");

FarofaGame.addSpriteSheet("TileSets/testeTileSet");
FarofaGame.addSpriteSheet("crossHair");
FarofaGame.addSpriteSheet("oldPoo");
FarofaGame.addSpriteSheet("Hud");
FarofaGame.addSpriteSheet("poo");



FarofaGame.setGlobalVariable("tileSize",32);

;

FarofaGame.addScene(new GameScene(), "GameScene");
FarofaGame.setInitialScene("GameScene");
FarofaGame.start();