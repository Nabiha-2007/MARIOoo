
var PLAY = 3;
var END = 0;
var WIN = 4;
var START = 1
var INFO = 2;
var gameState = START;
var back;
var jungle;
var mario,invisibleGround,  gameOver,restart,powerGroup,obstacleGroup;
var score=0;
var win;
var gameOver, restart, newgame;
var start;
var Antasma, kingBoo;
var ahead;
var UPground;


function preload(){
  mario_running = loadAnimation("picture/Run (1).png","picture/Run (2).png","picture/Run (3).png","picture/Run (4).png","picture/Run (5).png","picture/Run (6).png","picture/Run (7).png","picture/Run (8).png");
  mario_collided = loadAnimation("picture/Dead (1).png","picture/Dead (2).png","picture/Dead (3).png","picture/Dead (4).png","picture/Dead (5).png","picture/Dead (6).png","picture/Dead (7).png","picture/Dead (8).png","picture/Dead (9).png","picture/Dead (10).png");
  jungleImage = loadImage("picture/mario bg.png")
  good1 = loadImage("gol.png");
  good2 = loadImage("food.png");
  obstacle1 = loadImage("goomba.png");
  obstacle2 = loadImage("pipe.png");
  crateImage = loadImage("picture/Crate.png");
  questionMark = loadImage("Question Block.png");
  gameOverImage = loadImage("gameOver.jpg");
  restartImage = loadImage("restart.png")
  superMarioImage = loadImage("supermario.png");
  winImage = loadImage("winImage.jpg");
  startImg = loadImage("startImage.png");
  V1Image = loadImage("Antasma.png");
  V2Image = loadImage("kingBoo.png");
  aheadImage = loadImage("aheadImage.png")

}

function setup() {
   createCanvas(800,400);

   UPground = createSprite(400,1,800,2);

   jungle = createSprite(400,150);
   jungle.addImage("jungle",jungleImage);
   jungle.scale = 1.6;
   jungle.x = width-300;

   mario = createSprite(90,220,20,50);
   mario.addAnimation("running",mario_running);
   mario.addAnimation("collided",mario_collided);
   mario.scale = 0.15;
   mario.setCollider("circle",0,10);

   invisibleGround = createSprite(400,385,1600,10);
   invisibleGround.visible = false;

   gameOver = createSprite(100,200);
   gameOver.addImage(gameOverImage);

   win = createSprite(400,200,800,400);

   restart = createSprite(300,110);
   restart.addImage(restartImage);
   gameOver.scale = 1.7;
   restart.scale = 0.2;

   ahead = createSprite(730,340,10,10);
   ahead.addImage(aheadImage);
   ahead.scale = 0.15;
   ahead.visible = false;

   Antasma = createSprite(600,160,10,10)
   Antasma.addImage(V1Image);
   Antasma.scale = 0.14;
   Antasma.visible = false;

   kingBoo = createSprite(600,300,10,10)
   kingBoo.addImage(V2Image);
   kingBoo.scale = 0.14;
   kingBoo.visible = false;
   
   superMario = createSprite(350,180)
   superMario.addImage(superMarioImage);
   superMario.scale = 0.3;

   start = createSprite(350,330,10,10)
   start.addImage(startImg);
   start.scale =0.17;
 
   gameOver.visible = false;
   restart.visible = false;
   start.visible = true;

   //back = createSprite(70,200,10,400);

   powerGroup = new Group();
   obstacleGroup = new Group();
   crateGroup = new Group();
   cratesGroup = new Group();
   coinGroup = new Group();
   pipeGroup = new Group();
   villainGroup = new Group();
   score = 0;
}

function draw(){
    background(255);
    mario.x=camera.position.x-270;

    if(gameState===START){
       win.visible = false;
       UPground.visible = false;
       background(10)
       //back.visible = false;
       superMario.visible=true;
       mario.visible=false;
       jungle.visible = false;

       if(mousePressedOver(start)){
          gameState=INFO;
        }

    textSize(20);
    stroke(3);
    fill("white")
    text("HI! I am Mario.Please help me collect coins and mushrooms to save my people. ", 10,290);
  
  
  }

     if (gameState===INFO){
         background("black");
         superMario.visible = false;
         UPground.visible = false;
         start.visible = false;
         Antasma.visible = true;
         kingBoo.visible = true;
         ahead.visible = true;

         if(mousePressedOver(ahead)) {
          reset();
        }


         textSize(20);
        stroke(3);
        fill("red")
        text("BEWARE OF EVIL BEASTS!! ",350,80);

        textSize(20);
        stroke(3);
        fill("white")
        text("ANTASMA is an evil bat king and can  ",10,140);
        text("transform itself into a group of bats and attack Mario.",10,160)
        text("KINGBOO King Boo is a leader of the Boos and Ghosts, ",10,250)
        text("ruler of the paranormal dimensions, and the arch enemy of Luigi.",10,270)
     }


    if(gameState===PLAY){
      Antasma.visible = false;
      UPground.visible = false;
      kingBoo.visible = false;
      ahead.visible =false;

       win.visible = false;
       start.visible = false;
       mario.visible = true;

       mario.velocityY = mario.velocityY + 0.8
       jungle.visible = true;

       jungle.velocityX=-3;
       superMario.visible=false;
       
       //back.visible = false;
       
       mario.collide(crateGroup);
       mario.collide(invisibleGround);
       mario.collide(crateGroup);
       mario.collide(cratesGroup);

       if( mario.isTouching(crateGroup)&&keyDown("space")){
           mario.velocityY = -16;
        }

        if( mario.isTouching(cratesGroup)&&keyDown("space")){
          mario.velocityY = -16;
       }

       mario.collide(UPground);
        
       if(jungle.x<350){
          jungle.x = 400;
       }
       if(score>=5){
        jungle.velocityX=-6;
        powerGroup.velocityX = -6;
        obstacleGroup.velocityX =-6;
        coinGroup.velocityX = -6;
        crateGroup.velocityX = -6;
        cratesGroup.velocityX = -6;
        villainGroup.velocityX = -6;
       }

        console.log(mario.y);

       if(keyDown("space")&&mario.y>=300) {
          mario.velocityY = -16;
          }

       spawnPower();
       spawnObstacle();
       spawnCrate();
       spawnCrates();
       spawnCoin();
       spawnPipe();
       spawnVillain();
       if(mario.collide(pipeGroup)){
          console.log("hi");
       }
    
       if(obstacleGroup.isTouching(mario)){
            gameState = END;
          }
       if(villainGroup.isTouching(mario)){
            gameState = END;
          }
       if(powerGroup.isTouching(mario)){
           score = score + 1;
           powerGroup.destroyEach();
          }
       if(coinGroup.isTouching(mario)){
           score = score + 1;
           coinGroup.destroyEach();
          }


  


    }

    else if(gameState === END) {
            Antasma.visible = false;
            kingBoo.visible = false;
            ahead.visible =false;
            start.visible = false;
            win.visible = false;
            superMario.visible=false;
            //back.visible = false;
            gameOver.x=camera.position.x;
            restart.x=camera.position.x;
            gameOver.visible = true;
            restart.visible = true;
            mario.velocityY = 0;
            jungle.velocityX = 0;
            obstacleGroup.setVelocityXEach(0);
            powerGroup.setVelocityXEach(0);
            coinGroup.setVelocityXEach(0);
            crateGroup.setVelocityXEach(0);
            pipeGroup.setVelocityXEach(0);
            villainGroup.setVelocityXEach(0);
            mario.changeAnimation("collided",mario_collided);
            
            obstacleGroup.setLifetimeEach(-1);
            pipeGroup.setLifetimeEach(-1);
            powerGroup.setLifetimeEach(-1);
            villainGroup.setLifetimeEach(-1);
            coinGroup.setLifetimeEach(-1);
            crateGroup.setLifetimeEach(-1);
            obstacleGroup.destroyEach(0);
            powerGroup.destroyEach(0);
            villainGroup.destroyEach(0);
            coinGroup.destroyEach(0);
            crateGroup.destroyEach(0);
            pipeGroup.destroyEach(0);
            score.visible = false;
            restart.y = 200;
            if(mousePressedOver(restart)) {
              reset();
            }
      }

    else if(gameState === WIN) {
            Antasma.visible = false;
            kingBoo.visible = false;
            ahead.visible =false;
            start.visible = false;
            win.visible = true;
            superMario.visible=false;
            //back.visible = false;
            jungle.velocityX = 0;
            mario.velocityY = 0;
            obstacleGroup.setVelocityXEach(0);
            powerGroup.setVelocityXEach(0);
            coinGroup.setVelocityXEach(0);
            crateGroup.setVelocityXEach(0);
            pipeGroup.setVelocityXEach(0);
            villainGroup.setVelocityXEach(0);

            win.addImage(winImage);
            win.scale=1.4;

            mario.changeAnimation("collided",mario_collided);
            powerGroup.destroyEach(0);
            coinGroup.destroyEach(0);
            crateGroup.destroyEach(0);
            pipeGroup.destroyEach(0);
            villainGroup.destroyEach(0);
            obstacleGroup.destroyEach(0);
            obstacleGroup.setLifetimeEach(-1);
            powerGroup.setLifetimeEach(-1);
            pipeGroup.setLifetimeEach(-1);
            villainGroup.setLifetimeEach(-1);
            
            restart.visible = true;
            restart.y =350;
            restart.x=camera.position.x;
            if(mousePressedOver(restart)) {
              reset();
            }
            gameState = START;

      }
      
    
    drawSprites();

    
    if(score >= 10){
       mario.visible = false;
       gameState = WIN;
    }

    textSize(30);
          stroke(5);
          fill("black");
          text("SCORE :"+score, 600,70);
}

function spawnPower() {
 
    if (frameCount % 137 === 0) { 
        var power = createSprite(camera.position.x+500,340,40,10);
        power.velocityX = -(6 + 3*score/100)
        power.scale = 0.6;
    
        var rand = Math.round(random(1,3));
        switch(rand) {
          case 1: power.addImage(good1);
                  break;
          case 2: power.addImage(good2);
                  break;
          default: break;
        }
          
        power.scale = 0.1;
        power.lifetime = 400; 
        power.setCollider("rectangle",0,0,power.width/2,power.height/2)
        powerGroup.add(power);
      
    }
    
  }

  function spawnObstacle() {
    if(frameCount % 277 === 0) {
  
       var obstacle = createSprite(camera.position.x+400,340,40,40);
       obstacle.setCollider("rectangle",0,0,100,100)      
       obstacle.velocityX = -(6 + 3*score/100)
       obstacle.addImage(obstacle1)
       obstacle.scale = 0.06; 
       obstacle.lifetime = 400;
       obstacleGroup.add(obstacle);
      
    }
  }

  function spawnCrate(){
    if(frameCount % 73 === 0) {
  
       var crate = createSprite(camera.position.x+400,210,40,40);
       crate.setCollider("rectangle",0,0,20,20)
       crate.addImage(crateImage);
       crate.velocityX = -(6 + 3*score/100)           
       crate.scale = 0.6; 
       crate.lifetime = 400;
       crateGroup.add(crate);
      
    }
  }
  function spawnCrates(){
    if(frameCount % 80 === 0) {
  
       var crate = createSprite(camera.position.x+400,210,40,40);
       crate.setCollider("rectangle",0,0,20,20)
       crate.addImage(crateImage);
       crate.velocityX = -(6 + 3*score/100)      
       crate.scale = 0.6; 
       crate.lifetime = 400 
       crateGroup.add(crate);     
    }
  }  

  function spawnCoin(){
    if(frameCount % 79  === 0) {
  
       var coin = createSprite(camera.position.x+400,165,40,40);
       coin.setCollider("rectangle",0,0,20,20)
       coin.addImage(good1);
       coin.velocityX = -(6 + 3*score/100)           
       coin.scale = 0.055; 
       coin.lifetime = 400;     
       coinGroup.add(coin);
      
    }
  }

  function spawnPipe(){
    if(frameCount % 199  === 0) {
  
       var pipe = createSprite(camera.position.x+400,330,40,40);
       pipe.setCollider("rectangle",0,0,100,100)
       pipe.addImage(obstacle2);
       pipe.velocityX = -(6 + 3*score/100)          
       pipe.scale =0.18; 
       pipe.lifetime = 400;     
       pipeGroup.add(pipe);
      
    }
  }

  function spawnVillain(){
    if (frameCount % 313 === 0) { 
      var villain = createSprite(camera.position.x+500,340,40,10);
      villain.velocityX = -(6 + 3*score/100)
      villain.scale = 0.6;
  
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: villain.addImage(V1Image);
                break;
        case 2: villain.addImage(V2Image);
                break;
        default: break;
      }
        
      villain.scale = 0.1;
      villain.lifetime = 400; 
      villain.setCollider("rectangle",0,0,villain.width/2,villain.height/2)
      villainGroup.add(villain);
    
  }




  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    mario.visible = true;
    mario.changeAnimation("running",mario_running);
    obstacleGroup.destroyEach();
    powerGroup.destroyEach();
    crateGroup.destroyEach();
    score = 0;
  
  }


  
  
  
  
