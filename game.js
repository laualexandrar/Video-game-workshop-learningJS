const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.querySelector ('#up');
const rightButton = document.querySelector ('#right');
const leftButton = document.querySelector ('#left');
const downButton = document.querySelector ('#down');
const restartButton = document.querySelector ('#restart');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const countdownText = document.querySelector('.countdown')

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function fixNumber(n) {
  return Number(n.toFixed(0));
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvasSize = Number(canvasSize.toFixed(0));
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = fixNumber(canvasSize / 10);
  
  playerPosition.x = undefined;
  playerPosition.y = undefined;

  //countdown()
 restartGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });
  console.log(window.innerWidth, window.innerHeight);
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';
  
  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log({map, mapRows, mapRowCols});

  showLives();
  
  enemyPositions = [];

  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = fixNumber(elementsSize * (colI + 1));
      const posY = fixNumber(elementsSize * (rowI + 1));

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = fixNumber(posX);
          playerPosition.y = fixNumber(posY);
          console.log({playerPosition});
        }
      } else if (col == 'I') {
        giftPosition.x = fixNumber(posX);
        giftPosition.y = fixNumber(posY);
      } else if(col == 'X') {
        enemyPositions.push ({
          x: fixNumber(posX),
          y: fixNumber(posY),
        });
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
    winningLevel();
  } 
  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX =  enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if(enemyCollision) {
    levelFail();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
  
}

function winningLevel() {
  console.log('Level up');
  level ++;
  startGame();
}

function levelFail() {
  console.log("ENEMY!")
  lives--;

  console.log(lives)
  if(lives <= 0) {
    level = 0;
    lives = 3;
    timeStart=  undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function gameWin() {
  console.log('??Game Finished!');
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime)
      pResult.innerHTML ='you made a new record! Congratulations!';
     } else {
      pResult.innerHTML ='Sorry, this is not a record';
     }
  } else {
    localStorage.setItem('record_time', playerTime)
    pResult.innerHTML = 'first time playing? Try to get a new record';
  }

  console.log({recordTime, playerTime});
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']);
  console.log(heartsArray);

  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart))
  
}
function showTime() {
  if(timeStart == undefined) {
    spanTime.innerHTML = 0;
  } else {
    spanTime.innerHTML = Date.now() - timeStart;
  }
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
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
restartButton.addEventListener('click', restartGame);

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
  function countdown() {
    console.log("counting down");
    let numberCount = 3
    function count () {
      if (numberCount > 0) {
        countdownText.innerHTML = numberCount;
        numberCount--;
        setTimeout(count, 700);
      }
      else {
        countdownText.innerHTML ='Go!';
      }  
    }
    count ()
    startGame()
  }
  function restartGame() {
    console.log('restart game');
    countdown()
    level = 0;
    lives = 3;
    timeStart= undefined;
    pResult.innerHTML = '';
    playerPosition.x = undefined;
    playerPosition.y = undefined;  
      setTimeout(startGame, 3000);
    }

  function victory() {

    }
  function collision() {
      setTimeout()
    }