console.log("loaded");
const canvas = document.getElementById("canvas");
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


const stars = [
	{
  	x: 20,
    y: 40,
    radius: 5,
    fillStyle: "blue",
    mass: 5,
    dS: 10,
    dL: 10,
  },
  {
  	x: 140,
    y: 100,
    radius: 5,
    fillStyle: "white",
    mass: 5,
    dS: 10,
    dL: 10,
  },
  {
  	x: 190,
    y: 60,
    radius: 5,
    fillStyle: "green",
    mass: 5,
    dS: 10,
    dL: 10,
  },
  {
  	x: 250,
    y: 30,
    radius: 5,
    fillStyle: "pink",
    mass: 5,
    dS: 10,
    dL: 10,
  },
];

function drawStars(stars) {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
  
	stars.forEach(star => {
  	ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = star.fillStyle;
    ctx.fill();
  	ctx.stroke();
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
    ctx.arc(mouseLocation.x, mouseLocation.y, 10, 0, 2 * Math.PI);
    ctx.stroke();    
  }
});


drawStars(stars);
