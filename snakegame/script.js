let inputDir={x:0,y:0};
const foodSound=new Audio('music/food.mp3');
const gameOverSound= new Audio('music/gameover.mp3');
const musicSound= new Audio('music/music.mp3');
const moveSound=new Audio('music/move.mp3');
let speed =5;
let score=0;

let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]

let food={x:6,y:7};

/* GAME FUNCTIONS */
function main(ctime){
    window.requestAnimationFrame(main);
    /* console.log(ctime); */
    if((ctime-lastPaintTime)/1000<(1/speed)){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}
function isCollide(snake){
    /* bumping into yourself */
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y)
            return true;
    }
    /* bumping into deewar */
    if(snake[0].x>=18||snake[0].x<0||snake[0].y>=18||snake[0].y<0)
    return true;
return false;
}

function gameEngine(){
    /* part1:updating the snake array and food*/
  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0,y:0};
    alert("Game Over,Press any key to play again!");
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;
  }
  /* if food eaten ->increment the score and regenerate the food */
  if (snakeArr[0].y==food.y&&snakeArr[0].x==food.x){
    foodSound.play();
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
  }
  /* MOVING SNAKE */

  for(let i=snakeArr.length-2;i>=0;i--){
   /*  const element=arr[i]; */
    snakeArr[i+1]={...snakeArr[i]};

  }
  snakeArr[0].x+=inputDir.x;
  snakeArr[0].y+=inputDir.y;


    /* part2:Display the snake and food */
    /* Display the snake */
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
      
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
/* Display the food */
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    });
}






/* MAIN LOGIC */
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
   inputDir={x:0,y:0}/* start the game */
   musicSound.play();
   switch (e.key){
    case "ArrowUp":
        inputDir.x=0;
        inputDir.y=-1;
    console.log("ArrowUp")    
    break;
    case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
    console.log("ArrowDown")    
    break;
    case "ArrowLeft":
        inputDir.x=-1;
        inputDir.y=0;
    console.log("ArrowLeft")    
    break;
    case "ArrowRight":
        inputDir.x=1;
        inputDir.y=0;
    console.log("ArrowRight")    
    break;
    default:
        break;

   }
})
