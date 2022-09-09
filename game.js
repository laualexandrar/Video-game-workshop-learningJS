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
const giftPosition = {
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
  
  elementsSize = canvasSize / 10;
  
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
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition});
        }
      } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }
      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;
  if(giftCollision) {
    console.log('Level up!')
  } 
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

  function moveUp() {
    console.log('Moving up');
  
    if ((playerPosition.y - elementsSize) < elementsSize) {
      console.log('OUT');
    } else {
      playerPosition.y -= elementsSize;
      startGame();
    }
  }
  function moveLeft() {
    console.log('moving left');
  
    if ((playerPosition.x - elementsSize) < 20) {
      console.log('OUT');
    } else {
      playerPosition.x -= elementsSize;
      startGame();
    }
  }
  function moveRight() {
    console.log('moving right');
  
    if ((playerPosition.x + elementsSize) > canvasSize) {
      console.log(elementsSize)
      console.log('OUT');
    } else {
      playerPosition.x += elementsSize;
      startGame();
    }
  }
  function moveDown() {
    console.log('moving down');
    
    if ((playerPosition.y + elementsSize) > canvasSize) {
      console.log('OUT');
    } else {
      playerPosition.y += elementsSize;
      startGame();
    }
  }