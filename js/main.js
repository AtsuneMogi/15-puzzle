let SIZE = 4;

let img = document.getElementById("image_place");
let idx = 0;

function shuffle(){
    idx++;
    if (idx > 15){
        idx = 0;
    }
                
    img.src = "numbers/" + idx + ".png";
}

function display_images(){
    pass
}
