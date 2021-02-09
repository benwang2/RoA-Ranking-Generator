var canvas, ctx;
var characters = ["zetterburn","orcane","forsburn","etalus","ori","clairen","elliana","wrastor","kragg","maypul","absa","ranno","sylvanos","shovel knight"]
var charicons, charicons2;
window.onload = function(){
    canvas = document.getElementById("pr-canvas")
    if (canvas.getContext){
        ctx = canvas.getContext("2d");
        {
            var template = new Image();
            template.onload = function () {
                ctx.drawImage(template, 0, 0);
            };
            template.src = "assets/template_watermarked.png"
        }
    }
    charicons = new Image();
    charicons.src = "assets/charicons.png"
    charicons2 = new Image();
    charicons2.src = "assets/charicons2.png"
}

var cmatrix = {}
{
    fetch('https://raw.githubusercontent.com/benwang2/pr-generator/main/assets/cmatrix.csv')
    .then(response => response.text())
    .then(data => {
        temp = data.split("\n");
        while (temp.length > 0){
            let cdata = temp[0].split(",");
            pixels = []
            char = cdata.shift()
            let [width, height] = [cdata.shift(), cdata.shift()]
            for (let x = 0; x < width; x++){
                pixels[x] = []
                for (let y = 0; y < height; y++){
                    pixels[x][y] = cdata.shift()
                }
            }
            cmatrix[char] = pixels
            temp.shift()
        }
        console.log("Font matrix loaded")
    });
}

function cleanText(text){
    text = text.toUpperCase()
    for (let i = 0; i < text.length; i++){
        if (cmatrix[text.charAt(i)] == undefined){
            text = text.replace(text.charAt(i),"")
        }
    }
    return text
}

function drawCharacter(x, y, char){
    let cdata = cmatrix[char]
    for (let col = 0; col < cmatrix[char].length; col++){
        for (let row = 0; row < cmatrix[char][0].length; row++){
            ctx.fillStyle = cdata[col][row] == 0 ? "rgba(0,0,0,0)" : (cdata[col][row] == 1 ? "rgba(0,0,0,255)" : "rgba(255,255,255,255)")
            ctx.fillRect(x+(col*4), y+(row*4), 4, 4)
        }
    }
    return char != " " ? 4*(cmatrix[char].length-1) : 8
}

function writeText(x, y, text){
    text = cleanText(text);
    let offset = 0;
    for (let i = 0; i < text.length; i++){
        let char = text[i]
        offset += drawCharacter(x+offset, y, char);
    }
}

function setLeaderboardTitle(text){
    writeText(166, 31, text);
}

function setCellNameText(cell, text){
    writeText(166, 79+(48 * cell), text);
}

function setCellMain(cell, main){
    main = main.toLowerCase()
    if (characters.includes(main)){
        let index = characters.indexOf(main);
        let offset = index*36;
        ctx.drawImage(charicons, 0, offset, 92, 36, 658, 83+(48*cell), 92, 36)
    }
}

function setCellSecondary(cell, main){
    main = main.toLowerCase()
    if (characters.includes(main)){
        let index = characters.indexOf(main);
        let offset = index*36;
        ctx.drawImage(charicons2, 0, offset, 92, 36, 762, 83+(48*cell), 92, 36);
    }
}

function generatePRImage(){
    let rows = document.getElementsByClassName("row-base")
    setLeaderboardTitle(document.getElementById("pr-title").value)
    if (rows.length > 1){ // we just need to ignore the first row since it's a template
        for (let i = 1; i < rows.length; i++){
            setCellNameText(i-1, document.getElementById("row-name-"+i).value)
            let main = document.getElementById("row-main-"+i)
            setCellMain(i-1, main.options[main.selectedIndex].text)
            let secondary = document.getElementById("row-secondary-"+i)
            setCellSecondary(i-1, secondary.options[secondary.selectedIndex].text)
        }
    }
}
