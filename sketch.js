var score=0;
var coinScore=0;
var END = 0;
var PLAY = 1;
var gamestate=PLAY;
function preload(){
playerRun=loadAnimation("playerRun1.png","playerRun2.png","playerRight.png");
playerJump=loadAnimation("playerJump1.png","playerJump2.png");
playerOver=loadAnimation("playerFront.png","playerLeft.png","playerBack.png","playerRight.png");


zombieRightJump=loadAnimation("zombieJump1.png","zombieJump2.png");
zombieRight=loadAnimation("zombieRight1.png","zombieRight2.png","zombieRight3.png");
zombieLeft=loadAnimation("zombieLeft1.png","zombieLeft2.png","zombieLeft3.png");

cloudImg=loadImage("cloud2.png");

groundImg=loadImage("ground2.png");

virusImg=loadImage("Virus.png");

roadImg=loadImage("Road.png");

groundImage=loadImage("ground2.png");

restartImg= loadImage("restart.png");

overImg= loadImage("gameOver.png");

zombieCarImg=loadImage("zombieCarChasing.png");

zombieCarAnimation=loadAnimation("zombieCarChasing.png","zombieCar2.png","zombieCar3.png");

coinImg= loadImage("coin.png");

gameOverImg= loadImage("gameOver.png");


cactusImg1= loadImage("obstacle1.png");
cactusImg2= loadImage("obstacle2.png");
cactusImg3= loadImage("obstacle3.png");

houseImg= loadImage("house.png");

houseAnim2=loadAnimation("house2.png","house2ver 2.png");

baseAnim = loadAnimation("Base1.png","Base1ver2.png");

houseAnim1= loadAnimation("house1.png","house1ver2.png");

rockImg = loadImage("rock.png");

sunImg = loadImage("sun.png");

jumpSound = loadSound("jump.mp3")
 dieSound = loadSound("die.mp3")
 checkPointSound = loadSound("checkPoint.mp3")
 coinSound = loadSound("coinCollect.mp3")
 hitSound= loadSound("hit.mp3")

}

function setup() {
createCanvas(1000,400);

var score = 0;


player=createSprite(350,350,10,10);
player.addAnimation("running",playerRun);
player.addAnimation("jumping",playerJump);
player.addAnimation("dead",playerOver);
player.scale=1;

player.setCollider("rectangle",0,0,30,80);
 //player.debug = true

zombieCar= createSprite(40,350,10,10);
zombieCar.addAnimation("zombie",zombieCarAnimation);
zombieCar.scale=2;
zombieCar.setCollider("rectangle",0,0,98,40);
//zombieCar.debug = true


zombieChase= createSprite(200,350,10,10);
zombieChase.addAnimation("chasing",zombieRight);
zombieChase.addAnimation("jumping",zombieRightJump)
zombieChase.setCollider("rectangle",0,0,150,80);
//zombieChase.debug = true

ground = createSprite(300,270,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

//ground2 = createSprite(300,300,400,20);
//ground2.addImage("ground",groundImage);
//ground2.x = ground2.width /2;


invisGround=createSprite(player.x,400,3000,10);
invisGround.visible=false ;
//invisGround.setCollider("rectangle",0,0,invisGround.width,invisGround.height);
//invisGround.debug = true;

sun = createSprite(600,100);
sun.addImage(sunImg);
sun.scale=1.5;
sun.velocityX=0.01;

gameOver= createSprite(500,200);
gameOver.addImage(gameOverImg);
gameOver.visible=false;

restart= createSprite(500,300);
restart.addImage(restartImg);
restart.visible=false;

cloudsGroup= createGroup();

zombieGroup= createGroup();
coinGroup= createGroup();
cactusGroup= createGroup();
houseGroup= createGroup();
houseGroup2 = createGroup();
baseGroup= createGroup();
bgGroup= createGroup();
rockGroup = createGroup();
objectGroup= createGroup();
}

function draw() {
 background("orange");




 if(gamestate === PLAY){
  
  textSize(20);
  fill(255);
  text("Score: "+ score, 400,50);
 text("Coins collected: "+ coinScore, 200,50);
 spawnCoins();
 spawnClouds();


 score = score + Math.round(frameCount/100);
 if(score>0 && score%1500 === 0){
    checkPointSound.play() 
 }



 ground.velocityX=-(6 + score/200);
 if(ground.x<0){
 ground.x=ground.width/2
 }

 //ground2.velocityX=-6;
 //if(ground2.x<0){
 //ground2.x=ground2.width/2
 //}
 




 player.velocityY = player.velocityY + 0.8  

 if(keyDown("space")&& player.y >= 340) {
    player.velocityY = -14;
    player.changeAnimation("jumping",playerJump);
    jumpSound.play();
}

 
if(player.collide(invisGround)){
  player.changeAnimation("running",playerRun);
}

 zombieChase.velocityX=0;
 zombieChase.velocityY=zombieChase.velocityY+0.8;
 if(zombieChase.collide(invisGround)){
  zombieChase.changeAnimation("chasing",zombieRight);
 }
 

 zombieCar.velocityY=zombieCar.velocityY+3;
 zombieCar.collide(invisGround);



 player.depth+=1;



 zombieChase.depth+=1;

 zombieCar.depth+=1;


 if (player.isTouching(coinGroup)){
 coinScore+=1;
 coinGroup.destroyEach();
 coinSound.play();
 }




 var randomBg = Math.round(random(1,3))
 if(randomBg=1 && frameCount%600===0){
spawnHouse1();
 }
 if(randomBg=2 && frameCount%750===0){
   spawnHouse2();
}
 if(randomBg=1 && frameCount%850===0){
  spawnBase();
 }


var randomObject = Math.round(random(1,3))
if (World.frameCount % 150 == 0) {
   if (randomObject == 1) {
     spawnZombies();
   } else if (randomObject == 2) {
     spawnCacti();
   } else {
     spawnRock();
   }


  }
  if (player.isTouching(objectGroup)){
  gamestate=END
  objectGroup.destroyEach();
  dieSound.play();
  hitSound.play();
  
  
  }
  if(zombieChase.isTouching(objectGroup)){
    zombieChase.velocityY=-16;
    zombieChase.changeAnimation("jumping",zombieRightJump);
    jumpSound.play();
   
   }
   if(zombieCar.isTouching(objectGroup)){
    text("OW!",zombieCar.x-40,zombieCar.y-50);
 objectGroup.destroyEach();
    hitSound.play();
   }
  
 









 }

 else if (gamestate === END) {
 
  textSize(22);
  fill("red");
  
  

    gameOver.visible = true;
    gameOver.depth+=1;
  restart.visible = true;
  
 fill("green"); 
 text("GRR!!!",zombieChase.x-40,zombieChase.y-65);
 text("Dinner time...",zombieChase.x-40,zombieChase.y-50);
 textSize(20);
 text("Save some for the driver!",zombieCar.x-40,zombieCar.y-50);
 fill("black")
 text("HELP! AH!",player.x+15,player.y-10);
 fill("white");
 textSize(20);
 text("Total score: "+score,400,50);
 text("Total coins: "+coinScore,200,50);
 
  player.changeAnimation("dead", playerOver);
   

 coinGroup.setLifetimeEach(-1)
  ground.velocityX = 0;
  
  player.velocityY = 0;
  player.y=399;
 zombieChase.velocityY=0;
 zombieChase.velocityX=3.5;
 
 zombieChase.collide(player);
 if(gamestate===END){
 zombieChase.setCollider("rectangle",0,0,30,80)

 }
 zombieCar.velocityY=0;
 
coinGroup.setLifetimeEach(-1);
coinGroup.setVelocityXEach(0);
objectGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
bgGroup.setVelocityXEach(0);
 
 objectGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);   
 bgGroup.setVelocityXEach(0); 
}


//stop player from falling down
player.collide(invisGround);
zombieCar.collide(invisGround);
zombieChase.collide(invisGround);


if(mousePressedOver(restart)){
reset();
zombieChase.x=200;
}

















 drawSprites();


 



}


















function reset(){
gameOver.visible=false;
score=0;
coinScore=0;
gamestate=PLAY;
gameOver.visible=false;
restart.visible=false;
objectGroup.destroyEach();
cloudsGroup.destroyEach();
bgGroup.destroyEach();


}


  
  






function spawnClouds() {

 if (frameCount % 200 === 0) {
    var cloud = createSprite(1000,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 1;
    cloud.velocityX = (-4+score/1500);
    
     
    cloud.lifetime = 300;
    
   
    
    
    
    
    cloudsGroup.add(cloud);
  }



}






function spawnZombies() {

var zombie = createSprite(1000,360,40,10);
zombie.addAnimation("zombieleft",zombieLeft);
zombie.scale = 1;
zombie.velocityX=-(6 + score/1500);
zombieGroup.add(zombie);
objectGroup.add(zombie);
}

function spawnCacti(){
  
   var randCactus= Math.round(random(1,3))

   var cactus= createSprite(1000,360,100,10);
   cactus.velocityX=-(6 + score/1500);;

 if(randCactus=1){
   cactus.addImage(cactusImg1);  
 }
 if(randCactus=2){
   cactus.addImage(cactusImg2);  
 }
 if(randCactus=3){
   cactus.addImage(cactusImg3);  
 }

cactusGroup.add(cactus);
objectGroup.add(cactus);
}


function spawnRock(){
var rock = createSprite(1000,360,40,10);
rock.addImage(rockImg);
rock.velocityX=-(6 + score/1500);
rockGroup.add(rock);
objectGroup.add(rock);
}




function spawnCoins() {
   if(frameCount % 275===0){
   var coin = createSprite(1000,250,40,10);
   coin.addImage(coinImg)
   coin.scale=0.5 
   coin.velocityX=-(4 + score/1500);
   coinGroup.add(coin);
   coin.lifetime=300;
   }
}

function spawnHouse1(){

var house = createSprite(1100,200);
house.addAnimation("house1onFire",houseAnim1);
house.velocityX=-(3 + score/1500);
houseGroup.add(house);
house.lifetime=400;

houseGroup.add(house);
bgGroup.add(house);
} 

function spawnHouse2(){
   
   var house2 = createSprite(1100,210);
   house2.addAnimation("houseOnFire",houseAnim2);
   house2.velocityX=-(3 + score/1500);
 
   houseGroup2.add(house2);
   bgGroup.add(house2);
   house2.lifetime=400;
   
   } 


function spawnBase(){
 
      var base = createSprite(1100,200);
      base.addAnimation("baseOnFire",baseAnim);
      base.velocityX=-(3 + score/100);
   
      base.lifetime=400;
  baseGroup.add(base);
  bgGroup.add(base);

}






