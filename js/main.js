var SIZE = 4;
var B = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];


var img_1_value, img_2_value;
var a, b;

function swap(a, b){
    img_1_value = document.getElementById(a).src;
    img_2_value = document.getElementById(b).src;

    document.getElementById(a).src = img_2_value;
    document.getElementById(b).src = img_1_value;
    console.log(B);
}


function move_tile(n){

    var a = 0;
    var b = 0;
    var c = 0; 
    var d = 0;
    
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
                swap(B[a][b-i], B[a][b-i-1]);
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
                swap(B[a-i][b], B[a-i-1][b]);
            }
        }
    }
}


function shuffle(){
    pass
}
