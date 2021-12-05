var bandu, banduMoving, banduDefeat, banduIcon, banduIconImg, banduDefeatIconImg;
var rightBoundary, leftBoundary, downBoundary;
var bg, backgroundImg;
var pizzaFlying;
var ground, groundImg;
var minionMoving;
var restartButton, restartButtonImg;
var deathSound;
var gameState = "play";
var score = 0;


function preload(){
    banduMoving = loadAnimation("bandurunninganimationleft.png", "bandurunninganimationright.png");
    backgroundImg = loadImage("bandubg.png");
    minionMoving = loadAnimation("MinionApplecore.gif");
    pizzaFlying = loadAnimation("PizzaBox.gif");
    banduDefeat = loadAnimation("bandusad.png");
    banduIconImg = loadImage("banduisalive.png");
    banduDefeatIconImg = loadImage("banduisded.png");
    restartButtonImg = loadImage("botondereinicio.png");
    deathSound = loadSound("vineboom.mp3");
}

function setup() {
    createCanvas(400, 550);
    bg = createSprite(400, 300, 100, 100);
    bg.addImage(backgroundImg),
    bg.velocityY = 1;
    bandu = createSprite(200, 500, 20, 20);
    bandu.addAnimation("Moving", banduMoving);
    bandu.addAnimation("sad", banduDefeat);
    banduIcon = createSprite(370, 75);
    banduIcon.addImage(banduIconImg);
    banduIcon.scale = 0.5;
    downBoundary = createSprite(200, 600, 600, 20);
    downBoundary.visible = false;
    leftBoundary = createSprite(0, 450, 20, 1000);
    leftBoundary.visible = false;
    rightBoundary = createSprite(400, 450, 20, 1000);
    rightBoundary.visible = false;
    restartButton = createSprite(200, 225);
    restartButton.addImage(restartButtonImg);
    restartButton.scale = 0.1
    restartButton.visible = false;
    
    bandu.scale = 0.1;

    //bandu.debug = true;

    minionsGroup = new Group();
    pizzaGroup = new Group();
    
 
}

function draw() {
    background("white");

    bandu.collide(rightBoundary);
    bandu.collide(leftBoundary);
    bandu.collide(downBoundary);

    if(gameState === "play"){
        //Sangria-----------
        text("Puntuacion: "+ score, 250, 10);
        score = score + 1;

        if(keyDown("A")){
            bandu.x = bandu.x -5;
        }
        if(keyDown("D")){
            bandu.x = bandu.x +5;
        }
        if(keyDown("W")){
            if(bandu.y >200){
                bandu.y = bandu.y -5;
            }
        }
        if(keyDown("S")){
            bandu.y = bandu.y +5;
        }

        spawnMinions();
        spawnPizza();

        if(bg.y > 350){
            bg.y = 300;
        }

        if (bandu.isTouching(minionsGroup) || bandu.isTouching(pizzaGroup)){
            deathSound.play();
            gameState = "end"
            
        }
    }

    if(gameState === "end"){
        text("Puntuacion: "+ score, 250, 10);
        bg.velocityY = 0;
        bandu.changeAnimation("sad", banduDefeat)
        bandu.scale = 0.5
        minionsGroup.setVelocityYEach(0);
        pizzaGroup.destroyEach(0);
        minionsGroup.setLifetimeEach(-1);
        pizzaGroup.setLifetimeEach(-1);
        banduIcon.addImage(banduDefeatIconImg);
        restartButton.visible = true;

        if(mousePressedOver(restartButton)){
            Restart();
        }
    }
    
    
    drawSprites();
 
}





function spawnMinions(){
    if(frameCount%40 == 0){
        var minionEnemy = createSprite(200,50);
        minionEnemy.velocityY = +(4 +score/100);
        minionEnemy.addAnimation("Minion", minionMoving);
        minionEnemy.scale =0.2;
        minionEnemy.x = Math.round(random(20,280));
        minionEnemy.depth = bg.depth
        minionEnemy.depth = minionEnemy.depth +1
        minionEnemy.lifetime = 160;
        minionsGroup.add(minionEnemy);
    
    }

}

function spawnPizza(){
    if(frameCount%40 == 0){
      var pizza = createSprite(0,50);
      pizza.velocityX = 10;
      pizza.addAnimation("PizzaHut", pizzaFlying);
      pizza.scale =0.3;
      pizza.y = Math.round(random(550,180));
      pizza.depth = bg.depth
      pizza.depth = pizza.depth +1;
      pizza.lifetime = 160;
      pizzaGroup.add(pizza);
    }
      
}

function Restart(){
    score = 0;
    minionsGroup.destroyEach();
    bandu.changeAnimation("Moving", banduMoving);
    bandu.scale = 0.1;
    banduIcon.addImage(banduIconImg)
    restartButton.visible = false;
    bg.velocityY = 1;
    gameState = "play";
}
