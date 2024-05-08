var sword, swordImg;
var apple, applswo;
var banana, bananaImg;
var cherry, cherryImg;
var peach, peachImg;
var bomb, bombImg;
var gameSound,youLose;
var fruitImg;
var fruitGroup, enemyGroup;
var score = 0;
var gamePlay = true;
var splash;
var main = true;
var restart = false;
var soundPlay = true;
var isMusicPlaying = false;
var bombCount = 0;
var maxBombCount = 1; 

function preload() {
  swordImg = loadImage("images/sword.png");
  appleImg = loadImage("images/apple.png");
  bananaImg = loadImage("images/banana.png");
  cherryImg = loadImage("images/cherry.png");
  peachImg = loadImage("images/peach.png");
  bombImg = loadImage("images/bomb.png");
  fruitImg = loadImage("images/fruitninja.png");
  
  boom = loadSound("sounds/boom.wav");
  splash = loadSound("sounds/splash.mp3")
  gameSound = loadSound("sounds/gameSound.mp3");
  youLose = loadSound("sounds/youLose.wav");
}

function setup() {
  createCanvas(700, 500);
  rectMode(CENTER);
  noCursor();
  
  
  sword = createSprite(400, 50, 20);
  sword.addImage("sword", swordImg);
  sword.scale = 0.03;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  music();
  
}

function draw() {
  background(187, 143, 206);
  
  sword.x = mouseX;
  sword.y = mouseY;
  game();
 
  fruitGroup.forEach((fruit) => fruit.draw());
  enemyGroup.forEach((enemy) => enemy.draw());
  
}

function fruits() {
  if (frameCount % 60 === 0) {
    var fruit;
    var r = Math.round(random(1, 4));
    
    if (r === 1) {
      fruit = createSprite(400, 50);
      fruit.addImage("apple", appleImg);
      fruit.scale = 0.07;
    } else if (r === 2) {
      fruit = createSprite(400, 50);
      fruit.addImage("peach", peachImg);
      fruit.scale = 0.017;
    } else if (r === 3) {
      fruit = createSprite(400, 50);
      fruit.addImage("banana", bananaImg);
      fruit.scale = 0.03;
    } else if (r === 4) {
      fruit = createSprite(400, 50);
      fruit.addImage("cherry", cherryImg);
      fruit.scale = 0.07;
    }
    
    fruit.x = Math.round(random(50, 650));
    fruit.y = Math.round(random(-100, -30));
    fruit.velocity.y = 2 + frameCount*0.01;
    
    fruitGroup.add(fruit);
  }
}



function enemies() {
  if (frameCount % 40 === 0 && bombCount < maxBombCount) { 
    var bomb;
    var r = Math.round(random(1, 2));

    if (r === 1) {
      bomb = createSprite(400, 50);
      bomb.addImage("bomb", bombImg);
      bomb.scale = 0.04;
      bombCount++;
    } else if (r === 2) {
      bomb = createSprite(400, 50);
      bomb.addImage("bomb1", bombImg);
      bomb.scale = 0.04;
      bombCount++;
    }

    bomb.x = Math.round(random(50, 650));
    bomb.y = Math.round(random(-100, -30));
    bomb.velocity.y = 2 + frameCount * 0.01;

    enemyGroup.add(bomb);

  }
}
function game(){
  if(main)
    {
      
    image(fruitImg,240,0,200,160);
   
    
    textSize(40);
    textFont("italic");
    fill("white");
    text('Nasıl oynanır?', 230, 220);
      
    textSize(20);
    textFont("Georgia");
    fill(255, 255, 255 );
    text("  Göreviniz fareniz ile kılıcınızı hareket ettirerek \n  bombalardan kaçmak ve hiçbir meyvenin \n  yere düşmesine müsade etmemektir.\n \n   ", 130, 270);
      
    textSize(20);
    text("Başlamak için herhangi bir yere basın",180,460)
      
      
  if(mouseIsPressed == true)
        {
          main = false;
          noCursor();
        }
    }
  else if(!main)
    {
  if (gamePlay) {
     
    fruits();
    enemies();
   
    push();
    textSize(32);
    fill(255);
    text("Score: " + score.toFixed(0), 500, 50);
    pop();
    
    for (var i = 0; i < fruitGroup.length; i++) {
      var fruit = fruitGroup[i];
      if (sword.overlap(fruit)) {
        fruit.remove();
        score += 1 + frameCount*0.01;
        splash.play();
      }
      
      if (fruit.position.y >= height) {
        gamePlay = false;
        boom.play();
        soundPlay = false;
        
      }
    }
    
    for (i = 0; i < enemyGroup.length; i++) {
      var enemy = enemyGroup[i];
      if (sword.overlap(enemy)) {
        boom.play();
        gamePlay = false;
        soundPlay = false;
        
      }
      if (enemy.position.y >= height) {
        bombCount--;
      }
    }
  }
    }
  
  
  fruitGroup.draw();
  enemyGroup.draw();
  
  if (!gamePlay) {
    textSize(64);
    textAlign(CENTER);
    fill(255);
    text("Game Over", width / 2, height / 2);
    textSize(30);
    text("Your score is: "+score.toFixed(0),350,300);
    fruitGroup.remove();
    enemyGroup.remove();
    
    if (!isMusicPlaying) {
      gameSound.stop();
      youLose.stop();
      youLose.play();
      youLose.setVolume(0.2);
      isMusicPlaying = true;
    }
    
    text("Restart",350,400);
    if(mouseIsPressed == true && (mouseX >= 290 && mouseX <=   410) && (mouseY >= 375 && mouseY <= 415))
        {
          gameSound.stop();
          youLose.stop();
          gameSound.play();
          gameSound.setVolume(0.2);
          gamePlay = true;
          isMusicPlaying = false;
          score = 0;
          frameCount = 0;
          bombCount = 0; 
          maxBombCount = 1; 
        }
  }
}
function music()
{
  gameSound.play();
  gameSound.setVolume(0.2);
}


  
