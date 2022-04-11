//Game States
var PLAY=1;
var END=0;
var gameState=1;

var boy ,fruit,monster,fruitGroup,monsterGroup, score,r,randombfruit, position;
var boyImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,wounded;

function preload(){
  
  boyImage = loadImage("boy5.png");
  monsterImage = loadAnimation("hospital1.png")
 
  fruit1 = loadImage("bird.png");
  fruit2= loadImage("bird.png");
  fruit3 = loadImage("bird.png");
  fruit4= loadImage("bird.png");
  gameOverImage = loadImage("hospital.jpeg")
  
  gameOverSound = loadSound("birds.mp3")
  woundedSound = loadSound("wounded.mp3")
         
                
}


function setup() {
  createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);
  
   boy=createSprite(800,200,20,20);
   boy.addImage(boyImage);
   boy.scale=0.9;
  boy.setCollider("rectangle",0,40,80,180);
  boy.debug = false;
 
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
if(gameState===PLAY){
    
  fruits();
    Monster();
    
    boy.y=World.mouseY;
    
  if(fruitGroup.isTouching(boy)){
      fruitGroup.destroyEach();
      woundedSound.play();
      score=score+1;
     }
    else
    {
     
    

      if(monsterGroup.isTouching(boy)){
        gameState=END;
       //score= tyuiuuu;
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
       
        

        boy.addImage(gameOverImage);
        boy.scale=0.6;
        boy.x=500;
        boy.y=300;
      }
    }
  }
  
  drawSprites();
  
  textSize(25);
  text("Score : "+ score,250,50);
}






function Monster(){
  if(World.frameCount%1000===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(300));
    monster.velocityX=(8+(score/10));
    monster.setLifetime=50;
    monster.scale=0.6
    monsterGroup.add(monster);
  }}


 



function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  

       fruit.velocityX= (7+(score/4));
      
     
    fruit.scale=0.2;
     
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    //} else if (r == 3) {
     // fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}