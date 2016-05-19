/**
 * Created by Felipe on 07/05/2016.
 */

function GameScene() {
    var player;
    var crossHair;

    this.declareCamera = function () {
        this.camera = new CameraFollowWithMargins(this,150,150);
    };

    var enemies = [];

    
    var timeBetweenWaves = 5000;
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
        var enemy = new EnemyGameObject(this, new Vector2(spawnPoint.position.x - 64, spawnPoint.position.y - 115), 0);
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
            currentState = "waitingNextWave";
            wavesCleared++;
        }
    }
    
    var wavesCleared = 0;
    var spawnPoints = [];
    

    function waitingNextWaveState() {
        if (Date.now() - timeWhenLastWaveEnded > timeBetweenWaves) {
            enemiesSpawnedThisWave = 0;
            enemiesToSpawnThisWave = wavesCleared + 1;
            currentState = "fightingWave";
        }
    }

    var gameStates = {
        "fightingWave": fightingWaveState,
        "waitingNextWave": waitingNextWaveState
    };

    this.onEnter = function () {
        timeWhenLastWaveEnded = Date.now();
        currentState = "waitingNextWave";
        wavesCleared = 1;
    };

    var currentState = "waitingNextWave";

    this.onPreUpdate = function (deltaTime) {
        gameStates[currentState].call(this, deltaTime);
    };

    this.declareObjects = function () {
        const tileSize = 32;//FarofaGame.getGlobalVariable("tileSize");
        this.addLayer("background");
        this.addLayer("objectsLayer", true);
        this.addLayer("hud");
        this.addLayer("GUI",false,true);

        crossHair = new CrossHairGameObject(this);
        this.addObject(crossHair);

        player = new PlayerGameObject(this, new Vector2(1,1),crossHair);
        this.addObject(player);
        this.camera.setTarget(player);
        this.camera.position.sum(new Vector2(150,150));

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

        //var sprite = SpriteSheetManager.getSprite("poo",new Rectangle(0,0,16,16));
        //var bulletTest = new ProjectileGameObject(this, new Vector2(50,50),sprite,polarToVector(1,50));
        //his.addObject(bulletTest);

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
    };

   /* var borderSize = 50;
    var allCanvasSize = 500+2*borderSize;
    var amplitude = 5;
    var freq = 1 * 2 * Math.PI * 0.01;
    var elapsed = 0;
    var elapsedChange = 20  ;*/

    this.onPostDraw = function (renderer) {
       /* var context = renderer.getContext();
        context.fillStyle = "black";
        context.fillText(currentState, 10, 10);*/

       /* var context = renderer.getContext();

        context.fillText(fps.getFPS(),10,10);
        context.fill();

        
        var imageData = context.getImageData(-borderSize,-borderSize,allCanvasSize,allCanvasSize);
        var data = imageData.data;

        for (var y = 0; y < allCanvasSize; y++) {
            var translate = Math.floor((amplitude * Math.sin(freq * (y + elapsed))))*4;
            var x;

            if (translate > 0) {
                for (x = allCanvasSize-1; x > translate; x--) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = data[pixelIndex-translate];
                    data[pixelIndex+1] = data[pixelIndex-translate+1];
                    data[pixelIndex+2] = data[pixelIndex-translate+2];
                    data[pixelIndex+3] = data[pixelIndex-translate+3];
                }
                for (x = translate; x >= 0; x--) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = 0;
                    data[pixelIndex+1] = 0;
                    data[pixelIndex+2] = 0;
                    data[pixelIndex+3] = 255;
                }
            }
            else if (translate < 0) {
                for (x = 0; x < allCanvasSize-1 - translate; x++) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = data[pixelIndex-translate];
                    data[pixelIndex+1] = data[pixelIndex-translate+1];
                    data[pixelIndex+2] = data[pixelIndex-translate+2];
                    data[pixelIndex+3] = data[pixelIndex-translate+3];
                }
                for (x = allCanvasSize - translate; x < allCanvasSize-1; x++) {
                    var pixelIndex = (y * allCanvasSize + x) * 4;
                    data[pixelIndex] = 255;
                    data[pixelIndex+1] = 255;
                    data[pixelIndex+2] = 255;
                    data[pixelIndex+3] = 255;
                }
            }
        }
        elapsed+=elapsedChange;

        context.putImageData(imageData,-borderSize,- borderSize);
            */
    };
}

GameScene.inheritsFrom(Scene);