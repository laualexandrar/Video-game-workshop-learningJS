const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.querySelector ('#up')
const rightButton = document.querySelector ('#right')
const leftButton = document.querySelector ('#left')
const downButton = document.querySelector ('#down')

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10.3;
  
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });
  
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';
  
  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log({map, mapRows, mapRowCols});
  
  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O') {
        if(!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({playerPosition});
        }
      }
      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

  //rowI and colI are the index
  
  // for (let row = 1; row <= 10; row++) {
    //   for (let col = 1; col <= 10; col++) {
      //     game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
      //   }
      // }
    

window.addEventListener('keydown', moveByKeys);
upButton.addEventListener('click', moveUp);
rightButton.addEventListener('click', moveRight);
leftButton.addEventListener('click', moveLeft);
downButton.addEventListener('click', moveDown);

function moveByKeys (event) {
  if(event.key == 'ArrowUp') moveUp();
   else if (event.key == 'ArrowRight') moveRight();
   else if (event.key == 'ArrowLeft')  moveLeft();
   else if (event.key == 'ArrowDown') moveDown();
}
  //console.log(event)

function moveUp () {
    console.log("moving up");
    playerPosition.y -= elementsSize;
    startGame();
}
function moveRight () {
    console.log("moving right")
    playerPosition.x += elementsSize;
    startGame();
}
function moveLeft () {
    console.log("moving left")
    playerPosition.x -= elementsSize;
    startGame();
}
function moveDown () {
    console.log("moving down")
    playerPosition.y += elementsSize;
    startGame();
}