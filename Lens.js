console.log("loaded");

// Math values and units etc

G = 6.6726*10^-11; // m^3/kg s^2
c = 2.99792458*10^8; //m/s
Msun = 1.989*10^30; //kg
parsec = 3.0856*10^16; //m
ly = 3.26; //parsec
sec2rad = Math.PI/(180*3600); //sec2rad


const canvas = document.getElementById("canvas");
function setUpCanvas(canvas){
canvas.width = 900;
canvas.height = 500;
canvas.style = "border:5px solid white;"
}
const ctx = canvas.getContext("2d");

function getMouseCoordinates(canvas, event) {
		const rect = canvas.getBoundingClientRect();
    return {
      	x: event.clientX - rect.left,
      	y: event.clientY - rect.top
    };
}

function isStarHere(stars, x, y) {
	return stars.find(function(star) {
    const minX = star.x - star.radius;
    const minY = star.y - star.radius;
    const maxX = star.x + star.radius;
    const maxY = star.y + star.radius;
    
    return x > minX && x < maxX && y > minY && y < maxY;
  });
}


function drawStars(stars) {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
  
	stars.forEach(star => {
  	ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = star.colour;
    ctx.fill();
  	//ctx.stroke();
  });
}

function drawCursor(ctx,x,y){

ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
}


function clearCanvas(canvas, ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousemove", function(event) {
	const mouseLocation = getMouseCoordinates(canvas, event);
  const foundStar = isStarHere(stars, mouseLocation.x, mouseLocation.y)
  
  clearCanvas(canvas, ctx);
	drawStars(stars);
  
  if (foundStar) {
  	console.log("Found a star!");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";
    ctx.arc(mouseLocation.x, mouseLocation.y, 40, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.stroke()


  } else{
    drawCursor(ctx,mouseLocation.x, mouseLocation.y);

  }
//const value = document.getElementById("value")
//value.textContent = `${mouseLocation.x}, ${mouseLocation.y - 0.125}`;
//console.log(mouseLocation.x,mouseLocation.y);




});
/*
const sourcePos = [

  {
    
    sourcexy: [mouseLocation_.x, mouseLocation_.y],
    mass: foundStar.mass,
    distLens: foundStar.dl,
}
  ];

b = (sourcexy[1]^2+source[2]^2)^(1/2);
//if b

ds = 1 * parsec * 10^9;
dl = distLens * parsec * 10^9;
u = 4 * Msun * Math.abs(ds-dl) * G * mass / (ds * dl * c * c);
t1 = (1 + (1 + 4 * u / (b * b))^(1/2))/2;
t2 = (1 - (1 + 4 * u / (b * b))^(1/2))/2;

image1 = t1 * sourcexy;
image2 = t2 * sourcexy;
images = join[image1, image2];
*/


setUpCanvas(canvas);
drawStars(stars);
