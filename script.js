var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 300},
        debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.spritesheet('star',
       'assets/fish.png', { frameWidth: 16,frameHeight: 16});
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 227, frameHeight: 360 })
}
var score = 0;
var scoreText;
var numofstars = 0;
var jump;
var platforms;
var right;
function create ()
{
  
  this.add.image(400, 300, 'sky');
  platforms = this.physics.add.staticGroup();
  platforms.create(400,568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

player = this.physics.add.sprite(100, 450, 'dude').setScale(.25);
stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
    setScale: {x: 2}
});
this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);
bombs = this.physics.add.group();

this.physics.add.collider(bombs, platforms);

this.physics.add.collider(player, bombs, hitBomb, null, this);
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
function collectStar (player, star)
{
    star.disableBody(true, true);
    numofstars = numofstars + 1;
    score += 25;
    scoreText.setText('Score: ' + score);
    if (numofstars == 12 && score < 10000)
    {

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}
stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});
player.setBounce(0.1);
player.setCollideWorldBounds(true);
player.body.setGravityY(300)
this.anims.create({
  key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { frames: [ 3, 5] }),
    frameRate: 10,
    repeat: -1
})

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { frames: [ 2, 4] }),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'jumpleft',
    frames: [ { key: 'dude', frame: 1 } ],
    frameRate: 20
});
this.anims.create({
    key: 'jumpright',
    frames: [ { key: 'dude', frame: 0 } ],
    frameRate: 20
});
this.physics.add.collider(player, platforms);
}

function update ()
{
  if(score == 0) {
  } else if(score > 1000 && score <=2000) {
    document.getElementById("content").innerHTML = "Did you know? Penguins wear tuxedos to help them blend in their environment and hide from predators!";
  } else if(score > 2000 && score <=3000) {
        document.getElementById("content").innerHTML = "While penguins cannot fly, they are experts at diving and swimming, allowing them to catch fish in the ocean. In a sense, they are flying underwater!";
  } else if(score > 3000 && score <=4000) {
        document.getElementById("content").innerHTML = "Penguins are monogamous, meaning they mate for life! Once two penguins fall in love, they stay together until the end of mating season, or even for life! ";
  } else if(score > 4000 && score <=5000) {
        document.getElementById("content").innerHTML = "Daddy penguins also care for their eggs even after they hatch. Keeping the baby egg warm while the mommy hunts for food.";
  } else if(score > 5000 && score <=6000) {
        document.getElementById("content").innerHTML = "In water, a group of penguins are called a raft. However, on land they are called a waddle! It surely does fit!";
  } else if(score > 6000 && score <=7000) {
        document.getElementById("content").innerHTML = "Penguins sure do love to travel in groups. This is because more friends mean more protection from scary predators.";
  } else if(score > 7000 && score <=8000) {
        document.getElementById("content").innerHTML = "A penguins diet usually consists of fish, krill, and squid. An “emperor’s” meal for sure.";
  } else if(score > 8000 && score <=9000) {
        document.getElementById("content").innerHTML = "Penguins do not only live in the cold Antarctic. Penguins also can be found on the Galapagos islands, South Africa, Australia, Peru, New Zealand, and Chile. Our feathered friends like to play in the sun too sometimes!";
  }else if(score > 9000 && score <=10000) {
        document.getElementById("content").innerHTML = "There are 17 different species of penguins! Some include the Emperor penguin, Adelie, African, King, Rockhopper, Royal, and more. Most penguins seem to have some royal lineage indeed.";
  }else if(score > 10000 && score <=11000) {
        document.getElementById("content").innerHTML = "The smallest penguin species are the “Little Penguins.” These penguins can grow up to 33 centimeters, or 13 inches in height! Small enough to fit in your purse, but please don’t take one home.";
  }else if(score > 11000 && score <=12000) {
        document.getElementById("content").innerHTML = "The largest species of penguins to ever exist were the “colossus penguins.” These birds could grow up to 8 feet tall and weighed up to 250 pounds! That’s taller than a polar bear on it’s hind legs (5.9-7.9 ft)!";
  } else if(score > 12000){
    document.getElementById("content").innerHTML = "YOU WIN!";
  }
  if (numofstars == 12){
        document.getElementById("content").innerHTML = "Penguins are cool!";
        numofstars = 0;
        stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
    setScale: {x: 2}
});
this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);

function collectStar (player, star)
{
    star.disableBody(true, true);
    numofstars = numofstars + 1;
    score += 75;
    scoreText.setText('Score: ' + score);
    if (numofstars == 12)
    {

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}
stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});
  }
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown)
{
    player.setVelocityX(-160);
    right = false;
    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);
    right = true;
    if (!jump)
      player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-500);
    jump = true;
    if(right) {
      player.anims.play('jumpright', true);
    } else {
      player.anims.play('jumpleft', true);
    }
}
if (player.body.touching.down) {
  jump = false;
}
}
