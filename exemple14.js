let sketch14 = function(p) {
    let textContent = `Le web interactif est un médium hybride qui emprunte certaines caractéristiques au cinéma, à la télévision, à la littérature, aux jeux vidéo, aux documentaires, et j'en passe... Il se distingue principalement par la nécessité d'impliquer activement le spectateur. Sa nature intrinsèquement liée à Internet le matérialise sur divers supports numériques tels que les ordinateurs, smartphones, tablettes ou tout autre écran connecté de toutes formes et tailles, ce qui rend compte d'une grande complexité dans sa mise en forme.\n\nChaque dispositif, avec ses spécificités techniques et son mode d'utilisation, influence l'expérience utilisateur et la réception des contenus. De plus, le contexte d'utilisation – que ce soit au travail, à la maison ou dans les transports – ainsi que la personnalité du spectateur – enfant, adolescent, adulte ou personne âgée – joue un rôle crucial dans l'interaction avec le web.\n\nDans cette étude, nous essaierons d'explorer les multiples facettes du web interactif, afin de mieux appréhender sa matière, ses défis et les opportunités qu'il nous offre pour communiquer sur l'étude anthropologique d'un chantier de restauration.`;

    let letters = [];
    let canvasWidth, canvasHeight;
    let fontSize = 22;
    let lineHeight;
    let maxLineWidth;
    let canvas;

    let totalLines = 0;

    p.setup = function() {
      // Définir les dimensions du canvas
      canvasWidth = p.windowWidth / 1.4;
      p.textFont('Arial');
      p.textSize(fontSize);
      p.textAlign(p.LEFT, p.TOP);
      lineHeight = fontSize * 1.2; // Ajustement du lineHeight pour une meilleure lisibilité
      maxLineWidth = canvasWidth - 40; // Marges de 20px de chaque côté

      // Compter le nombre de lignes nécessaires
      totalLines = countLines(textContent, maxLineWidth);
      
      // Calculer la hauteur du canvas en fonction du nombre de lignes
      canvasHeight = 20 + totalLines * lineHeight + 20; // Marges supérieure et inférieure

      // Créer le canvas avec les dimensions calculées
      canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.parent('exemple14Container');
      p.textSize(fontSize);
      // Fond transparent
      p.clear();
      
      // Préparer le texte et créer les lettres
      prepareText(textContent);
    };

    p.windowResized = function() {
      // Recalculer les dimensions du canvas
      canvasWidth = p.windowWidth / 1.5;
      maxLineWidth = canvasWidth - 40; // Marges de 20px de chaque côté
      fontSize = 22;
      lineHeight = fontSize * 1.2; // Ajustement du lineHeight
      // Recalculer le nombre de lignes nécessaires
      totalLines = countLines(textContent, maxLineWidth);
      
      // Recalculer la hauteur du canvas
      canvasHeight = 20 + totalLines * lineHeight + 20; // Marges supérieure et inférieure

      // Redimensionner le canvas
      p.resizeCanvas(canvasWidth, canvasHeight);
      p.clear();

      // Réinitialiser et recréer les lettres
      letters = [];
      prepareText(textContent);
    };

    p.draw = function() {
      p.clear(); // Effacer le canvas pour la transparence

      // Afficher chaque lettre
      for (let letter of letters) {
        letter.update();
        letter.display();
      }
    };

    // Fonction pour compter le nombre de lignes nécessaires
    function countLines(text, maxWidth) {
      let lines = 0;
      let paragraphs = text.split('\n');
      
      for (let para of paragraphs) {
        let words = para.split(/\s+/);
        let currentLineWidth = 0;
        
        for (let word of words) {
          let wordWidth = p.textWidth(word);
          let spaceWidth = p.textWidth(' ');
          
          if (currentLineWidth + wordWidth + spaceWidth > maxWidth) {
            lines++;
            currentLineWidth = wordWidth + spaceWidth;
          } else {
            currentLineWidth += wordWidth + spaceWidth;
          }
        }
        
        // Compter la dernière ligne du paragraphe
        if (currentLineWidth > 0) {
          lines++;
        }
        
        // Ajouter une ligne vide pour chaque saut de paragraphe sauf le dernier
        lines += 1;
      }
      
      return lines;
    }

    // Fonction pour préparer le texte et créer les lettres
    function prepareText(text) {
      let paragraphs = text.split('\n');
      let y = 20; // Marges supérieure
      let spaceWidth = p.textWidth(' ');
      
      for (let paraIndex = 0; paraIndex < paragraphs.length; paraIndex++) {
        let para = paragraphs[paraIndex];
        let words = para.split(/\s+/);
        let currentLine = [];
        let linesInPara = [];

        // Collecter les lignes d'un paragraphe
        let x = 20; // Marges gauche
        for (let word of words) {
          let wordWidth = p.textWidth(word);
          let spaceWidth = p.textWidth(' ');

          if (x + wordWidth + spaceWidth > maxLineWidth && currentLine.length > 0) {
            linesInPara.push([...currentLine]); // Ajouter une copie de currentLine
            currentLine = [];
            x = 20;
          }

          currentLine.push(word);
          x += wordWidth + spaceWidth;
        }

        // Ajouter la dernière ligne du paragraphe
        if (currentLine.length > 0) {
          linesInPara.push([...currentLine]);
        }

        // Justifier chaque ligne du paragraphe
        for (let lineIndex = 0; lineIndex < linesInPara.length; lineIndex++) {
          let isLastLine = (lineIndex === linesInPara.length - 1);
          justifyLine(linesInPara[lineIndex], y, isLastLine);
          y += lineHeight;

          // Ajouter un espace supplémentaire pour le saut de paragraphe, sauf après le dernier paragraphe
          if (isLastLine && paraIndex < paragraphs.length - 1) {
            y += lineHeight * 0.5;
          }
        }
      }
    }

    // Fonction pour justifier une ligne de mots
    function justifyLine(words, y, isLastLine) {
      if (words.length === 0) return;

      let x = 20; // Marges gauche

      if (isLastLine || words.length === 1) {
        // Alignement à gauche sans justification
        for (let word of words) {
          for (let char of word) {
            letters.push(new Letter(char, x, y));
            x += p.textWidth(char);
          }
          // Ajouter un espace entre les mots
          x += p.textWidth(' ');
        }
      } else {
        // Justification complète
        // Calculer la largeur totale des mots (sans les espaces)
        let totalWordsWidth = 0;
        for (let word of words) {
          totalWordsWidth += p.textWidth(word);
        }

        // Nombre d'espaces entre les mots
        let numGaps = words.length - 1;

        // Largeur totale des espaces normaux
        let spaceWidth = p.textWidth(' ');

        // Calculer l'espace supplémentaire à ajouter entre les mots pour justifier la ligne
        let extraSpace = numGaps > 0 ? (maxLineWidth - totalWordsWidth - (numGaps * spaceWidth)) / numGaps : 0;

        // Position initiale en X
        x = 20; // Marges gauche

        for (let i = 0; i < words.length; i++) {
          let word = words[i];
          for (let char of word) {
            letters.push(new Letter(char, x, y));
            x += p.textWidth(char);
          }
          if (i < words.length - 1) {
            x += spaceWidth + extraSpace;
          }
        }
      }
    }

    // Classe pour représenter chaque lettre
    class Letter {
      constructor(char, x, y) {
        this.char = char;
        this.originalPos = p.createVector(x, y);
        this.position = p.createVector(x, y/10);
        this.velocity = p.createVector(0, 0);
      }

      update() {
        // Calculer la position relative de la souris par rapport au canvas
        let mouseCanvasX = p.mouseX;
        let mouseCanvasY = p.mouseY;

        let mousePos = p.createVector(mouseCanvasX, mouseCanvasY);
        let distance = p5.Vector.dist(this.originalPos, mousePos);
        let influenceRadius = 80; // Rayon d'influence de la souris

        if (distance < influenceRadius) {
          let direction = p5.Vector.sub(this.originalPos, mousePos);
          direction.normalize();
          let force = p.map(distance, 0, influenceRadius, 15, 0); // Force en fonction de la distance
          let displacement = direction.mult(force);
          this.position = p5.Vector.add(this.originalPos, displacement);
        } else {
          // Retourner à la position originale avec une interpolation douce
          this.position.x = p.lerp(this.position.x, this.originalPos.x, 0.15);
          this.position.y = p.lerp(this.position.y, this.originalPos.y, 0.15);
        }
      }

      display() {
        p.fill(0);
        p.noStroke();
        p.text(this.char, this.position.x, this.position.y);
      }
    }
  };

  new p5(sketch14);
