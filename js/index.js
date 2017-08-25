navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
 
$("#reset").click(function(){ 
  navigator.vibrate(50);
window.location.reload(false);
});

   var player="";  
var opponent="";
var temp;
var board = [ 
  ['_', '_', '_'  ],   
  ['_', '_', '_'  ],
  ['_', '_', '_'  ]
]; 

var numbers=[ 
  [1,2,3 ], 
  [4,5,6], 
  [7,8,9 ]
];  
document.addEventListener('keydown', function(event) {  
      if(event.keyCode == 97 || event.keyCode == 35) {$("#7").click();} 
    else if(event.keyCode == 98 || event.keyCode == 40) {$("#8").click();} 
    else if(event.keyCode == 99 || event.keyCode == 34) {$("#9").click();}
    else if(event.keyCode == 100 || event.keyCode == 37) {$("#4").click();}
    else if(event.keyCode == 101 || event.keyCode == 12) {$("#5").click();} 
    else if(event.keyCode == 102 || event.keyCode == 39) {$("#6").click();}
    else if(event.keyCode == 103 || event.keyCode == 36) {$("#1").click();}  
    else if(event.keyCode == 104 || event.keyCode == 38) {$("#2").click();}
    else if(event.keyCode == 105 || event.keyCode == 33) {$("#3").click();} 
  else if(event.keyCode == 88 || event.keyCode == 106) {$("#x").click();} 
  else if(event.keyCode == 79 || event.keyCode == 48 || event.keyCode == 96) 
  {$("#o").click();}   
  else if(event.keyCode == 13)  {$("#reset").click();}   
});



 
$("#1").click(function(){ 
  tictactoe(1);
});
$("#2").click(function(){ 
  tictactoe(2);
});
$("#3").click(function(){ 
  tictactoe(3);
});
$("#4").click(function(){ 
   tictactoe(4);
});
$("#5").click(function(){ 
   tictactoe(5);
});
$("#6").click(function(){  
   tictactoe(6);
});
$("#7").click(function(){ 
   tictactoe(7);
});
$("#8").click(function(){ 
   tictactoe(8);
});
$("#9").click(function(){ 
   tictactoe(9);
});  
$("#x").click(function(){ 
   navigator.vibrate(100);
  player='x';
  opponent='o';
    var x = document.getElementById('main');
        x.style.display = 'block';
   $("#start").hide();
  
});
$("#o").click(function(){
   navigator.vibrate(100);
  player='o';
  opponent='x';
   var x = document.getElementById('main');
        x.style.display = 'block';
   $("#start").hide();
  
  
  
  
  
    
     
        temp=player;
    player =opponent;
    opponent=temp;
     // console.log(player);   
      
      var t=findBestMove(board); 
     // console.log(t[0]+" "+t[1]); 
       
        
      temp=player; 
    player =opponent; 
    opponent=temp; 
         
       board[t[0]][t[1]]=opponent;
        $("#"+numbers[t[0]][t[1]]).html(opponent);   
    
});


function tictactoe(n)
{
  //  console.log(1);
   var  valx,valy,temp='';
//console.log(n);
   //console.log(board[1][1]);
 
  switch (n) {
    case 1:
       valx=0;valy=0;
        break;
    case 2:
       valx=0;valy=1;
        break;
    case 3:
        valx=0;valy=2;
        break;
    case 4:
         valx=1;valy=0;
        break;
    case 5:
        valx=1;valy=1;
        break;
    case 6:
       valx=1;valy=2;
      break;
       case 7:
       valx=2;valy=0;
      break;
       case 8:
        valx=2;valy=1;
      break;
       case 9:
        valx=2;valy=2;
      break;
} 
   
  if(board[valx][valy]==='_' && evaluate(board,0)===0)   
    {
     //  console.log(1);
      navigator.vibrate(100);
     board[valx][valy]=player; 
      $("#"+n).html(player);    
      if(isMovesLeft(board)){
      temp=player;
    player =opponent;
    opponent=temp;
     // console.log(player);   
      
      var t=findBestMove(board); 
     // console.log(t[0]+" "+t[1]); 
       
        
      temp=player; 
    player =opponent; 
    opponent=temp; 
         
       board[t[0]][t[1]]=opponent;
        $("#"+numbers[t[0]][t[1]]).html(opponent);    
      }
      // printboard(board);
      // console.log(1);
      checkgameend(board); 
      
    }
 
    return; 
}

function checkgameend(board)
{
 //console.log(evaluate(board,0));
    if(!isMovesLeft(board) && evaluate(board,0)===0){
       navigator.vibrate(500);
      var x = document.getElementById('footer');
        x.style.display = 'block';
  $("#result").html("Draw!");
          }
  else if(evaluate(board,0)===-10)
    { 
       navigator.vibrate(500);
         var x = document.getElementById('footer');
        x.style.display = 'block';
        $("#result").html("AI wins!");
    }
  //console.log(evaluate(board,0));
}

function printboard(board)
{
     for (var i = 0; i<3; i++)
    {
           console.log(board[i][0]+" "+board[i][1]+" "+board[i][2]);    
     }
}
 
function isMovesLeft(board)
{
    for (var i = 0; i<3; i++) 
        for (var j = 0; j<3; j++)
            if (board[i][j]=='_')
                return 1;
    return 0;
} 

function evaluate( b, depth)
{
    // Checking for Rows for X or O victory.
 // console.log(depth);
    for (var row = 0; row<3; row++)
    {
        if (b[row][0]===b[row][1] && b[row][1]===b[row][2])
        {
            if (b[row][0]===player)
                return 10-depth;
            else if (b[row][0]===opponent)
                return -10+depth;
        }
    }

    // Checking for Columns for X or O victory.
    for (var col = 0; col<3; col++)
    {
        if (b[0][col]===b[1][col] && b[1][col]===b[2][col])
        {
            if (b[0][col]===player)
                return 10-depth;

            else if (b[0][col]===opponent)
                return -10+depth;
        }
    }

    // Checking for Diagonals for X or O victory.
    if (b[0][0]===b[1][1] && b[1][1]===b[2][2])
    {
        if (b[0][0]===player)
            return 10-depth;
        else if (b[0][0]===opponent) 
            return -10+depth;
    } 
 
    if (b[0][2]===b[1][1] && b[1][1]===b[2][0])
    {
        if (b[0][2]===player)
            return 10-depth;
        else if (b[0][2]===opponent)
            return -10+depth; 
    }
    // Else if none of them have won then return 0
    return 0;
}

function findBestMove( board)
{
    var bestVal = -1000;
   
   var row = -1;
    var col = -1;

    // Traverse all cells, evalutae minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (var i = 0; i<3; i++)
    {
        for (var j = 0; j<3; j++)
        {
            // Check if celll is empty
            if (board[i][j]==='_')
            {
                // Make the move
                board[i][j] = player;

                // compute evaluation function for this
                // move.
                var moveVal = minimax(board, 0, 0);
                         //console.log(moveVal+" "+row+" "+col);
                // Undo the move
                board[i][j] = '_';

                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal)
                {
                    row = i;
                    col = j;
                    bestVal = moveVal;
                  
                } 
            }
        }
    }


var resultant=[row,col];
    return resultant;
}

function minimax( board,  depth, isMax)
{
    var score = evaluate(board,depth);
      // console.log(isMax);
    // If Maximizer has won the game return his/her
    // evaluated score
    if (score > 0)
        return score;
 if (score < 0)
        return score;
    // If Minimizer has won the game return his/her
    // evaluated score

    // If there are no more moves and no winner then
    // it is a tie
    if (isMovesLeft(board)===0)
        return 0;

    // If this maximizer's move
    if (isMax)
    {
        var best = -1000;

        // Traverse all cells
        for (var i = 0; i<3; i++)
        {
            for (var j = 0; j<3; j++)
            {
                // Check if cell is empty
                if (board[i][j]==='_')
                {
                    // Make the move
                    board[i][j] = player;

                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max( best,minimax(board, depth+1, !isMax) );

                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }

    // If this minimizer's move
    else
    {
        var best = 1000;

        // Traverse all cells
        for (var i = 0; i<3; i++)
        {
            for (var j = 0; j<3; j++)
            {
                // Check if cell is empty
                if (board[i][j]==='_')
                {
                    // Make the move
                    board[i][j] = opponent;

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best,minimax(board, depth+1, !isMax));

                    // Undo the move
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}

