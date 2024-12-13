let sketch10 = function(p) {
  let maxSize = null;
  let circleSize = null;
  let circleColor; // Variable pour stocker la couleur du cercle

  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth/3, p.windowHeight/3);
    cnv.parent('exemple10Container');

    maxSize = p.min(p.windowWidth/3, p.windowHeight/3) * 0.75;
    circleSize = maxSize / 2;

    p.frameRate(30);
    circleColor = p.color(0); // Couleur initiale, par exemple noir
  };

  p.draw = function() {
    p.background("#eeeeee");

    p.fill(circleColor); // Appliquer la couleur au cercle
    p.noStroke(); // Optionnel : pas de contour
    p.circle(p.width / 2, p.height / 2, circleSize % maxSize);
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth/3, p.windowHeight/3);
    maxSize = p.min(p.windowWidth/3, p.windowHeight/3) * 0.75;
  };

  p.mouseWheel = function(event) {
    circleSize += event.delta;

    // Générer une nouvelle couleur aléatoire
    circleColor = p.color(p.random(255), p.random(255), p.random(255));
  };
};

new p5(sketch10);
