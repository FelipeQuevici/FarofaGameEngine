/**
 * Created by Felipe on 07/05/2016.
 */

FarofaGame.setLoadDirectory("KiomeGame/Assets/");

//Player
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

FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingRight");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingBottomRight");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingBottom");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingBottomLeft");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingLeft");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingTopLeft");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingTop");
FarofaGame.addSpriteSheet("Characters/Player/drinking/playerDrinkingTopRight");

FarofaGame.addAnimation("Characters/Player/playerAnimation");

//Enemy
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleRight");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleBottomRight");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleBottom");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleBottomLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleTopLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleTop");
FarofaGame.addSpriteSheet("Characters/Enemy/idle/enemyIdleTopRight");

FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingRight");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingBottomRight");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingBottom");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingBottomLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingTopLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingTop");
FarofaGame.addSpriteSheet("Characters/Enemy/walking/enemyWalkingTopRight");

FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackTop");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackTopLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackTopRight");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackRight");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackLeft");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackBottom");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackBottomRight");
FarofaGame.addSpriteSheet("Characters/Enemy/attack/enemyAttackBottomLeft");

FarofaGame.addAnimation("Characters/Enemy/enemyAnimation");

FarofaGame.addSpriteSheet("TileSets/scenarioAssets");

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