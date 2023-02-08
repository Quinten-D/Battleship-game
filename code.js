// Battleships

var A = [[0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0]];

var B = [[0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0]];

var A_ = [[0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0]];

var B_ = [[0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0]];

var shipListA = [6,4,4,3,3,3,2,2,2,2];
var shipListB = [6,4,4,3,3,3,2,2,2,2];
var ship=0;
var randRow=0;
var randCol=0;
var orientation=["right","up","left","down"];
var ori="";
var ind = 0;

var right=[];
var left=[];
var down=[];
var up=[];

var inputRow;
var inputCol;

var oppRow;
var oppCol;

var coordinatesA=[];
var statesA=[];
var coordinatesB=[];
var statesB=[];

var a6=0;
var a41=0;
var a42=0;
var a31=0;
var a32=0;
var a33=0;
var a21=0;
var a22=0;
var a23=0;
var a24=0;

var placedBoatsB=[];

var seconds=0;
var minutes=0;
var hours=0;




window.onload = function(){
     while(shipListA.length!=0){
     chooseShip(shipListA);
     chooseOrientation();
     searchPlaces(A);
     choosePlace(A);
     placement(A);
     }
     while(shipListB.length!=0){
     chooseShip(shipListB);
     chooseOrientation();
     searchPlaces(B);
     choosePlace(B);
     placement(B);
     }

  boatPlacement(coordinatesA);

  drawBoard(A,"A",A_);
  drawBoard(B,"B",B_);
}


function drawBoard(board,nameBoard,nameOtherBoard){
  document.getElementById(nameBoard).innerHTML = generateBoard(board,nameBoard,nameOtherBoard);
}


function generateBoard(board,nameBoard,nameOtherBoard){
  let table =`<table class="${nameBoard}">`;
  for (let r=0; r < board.length; r++){
    let row ="<tr>"
    for (let c=0; c < board[r].length; c++){
      if (nameOtherBoard[r][c]=="x") {
        row+= `<td  class="cell red" onclick="click_function(this)">`;

        row+= "</td>";
      }
      if (nameOtherBoard[r][c]==1) {
        row+= `<td  class="cell grey" onclick="click_function(this)">`;

        row+= "</td>";
      }
      if (nameOtherBoard[r][c]==0) {
        row+= `<td  class="cell blue${nameBoard}" onclick="click_function(this)">`;

        row+= "</td>";
      }
    }
    row+="</tr>";
    table+=row;
  }
  table+="</table>";
  return table;
}


function drawTime(){
  document.getElementById("timer").innerHTML = time();
}


function time(){
  seconds+=1;
  if (seconds%60 == 0) {
    minutes+=1;
    seconds=0;
  }
  if ((minutes%60 ==0)&&(minutes != 0)) {
    hours+=1;
    minutes=0;
  }
  return `${hours}:${minutes}:${seconds}`;
}


function chooseShip(shipList){
  ship = shipList[0];
  shipList.shift();
}


function chooseOrientation(){
  ind = Math.floor((Math.random())*(orientation.length));
  ori = orientation[ind];
  }


function searchPlaces(board){
  if (ori=="right") {

    right=[];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        let teller = 0;
        for (let s = 0; s < ship; s++) {
          let t =1;

          for (let j = 0; j < 3; j++) {
            let p =r-1;
            let m =c-1+s+j;
            if ((c+s)>9) {                        //check if ship stays in table
              t=0;
            }
            if (m<10 && m>-1) {                   //check sides of ship
              if (board[r][m]!=0) {
                t=0;
              }
            }

            if (p<10 && p>-1 && m<10 && m>-1) {   //check above ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
            p=r+1;
            if (p<10 && p>-1 && m<10 && m>-1) {   //check under ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
          }
          teller+=t;
        }
        if (teller==ship) {
          right.push(r);
          right.push(c);
        }
      }
    }
  }
  if (ori=="left") {

    left=[];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        let teller = 0;
        for (let s = 0; s < ship; s++) {
          let t =1;

          for (let j = 0; j < 3; j++) {
            let p =r-1;
            let m =c-1-s+j;
            if ((c-s)<0) {                        //check if ship stays in table
              t=0;
            }
            if (m<10 && m>-1) {                   //check sides of ship
              if (board[r][m]!=0) {
                t=0;
              }
            }

            if (p<10 && p>-1 && m<10 && m>-1) {   //check above ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
            p=r+1;
            if (p<10 && p>-1 && m<10 && m>-1) {   //check under ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
          }
          teller+=t;
        }
        if (teller==ship) {
          left.push(r);
          left.push(c);
        }
      }
    }
  }
  if (ori=="down") {

    down=[];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        let teller = 0;
        for (let s = 0; s < ship; s++) {
          let t =1;

          for (let j = 0; j < 3; j++) {
            let p =r-1+s+j;
            let m =c-1;
            if ((r+s)>9) {                        //check if ship stays in table
              t=0;
            }
            if (p<10 && p>-1) {                   //check top,element itself and bottom of element ship
              if (board[p][c]!=0) {
                t=0;
              }
            }

            if (p<10 && p>-1 && m<10 && m>-1) {   //check left of element ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
            m=c+1;
            if (p<10 && p>-1 && m<10 && m>-1) {   //check right of ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
          }
          teller+=t;
        }
        if (teller==ship) {
          down.push(r);
          down.push(c);
        }
      }
    }
  }
  if (ori=="up") {

    up=[];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        let teller = 0;
        for (let s = 0; s < ship; s++) {
          let t =1;

          for (let j = 0; j < 3; j++) {
            let p =r+1-s-j;
            let m =c-1;
            if ((r-s)<0) {                        //check if ship stays in table
              t=0;
            }
            if (p<10 && p>-1) {                   //check top,element itself and bottom of element ship
              if (board[p][c]!=0) {
                t=0;
              }
            }

            if (p<10 && p>-1 && m<10 && m>-1) {   //check left of ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
            m=c+1;
            if (p<10 && p>-1 && m<10 && m>-1) {   //check right of ship
              if (board[p][m]!=0) {
                t=0;
              }
            }
          }
          teller+=t;
        }
        if (teller==ship) {
          up.push(r);
          up.push(c);
        }
      }
    }
  }
}


function choosePlace(board){

    if (window[ori].length==0) {     //heb.length bijgevoegd
      if (ind <3) {
        ori=orientation[ind+1];
      }
      else {
        ori=orientation[ind-1];
      }
      searchPlaces(board)
    }

  let index = Math.floor(Math.random()*(window[ori].length/2)); //window converts string to global variable name
  index = index * 2                                           //ensures an even number as index
  randRow = window[ori][index];
  randCol = window[ori][index+1];

  if (randRow==undefined) {
    startOver(board);
  }
}


function placement(board){
  if (ori=="right"){
    for (let u=0; u<ship ;u++){
      board[randRow][randCol+u]=ship;
      if (board==B) {
        coordinatesB.push(randRow);
        coordinatesB.push(randCol+u);
        statesB.push(1)
      }
      if (board==A) {
        coordinatesA.push(randRow);
        coordinatesA.push(randCol+u);
        statesA.push(1)
      }
    }
  }
  if (ori=="left"){
    for (let u=0; u<ship ;u++){
      board[randRow][randCol-u]=ship;
      if (board==B) {
        coordinatesB.push(randRow);
        coordinatesB.push(randCol-u);
        statesB.push(1)
      }
      if (board==A) {
        coordinatesA.push(randRow);
        coordinatesA.push(randCol-u);
        statesA.push(1)
      }
    }
  }
  if (ori=="down"){
    for (let u=0; u<ship ;u++){
      board[randRow+u][randCol]=ship;
      if (board==B) {
        coordinatesB.push(randRow+u);
        coordinatesB.push(randCol);
        statesB.push(1)
      }
      if (board==A) {
        coordinatesA.push(randRow+u);
        coordinatesA.push(randCol);
        statesA.push(1)
      }
    }
  }
  if (ori=="up"){
    for (let u=0; u<ship ;u++){
      board[randRow-u][randCol]=ship;
      if (board==B) {
        coordinatesB.push(randRow-u);
        coordinatesB.push(randCol);
        statesB.push(1)
      }
      if (board==A) {
        coordinatesA.push(randRow-u);
        coordinatesA.push(randCol);
        statesA.push(1)
      }
    }
  }
}


function startOver(board){
  //alert("dubbel")
  if (board==A) {
    A = [[0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0]];
    shipListA=[6,4,4,3,3,3,2,2,2,2];
    coordinatesA=[];
    statesA=[];
    while(shipListA.length!=0){
    chooseShip(shipListA);
    chooseOrientation();
    searchPlaces(A);
    choosePlace(A);
    placement(A);
    }
  }
  if (board==B) {
    B = [[0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0]];
    shipListB=[6,4,4,3,3,3,2,2,2,2];
    coordinatesB=[];
    statesB=[];
    while(shipListB.length!=0){
    chooseShip(shipListB);
    chooseOrientation();
    searchPlaces(B);
    choosePlace(B);
    placement(B);
    }
  }
}


function boatPlacement(coordinates){

  if (coordinates[1]<coordinates[11]) {                                          /// boat=6 and orientation = right
    //alert("41right" + coordinates[13] + coordinates[19]+"rij"+coordinates[12]);
    let rij=coordinates[0];
    let col=coordinates[1]
    var boat6 = document.createElement("div");
    boat6.setAttribute('class','boat6');
    boat6.setAttribute('id','boat6');
    document.body.appendChild(boat6);
    document.documentElement.style.setProperty('--y6',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x6',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[11]<coordinates[1]) {                                          /// boat=6 and orientation = left
    let rij=coordinates[10];
    let col=coordinates[11]
    var boat6 = document.createElement("div");
    boat6.setAttribute('class','boat6');
    boat6.setAttribute('id','boat6');
    document.body.appendChild(boat6);
    document.documentElement.style.setProperty('--y6',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x6',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[0]<coordinates[10]) {                                          /// boat=6 and orientation = down
    let rij=coordinates[0];
    let col=coordinates[1]
    var boat6 = document.createElement("div");
    boat6.setAttribute('class','boat6Down');
    boat6.setAttribute('id','boat6');
    document.body.appendChild(boat6);
    document.documentElement.style.setProperty('--y6',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x6',`${110-3*rij+21.7*col}px` );
  }
  if (coordinates[10]<coordinates[0]) {                                          /// boat=6 and orientation = up
    let rij=coordinates[10];
    let col=coordinates[11]
    var boat6 = document.createElement("div");
    boat6.setAttribute('class','boat6Down');
    boat6.setAttribute('id','boat6');
    document.body.appendChild(boat6);
    document.documentElement.style.setProperty('--y6',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x6',`${110-3*rij+21.7*col}px` );
  }

  if (coordinates[13]<coordinates[19]) {                                          /// boat=41 and orientation = right
    //alert("41right" + coordinates[13] + coordinates[19]+"rij"+coordinates[12]);
    let rij41=coordinates[12];
    let col41=coordinates[13]
    var boat41 = document.createElement("div");
    boat41.setAttribute('class','boat41');
    boat41.setAttribute('id','boat41');
    document.body.appendChild(boat41);
    document.documentElement.style.setProperty('--y41',`${4.5+rij41*20}px` );
    document.documentElement.style.setProperty('--x41',`${123-3*rij41+22.2*col41}px` );
  }
  if (coordinates[19]<coordinates[13]) {                                          /// boat=41 and orientation = left
    let rij41=coordinates[18];
    let col41=coordinates[19]
    var boat41 = document.createElement("div");
    boat41.setAttribute('class','boat41');
    boat41.setAttribute('id','boat41');
    document.body.appendChild(boat41);
    document.documentElement.style.setProperty('--y41',`${4.5+rij41*20}px` );
    document.documentElement.style.setProperty('--x41',`${123-3*rij41+22.2*col41}px` );
  }
  if (coordinates[12]<coordinates[18]) {                                          /// boat=41 and orientation = down
    let rij41=coordinates[12];
    let col41=coordinates[13]
    var boat41 = document.createElement("div");
    boat41.setAttribute('class','boat41Down');
    boat41.setAttribute('id','boat41');
    document.body.appendChild(boat41);
    document.documentElement.style.setProperty('--y41',`${21+rij41*20}px` );
    document.documentElement.style.setProperty('--x41',`${108-3*rij41+22*col41}px` );
  }
  if (coordinates[18]<coordinates[12]) {                                          /// boat=41 and orientation = up
    let rij41=coordinates[18];
    let col41=coordinates[19]
    var boat41 = document.createElement("div");
    boat41.setAttribute('class','boat41Down');
    boat41.setAttribute('id','boat41');
    document.body.appendChild(boat41);
    document.documentElement.style.setProperty('--y41',`${21+rij41*20}px` );
    document.documentElement.style.setProperty('--x41',`${108-3*rij41+22*col41}px` );
  }

  if (coordinates[21]<coordinates[27]) {                                          /// boat=42 and orientation = right
    //alert("41right" + coordinates[13] + coordinates[19]+"rij"+coordinates[12]);
    let rij=coordinates[20];
    let col=coordinates[21]
    var boat42 = document.createElement("div");
    boat42.setAttribute('class','boat42');
    boat42.setAttribute('id','boat42');
    document.body.appendChild(boat42);
    document.documentElement.style.setProperty('--y42',`${4.5+rij*20}px` );
    document.documentElement.style.setProperty('--x42',`${123-3*rij+22*col}px` );
  }
  if (coordinates[27]<coordinates[21]) {                                          /// boat=42 and orientation = left
    let rij=coordinates[26];
    let col=coordinates[27]
    var boat42 = document.createElement("div");
    boat42.setAttribute('class','boat42');
    boat42.setAttribute('id','boat42');
    document.body.appendChild(boat42);
    document.documentElement.style.setProperty('--y42',`${4.5+rij*20}px` );
    document.documentElement.style.setProperty('--x42',`${123-3*rij+22*col}px` );
  }
  if (coordinates[20]<coordinates[26]) {                                          /// boat=42 and orientation = down
    let rij=coordinates[20];
    let col=coordinates[21]
    var boat42 = document.createElement("div");
    boat42.setAttribute('class','boat42Down');
    boat42.setAttribute('id','boat42');
    document.body.appendChild(boat42);
    document.documentElement.style.setProperty('--y42',`${21+rij*20}px` );
    document.documentElement.style.setProperty('--x42',`${108-3*rij+22*col}px` );
  }
  if (coordinates[26]<coordinates[20]) {                                          /// boat=42 and orientation = up
    let rij=coordinates[26];
    let col=coordinates[27]
    var boat42 = document.createElement("div");
    boat42.setAttribute('class','boat42Down');
    boat42.setAttribute('id','boat42');
    document.body.appendChild(boat42);
    document.documentElement.style.setProperty('--y42',`${21+rij*20}px` );
    document.documentElement.style.setProperty('--x42',`${108-3*rij+22*col}px` );
  }

  if (coordinates[29]<coordinates[33]) {                                          /// boat=31 and orientation = right
    let rij=coordinates[28];
    let col=coordinates[29]
    var boat31 = document.createElement("div");
    boat31.setAttribute('class','boat31');
    boat31.setAttribute('id','boat31');
    document.body.appendChild(boat31);
    document.documentElement.style.setProperty('--y31',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x31',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[33]<coordinates[29]) {                                          /// boat=31 and orientation = left
    let rij=coordinates[32];
    let col=coordinates[33]
    var boat31 = document.createElement("div");
    boat31.setAttribute('class','boat31');
    boat31.setAttribute('id','boat31');
    document.body.appendChild(boat31);
    document.documentElement.style.setProperty('--y31',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x31',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[28]<coordinates[32]) {                                          /// boat=31 and orientation = down
    let rij=coordinates[28];
    let col=coordinates[29]
    var boat31 = document.createElement("div");
    boat31.setAttribute('class','boat31Down');
    boat31.setAttribute('id','boat31');
    document.body.appendChild(boat31);
    document.documentElement.style.setProperty('--y31',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x31',`${108-3*rij+22*col}px` );
  }
  if (coordinates[32]<coordinates[28]) {                                          /// boat=31 and orientation = up
    let rij=coordinates[32];
    let col=coordinates[33]
    var boat31 = document.createElement("div");
    boat31.setAttribute('class','boat31Down');
    boat31.setAttribute('id','boat31');
    document.body.appendChild(boat31);
    document.documentElement.style.setProperty('--y31',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x31',`${108-3*rij+22*col}px` );
  }

  if (coordinates[35]<coordinates[39]) {                                          /// boat=32 and orientation = right
    let rij=coordinates[34];
    let col=coordinates[35]
    var boat32 = document.createElement("div");
    boat32.setAttribute('class','boat32');
    boat32.setAttribute('id','boat32');
    document.body.appendChild(boat32);
    document.documentElement.style.setProperty('--y32',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x32',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[39]<coordinates[35]) {                                          /// boat=32 and orientation = left
    let rij=coordinates[38];
    let col=coordinates[39]
    var boat32 = document.createElement("div");
    boat32.setAttribute('class','boat32');
    boat32.setAttribute('id','boat32');
    document.body.appendChild(boat32);
    document.documentElement.style.setProperty('--y32',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x32',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[34]<coordinates[38]) {                                          /// boat=32 and orientation = down
    let rij=coordinates[34];
    let col=coordinates[35]
    var boat32 = document.createElement("div");
    boat32.setAttribute('class','boat32Down');
    boat32.setAttribute('id','boat32');
    document.body.appendChild(boat32);
    document.documentElement.style.setProperty('--y32',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x32',`${108-3*rij+22*col}px` );
  }
  if (coordinates[38]<coordinates[34]) {                                          /// boat=32 and orientation = up
    let rij=coordinates[38];
    let col=coordinates[39]
    var boat32 = document.createElement("div");
    boat32.setAttribute('class','boat32Down');
    boat32.setAttribute('id','boat32');
    document.body.appendChild(boat32);
    document.documentElement.style.setProperty('--y32',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x32',`${108-3*rij+22*col}px` );
  }

  if (coordinates[41]<coordinates[45]) {                                          /// boat=33 and orientation = right
    let rij=coordinates[40];
    let col=coordinates[41]
    var boat33 = document.createElement("div");
    boat33.setAttribute('class','boat33');
    boat33.setAttribute('id','boat33');
    document.body.appendChild(boat33);
    document.documentElement.style.setProperty('--y33',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x33',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[45]<coordinates[41]) {                                          /// boat=33 and orientation = left
    let rij=coordinates[44];
    let col=coordinates[45]
    var boat33 = document.createElement("div");
    boat33.setAttribute('class','boat33');
    boat33.setAttribute('id','boat33');
    document.body.appendChild(boat33);
    document.documentElement.style.setProperty('--y33',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x33',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[40]<coordinates[44]) {                                          /// boat=33 and orientation = down
    let rij=coordinates[40];
    let col=coordinates[41]
    var boat33 = document.createElement("div");
    boat33.setAttribute('class','boat33Down');
    boat33.setAttribute('id','boat33');
    document.body.appendChild(boat33);
    document.documentElement.style.setProperty('--y33',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x33',`${108-3*rij+22*col}px` );
  }
  if (coordinates[44]<coordinates[40]) {                                          /// boat=33 and orientation = up
    let rij=coordinates[44];
    let col=coordinates[45]
    var boat33 = document.createElement("div");
    boat33.setAttribute('class','boat33Down');
    boat33.setAttribute('id','boat33');
    document.body.appendChild(boat33);
    document.documentElement.style.setProperty('--y33',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x33',`${108-3*rij+22*col}px` );
  }

  if (coordinates[47]<coordinates[49]) {                                          /// boat=21 and orientation = right
    let rij=coordinates[46];
    let col=coordinates[47]
    var boat21 = document.createElement("div");
    boat21.setAttribute('class','boat21');
    boat21.setAttribute('id','boat21');
    document.body.appendChild(boat21);
    document.documentElement.style.setProperty('--y21',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x21',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[49]<coordinates[47]) {                                          /// boat=21 and orientation = left
    let rij=coordinates[48];
    let col=coordinates[49]
    var boat21 = document.createElement("div");
    boat21.setAttribute('class','boat21');
    boat21.setAttribute('id','boat21');
    document.body.appendChild(boat21);
    document.documentElement.style.setProperty('--y21',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x21',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[46]<coordinates[48]) {                                          /// boat=21 and orientation = down
    let rij=coordinates[46];
    let col=coordinates[47]
    var boat21 = document.createElement("div");
    boat21.setAttribute('class','boat21Down');
    boat21.setAttribute('id','boat21');
    document.body.appendChild(boat21);
    document.documentElement.style.setProperty('--y21',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x21',`${110-3*rij+22*col}px` );
  }
  if (coordinates[48]<coordinates[46]) {                                          /// boat=21 and orientation = up
    let rij=coordinates[48];
    let col=coordinates[49]
    var boat21 = document.createElement("div");
    boat21.setAttribute('class','boat21Down');
    boat21.setAttribute('id','boat21');
    document.body.appendChild(boat21);
    document.documentElement.style.setProperty('--y21',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x21',`${110-3*rij+22*col}px` );
  }

  if (coordinates[51]<coordinates[53]) {                                          /// boat=22 and orientation = right
    let rij=coordinates[50];
    let col=coordinates[51]
    var boat22 = document.createElement("div");
    boat22.setAttribute('class','boat22');
    boat22.setAttribute('id','boat22');
    document.body.appendChild(boat22);
    document.documentElement.style.setProperty('--y22',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x22',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[53]<coordinates[51]) {                                          /// boat=22 and orientation = left
    let rij=coordinates[52];
    let col=coordinates[53]
    var boat22 = document.createElement("div");
    boat22.setAttribute('class','boat22');
    boat22.setAttribute('id','boat22');
    document.body.appendChild(boat22);
    document.documentElement.style.setProperty('--y22',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x22',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[50]<coordinates[52]) {                                          /// boat=22 and orientation = down
    let rij=coordinates[50];
    let col=coordinates[51]
    var boat22 = document.createElement("div");
    boat22.setAttribute('class','boat22Down');
    boat22.setAttribute('id','boat22');
    document.body.appendChild(boat22);
    document.documentElement.style.setProperty('--y22',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x22',`${110-3*rij+22*col}px` );
  }
  if (coordinates[52]<coordinates[50]) {                                          /// boat=22 and orientation = up
    let rij=coordinates[52];
    let col=coordinates[53]
    var boat22 = document.createElement("div");
    boat22.setAttribute('class','boat22Down');
    boat22.setAttribute('id','boat22');
    document.body.appendChild(boat22);
    document.documentElement.style.setProperty('--y22',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x22',`${110-3*rij+22*col}px` );
  }

  if (coordinates[55]<coordinates[57]) {                                          /// boat=23 and orientation = right
    let rij=coordinates[54];
    let col=coordinates[55]
    var boat23 = document.createElement("div");
    boat23.setAttribute('class','boat23');
    boat23.setAttribute('id','boat23');
    document.body.appendChild(boat23);
    document.documentElement.style.setProperty('--y23',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x23',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[57]<coordinates[55]) {                                          /// boat=23 and orientation = left
    let rij=coordinates[56];
    let col=coordinates[57]
    var boat23 = document.createElement("div");
    boat23.setAttribute('class','boat23');
    boat23.setAttribute('id','boat23');
    document.body.appendChild(boat23);
    document.documentElement.style.setProperty('--y23',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x23',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[54]<coordinates[56]) {                                          /// boat=23 and orientation = down
    let rij=coordinates[54];
    let col=coordinates[55]
    var boat23 = document.createElement("div");
    boat23.setAttribute('class','boat23Down');
    boat23.setAttribute('id','boat23');
    document.body.appendChild(boat23);
    document.documentElement.style.setProperty('--y23',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x23',`${110-3*rij+22*col}px` );
  }
  if (coordinates[56]<coordinates[54]) {                                          /// boat=23 and orientation = up
    let rij=coordinates[56];
    let col=coordinates[57]
    var boat23 = document.createElement("div");
    boat23.setAttribute('class','boat23Down');
    boat23.setAttribute('id','boat23');
    document.body.appendChild(boat23);
    document.documentElement.style.setProperty('--y23',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x23',`${110-3*rij+22*col}px` );
  }

  if (coordinates[59]<coordinates[61]) {                                          /// boat=24 and orientation = right
    let rij=coordinates[58];
    let col=coordinates[59]
    var boat24 = document.createElement("div");
    boat24.setAttribute('class','boat24');
    boat24.setAttribute('id','boat24');
    document.body.appendChild(boat24);
    document.documentElement.style.setProperty('--y24',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x24',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[61]<coordinates[59]) {                                          /// boat=24 and orientation = left
    let rij=coordinates[60];
    let col=coordinates[61]
    var boat24 = document.createElement("div");
    boat24.setAttribute('class','boat24');
    boat24.setAttribute('id','boat24');
    document.body.appendChild(boat24);
    document.documentElement.style.setProperty('--y24',`${4+rij*20}px` );
    document.documentElement.style.setProperty('--x24',`${123-3*rij+21.7*col}px` );
  }
  if (coordinates[58]<coordinates[60]) {                                          /// boat=24 and orientation = down
    let rij=coordinates[58];
    let col=coordinates[59]
    var boat24 = document.createElement("div");
    boat24.setAttribute('class','boat24Down');
    boat24.setAttribute('id','boat24');
    document.body.appendChild(boat24);
    document.documentElement.style.setProperty('--y24',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x24',`${110-3*rij+22*col}px` );
  }
  if (coordinates[60]<coordinates[58]) {                                          /// boat=24 and orientation = up
    let rij=coordinates[60];
    let col=coordinates[61]
    var boat24 = document.createElement("div");
    boat24.setAttribute('class','boat24Down');
    boat24.setAttribute('id','boat24');
    document.body.appendChild(boat24);
    document.documentElement.style.setProperty('--y24',`${18+rij*19.5}px` );
    document.documentElement.style.setProperty('--x24',`${110-3*rij+22*col}px` );
  }




}


function checkHit(coordinates,states,row,col){
  for (let i = 0; i < (coordinates.length-1); i++) {
    if ((row==coordinates[i]) && (col==coordinates[i+1]) && ((i%2)==0)) {
      //alert("hit");
      states[i/2]=0;
    }
  }
  if (states==statesB) {
    if (B[row][col]==0) {
      B_[row][col]=1;
    }
    if (B[row][col]!=0) {
      B_[row][col]="x";
    }
  }

}


function checkWin(states){
  let k =0;
  for (var i = 0; i < states.length; i++) {
    if (states[i]==0) {
      k++;
    }
  }
  if ((k==31) && (states==statesB)) {
    alert("Victory!");
    return"over";
  }
  if ((k==31) && (states==statesA)) {
    alert("Defeat!");
    return"over";
  }
}


function opponent(){
  oppRow = Math.floor(Math.random()*10);
  oppCol = Math.floor(Math.random()*10);
  while (A_[oppRow][oppCol] != 0) {
    oppRow = Math.floor(Math.random()*10);
    oppCol = Math.floor(Math.random()*10);
  }
  if (A[oppRow][oppCol]==0) {
    A_[oppRow][oppCol]=1;
  }
  if (A[oppRow][oppCol]!=0) {
    A_[oppRow][oppCol]="x";
  }
}


function checkSunkB(states, coordinates){

  if ((states[0]==0)&&(states[1]==0)&&(states[2]==0)&&(states[3]==0)&&(states[4]==0)&&(states[5]==0)&&(a6==0)) {
    a6+=1;                                                                        // without a6,a41,... boats that are sunk would be placed again after each click
                                                                                  // after each click a new div element would be created for all the boats that are sunk
    if (coordinates[1]<coordinates[11]) {
                                                                                  /// boat=6 and orientation = right

      let rij=coordinates[0];
      let col=coordinates[1]
      var boat6B = document.createElement("div");
      boat6B.setAttribute('class','boat6B');
      document.body.appendChild(boat6B);
      document.documentElement.style.setProperty('--y6B',`${4+rij*19.8}px` );
      document.documentElement.style.setProperty('--x6B',`${422-3*rij+22*col}px` );
    }
    if (coordinates[11]<coordinates[1]) {                                          /// boat=6 and orientation = left
      let rij=coordinates[10];
      let col=coordinates[11]
      var boat6B = document.createElement("div");
      boat6B.setAttribute('class','boat6B');
      document.body.appendChild(boat6B);
      document.documentElement.style.setProperty('--y6B',`${4+rij*19.8}px` );
      document.documentElement.style.setProperty('--x6B',`${422-3*rij+22*col}px` );
    }
    if (coordinates[0]<coordinates[10]) {                                          /// boat=6 and orientation = down
      let rij=coordinates[0];
      let col=coordinates[1]
      var boat6B = document.createElement("div");
      boat6B.setAttribute('class','boat6DownB');
      document.body.appendChild(boat6B);
      document.documentElement.style.setProperty('--y6B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x6B',`${409-3*rij+22*col}px` );
    }
    if (coordinates[10]<coordinates[0]) {                                          /// boat=6 and orientation = up
      let rij=coordinates[10];
      let col=coordinates[11]
      var boat6B = document.createElement("div");
      boat6B.setAttribute('class','boat6DownB');
      document.body.appendChild(boat6B);
      document.documentElement.style.setProperty('--y6B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x6B',`${409-3*rij+22*col}px` );
    }
    placedBoatsB.push(boat6B);
  }
  if ((states[6]==0)&&(states[7]==0)&&(states[8]==0)&&(states[9]==0)&&(a41==0)) {
    a41+=1;

    if (coordinates[13]<coordinates[19]) {                                          /// boat=41 and orientation = right
      //alert("41right" + coordinates[13] + coordinates[19]+"rij"+coordinates[12]);
      let rij41=coordinates[12];
      let col41=coordinates[13]
      var boat41B = document.createElement("div");
      boat41B.setAttribute('class','boat41B');
      document.body.appendChild(boat41B);
      document.documentElement.style.setProperty('--y41B',`${4+rij41*20}px` );
      document.documentElement.style.setProperty('--x41B',`${422-3*rij41+21.7*col41}px` );
    }
    if (coordinates[19]<coordinates[13]) {                                          /// boat=41 and orientation = left
      let rij41=coordinates[18];
      let col41=coordinates[19]
      var boat41B = document.createElement("div");
      boat41B.setAttribute('class','boat41B');
      document.body.appendChild(boat41B);
      document.documentElement.style.setProperty('--y41B',`${4+rij41*20}px` );
      document.documentElement.style.setProperty('--x41B',`${422-3*rij41+21.7*col41}px` );
    }
    if (coordinates[12]<coordinates[18]) {                                          /// boat=41 and orientation = down
      let rij41=coordinates[12];
      let col41=coordinates[13]
      var boat41B = document.createElement("div");
      boat41B.setAttribute('class','boat41DownB');
      document.body.appendChild(boat41B);
      document.documentElement.style.setProperty('--y41B',`${18+rij41*19.5}px` );
      document.documentElement.style.setProperty('--x41B',`${410-3*rij41+21.7*col41}px` );
    }
    if (coordinates[18]<coordinates[12]) {                                          /// boat=41 and orientation = up
      let rij41=coordinates[18];
      let col41=coordinates[19]
      var boat41B = document.createElement("div");
      boat41B.setAttribute('class','boat41DownB');
      document.body.appendChild(boat41B);
      document.documentElement.style.setProperty('--y41B',`${18+rij41*19.5}px` );
      document.documentElement.style.setProperty('--x41B',`${410-3*rij41+21.7*col41}px` );
    }
    placedBoatsB.push(boat41B);
  }
  if ((states[10]==0)&&(states[11]==0)&&(states[12]==0)&&(states[13]==0)&&(a42==0)) {
    a42+=1;

    if (coordinates[21]<coordinates[27]) {                                          /// boat=42 and orientation = right
      //alert("41right" + coordinates[13] + coordinates[19]+"rij"+coordinates[12]);
      let rij=coordinates[20];
      let col=coordinates[21]
      var boat42B = document.createElement("div");
      boat42B.setAttribute('class','boat42B');
      document.body.appendChild(boat42B);
      document.documentElement.style.setProperty('--y42B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x42B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[27]<coordinates[21]) {                                          /// boat=42 and orientation = left
      let rij=coordinates[26];
      let col=coordinates[27]
      var boat42B = document.createElement("div");
      boat42B.setAttribute('class','boat42B');
      document.body.appendChild(boat42B);
      document.documentElement.style.setProperty('--y42B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x42B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[20]<coordinates[26]) {                                          /// boat=42 and orientation = down
      let rij=coordinates[20];
      let col=coordinates[21]
      var boat42B = document.createElement("div");
      boat42B.setAttribute('class','boat42DownB');
      document.body.appendChild(boat42B);
      document.documentElement.style.setProperty('--y42B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x42B',`${410-3*rij+21.7*col}px` );
    }
    if (coordinates[26]<coordinates[20]) {                                          /// boat=42 and orientation = up
      let rij=coordinates[26];
      let col=coordinates[27]
      var boat42B = document.createElement("div");
      boat42B.setAttribute('class','boat42DownB');
      document.body.appendChild(boat42B);
      document.documentElement.style.setProperty('--y42B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x42B',`${410-3*rij+21.7*col}px` );
    }
    placedBoatsB.push(boat42B);
  }
  if ((states[14]==0)&&(states[15]==0)&&(states[16]==0)&&(a31==0)) {
    a31+=1;

    if (coordinates[29]<coordinates[33]) {                                          /// boat=31 and orientation = right
      let rij=coordinates[28];
      let col=coordinates[29]
      var boat31B = document.createElement("div");
      boat31B.setAttribute('class','boat31B');
      document.body.appendChild(boat31B);
      document.documentElement.style.setProperty('--y31B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x31B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[33]<coordinates[29]) {                                          /// boat=31 and orientation = left
      let rij=coordinates[32];
      let col=coordinates[33]
      var boat31B = document.createElement("div");
      boat31B.setAttribute('class','boat31B');
      document.body.appendChild(boat31B);
      document.documentElement.style.setProperty('--y31B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x31B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[28]<coordinates[32]) {                                          /// boat=31 and orientation = down
      let rij=coordinates[28];
      let col=coordinates[29]
      var boat31B = document.createElement("div");
      boat31B.setAttribute('class','boat31DownB');
      document.body.appendChild(boat31B);
      document.documentElement.style.setProperty('--y31B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x31B',`${410-3*rij+21.7*col}px` );
    }
    if (coordinates[32]<coordinates[28]) {                                          /// boat=31 and orientation = up
      let rij=coordinates[32];
      let col=coordinates[33]
      var boat31B = document.createElement("div");
      boat31B.setAttribute('class','boat31DownB');
      document.body.appendChild(boat31B);
      document.documentElement.style.setProperty('--y31B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x31B',`${410-3*rij+21.7*col}px` );
    }
    placedBoatsB.push(boat31B);
  }
  if ((states[17]==0)&&(states[18]==0)&&(states[19]==0)&&(a32==0)) {
    a32+=1;

    if (coordinates[35]<coordinates[39]) {                                          /// boat=32 and orientation = right
      let rij=coordinates[34];
      let col=coordinates[35]
      var boat32B = document.createElement("div");
      boat32B.setAttribute('class','boat32B');
      document.body.appendChild(boat32B);
      document.documentElement.style.setProperty('--y32B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x32B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[39]<coordinates[35]) {                                          /// boat=32 and orientation = left
      let rij=coordinates[38];
      let col=coordinates[39]
      var boat32B = document.createElement("div");
      boat32B.setAttribute('class','boat32B');
      document.body.appendChild(boat32B);
      document.documentElement.style.setProperty('--y32B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x32B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[34]<coordinates[38]) {                                          /// boat=32 and orientation = down
      let rij=coordinates[34];
      let col=coordinates[35]
      var boat32B = document.createElement("div");
      boat32B.setAttribute('class','boat32DownB');
      document.body.appendChild(boat32B);
      document.documentElement.style.setProperty('--y32B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x32B',`${410-3*rij+21.7*col}px` );
    }
    if (coordinates[38]<coordinates[34]) {                                          /// boat=32 and orientation = up
      let rij=coordinates[38];
      let col=coordinates[39]
      var boat32B = document.createElement("div");
      boat32B.setAttribute('class','boat32DownB');
      document.body.appendChild(boat32B);
      document.documentElement.style.setProperty('--y32B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x32B',`${410-3*rij+21.7*col}px` );
    }
    placedBoatsB.push(boat32B);
  }
  if ((states[20]==0)&&(states[21]==0)&&(states[22]==0)&&(a33==0)) {
    a33+=1;

    if (coordinates[41]<coordinates[45]) {                                          /// boat=33 and orientation = right
      let rij=coordinates[40];
      let col=coordinates[41]
      var boat33B = document.createElement("div");
      boat33B.setAttribute('class','boat33B');
      document.body.appendChild(boat33B);
      document.documentElement.style.setProperty('--y33B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x33B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[45]<coordinates[41]) {                                          /// boat=33 and orientation = left
      let rij=coordinates[44];
      let col=coordinates[45]
      var boat33B = document.createElement("div");
      boat33B.setAttribute('class','boat33B');
      document.body.appendChild(boat33B);
      document.documentElement.style.setProperty('--y33B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x33B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[40]<coordinates[44]) {                                          /// boat=33 and orientation = down
      let rij=coordinates[40];
      let col=coordinates[41]
      var boat33B = document.createElement("div");
      boat33B.setAttribute('class','boat33DownB');
      document.body.appendChild(boat33B);
      document.documentElement.style.setProperty('--y33B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x33B',`${410-3*rij+21.7*col}px` );
    }
    if (coordinates[44]<coordinates[40]) {                                          /// boat=33 and orientation = up
      let rij=coordinates[44];
      let col=coordinates[45]
      var boat33B = document.createElement("div");
      boat33B.setAttribute('class','boat33DownB');
      document.body.appendChild(boat33B);
      document.documentElement.style.setProperty('--y33B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x33B',`${410-3*rij+21.7*col}px` );
    }
    placedBoatsB.push(boat33B);
  }
  if ((states[23]==0)&&(states[24]==0)&&(a21==0)) {
    a21+=1;

    if (coordinates[47]<coordinates[49]) {                                          /// boat=21 and orientation = right
      let rij=coordinates[46];
      let col=coordinates[47]
      var boat21B = document.createElement("div");
      boat21B.setAttribute('class','boat21B');
      document.body.appendChild(boat21B);
      document.documentElement.style.setProperty('--y21B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x21B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[49]<coordinates[47]) {                                          /// boat=21 and orientation = left
      let rij=coordinates[48];
      let col=coordinates[49]
      var boat21B = document.createElement("div");
      boat21B.setAttribute('class','boat21B');
      document.body.appendChild(boat21B);
      document.documentElement.style.setProperty('--y21B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x21B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[46]<coordinates[48]) {                                          /// boat=21 and orientation = down
      let rij=coordinates[46];
      let col=coordinates[47]
      var boat21B = document.createElement("div");
      boat21B.setAttribute('class','boat21DownB');
      document.body.appendChild(boat21B);
      document.documentElement.style.setProperty('--y21B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x21B',`${410-3*rij+22*col}px` );
    }
    if (coordinates[48]<coordinates[46]) {                                          /// boat=21 and orientation = up
      let rij=coordinates[48];
      let col=coordinates[49]
      var boat21B = document.createElement("div");
      boat21B.setAttribute('class','boat21DownB');
      document.body.appendChild(boat21B);
      document.documentElement.style.setProperty('--y21B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x21B',`${410-3*rij+22*col}px` );
    }
    placedBoatsB.push(boat21B);
  }
  if ((states[25]==0)&&(states[26]==0)&&(a22==0)) {
    a22+=1;

    if (coordinates[51]<coordinates[53]) {                                          /// boat=22 and orientation = right
      let rij=coordinates[50];
      let col=coordinates[51]
      var boat22B = document.createElement("div");
      boat22B.setAttribute('class','boat22B');
      document.body.appendChild(boat22B);
      document.documentElement.style.setProperty('--y22B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x22B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[53]<coordinates[51]) {                                          /// boat=22 and orientation = left
      let rij=coordinates[52];
      let col=coordinates[53]
      var boat22B = document.createElement("div");
      boat22B.setAttribute('class','boat22B');
      document.body.appendChild(boat22B);
      document.documentElement.style.setProperty('--y22B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x22B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[50]<coordinates[52]) {                                          /// boat=22 and orientation = down
      let rij=coordinates[50];
      let col=coordinates[51]
      var boat22B = document.createElement("div");
      boat22B.setAttribute('class','boat22DownB');
      document.body.appendChild(boat22B);
      document.documentElement.style.setProperty('--y22B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x22B',`${410-3*rij+22*col}px` );
    }
    if (coordinates[52]<coordinates[50]) {                                          /// boat=22 and orientation = up
      let rij=coordinates[52];
      let col=coordinates[53]
      var boat22B = document.createElement("div");
      boat22B.setAttribute('class','boat22DownB');
      document.body.appendChild(boat22B);
      document.documentElement.style.setProperty('--y22B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x22B',`${410-3*rij+22*col}px` );
    }
    placedBoatsB.push(boat22B);
  }
  if ((states[27]==0)&&(states[28]==0)&&(a23==0)) {
    a23+=1;

    if (coordinates[55]<coordinates[57]) {                                          /// boat=23 and orientation = right
      let rij=coordinates[54];
      let col=coordinates[55]
      var boat23B = document.createElement("div");
      boat23B.setAttribute('class','boat23B');
      document.body.appendChild(boat23B);
      document.documentElement.style.setProperty('--y23B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x23B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[57]<coordinates[55]) {                                          /// boat=23 and orientation = left
      let rij=coordinates[56];
      let col=coordinates[57]
      var boat23B = document.createElement("div");
      boat23B.setAttribute('class','boat23B');
      document.body.appendChild(boat23B);
      document.documentElement.style.setProperty('--y23B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x23B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[54]<coordinates[56]) {                                          /// boat=23 and orientation = down
      let rij=coordinates[54];
      let col=coordinates[55]
      var boat23B = document.createElement("div");
      boat23B.setAttribute('class','boat23DownB');
      document.body.appendChild(boat23B);
      document.documentElement.style.setProperty('--y23B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x23B',`${410-3*rij+22*col}px` );
    }
    if (coordinates[56]<coordinates[54]) {                                          /// boat=23 and orientation = up
      let rij=coordinates[56];
      let col=coordinates[57]
      var boat23B = document.createElement("div");
      boat23B.setAttribute('class','boat23DownB');
      document.body.appendChild(boat23B);
      document.documentElement.style.setProperty('--y23B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x23B',`${410-3*rij+22*col}px` );
    }
    placedBoatsB.push(boat23B);
  }
  if ((states[29]==0)&&(states[30]==0)&&(a24==0)) {
    a24+=1;

    if (coordinates[59]<coordinates[61]) {                                          /// boat=24 and orientation = right
      let rij=coordinates[58];
      let col=coordinates[59]
      var boat24B = document.createElement("div");
      boat24B.setAttribute('class','boat24B');
      document.body.appendChild(boat24B);
      document.documentElement.style.setProperty('--y24B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x24B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[61]<coordinates[59]) {                                          /// boat=24 and orientation = left
      let rij=coordinates[60];
      let col=coordinates[61]
      var boat24B = document.createElement("div");
      boat24B.setAttribute('class','boat24B');
      document.body.appendChild(boat24B);
      document.documentElement.style.setProperty('--y24B',`${4+rij*20}px` );
      document.documentElement.style.setProperty('--x24B',`${422-3*rij+21.7*col}px` );
    }
    if (coordinates[58]<coordinates[60]) {                                          /// boat=24 and orientation = down
      let rij=coordinates[58];
      let col=coordinates[59]
      var boat24B = document.createElement("div");
      boat24B.setAttribute('class','boat24DownB');
      document.body.appendChild(boat24B);
      document.documentElement.style.setProperty('--y24B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x24B',`${410-3*rij+22*col}px` );
    }
    if (coordinates[60]<coordinates[58]) {                                          /// boat=24 and orientation = up
      let rij=coordinates[60];
      let col=coordinates[61]
      var boat24B = document.createElement("div");
      boat24B.setAttribute('class','boat24DownB');
      document.body.appendChild(boat24B);
      document.documentElement.style.setProperty('--y24B',`${18+rij*19.5}px` );
      document.documentElement.style.setProperty('--x24B',`${410-3*rij+22*col}px` );
    }
    placedBoatsB.push(boat24B);
  }

}


function click_function(cell) {

  inputRow = cell.parentNode.rowIndex;
  inputCol = cell.cellIndex;

  checkHit(coordinatesB, statesB, inputRow, inputCol);
  drawBoard(B,"B",B_);
  checkSunkB(statesB,coordinatesB);

  opponent();
  checkHit(coordinatesA, statesA, oppRow, oppCol);
  drawBoard(A,"A",A_);

  if (checkWin(statesB)=="over") {
    click_button();
  }
  if (checkWin(statesA)=="over") {
    click_button();
  }
}


function click_button(button) { // button is the RESET button

  document.body.removeChild(boat6);
  document.body.removeChild(boat41);
  document.body.removeChild(boat42);
  document.body.removeChild(boat31);
  document.body.removeChild(boat32);
  document.body.removeChild(boat33);
  document.body.removeChild(boat21);
  document.body.removeChild(boat22);
  document.body.removeChild(boat23);
  document.body.removeChild(boat24);

   for (let i = 0; i < placedBoatsB.length; i++) {  //remove all placed boats on board B
     document.body.removeChild(placedBoatsB[i]);
   }
  placedBoatsB=[];

  a6=0;
  a41=0;
  a42=0;
  a31=0;
  a32=0;
  a33=0;
  a21=0;
  a22=0;
  a23=0;
  a24=0;

  seconds=0;
  minutes=0;
  hours=0;

  A_ = [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];

  B_ = [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];

  startOver(A);
  startOver(B);

  boatPlacement(coordinatesA);

  drawBoard(A,"A",A_);
  drawBoard(B,"B",B_);

}


setInterval(drawTime , 1000);
