console.log("loaded");

const canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 675;

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
    ctx.arc(mouseLocation.x, mouseLocation.y, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = foundStar.colour;
    ctx.stroke();
   


  } 
const value = document.getElementById("value")
value.textContent = `${mouseLocation.x}, ${mouseLocation.y - 0.125}`;
//console.log(mouseLocation.x,mouseLocation.y);

});


drawStars(stars);
