var winningText;
var difficulty;

document.getElementById("onePlayerChoice").addEventListener("click", function(){
  document.getElementById("choosingMark").style.display = "block";
});
document.getElementById("twoPlayerChoice").addEventListener("click", function(){
  document.getElementById("choosingMark").style.display = "none";
});
var boardDisplay = [document.getElementById("sq1"), document.getElementById("sq2"), document.getElementById("sq3"), document.getElementById("sq4"), document.getElementById("sq5"), document.getElementById("sq6"), document.getElementById("sq7"), document.getElementById("sq8"), document.getElementById("sq9")];
var moveNum, target;
function openBoard() {
  setTimeout(function(){
    for (i=0; i<board.length; i++){
    document.getElementById(board[i].id).addEventListener("click", makeMark);
    }
    }, 1500)
}
document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("restart").addEventListener("click", restart);
document.getElementById("playButton").addEventListener("click", start);
var board = [];
  var corners = [board[0], board[2], board[6], board[8]];
  var sides = [board[1], board[3], board[5], board[7]];
 
function newGame(){
     
  winningText.parentNode.removeChild(winningText);
  document.getElementById("congrats").style.display="none";
  document.getElementById("settings").style.display="block";
    boardDisplay.forEach(function(a) {
    a.style.background = "";
   });
}

function start() {
  document.getElementById("gameBoard").style.display = "block";
  document.getElementById("gameBoard").style.opacity = "1";

 
  board = [
  {id: "sq1", mark: 0},
  {id: "sq2", mark: 0},
  {id: "sq3", mark: 0},
  {id: "sq4", mark: 0},
  {id: "sq5", mark: 0},
  {id: "sq6", mark: 0},
  {id: "sq7", mark: 0},
  {id: "sq8", mark: 0},
  {id: "sq9", mark: 0}
];
  document.getElementById("settings").style.display="none";
  openBoard(); 
 
    return settings();

}

function restart() {
 board = [
  {id: "sq1", mark: 0},
  {id: "sq2", mark: 0},
  {id: "sq3", mark: 0},
  {id: "sq4", mark: 0},
  {id: "sq5", mark: 0},
  {id: "sq6", mark: 0},
  {id: "sq7", mark: 0},
  {id: "sq8", mark: 0},
  {id: "sq9", mark: 0}
];
  boardDisplay.forEach(function(a) {
    a.style.background = "";
   });
   winningText.parentNode.removeChild(winningText);
   document.getElementById("congrats").style.display = "none";
   document.getElementById("gameBoard").style.display = "block";
   
   document.getElementById("gameBoard").style.opacity = "1";
   openBoard();
   return settings();
}

function settings() {
  topRow = [board[0].mark, board[1].mark, board[2].mark];
  midRow = [board[3].mark, board[4].mark, board[5].mark];
  botRow = [board[6].mark, board[7].mark, board[8].mark];
  leftCol = [board[0].mark, board[3].mark, board[6].mark];
  midCol = [board[1].mark, board[4].mark, board[7].mark];
  rightCol = [board[2].mark, board[5].mark, board[8].mark];
  diag1 = [board[0].mark, board[4].mark, board[8].mark];
  diag2 = [board[2].mark, board[4].mark, board[6].mark];
  winConds = [topRow, midRow, botRow, leftCol, midCol, rightCol, diag1, diag2];
  winCondsIds = [["sq1", "sq2", "sq3"], ["sq4", "sq5", "sq6"], ["sq7", "sq8", "sq9"], ["sq1", "sq4", "sq7"], ["sq2", "sq5", "sq8"], ["sq3", "sq6", "sq9"], ["sq1", "sq5", "sq9"], ["sq3", "sq5", "sq7"]];

  moveNum = 1;
  var gameType = document.querySelector("input[name='players']:checked").value;
  difficulty = document.querySelector("input[name='difficulty']:checked").value;
  var markChoice, XorO, XorO2;
  if (document.querySelector("input[name='marker']:checked").value === "X"){
    markChoice = "url('http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-alphanumeric/068727-black-ink-grunge-stamp-textures-icon-alphanumeric-x-styled.png')";
    XorO = "X";
  } else if (document.querySelector("input[name='marker']:checked").value === "O"){
    markChoice = "url('https://i1.wp.com/www.dailycupofyoga.com/wp-content/uploads/2011/11/tumblr_luo25sxgzi1qdyb9oo1_4002.png')";
    XorO = "O";
  }
  var otherMark;
  switch (document.querySelector("input[name='marker']:checked").value) {
    case "X":
      otherMark = "url('https://i1.wp.com/www.dailycupofyoga.com/wp-content/uploads/2011/11/tumblr_luo25sxgzi1qdyb9oo1_4002.png')";
      XorO2 = "O";
      break;
    case "O":
      otherMark = "url('http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-alphanumeric/068727-black-ink-grunge-stamp-textures-icon-alphanumeric-x-styled.png')";
      XorO2 = "X";
      break;
  }
  var player1, player2, title1, title2;
  switch (gameType) {
    case "one":
      player1 = "human";
      player2 = "AI";
      title1 = "The Human";
      title2 = "The Computer";
      break;
    case "two":
      player1 = "human";
      player2 = "human";
      title1 = "Player One";
      title2 = "Player Two";
      break;
  }
  current = Math.round(Math.random());
  players = [{
    entity: player1,
    mark: markChoice,
    markLetter: XorO,
    title: title1,
    value: 1
  }, {
    entity: player2,
    mark: otherMark,
    markLetter: XorO2,
    title: title2,
    value: -1
  }];
  return setPlayer();
}

function setPlayer() {
 
 
  if (players[current].entity === "AI") {
    return AI();
  }
}

function translate(selected){
  var there = winConds.indexOf(selected[0]);
  var there2 = selected[0].indexOf(0);
  target = winCondsIds[there][there2];
  playNow = true;
  return target;
}

function possibleWin(){
    var checkForWin = winConds.filter(function(a) {
    var checks = a.reduce(function(a, b) {
      return a + b;
    });
    if (checks < -1) {
      return checks;
    }
   });
  
if (checkForWin.length){
  selected = checkForWin;
  return translate(selected);
  }
}

function possibleLoss(){
    var checkForLoss = winConds.filter(function(a) {
    var checks = a.reduce(function(a, b) {
      return a + b;
    });
    if (checks > 1) {
      return checks;
    }
   });
  
if (checkForLoss.length){
  selected = checkForLoss;
  return translate(selected);
  }
}


function AI() {
  playNow = false;
  var selected;
  if (difficulty==="easy"){
    return AIrandom();
  }
  switch (moveNum) {
   case 1:
      if (difficulty==="medium"){
        return AIrandom();
      }
      target = "sq5";
      return AImakeMark(target); 
   case 2:
      if (difficulty==="medium"){
        return AIrandom();
      }
      if (board[4].mark === 0){
      target = "sq5";
      return AImakeMark(target);
      } else {
        target = corners[Math.floor(Math.random()*4)].id;
        return AImakeMark(target);
      }
      break;
   case 3:
      return AIrandom();
   case 4:
      possibleWin();
      if (playNow){
        return AImakeMark(target);
      }
      possibleLoss();
      if (playNow){
        return AImakeMark(target);
      }
      if (difficulty==="medium"){
        return AIrandom();
      } else {
      return checkCorners();}
      break;
    default:
      possibleWin();
      if (playNow){
        return AImakeMark(target);
      }
      possibleLoss();
      if (playNow){
        return AImakeMark(target);
      }
      return AIrandom();
      

  }
 
}

function checkCorners(){
   var cornerCheck = corners.filter(function(a){
    if (a.mark===1){return a;}
    });
  
  switch (cornerCheck.length){
    case 0:
      return AIrandom();
      
    case 1:
      var openCorners = corners.filter(function(a){
        if (a.mark===0){return a;}
              });
    
      target = openCorners[Math.floor(Math.random()*openCorners.length)].id;
      return AImakeMark(target);
      
    case 2:
   
      target = sides[Math.floor(Math.random()*4)].id;
     return AImakeMark(target);
                     }
  
}

function AIrandom (){
  var possible = [];
  for (i=0; i<board.length; i++){
    if (board[i].mark === 0){
      possible.push(i);
    }
   
  }
   var whichIndex = Math.floor(Math.random()*possible.length);
    var target = board[possible[whichIndex]].id;
 
  return AImakeMark(target);
  
}

function AImakeMark(target) {
  var here = board.filter(function(a){
      return a.id === target;
      });
  board[board.indexOf(here[0])].mark = players[current].value;
 
  
 setTimeout(function(){
    document.getElementById(target).style.backgroundImage = players[current].mark;
  
  
  if (current) {
    current = 0;
  } else {
    current = 1;
  }
 document.getElementById(target).removeEventListener("click", makeMark);


    
  return evaluate();
  }, 500)
}

function makeMark() {
  var goAt = this.id;
  var here = board.filter(function(a){
      return a.id === goAt;
      });
  board[board.indexOf(here[0])].mark = players[current].value;
 
  this.style.backgroundImage = players[current].mark;
  this.style.backgroundColor = "none";
  this.removeEventListener("click", makeMark);
  if (current) {
    current = 0;
  } else {
    current = 1;
  }

  return evaluate();
}

function evaluate() {
  moveNum++;
  topRow = [board[0].mark, board[1].mark, board[2].mark];
  midRow = [board[3].mark, board[4].mark, board[5].mark];
  botRow = [board[6].mark, board[7].mark, board[8].mark];
  leftCol = [board[0].mark, board[3].mark, board[6].mark];
  midCol = [board[1].mark, board[4].mark, board[7].mark];
  rightCol = [board[2].mark, board[5].mark, board[8].mark];
  diag1 = [board[0].mark, board[4].mark, board[8].mark];
  diag2 = [board[2].mark, board[4].mark, board[6].mark];
  winConds = [topRow, midRow, botRow, leftCol, midCol, rightCol, diag1, diag2];
  corners = [board[0], board[2], board[6], board[8]];
  sides = [board[1], board[3], board[5], board[7]];
var victory;
   winConds.forEach(function(a) {
    console.log(a);
     if (a.reduce(function(a, b) {
      return a + b;
      }) === 3) {
      console.log("goes here");
       victory = players[0].title;
      return;
    } else if (a.reduce(function(a, b) {
        return a + b;
      }) === -3) {
      victory = players[1].title;
      return;
    } 

    
  });
  console.log(victory);
    if (victory){
  return win(victory);
}
    
  
  if (moveNum===10){
  return draw();} else {
return setPlayer();}
}

function win(hey) {
  console.log("win runs");
  boardDisplay.forEach(function(a){
   a.removeEventListener("click", makeMark); 
  });
   document.getElementById("gameBoard").style.opacity = "0";
setTimeout(function(){
  document.getElementById("gameBoard").style.display = "none";
  document.getElementById("congrats").style.display = "block";
  winningText = document.createTextNode(hey + " Wins!");
  document.getElementById("congrats").appendChild(winningText); 
}, 1000);
  

}

function draw(){
    document.getElementById("gameBoard").style.opacity = "0";
setTimeout(function(){
  document.getElementById("gameBoard").style.display = "none";
   document.getElementById("congrats").style.display = "block";
  winningText = document.createTextNode("Cat's Game");
  document.getElementById("congrats").appendChild(winningText);
}, 1000);
  
 

  
}