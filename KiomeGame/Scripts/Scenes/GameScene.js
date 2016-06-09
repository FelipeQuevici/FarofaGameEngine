/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    var player;
    var crossHair;

    this.declareCamera = function () {
        this.camera = new CameraFollowWithMargins(this,700,400);
    };

    var enemies = [];

    var timeBetweenWaves = 10000;
    var timeWhenLastWaveEnded;

    var enemiesToSpawnThisWave;
    var enemiesSpawnedThisWave;

    this.shouldSpawnEnemy = function () {
        return enemiesSpawnedThisWave < enemiesToSpawnThisWave;
    };

    this.whereToSpawn = function() {
        for (var spawnPoint in spawnPoints) {
            if (spawnPoints[spawnPoint].checkIfIsFree()) {
                return spawnPoints[spawnPoint];
            }
        }
        return null;
    };

    this.spawnEnemy = function (spawnPoint) {
        var enemy = new EnemyGameObject(this, new Vector2(spawnPoint.position.x, spawnPoint.position.y), 0, player);
        this.createObject(enemy);
        enemies.push(enemy);
        enemiesSpawnedThisWave++;
    };

    function fightingWaveState(deltaTime) {
        if (this.shouldSpawnEnemy()) {
            var spawnPointToUse = this.whereToSpawn();
            if (spawnPointToUse) {
                this.spawnEnemy.call(this, spawnPointToUse);
            }
        }

        var updateEnemyList = [];

        for (var enemy in enemies) {
            if (enemies[enemy].wasDestroyed) {
                EventCenterInstance.getInstance().callEvent("enemyDied",this,{"enemy": enemies[enemy]});
                updateEnemyList.push(enemies[enemy]);
            }
        }

        for (var i = 0; i < updateEnemyList.length; i++) {
            enemies.splice(enemies.indexOf(updateEnemyList[i]),1);
        }

        if (enemies.length == 0 && enemiesSpawnedThisWave == enemiesToSpawnThisWave) {
            timeWhenLastWaveEnded = Date.now();
            EventCenterInstance.getInstance().callEvent("waveEnded",this,{"time":timeBetweenWaves/1000});
            currentState = "waitingNextWave";
            wavesCleared++;
        }
    }

    var wavesCleared = 0;
    var spawnPoints = [];


    function waitingNextWaveState() {
        if (Date.now() - timeWhenLastWaveEnded > timeBetweenWaves) {
            enemiesSpawnedThisWave = 0;
            enemiesToSpawnThisWave = wavesCleared;
            EventCenterInstance.getInstance().callEvent("waveStarted",this);
            currentState = "fightingWave";
        }
    }

    var gameStates = {
        "fightingWave": fightingWaveState,
        "waitingNextWave": waitingNextWaveState
    };

    this.onEnter = function () {
        var notStoppedAudios = AudioManager.notStoppedAudios();
        var mainSong = FarofaGame.getGlobalVariable("MainMusic");
        for (var audioIndex in notStoppedAudios) {
            var currentAudio = notStoppedAudios[audioIndex];
            if (currentAudio == mainSong) {
                var volume = FarofaGame.getGlobalVariable("MainMusicVolume");
                AudioManager.setVolume(currentAudio,volume);
                AudioManager.playAudio(currentAudio, true, false);
            }
            else {
                AudioManager.stopAudio(currentAudio);
            }
        }


        const tileSize = 128;
        this.declareCamera();
        timeWhenLastWaveEnded = Date.now();
        currentState = "waitingNextWave";
        wavesCleared = 1;
        for (var objectIndex in this.objects) {
            var object  = this.objects[objectIndex];
            this.destroyObject(object);
        }
        enemies = [];

        this.takePendingObjectsFromList();
        crossHair = new CrossHairGameObject(this);
        this.addObject(crossHair);

        player = new PlayerGameObject(this, new Vector2(1,1),crossHair);
        this.addObject(player);
        this.camera.setTarget(player);
        this.camera.position= new Vector2(0 ,0);
        SceneManager.getRenderer().camera = this.camera;

        var enemySpawn = new EnemySpawnPointGameObject(this, new Vector2(1,311));
        spawnPoints.push(enemySpawn);
        this.addObject(enemySpawn);

        var enemySpawn1 = new EnemySpawnPointGameObject(this, new Vector2(383,1));
        spawnPoints.push(enemySpawn1);
        this.addObject(enemySpawn1);

        var enemySpawn2 = new EnemySpawnPointGameObject(this, new Vector2(1,1));
        spawnPoints.push(enemySpawn2);
        this.addObject(enemySpawn2);

        var enemySpawn3 = new EnemySpawnPointGameObject(this, new Vector2(383,311));
        spawnPoints.push(enemySpawn3);
        this.addObject(enemySpawn3);
        var maps = FarofaGame.loadObject("Maps/maps");
        var atlas = maps["atlas"];
        var level01 = maps["level01"];
        for (var column in level01["background"]) {
            for (var row in level01["background"][column]) {
                var tile = new TileGameObject(this, new Vector2((row-5)*tileSize,(column-5)*tileSize),
                    0,
                    atlas[level01["background"][column][row]]);
                this.addObject(tile);
            }
        }

        var drink1 =  new Drink("drink_1", 10, RestoreHealth, player, 1);
        //var drink1 =  new Drink("drink_1", 0, RestoreHealth, player, 1);
        var overlay1 = new DrinkingSaleOverlayGameObject(this, new Vector2(1295,160),drink1);
        this.addObject(overlay1);
        var drinkingSale1 = new DrinkingSalesGameObject(this,new Vector2(1295,10),drink1, overlay1);
        this.addObject(drinkingSale1);

        var drink2 =  new Drink("drink_2", 30, GivesExtraHeart, player, 2);
        //var drink2 =  new Drink("drink_2", 0, GivesExtraHeart, player, 2);
        var overlay2 = new DrinkingSaleOverlayGameObject(this, new Vector2(1213,160),drink2);
        this.addObject(overlay2);
        var drinkingSale2 = new DrinkingSalesGameObject(this,new Vector2(1213,10),drink2, overlay2);
        this.addObject(drinkingSale2);

        var drink3 =  new Drink("drink_3", 15, SpeedBonus, player, 3);
        //var drink3 =  new Drink("drink_3", 0, SpeedBonus, player, 3);
        var overlay3 = new DrinkingSaleOverlayGameObject(this, new Vector2(1135,160),drink3);
        this.addObject(overlay3);
        var drinkingSale3 = new DrinkingSalesGameObject(this,new Vector2(1135,10),drink3, overlay3);
        this.addObject(drinkingSale3);

        var drink4 =  new Drink("drink_4", 25, InvincibleBonus, player, 4);
        //var drink4 =  new Drink("drink_4", 0, InvincibleBonus, player, 4);
        var overlay4 = new DrinkingSaleOverlayGameObject(this, new Vector2(1054,160),drink4);
        this.addObject(overlay4);
        var drinkingSale4 = new DrinkingSalesGameObject(this,new Vector2(1054,10),drink4, overlay4);
        this.addObject(drinkingSale4);
        
        var hudLife1 = new PlayerLifeGUIGameObject(this, player, 0);
        this.addObject(hudLife1);
        var hudLife2 = new PlayerLifeGUIGameObject(this, player, 1);
        this.addObject(hudLife2);
        var hudLife3 = new PlayerLifeGUIGameObject(this, player, 2);
        this.addObject(hudLife3);

        var moneyText = new MoneyTextGUIGameObject(this, player);
        this.addObject(moneyText);

        var moneyIcon = new MoneyImageGUIGameObject(this);
        this.addObject(moneyIcon);

        var adrenalineBorder = new AdrenalineBorderGUIGameObject(this);
        this.addObject(adrenalineBorder);

        var adrenalineBar = new AdrenalineBarGUIGameObject(this, player);
        this.addObject(adrenalineBar);

        var drinkInventoryIndex1 = new DrinkInventoryDisplayIndex(this, player, 1);
        this.addObject(drinkInventoryIndex1);

        var drinkInventoryIndex2 = new DrinkInventoryDisplayIndex(this, player, 2);
        this.addObject(drinkInventoryIndex2);

        var drinkInventoryIndex3 = new DrinkInventoryDisplayIndex(this, player, 3);
        this.addObject(drinkInventoryIndex3);

        var drinkInventoryIndex4 = new DrinkInventoryDisplayIndex(this, player, 4);
        this.addObject(drinkInventoryIndex4);

        var bonusBorder = new BonusBorderGUIGameObject(this);
        this.addObject(bonusBorder);

        var bonusBar = new BonusBarGUIGameObject(this,player);
        this.addObject(bonusBar);
        	
        var balcony = new ScenarioGameObject(this, 1152, -220, "scenarioAsset1");
        this.addObject(balcony);
        
        var table1 = new ScenarioGameObject(this, 900, 400, "scenarioAsset3");
        this.addObject(table1);
        
        var table2 = new ScenarioGameObject(this, -70, -300, "scenarioAsset3");
        this.addObject(table2);
        
        var table3 = new ScenarioGameObject(this, 0, 500, "scenarioAsset4");
        this.addObject(table3);
        
        var table4 = new ScenarioGameObject(this, 600, 1000, "scenarioAsset5");
        this.addObject(table4);
        
        var table5 = new ScenarioGameObject(this, 1350, 800, "scenarioAsset6");
        this.addObject(table5);
        
        var table6 = new ScenarioGameObject(this, 400, 100, "scenarioAsset2");
        this.addObject(table6);
        
        var speakers1 = new ScenarioGameObject(this, -525, -530, "scenarioAsset7");
        this.addObject(speakers1);
        
        var speakers2 = new ScenarioGameObject(this, 885, -530, "scenarioAsset7");
        this.addObject(speakers2);

        var errorDialog = new HelperDialogGUIGameObject(this);
        this.addObject(errorDialog);

        var nextWaveDialog = new NextWaveDialog(this);
        this.addObject(nextWaveDialog);
        
        this.initializeObjects();
        gameOver = false;
    };

    var currentState = "waitingNextWave";

    this.onPreUpdate = function (deltaTime) {
        if (!gameOver)
            gameStates[currentState].call(this, deltaTime);
        else {
        	if (InputManager.isKeyPressed("attack1")){
        		this.onEnter();
        	}

        }
    };

    var gameOver = false;
    this.gameOver = function () {
        gameOver = true;
    };

    this.declareObjects = function () {
        this.addLayer("background");
        this.addLayer("objectsLayer", true);
        this.addLayer("hud");
        this.addLayer("GUI",false,true);
    };

    var borderSize = 50;
    var allCanvasWidth = canvas.width+2*borderSize;
    var allCanvasHeight = canvas.height+2*borderSize;
    var amplitude = 10;
    var freq = 1/10 * 2 * Math.PI * 0.01;
    var elapsed = 0;
    var elapsedChange = 20  ;

    this.onPostDraw = function (renderer) {
        /* var context = renderer.getContext();
         context.fillStyle = "black";
         context.fillText(currentState, 10, 10);*/

        var context = renderer.getContext();

        /*context.fillText(fps.getFPS(),10,10);
         context.fill();


         var imageData = context.getImageData(-borderSize,-borderSize,allCanvasWidth,allCanvasHeight);
         var data = imageData.data;

         for (var y = 0; y < allCanvasHeight; y++) {
         var translate = Math.floor((amplitude * Math.sin(freq * (y + elapsed))))*4;
         var x;

         if (translate > 0) {
         for (x = allCanvasWidth-1; x > translate; x--) {
         var pixelIndex = (y * allCanvasWidth + x) * 4;
         data[pixelIndex] = data[pixelIndex-translate];
         data[pixelIndex+1] = data[pixelIndex-translate+1];
         data[pixelIndex+2] = data[pixelIndex-translate+2];
         data[pixelIndex+3] = data[pixelIndex-translate+3];
         }
         for (x = translate; x >= 0; x--) {
         var pixelIndex = (y * allCanvasWidth + x) * 4;
         data[pixelIndex] = 0;
         data[pixelIndex+1] = 0;
         data[pixelIndex+2] = 0;
         data[pixelIndex+3] = 255;
         }
         }
         else if (translate < 0) {
         for (x = 0; x < allCanvasWidth-1 - translate; x++) {
         var pixelIndex = (y * allCanvasWidth + x) * 4;
         data[pixelIndex] = data[pixelIndex-translate];
         data[pixelIndex+1] = data[pixelIndex-translate+1];
         data[pixelIndex+2] = data[pixelIndex-translate+2];
         data[pixelIndex+3] = data[pixelIndex-translate+3];
         }
         for (x = allCanvasWidth - translate; x < allCanvasWidth-1; x++) {
         var pixelIndex = (y * allCanvasWidth + x) * 4;
         data[pixelIndex] = 255;
         data[pixelIndex+1] = 255;
         data[pixelIndex+2] = 255;
         data[pixelIndex+3] = 255;
         }
         }
         }
         elapsed+=elapsedChange;
         context.putImageData(imageData,-borderSize,- borderSize);*/

    };
}

GameScene.inheritsFrom(Scene);