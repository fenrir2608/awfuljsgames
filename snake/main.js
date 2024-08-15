var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var snakeBody = [];

var velocityX = 0;
var velocityY = 0;

var appleX;
var appleY; 

var gameover = false;

window.onload = function(){
    board = document.getElementById('board');
    board.height = rows * blocksize;
    board.width = rows * blocksize;
    context = board.getContext("2d");

    document.addEventListener('keyup',changeDirection)
    placeApple();
    setInterval(update,1000/10);
}

function update(){
    if(gameover){
        context.fillStyle = "white";
        context.font = "50px Arial";
        context.fillText("game over lol",board.width/2 - 150,board.height/2);
        return;
    }
    if(snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height){
        gameover = true;
    }
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameover = true;
        }
    }
    context.fillStyle ="black";
    context.fillRect(0,0, board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(appleX,appleY,blocksize,blocksize)

    if(snakeX == appleX && snakeY == appleY){
        snakeBody.push([appleX,appleY]);
        placeApple();
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = [...snakeBody[i-1]];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize)
    
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize)
    }
}

function placeApple(){
    appleX = Math.floor(Math.random()*cols)* blocksize;
    appleY =  Math.floor(Math.random()*rows)* blocksize;
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}