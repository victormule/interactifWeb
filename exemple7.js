let sketch7 = function(p) {
  let friction = 1;
  let maxAge = 1000;
  let maxSpeed = 1;
  let particles = [];
  let magnet;
  let magnetStrength = 10;

  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
    cnv.parent('exemple7Container'); 
    magnet = p.createVector(200, 200);
  }

  p.draw = function() {
    p.background(220);
    p.fill(255,0,0);
    p.ellipse(magnet.x, magnet.y, 50, 50);
    p.fill(0);

    // Ajout de particules à chaque frame
    particles.push(new particle(200,200,p.random(-1,1),p.random(-1,1)));

    for (let ptc of particles) {
      ptc.draw();
      ptc.move();
      ptc.magnet();
    }

    // Filtrer les particules trop anciennes
    particles = particles.filter(ptc => ptc.age < maxAge);
  }

  p.mouseDragged = function() {
    magnet.x = p.mouseX;
    magnet.y = p.mouseY;
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
    // Redessiner l'arrière-plan après redimensionnement si nécessaire
    p.background(220);
  };

  // Définition de la classe particle
  function particle(x, y, xvel, yvel) {
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(xvel, yvel);
    this.age = 0;

    this.draw = function() {
      p.ellipse(this.pos.x, this.pos.y, 2, 2);
    }

    this.move = function() {
      this.pos.add(this.vel);
      this.vel.mult(friction);
      this.vel.limit(maxSpeed);
      this.age++;
    }

    this.magnet = function() {
      let magpull = p5.Vector.sub(magnet, this.pos);
      let dist = this.pos.dist(magnet);
      let magstrength = magnetStrength / dist;
      magpull.normalize().mult(magstrength);
      this.vel.add(magpull);
    }
  }

};

new p5(sketch7);
