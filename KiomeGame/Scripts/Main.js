/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleRight");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleBottomRight");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleBottom");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleBottomLeft");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleLeft");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleTopLeft");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleTop");
FarofaGame.addSpriteSheet("Characters/Player/idle/playerIdleTopRight");

FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingRight");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingBottomRight");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingBottom");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingBottomLeft");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingLeft");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingTopLeft");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingTop");
FarofaGame.addSpriteSheet("Characters/Player/walking/playerWalkingTopRight");

FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackTop");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackTopLeft");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackTopRight");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackRight");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackLeft");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackBottom");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackBottomRight");
FarofaGame.addSpriteSheet("Characters/Player/attack/playerAttackBottomLeft");

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