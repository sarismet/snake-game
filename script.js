const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");

const box=32;
let score=0;

let is_it_eaten=false;


let snake= [500];
snake[0] = {
    x:9*box,
    y:10*box
}

let food={
x:3*box,
y:7*box
}



function control(){


    let snakeX=snake[0].x;
    let snakeY=snake[0].y;



    if(d== "LEFT") snakeX-=box;
    if(d== "RIGHT") snakeX+=box;
    if(d== "UP") snakeY-=box;
    if(d== "DOWN") snakeY+=box;
    if(snakeX>56*32){
        snakeX=32;
        }
        else if(snakeX<32){
        snakeX=56*32;
        }
    
        if(snakeY>23*32){
            snakeY=32;
            }
        else if(snakeY<32){
            snakeY=23*32;
            }
    

    if(snakeX == food.x && snakeY == food.y){
        score++;
        let keep=true;
        let x;
        let y;
        while(keep){
            keep=false;

            x=Math.floor(Math.random()*56+1)*box;
            y=Math.floor(Math.random()*23+1)*box;
            console.log("x is : ",x,"  y is : ",y);

            for(let i=0;i<snake.length;i++){
                    if(x==snake[i].x&&y==snake[i].y){
                        console.log("alert coincidence!!!  ","x is : ",x,"  y is : ",y,"snake.x is : ",snake[i].x,"snake.y is : ",snake[i].y);
                                keep=true;
                                break;
                    }

            }


        }
        food.x=x;
        food.y=y;

    }else{
        snake.pop();
    }



    let newHead={
        x:snakeX,
        y:snakeY
    }

    if(collusion(newHead,snake)){
       return true;
    }

    snake.unshift(newHead);



    update();
}

function collusion(head,arr){
    for(let i = 0; i<arr.length;i++){
        if(head.x==arr[i].x&&head.y==arr[i].y){
            return true;
        }
    }
return false;
}

let d="";
document.addEventListener("keydown",direction);

function direction(event){
if(event.keyCode == 37 && d !="RIGHT"){
d="LEFT",control();
}
else if(event.keyCode == 38 && d !="DOWN"){
d="UP",control();
}
else if(event.keyCode == 39 && d !="LEFT"){
d="RIGHT",control();
}
else if(event.keyCode == 40 && d !="UP"){
d="DOWN",control();
}
}

function update(){



  ctx.fillStyle ="black";
  ctx.fillRect(0,0,58*box,25*box);

  ctx.fillStyle="white";
  ctx.font="45px Changa one";
  ctx.fillText(score,box,box);

  ctx.fillStyle ="white";
  ctx.fillRect(box,box,56*box,23*box);

 for(let x = 1; x<57;x++){
      for(let y = 1; y<24;y++){
          ctx.strokeStyle="grey";
          ctx.strokeRect(x*32,y*32,32,32);
      }
  }
    for(let i = 0; i<snake.length;i++){
        ctx.fillStyle = (i==0)? "red": "blue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

    }


    ctx.fillStyle ="purple";
    ctx.fillRect(food.x,food.y,box,box);

}



function game(){


if(control())   { clearInterval(action); document.removeEventListener("keydown",direction);;}

}

let action = setInterval(game,120);
