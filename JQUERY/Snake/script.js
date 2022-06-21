$(document).ready(function(){

    let food = { x: 200, y:200, eaten: false };
    let Applecount = 1;
    let snakeWidth = snakeHeight = 10;
    let blockSize = 10;
    let LEFT = 37;
    let UP = 38;
    let RIGHT = 39;
    let DOWN = 40;
    let keyPressed = DOWN;
    let score = 0; 
    let game;
    let canvas = $('#canvas')[0];
    let ctx = canvas.getContext('2d');
    let snake = [
        { x:50, y:100, oldx:0, oldy:0 },
        { x:50, y:90,oldx:0, oldy:0 },
        { x:50, y:80,oldx:0, oldy:0 }
    ];

    function reset(){
        canvas = $('#canvas')[0];
        ctx = canvas.getContext('2d');
        snake = [
            { x:50, y:100, oldx:0, oldy:0},
            { x:50, y:90,oldx:0, oldy:0},
            { x:50, y:80,oldx:0, oldy:0}
        ];
        food = { x: 200, y:200, eaten: false };
        Applecount = 1;
        snakeWidth = snakeHeight = 10;
        blockSize = 10;
        LEFT = 37;
        UP = 38;
        RIGHT = 39;
        DOWN = 40;
        keyPressed = DOWN;
        score = 0; 
    } 
    function gameLoop(){
        clearCanvas();
        displayFood();
        moveSnake();
        Snake();
    }
    function moveSnake(){
        $.each(snake, function(index, value){
            snake[index].oldx = value.x;
            snake[index].oldy = value.y;
            if(index == 0){
                if(keyPressed == DOWN){ snake[index].y = value.y + blockSize; }
                else if(keyPressed == UP){ snake[index].y = value.y - blockSize; }
                else if(keyPressed == RIGHT){ snake[index].x = value.x + blockSize; }
                else if(keyPressed == LEFT){ snake[index].x = value.x - blockSize; }
            }else{
                    snake[index].x = snake[index - 1].oldx;
                    snake[index].y = snake[index - 1].oldy;
            }
        });
    }
    function Snake(){
        count = 0
        $.each(snake, function(index, value){
            if (count==0) {
                ctx.fillStyle="green";
                count+=1;
            }else{ ctx.fillStyle = 'red'; }
            ctx.fillRect(value.x,value.y,snakeWidth,snakeHeight);
            ctx.strokeStyle = 'white';
            ctx.strokeRect(value.x,value.y,snakeWidth,snakeHeight);
            if(index == 0){
                if(collided(value.x,value.y)){ gameOver(); }
                if(didEatFood(value.x,value.y)){
                    Applecount % 5 == 0 ? score+= 5 : score++;
                    $('#score').text(score);
                    makeSnakeBigger();
                    food.eaten = true;
                }
            }
        });
    }
    function makeSnakeBigger(){
        snake.push({
            x:snake[snake.length - 1].oldx,
            y:snake[snake.length - 1].oldy
        });
    }
    function collided(x,y){
        return snake.filter(function(value,index){
            return index != 0 && value.x == x && value.y == y;
        }).length > 0 || x < 0 || x == canvas.width || y < 0 || y == canvas.height;
    }
    function displayFood(){
        if(Applecount % 5 == 0){ 
            ctx.fillStyle = 'blue';
            ctx.fillRect(food.x,food.y,snakeWidth+3,snakeHeight+3); 
        }
        else{  
            ctx.fillStyle = 'yellow'; 
            ctx.fillRect(food.x,food.y,snakeWidth-1,snakeHeight-1);
        }
        if(food.eaten == true){
            Applecount += 1
            food = getNewPositionForFood();  
        }   
    }
    function didEatFood(x,y){  return food.x == x && food.y == y; }
    function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);}
    function checkKeyIsAllowed(tempkey){
        let key;
        if(tempkey == DOWN){ key = (keyPressed != UP) ? tempkey : keyPressed;} 
        else if(tempkey == UP){ key = (keyPressed != DOWN) ? tempkey : keyPressed; }
        else if(tempkey == RIGHT){ key = (keyPressed != LEFT) ? tempkey : keyPressed; }
        else if(tempkey == LEFT){ key = (keyPressed != RIGHT) ? tempkey : keyPressed; }
        return key;
    }
    function gameOver(){
        clearInterval(game); 
        $('#medium').show();
        $('#hard').show();
        $('#easy').show();
        $('#over').show();
        $('#start1').hide(); $('#start2').hide(); $('#start3').hide(); 
    }
    function getNewPositionForFood(){
        let xArr = yArr = [],xy;
        $.each(snake,function(index,value){
            if($.inArray(value.x,xArr) != -1){ xArr.push(value.x); }
            if($.inArray(value.y,yArr) != -1){ yArr.push(value.y) }
        });
        xy = getEmptyXY(xArr,yArr);
        return xy;
    }
    function getEmptyXY(xArr,yArr){
        let newX,newY;
        newX = getRandomNumber(canvas.width - 10,10);
        newY = getRandomNumber(canvas.height - 10,10);
        if($.inArray(newX,xArr) == -1 && $.inArray(newY,yArr)){
            return{
                x:newX,
                y:newY,
                eaten:false
            }
        } else{ return getEmptyXY(xArr,yArr); }
    }
    function getRandomNumber(max,multipleOf){
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result %10);
        return result;
    }

    $('#start1').hide(); $('#start2').hide(); $('#start3').hide(); $('#over').hide();
    $('#easy').click(function(){
        $('#medium').hide();
        $('#hard').hide();
        $('#start1').show();
        $('#over').hide();   
    });
    $('#medium').click(function(){
        $('#easy').hide();
        $('#hard').hide();
        $('#start2').show();
        $('#over').hide();  
    });
    $('#hard').click(function(){
        $('#medium').hide();
        $('#easy').hide();
        $('#start3').show();
        $('#over').hide();
    });
    $(document).keydown(function(e){
        if($.inArray(e.which,[DOWN,UP,LEFT,RIGHT])!= -1){
        keyPressed = checkKeyIsAllowed(e.which);
        }
    });
    $('#start1').click(function(){
        $('#start1').hide();
        reset()
        game = setInterval(gameLoop, 200);  
    });

    $('#start2').click(function(){
        $('#start2').hide();
        reset()
        game = setInterval(gameLoop, 80);
    });
    $('#start3').click(function(){
        $('#start3').hide();
        reset()
        game = setInterval(gameLoop, 30);
    })

});