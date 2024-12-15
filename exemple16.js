let sketch16 = function(p) {
    let entete;
    let champ;
    let inconsolata;
    let diameter = 1;
    let maxDiameter = 500000;
    let vec = 1;
    let canvasWidth;
    let canvasHeight;
  
    p.preload = function() {
      inconsolata = p.loadFont('font/inconsolata.otf');
    };
  
    p.setup = function() {
      canvasWidth = p.windowWidth; // Utiliser p.windowWidth pour une réactivité
      canvasHeight = p.windowHeight;
  
      let cnv = p.createCanvas(canvasWidth / 3, canvasHeight / 3, p.WEBGL);
      cnv.parent('exemple16Container');
      p.textFont(inconsolata);
      p.textSize(p.width / 3);
      p.textAlign(p.CENTER, p.CENTER);
  
      // Créer le titre et le champ de saisie avec des IDs pour le CSS
      entete = p.createElement('h2', 'WHAT IS YOUR DREAM ?');
      entete.id('enteteTitre'); // Attribuer un ID pour le CSS
  
      champ = p.createInput();
      champ.id('champInput'); // Attribuer un ID pour le CSS
      champ.parent('exemple16Container');
      champ.attribute('placeholder', 'Entrez votre texte ici'); // Ajout du placeholder
      champ.changed(afficheTexte);
    };
  
    function afficheTexte() {
      // Cette fonction peut être modifiée selon vos besoins
      // Par exemple, ouvrir une nouvelle page ou afficher du texte dans le canvas
      // Pour l'instant, elle ne fait que rafraîchir le canvas
      p.background(0, 100, 255, 150);
      p.text(champ.value(), 0, 120);
    }
  
    p.draw = function() {
      p.background(0);
      diameter = maxDiameter / p.sin(p.frameCount / 300);
      let time = p.millis();
      p.rotateY(time / 100000);
      p.textSize(diameter / 20000);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(p.random(150, 255));
      p.text(champ.value(), 0, -125);
      p.fill(p.random(150, 255));
      p.text(-champ.value(), 0, 125, 0);
      
      let locX = p.mouseX - p.height / 2;
      let locY = p.mouseY - p.width / 2;
      
      p.ambientLight(10, 10, 10);
      p.pointLight(255, 255, 255, locX, locY, 50);
  
      // Exemple d'une sphère
      p.push();
      p.rotateZ(p.frameCount * 0.01);
      p.rotateX(p.frameCount * 0.01);
      p.rotateY(p.frameCount * 0.01);
      p.specularMaterial(255, 0, 0);
      p.sphere(60);
      p.pop();
      
      // Ajoutez les autres objets de manière similaire en préfixant avec `p.`
  
      // Contrôle de l'orbite
      p.orbitControl();
      
      p.normalMaterial();
      p.translate(0, 0, 0);
      let radius = p.width * 1.5;
      for (let i = 0; i <= 70; i++) {
        for (let j = 0; j <= 30; j++) {
          p.push();
          let a = (j / p.PI) * p.PI;
          let b = (i / p.PI) * p.PI;
          p.translate(
            p.sin(1 * a) * p.frameCount - radius * p.sin(b),
            (p.cos(b - radius / p.PI) * p.frameCount) / 1,
            p.cos(2 * a) * p.frameCount * p.sin(b - radius / a)
          );
          
          p.rotateX(p.frameCount * 0.01);
          p.rotateY(p.frameCount * 0.01);
          if (j % 2 === 0) {
            p.specularMaterial(250, 200, 60);
            p.sphere(10, 6, 2);
          } else {
            p.box(10);
          }
          p.pop();
        }
      }
    };
  
    p.windowResized = function() {
      canvasWidth = p.windowWidth;
      canvasHeight = p.windowHeight;
      p.resizeCanvas(canvasWidth / 3, canvasHeight / 3);
    };
    
    // Fonction polygon si nécessaire
    p.polygon = function(x, y, radius, npoints) {
      let angle = p.TWO_PI / npoints;
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += angle) {
        let sx = x + p.cos(a) * radius;
        let sy = y + p.sin(a) * radius;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
    };
  };
  
  // Créez une nouvelle instance avec sketch16
  new p5(sketch16);
  