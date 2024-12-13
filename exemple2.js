let sketch2 = function(p) {
  let squareX, squareY;  // Position of square button
  let circleX, circleY;  // Position of circle button
  let squareSize = 90;   // Width/height of square
  let circleSize = 93;   // Diameter of circle

  let squareColor;
  let circleColor;
  let baseColor;

  let squareOver = false;
  let circleOver = false;

  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
    cnv.parent('exemple2Container'); // Lier le canvas au div #exemple2Container

    squareColor = p.color(0);
    circleColor = p.color(255);
    baseColor = p.color(102);

    circleX = p.width / 2 + circleSize / 2 + 10;
    circleY = p.height / 2;

    squareX = p.width / 2 - squareSize - 10;
    squareY = p.height / 2 - squareSize / 2;
  };

  p.draw = function() {
    update(p.mouseX, p.mouseY);

    p.noStroke();
    if (squareOver) {
      p.background(squareColor);
    } else if (circleOver) {
      p.background(circleColor);
    } else {
      p.background(baseColor);
    }

    p.stroke(255);
    p.fill(squareColor);
    p.square(squareX, squareY, squareSize);
    p.stroke(0);
    p.fill(circleColor);
    p.circle(circleX, circleY, circleSize);
  };

  function update(x, y) {
    if (overCircle(circleX, circleY, circleSize, x, y)) {
      circleOver = true;
      squareOver = false;
    } else if (overSquare(squareX, squareY, squareSize, x, y)) {
      squareOver = true;
      circleOver = false;
    } else {
      circleOver = squareOver = false;
    }
  }

  function overSquare(x, y, size, mx, my) {
    return (mx >= x && mx <= x + size && my >= y && my <= y + size);
  }

  function overCircle(cx, cy, diameter, mx, my) {
    const disX = cx - mx;
    const disY = cy - my;
    return (p.sqrt(p.sq(disX) + p.sq(disY)) < diameter / 2);
  }
  p.windowResized = function() {
    // Redimensionne le canvas
    p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
    // Redessine l'arrière-plan pour s'assurer que le canvas n'apparaît pas vide
  
  };
};

new p5(sketch2);
