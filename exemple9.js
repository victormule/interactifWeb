let sketch9 = function(p) {
  let squares = [];
  let cols = 3;
  let rows = 3;
  let colors = [];
  let margin = 40; // Marge entre les bords et les carrés
  let spacing = 10; // Espacement entre les carrés

  p.setup = function() {
    p.createCanvas(p.windowWidth / 3, p.windowHeight / 3, p.WEBGL).parent('exemple9Container');

    let w = (p.width - margin * 2 - spacing * (cols - 1)) / cols;
    let h = (p.height - margin * 2 - spacing * (rows - 1)) / rows;

    // Génération de couleurs aléatoires pour les carrés
    for (let i = 0; i < cols * rows; i++) {
      colors.push(p.color(p.random(255), p.random(255), p.random(255)));
    }

    // Création des formes
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * (w + spacing) - p.width / 2 + margin + w / 2;
        let y = j * (h + spacing) - p.height / 2 + margin + h / 2;

        if (i === 1 && j === 0) {
          // Remplacer le carré du haut milieu par un triangle
          squares.push(new Triangle(x, y, w, h, colors[i * rows + j]));
        } else {
          squares.push(new Square(x, y, w, h, colors[i * rows + j]));
        }
      }
    }
  };

  p.draw = function() {
    p.background(240);
    for (let square of squares) {
      square.update();
      square.display();
    }
  };

  class Square {
    constructor(x, y, w, h, col) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = col;
      this.angle = 0;
    }

    update() {
      // Vérification si la souris est au-dessus du carré
      let mouseXRel = p.mouseX - p.width / 2;
      let mouseYRel = p.mouseY - p.height / 2;
      if (
        mouseXRel > this.x - this.w / 2 &&
        mouseXRel < this.x + this.w / 2 &&
        mouseYRel > this.y - this.h / 2 &&
        mouseYRel < this.y + this.h / 2
      ) {
        this.angle = p.lerp(this.angle, p.PI / 1, 0.1); // Rotation progressive
      } else {
        this.angle = p.lerp(this.angle, 0, 0.1); // Retour à l'angle initial
      }
    }

    display() {
      p.push();
      p.translate(this.x, this.y);
      p.rotateY(this.angle);
      p.fill(this.color);
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(0, 0, this.w, this.h);
      p.pop();
    }
  }

  class Triangle {
    constructor(x, y, w, h, col) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = col;
      this.angle = 0;
    }

    update() {
      // Vérification si la souris est au-dessus du triangle
      let mouseXRel = p.mouseX - p.width / 2;
      let mouseYRel = p.mouseY - p.height / 2;
      if (
        mouseXRel > this.x - this.w / 2 &&
        mouseXRel < this.x + this.w / 2 &&
        mouseYRel > this.y - this.h / 2 &&
        mouseYRel < this.y + this.h / 2
      ) {
        this.angle = p.lerp(this.angle, p.PI / 1, 0.1); // Rotation progressive
      } else {
        this.angle = p.lerp(this.angle, 0, 0.1); // Retour à l'angle initial
      }
    }

    display() {
      p.push();
      p.translate(this.x, this.y);
      p.rotateY(this.angle);
      p.fill(this.color);
      p.noStroke();
      p.beginShape();
      p.vertex(-this.w / 2, this.h / 2, 0);
      p.vertex(this.w / 2, this.h / 2, 0);
      p.vertex(0, -this.h / 2, 0);
      p.endShape(p.CLOSE);
      p.pop();
    }
  }

};

new p5(sketch9);
