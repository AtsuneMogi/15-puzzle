var SIZE = 4;
var B = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];
var GAME = false;

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


function scan_board(){

    var flag = true; 

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


function clear(){
    
    for (i = 0; i < SIZE*SIZE; i++){
        document.getElementById(i).removeAttribute("onclick");
    }
}


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


function shuffle(){
    var a, b, c, d;
    var cnt = 0;

    GAME = false;

    while (cnt < 100){
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
            cnt++;
        }
    }

    for (i = 0; i < SIZE*SIZE; i++){
        document.getElementById(i).setAttribute('onclick', 'move_tile(this.id)');
    }
}
