// pongField v1.0
// author: lucidmoon
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'pongField', {preload: preload, create: create, update: update, render: render});
         
var bulat;
var bulatSpeed_x = 5, bulatSpeed_y = 5;
var skor, sekor=0;
var red;

function preload(){
    game.load.image('field', 'img/pongField-dummy.jpg');
    game.load.atlasXML('red-idle', 'img/red/red-idle.png', 'img/red/red-idle.xml');
    game.stage.backgroundColor = '#000000';
    
}
            
function create(){
    game.add.image(0, 0, 'field');
    red = game.add.sprite(10,10, 'red-idle');
    red.scale.x =  red.scale.y = .5;
    red.animations.add('idle');
    red.animations.play('idle',8,true);
    bulat = new Phaser.Circle(200, 200, 20);
    //player1 = new Phaser.Rectangle(30,30,15,70);
    player1 = new Phaser.Rectangle(red.x+90,red.y+10,10,100);
    skor = game.add.text (300, 0, sekor);
    skor.fontSize = 50;
}
            
function update(){
    
    if (bulat.x >= 790 || bulat.x <= 10){
        bulatSpeed_x *= -1;
        if (bulat.x >= 790){
            sekor += 1;
            skor.text = sekor;
            
        }
    }
    
    if (bulat.y >= 590 || bulat.y <= 10){
        bulatSpeed_y *= -1;
    }
    
    bulat.x += bulatSpeed_x;
    bulat.y += bulatSpeed_y;
    
    // =============== p1 ==================
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        player1.y +=10;
        red.y +=10;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        player1.y -=10;
        red.y -=10;
    }
    
    //check if hit by player1
    if ((bulat.x >= red.x+110) && (bulat.y >= red.y+10) && (bulat.x <= red.x+110) && (bulat.y <= red.y+110)){ //red.x+110, red-sprite_origin + red width + half_bulat = 100+10=110
        bulatSpeed_x *= -1;
    }
    
    
}
            
function render(){
    game.debug.geom(bulat, '#ffff00');
    game.debug.geom(player1, '#ff0000');
}