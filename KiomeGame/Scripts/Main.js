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
FarofaGame.addSpriteSheet("TileSets/TileSet");
FarofaGame.addSpriteSheet("crossHair");
FarofaGame.addSpriteSheet("oldPoo");
FarofaGame.addSpriteSheet("Hud");
FarofaGame.addSpriteSheet("Hud/drink_overlay");
FarofaGame.addSpriteSheet("poo");

FarofaGame.addAudio("Hotline","Audios/Songs/");
FarofaGame.setGlobalVariable("MainMusic","Hotline");
FarofaGame.setGlobalVariable("MainMusicVolume",0.7);
FarofaGame.addAudio("Mariachi","Audios/Songs/");
FarofaGame.addAudio("Russian","Audios/Songs/");
FarofaGame.addAudio("Drinking","Audios/SFX/");
FarofaGame.addAudio("MeleeAttack","Audios/SFX/");
FarofaGame.addAudio("EnemyHit","Audios/SFX/");
FarofaGame.addAudio("MonkeyHit1","Audios/SFX/");
FarofaGame.addAudio("MonkeyHit2","Audios/SFX/");
FarofaGame.addAudio("MonkeyAttack2","Audios/SFX/");
FarofaGame.addAudio("MonkeyAttack1","Audios/SFX/");

FarofaGame.setGlobalVariable("tileSize",32);


FarofaGame.addScene(new MenuScene(), "MenuScene");
FarofaGame.addScene(new GameScene(), "GameScene");
FarofaGame.setInitialScene("MenuScene");
FarofaGame.start();