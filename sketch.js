const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;

var pinkImg, blueImg, purpleImg, orangeImg, greenImg, backgroundImg, pandaImg, arrowImg, blackImg, gameOver, restartImg;
var pink, blue, purple, orange, green, panda, arrow, score, black, score2, background2, restart;
var pinkGroup, blueGroup, purpleGroup, orangeGroup, greenGroup, arrowGroup, blackGroup;
var PLAY = 1, END = 0, gameState = PLAY;

function preload(){
    pinkImg = loadImage("pink bubble.png");
    blueImg = loadImage("blue bubble.png");
    purpleImg = loadImage("purple bubble.png");
    orangeImg = loadImage("orange bubble.png");
    greenImg = loadImage("green bubble.png");
    pandaImg = loadImage("dog.jpg");
    arrowImg = loadImage("arrow.png");
    blackImg = loadImage("black bubble.png");
    gameOver = loadImage("game over.jpg");
    restartImg = loadImage("reset.jpg")
}

function setup(){
    
    var canvas = createCanvas(1200,800);

    panda = createSprite(600,700,10,10);
    panda.addImage(pandaImg);
    panda.scale = 0.2;

    restart = createSprite(600,500,20,10);
    restart.addImage(restartImg);
    restart.visible = false; 

   // background2 = createSprite(600,400,1200,800);
      //  background2.addImage(gameOver);
     //   background2.scale = 1;

    score = 0;
    score2 = 3;

    pinkGroup = createGroup();
    blueGroup = createGroup();
    purpleGroup = createGroup();
    greenGroup = createGroup();
    orangeGroup = createGroup();
    arrowGroup = createGroup();
    blackGroup = createGroup();
}

function draw(){
background(0);
    if(gameState === PLAY){
    
        spawnPink();
        spawnBlue();
        spawnPurple();
        spawnOrange();
        spawnGreen();
        spawnBlack();
    
        if(keyDown(LEFT_ARROW)){
            panda.x = panda.x-4;
        }

        if(keyDown(RIGHT_ARROW)){
            panda.x = panda.x+4;
        }

        if(keyWentDown("space")){
            spawnArrow();
        }

        arrowGroup.depth = panda.depth;

        if(arrowGroup.isTouching(pinkGroup)){
            pinkGroup.destroyEach();
            arrow.destroy();
            score = score+1;
        }

        if(arrowGroup.isTouching(blueGroup)){
            blueGroup.destroyEach();
            arrowGroup.destroyEach();
            score = score+5;
        }

        if(arrowGroup.isTouching(purpleGroup)){
            purpleGroup.destroyEach();
            arrowGroup.destroyEach();
            score = score+8;
        }

        if(arrowGroup.isTouching(greenGroup)){
            greenGroup.destroyEach();
            arrowGroup.destroyEach();
            score = score+10;
        }

        if(arrowGroup.isTouching(orangeGroup)){
            orangeGroup.destroyEach();
            arrowGroup.destroyEach();
            score = score+3;
        }

        if(arrowGroup.isTouching(blackGroup)){
            blackGroup.destroyEach();
            arrowGroup.destroyEach();
            score2 = score2 - 1;
        }

        if(score2 === 0){
            gameState = END; 
        }

    }

    else if (gameState === END){
        background(gameOver);
        blackGroup.destroyEach();
        arrowGroup.destroyEach();
        pinkGroup.destroyEach();
        blueGroup.destroyEach();
        purpleGroup.destroyEach();
        greenGroup.destroyEach();
        orangeGroup.destroyEach();
        panda.destroy();
       
       // background2.depth = restart.depth;
        //restart.depth = restart.depth+1;
        restart.visible = true;
        
        if(mousePressedOver(restart)){
            console.log("sjgrosg");
            reset();   
        }
    }

    drawSprites();

    fill("white");
    textSize(40);
    text("Score: " + score, 900, 100);

    text("Lives Left: " + score2, 900,750);

    textSize(20);
    stroke(10);
    text("Be Careful! Don't Pop the Red Bubbles!", 200, 90);
}

function spawnArrow(){
    arrow = createSprite(500,740,10,10);
    arrow.addImage(arrowImg);
    arrow.scale = 0.3;
    arrow.x = panda.x - 100;
    arrow.velocityY = -5;
    arrow.setCollider("rectangle",0,0,100,600);
    arrowGroup.add(arrow);
}

function spawnPink(){
    if(frameCount%100 === 0){
        pink = createSprite(200,200,10,10);
        pink.addImage(pinkImg);
        pink.x = Math.round(random(0,900));
        pink.y = Math.round(random(20,400));
        pink.scale = 0.15;
        pink.velocityX = 3;
        pink.lifetime = 600;
        pinkGroup.add(pink);
    }
    
}

function spawnBlue(){
    if(frameCount%100 === 0){
        blue = createSprite(400,200,10,10);
        blue.addImage(blueImg);
        blue.x = Math.round(random(0,600));
        blue.y = Math.round(random(30,400));
        blue.scale = 0.2;
        blue.velocityX = 5;
        blue.lifetime = 240;
        blueGroup.add(blue);
    }
    
}

function spawnPurple(){
    if(frameCount%150 === 0){
        purple = createSprite(600,200,10,10);
        purple.addImage(purpleImg);
        purple.x = Math.round(random(0,400));
        purple.y = Math.round(random(40,400));
        purple.scale = 0.7;
        purple.velocityX = 4;
        purple.lifetime = 300;
        purpleGroup.add(purple);
    }
    
}

function spawnOrange(){
    if(frameCount%170 === 0){
        orange = createSprite(800,200,10,10);
        orange.addImage(orangeImg);
        orange.x = Math.round(random(0,700));
        orange.y = Math.round(random(60,400));
        orange.scale = 0.1;
        orange.velocityX = 4;
        orange.lifetime = 300;
        orangeGroup.add(orange);
    }
    
}

function spawnGreen(){
    if(frameCount%200 === 0){
        green = createSprite(1000,200,10,10);
        green.addImage(greenImg);
        green.x = Math.round(random(0,1000));
        green.y = Math.round(random(20,300));
        green.scale = 0.2;
        green.velocityX = 6;
        green.lifetime = 200;
        greenGroup.add(green);
    }
    
}

function spawnBlack(){
    if(score > 0 && frameCount%50 === 0){
        black = createSprite(1000,200,10,10);
        black.addImage(blackImg);
        black.x = Math.round(random(0,1000));
        black.y = Math.round(random(20,400));
        black.scale = 0.4;
        black.velocityX = 3;
        blackGroup.add(black);
    }
}

function reset(){
    panda = createSprite(600,700,10,10);
    panda.addImage(pandaImg);
    panda.scale = 0.2;
    restart.visible = false;
    gameState = PLAY;
    //background2.visible = false;
    score = 0;
    score2 = 3;
}
