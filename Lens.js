console.log("loaded");

// Math values and units etc

G = 6.6726*Math.pow(10, -11); // m^3/kg s^2
c = 2.99792458*Math.pow(10, 8); //m/s
Msun = 1.989*Math.pow(10, 30); //kg
parsec = 3.0856*Math.pow(10, 16); //m 
ly = 3.26; //parsec
sec2rad = Math.PI/(180*3600); //sec2rad
const npoints = 2000;


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

  ctx.beginPath();
  ctx.strokeStyle = "violet"
  ctx.lineWidth = 1;
  ctx.arc(450, 250, 100, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawCursor(ctx,x,y){
  var px, py, cx, cy;
  var dx, dy, dd, a, b, t, ta, tb;
  var radius = 20;

  px = canvas.width * .5;
  py = canvas.height * .5;
  cx = x;
  cy = y;

  dx = cx - px;
  dy = cy - py;
  dd = Math.sqrt(dx * dx + dy * dy);
  a = Math.asin(radius / dd);
  b = Math.atan2(dy, dx);
  
  t = b - a
  ta = { x:radius * Math.sin(t), y:radius * -Math.cos(t) };
  
  t = b + a
  tb = { x:radius * -Math.sin(t), y:radius * Math.cos(t) };

  // draw points
  ctx.beginPath();
  ctx.arc(cx + ta.x, cy + ta.y, 2, 0, Math.PI * 2);
  ctx.arc(cx + tb.x, cy + tb.y, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
  ctx.closePath();
  ctx.setLineDash([5, 5]);/*dashes are 5px and spaces are 3px*/

  // draw lines
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(cx + ta.x, cy + ta.y);
  ctx.moveTo(px, py);
  ctx.lineTo(cx + tb.x, cy + tb.y);
  ctx.strokeStyle = '#ccc';
  ctx.stroke();
  ctx.closePath();

  //continue lines
    x1 = cx + ta.x;
    y1 = cy + ta.y;
    r =  1000;
    theta = b-a;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + r * Math.cos(theta), y1 + r * Math.sin(theta));
    ctx.stroke();

    x2 = cx + tb.x;
    y2 = cy + tb.y;
    
    theta2 = a+b;
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + r * Math.cos(theta2), y2 + r * Math.sin(theta2));
    ctx.stroke();
  
  //lines in opposite direction

    r =  -1000;
    theta = b-a;
    ctx.moveTo(px, py);
    ctx.lineTo(x1 + r * Math.cos(theta), y1 + r * Math.sin(theta));
    ctx.stroke();

    theta2 = a+b;
    ctx.moveTo(px, py);
    ctx.lineTo(x2 + r * Math.cos(theta2), y2 + r * Math.sin(theta2));
    ctx.stroke();
   
//remove dash

    ctx.setLineDash([0, 0]);/*dashes are 5px and spaces are 3px*/




    //draw cursor circle
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();

//additional circle mirrorer
    /*ctx.beginPath();
    ctx.arc(900-x, 500-y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
*/




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
    drawCursor(ctx,mouseLocation.x, mouseLocation.y);

  	drawLens(ctx, mouseLocation.x, mouseLocation.y);
  } else{
    drawCursor(ctx,mouseLocation.x, mouseLocation.y);
  }

  function createTable() {
    const table = [];

    const numberOfCoords = 2000;
    let index = 0;

    // TODO: make table based on some funky maths!

    /*for (index;index<(2*npoints-1); index=index+2){
    table.push(index);
    console.log(table);
    return table;
  }*/

    while (index < 2*numberOfCoords-1) {
      table.push({
        x: Math.random() * 100,
        y: index,
      });

      index = index + 2;
    }
    console.log(table);
    return table; 
  }




  function drawCircle(ctx, x, y, radius, startAngle, endAngle) {
    return ctx.arc(x, y, radius, startAngle, endAngle);
  }

  function drawPolygon(ctx, x, y, coords) {
    ctx.beginPath();

    coords.forEach(function(coord, index) {
      if (index === 0) {
        ctx.moveTo(coord.x + x, coord.y + y);
      } else {
        ctx.lineTo(coord.x + x, coord.y + y);
      }
    });

    ctx.closePath();
  }



/*function drawThetaE(ctx){
  ctx.beginPath();
  ctx.strokeStyle = "violet"
  ctx.lineWidth = 1;
  ctx.arc(450, 250, 100, 0, 2 * Math.PI);
  //ctx.stroke();
}*/





function drawLens(ctx,x , y) {
  console.log("Found a star!");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";

    // this draws a circle
    //drawCircle(mouseLocation.x, mouseLocation.y, 40, 0, 2 * Math.PI);
    //ctx.arc(mouseLocation.x, mouseLocation.y, 40, 0, 2 * Math.PI);
    

    // TODO: build these coords
    //const polygonCoords = createTable();

    //drawPolygon(ctx, x, y, polygonCoords);

    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.stroke();
}


const value = document.getElementById("value")
value.textContent = `${mouseLocation.x}, ${Math.round(mouseLocation.y)}`;
console.log(mouseLocation.x,mouseLocation.y);

const value2 = document.getElementById("value2")
value2.textContent = Math.round(Math.sqrt(Math.pow(450-mouseLocation.x, 2)+Math.pow(250-mouseLocation.y, 2)));


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



