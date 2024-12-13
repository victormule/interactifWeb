let sketch8 = function(p) {
  let button = false;
  let x = 50;
  let y = 50;
  let w = 100;
  let h = 75;

  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
    cnv.parent('exemple8Container'); 
  };

  p.draw = function() {
    // The button is pressed if (mouseX, mouseY) is inside the rectangle and mousePressed is true.
    if (p.mouseIsPressed) {
      button = true; 
    } else {
      button = false;
    }

    if (button) {
      p.background(p.color(p.random(200), 0, 0, p.random(200)));
      p.stroke(0);
    } else {
      p.background(50);
      p.stroke(255);
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
  };
};

new p5(sketch8);
