//creating variables
var issImg, spacebg, spacecraftAnimation;

var spacecraft;

var spacecraft1Img, spacecraft2Img, spacecraft3Img, spacecraft4Img;

var iss, spacecraft;

var hasDocked= false;

var docking_pos;

function preload(){
  //loading images
  issImg = loadImage("images/iss.png");
  spacebg = loadImage("images/spacebg.jpg");

  //loading the different images of spacecraft as an animation so that we can change them later on
  spacecraft1Img = loadAnimation("images/spacecraft1.png");
  spacecraft2Img = loadAnimation("images/spacecraft2.png");
  spacecraft3Img = loadAnimation("images/spacecraft3.png");
  spacecraft4Img = loadAnimation("images/spacecraft4.png");
}

function setup() {
  createCanvas(800,400);
  //creating iss
  iss = createSprite(400, 200, 50, 50);
  iss.addImage(issImg);
  iss.scale = 0.5;

  //creating spacecraft
  spacecraft = createSprite(370,285,50,50);
  spacecraft.addAnimation("docking", spacecraft1Img);
  spacecraft.scale = 0.15;

  //creating a sprite for the position at which the spacecraft attaches and making it invisible
  docking_pos = createSprite(370,210,20,10);
  docking_pos.visible = false;
}

function draw() {
  //adding backgroung image
  background(spacebg);  

  //preventing the image from going up since their size is different and changing x position makes the added animations seem to go up, even though they aren't
  if(spacecraft.y >= 285 && keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW) || keyDown(DOWN_ARROW)){
    spacecraft.y = 305;
  }

  if(!hasDocked){
    //moving the spacecraft along the x axis only when it hasn't attached
    if(spacecraft.y>266){
      spacecraft.x = Math.round(random(365,370));

      //adding different animations on key down when spacecraft hasn't attached
      if(keyDown(LEFT_ARROW)){
        spacecraft.addAnimation("docking", spacecraft3Img);
        spacecraft.x-= 7;
      }
  
      if(keyDown(RIGHT_ARROW)){
        spacecraft.addAnimation("docking", spacecraft4Img);
        spacecraft.x+= 7;
      }
  
      if(keyDown(DOWN_ARROW)){
        spacecraft.addAnimation("docking", spacecraft2Img);
      }

      if(keyDown(UP_ARROW)){
        spacecraft.y-= 2;
      }
    }

    //attaching the spacecraft to iss when it has touched the invisible block
    if(spacecraft.isTouching(docking_pos)){
      spacecraft.y = 267;
      spacecraft.x = 360;
    }
  }

  drawSprites();

  //displaying text when spacecraft has attacked
  if(spacecraft.y <= 267){
    textSize(30);
    fill("white");
    text("Docking Successful!" , 300, 350);
  }
}