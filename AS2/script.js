let velX = 5;
let totalTrack = 0;
let done = false;
let caseWidth = VhToPx(20 * 1.5);
let totalScreens = Math.ceil(100/PxToVw(caseWidth)) + 1;
//let totalWidth = VhToVw(150);
let totalWidth = PxToVw(caseWidth * totalScreens);
console.log(totalWidth);
//legendary, mythic, epic, rare, common
//rarityChances = [35, 25, 20, 12, 8];
let rarityChances = [8, 12, 20, 25, 100];
let rarityColors = ["yellow", "red", "rgb(176, 95, 238)", "purple", "darkblue"];
let images = [["images/aadLegendary1.webp"],["images/aadMythic1.webp"],["images/aadEpic1.webp"],["images/aadRare1.webp"],["images/aadCommon.png"]];

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function VhToVw(vh)
{
    return (vh * window.innerHeight) / window.innerWidth;
}

function VwToPx(vw)
{
    return(window.innerWidth*vw/100);
}   
function VhToPx(vh)
{
    return(window.innerHeight*vh/100);
}   

function PxToVw(px)
{
    return(px*100/window.innerWidth)
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        totalTrack -= 1;
    } 
    else if (event.key === "ArrowRight") {
        totalTrack += 1;
    }
    
    else if (event.key === " ")
    {
        
        if(done)
        {
            document.querySelector(".displayCase").remove();
            console.log(done);
            done = false;
            velX = 15;
        }
    }
    console.log(event.key);
});

document.addEventListener("mousedown", (event) => {

    
    if(done)
    {
        document.querySelector(".displayCase").remove();
        console.log(done);
        done = false;
        velX = 15;
    }
});


function chooseImage(element)
{
    let random = getRandomInt(1,100);
    let rarity = "grey";
    let image = "";
    for (let i = 0; i <= rarityChances.length; i++)
    {
        if(random <= rarityChances[i])
        {
            element.innerHTML = "";
            rarity = rarityColors[i];
            if(images[i].length > 0)
            {
                imageSource = images[i][getRandomInt(0, images[i].length - 1)];
                const img = document.createElement("img");
                img.src = imageSource;
                img.classList = "caseImage";
                element.append(img);
                element.dataset.imageSrc = imageSource;
                element.dataset.rarityColor = rarity;
            }
            break;
        }
    }
    element.style.backgroundColor = rarity;
    
}

function setUp()
{   
    for(let i = 0; i < totalScreens; i++)
    {
        const casea = document.createElement("div");
        casea.classList = "case";
        const container = document.getElementById("caseContainer");
        container.append(casea);
        /*gap = (window.innerWidth / casea.offsetWidth) - Math.round(window.innerWidth / casea.offsetWidth);
        gap = casea.offsetWidth * gap/5;*/
        //casea.dataset.id = gap + casea.offsetWidth;
        casea.dataset.id = i;
        casea.dataset.imageSrc = "";
    }
    document.querySelectorAll(".case").forEach(element => {
        //element.dataset.left = String(((Number(element.dataset.id) * PxToVw(element.offsetWidth)) * PxToVw(caseWidth)));
        //+ PxToVw(element.offsetWidth/2));
        chooseImage(element);
        element.dataset.left = String(Number(element.dataset.id) * PxToVw(caseWidth));
        element.dataset.rarityColor = "";
    });
}

function frame()
{
    
    if(velX < 0)
    {
        velX = 5;
        done = true;
        console.log(done);
        velX = 0;
        const display = document.createElement("div");
        display.classList = "displayCase";
        const image = document.createElement("img");
        let imageSource = "";
        document.querySelectorAll(".case").forEach(element => {     
            let center = Number(element.dataset.left) + totalTrack;
            center = (center % totalWidth) - PxToVw(caseWidth/2);
            if(Math.abs(50 - (center)) < PxToVw(caseWidth/2))
            {
                imageSource = element.dataset.imageSrc;
                display.style.backgroundColor = element.dataset.rarityColor;
            }
        });
        image.src = imageSource;
        image.classList = "displayImage";
        display.append(image);
        const container = document.getElementById("screen");
        container.append(display);
    }
    if(!done)
    {
        totalTrack += velX;
        velX -= 0.05;
        console.log("=========================");
        console.log(PxToVw(caseWidth)/2);
        document.querySelectorAll(".case").forEach(element => {     
            let left = Number(element.dataset.left) + totalTrack;
            left = (left % totalWidth) - PxToVw(caseWidth/2);
            element.style.left = left + "vw";
            console.log(Math.abs(50 - (left)));
            if(left > 100 + PxToVw(caseWidth/2))
            {
                chooseImage(element);
            }
            /*let distance = 100-(Math.abs(50 - (element.dataset.left)));
            let va1 = 0.5*distance;
            let va2 = 0.25*distance;
            element.style.height = `calc(clamp(${va2}vh, ${va2}vw, ${va1}vh) - 6px)`*/
        });
        console.log("=========================");
    }
    requestAnimationFrame(frame);
}



setUp();
requestAnimationFrame(frame);