// size of this game
var SIZE = 4;
// set numbers
var B = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];
// boolian value that means the game is cleared
var GAME = false;
// the number of time that the numbers are moved
var moves = 0;
// timer
var time = 0;
// boolian value that means the timer starts
var timer_flag = false;
// set interval
var interval;

// reset timer
function reset(){
    if (timer_flag){
        start();
    }
    time = 0;
    document.getElementById("time").innerText = count_time(time);
}

// start timer
function start(){
    if (timer_flag == false){
        timer_flag = true;
        interval = setInterval("count_up()", 100);
    }else{
        timer_flag = false;
        clearInterval(interval);
    }
}

// add 1 to timer digits
function count_up(){
    time++;
    document.getElementById("time").innerText = count_time(time);
}

// make the timer digits 0:00.0
function count_time(n){
    var second = n / 10;
    var minute = Math.floor(second/60);
    var second = (second % 60).toFixed(1);
    if (second < 10) second = "0" + second;
    if (minute > 9) reset();
    return minute + ":" + second;
}

// swap two number images
function swap(a, b){
    var img1 = document.getElementById(a).src;
    var img2 = document.getElementById(b).src;
    var id1 = document.getElementById(a).id;
    var id2 = document.getElementById(b).id;
    document.getElementById(a).src = img2;
    document.getElementById(b).src = img1;
    document.getElementById(a).id = id2;
    document.getElementById(b).id = id1;
}

// check if the game is cleared
function scan_board(){
    var flag = true;
    if (moves == 1){
        start();
    }
    for (i = 0; i < SIZE; i++){
        for (j = 0; j < SIZE; j++){
            if (B[i][j] != (i*SIZE + j + 1) % SIZE**2){
                i += SIZE;
                j += SIZE;
                flag = false;
                GAME = false;
            }
        }
    }
    if (flag){
        GAME = true;
    }
}

// if the game cleared, disable click
function clear(){
    
    for (i = 0; i < SIZE*SIZE; i++){
        document.getElementById(i).removeAttribute("onclick");
    }
    start();
    
}

// count the number of time that the numbers are moved
function count_moves(){
    moves++;
    document.getElementById("moves").innerText = moves;
}

// move clicked number
function move_tile(n){
    var a, b, c, d;
    for (i = 0; i < SIZE; i++){
        for (j = 0; j < SIZE; j++){
            if (B[i][j] == 0){
                a = i;
                b = j;
            }
        }
    }
    for (i = 0; i < SIZE; i++){
        for (j = 0; j < SIZE; j++){
            if (B[i][j] == n){
                c = i;
                d = j;
            }
        }
    }
    if (a == c && b != d){
        count_moves();

        if (b < d){
            for (i = 0; i < d-b; i++){
                [B[a][b+i], B[a][b+i+1]] = [B[a][b+i+1], B[a][b+i]];
                swap(B[a][b+i], B[a][b+i+1]);
            }
        }else{
            for (i = 0; i < b-d; i++){
                [B[a][b-i], B[a][b-i-1]] = [B[a][b-i-1], B[a][b-i]];
                swap(B[a][b-i-1], B[a][b-i]);
            }
        }
    }else if (b == d && a != c){
        count_moves();
        if (a < c){
            for (i = 0; i < c-a; i++){
                [B[a+i][b], B[a+i+1][b]] = [B[a+i+1][b], B[a+i][b]];
                swap(B[a+i][b], B[a+i+1][b]);
            }
        }else{
            for (i = 0; i < a-c; i++){
                [B[a-i][b], B[a-i-1][b]] = [B[a-i-1][b], B[a-i][b]];
                swap(B[a-i-1][b], B[a-i][b]);
            }
        }
    }
    scan_board();
    if (GAME){
        clear();
    }
}

// shuffle numbers
function shuffle(){
    var a, b, c, d;

    GAME = false;

    while (moves < SIZE*SIZE*SIZE*SIZE){
        var n = Math.floor(Math.random()*(SIZE*SIZE-1))+1;
        for (i = 0; i < SIZE; i++){
            for (j = 0; j < SIZE; j++){
                if (B[i][j] == 0){
                    a = i;
                    b = j;
                }
            }
        }
        for (i = 0; i < SIZE; i++){
            for (j = 0; j < SIZE; j++){
                if (B[i][j] == n){
                    c = i;
                    d = j;
                }
            }
        }
        if (a == c || b == d){
            move_tile(n);
        }
    }

    for (i = 0; i < SIZE*SIZE; i++){
        document.getElementById(i).setAttribute('onclick', 'move_tile(this.id)');
    }

    moves = 0;
    document.getElementById("moves").innerText = 0;
    reset();
    
}
