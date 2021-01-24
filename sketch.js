var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tiger, tiger_running, tiger_collided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1;
var score;
var gameoverImage,restartImage

function preload()
{
  tiger_running = loadImage("tiger0.png");
  tiger_collided = loadImage("tiger.22png.jpg");
  groundImage = loadImage("forest.png");
  obstacle1 = loadImage("stone1.png");
  
  restartImage = loadImage("reset.jpg")
  gameoverImage = loadImage("gameover.jpg")
}

function setup()
{
  createCanvas(500, 280);
 
  ground = createSprite(600,100,400,20);
  ground.addImage("grass",groundImage);
  ground.x = ground.width /2;
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.3;
   tiger = createSprite(60,280,10,30);
  tiger.addImage("running", tiger_running);
  tiger.scale = 0.05;
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  invisibleGround = createSprite(40,280,400,10);
  invisibleGround.visible = false;
  obstaclesGroup = new Group();
  score = 0;
  console.log("tripti")
}

function draw() 
{
  background(180);
  text("Score: "+ score, 500,50);
  if(gameState === PLAY)
  {
    
    gameover.visible = false;
    restart.visible = false;
    ground.velocityX = -3
    score = score + Math.round(getFrameRate()/60);
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
     if(keyDown("space")&& tiger.y >= 100)
    {
        tiger.velocityY = -8
    }
   tiger.velocityY = tiger.velocityY + 0.8
   spawnObstacles();
  if(obstaclesGroup.isTouching(tiger))
   {
    //tiger.velocityY = -6;
     gameState = END;
   }
  }
   else if (gameState === END)
   {
      gameover.visible = true;
      restart.visible = true;
      tiger.changeAnimation("collided", tiger_collided);
      ground.velocityX = 0;
      tiger.velocityY = 0
     obstaclesGroup.setLifetimeEach(-1)
     obstaclesGroup.setVelocityXEach(0);
  }
  tiger.collide(invisibleGround);
  var x=200
     var y
      camera.position.x=500/2
      camera.position.y=tiger.y-100
  if(mousePressedOver(restart)) 
  {
      reset();
  }
   console.log("tripti")
  drawSprites();
}

function reset() 
{
  gameState = PLAY 
  obstaclesGroup.destroyEach();
  score = 0
  tiger.changeAnimation("running", tiger_running)

 console.log("tripti")
}

function spawnObstacles(){
 if (frameCount % 180 === 0)
 {
   var obstacle = createSprite(600,255,10,40);
   obstacle.velocityX = -2    
   obstacle.scale = 0.4;
    obstacle.lifetime = 300;
   obstacle.addImage(obstacle1)
    obstaclesGroup.add(obstacle); 
 console.log("tripti")
}
}

