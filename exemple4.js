let sketch4 = function(p) {
  let circleX;
  let circleY;
  let circleRadius;
  let circleMaximumRadius;
  let circleColor;
  let score = 0;
  let highScore;

  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth / 3, p.windowHeight / 3);
    cnv.parent('exemple4Container'); // Lier le canvas au div #exemple3Container
    p.colorMode(p.HSB);
    p.noStroke();
    p.ellipseMode(p.RADIUS);
    p.textSize(36);

    // Get the last saved high score
    highScore = p.getItem('high score');

    // If no score was saved, start with 0
    if (highScore === null) {
      highScore = 0;
    }
  }

  p.draw = function() {
    p.background(20);

    // If the circle has not shrunk completely
    if (circleRadius > 0) {
      // Draw the circle
      p.fill(circleColor);
      p.circle(circleX, circleY, circleRadius);
      p.describeElement('Circle', 'Randomly colored shrinking circle');

      // Shrink it
      circleRadius -= 1;

      // Show the score
      p.textAlign(p.RIGHT, p.TOP);
      p.fill(220);
      p.text(score, p.width - 20, 20);
      p.describeElement('Score', `Text with current score: ${score}`);
    } else {
      // Otherwise show the start/end screen
      endGame();
    }
  }

  function startGame() {
    // Reset the score to 0
    score = 0;

    // Start with the circle's radius maximum at half the minimum canvas dimension
    circleMaximumRadius = p.min(p.height / 2, p.width / 2);
    resetCircle();
  }

  function endGame() {
    // Pause the sketch
    p.noLoop();

    // Store the new high score
    highScore = p.max(highScore, score);
    p.storeItem('high score', highScore);

    p.textAlign(p.CENTER, p.CENTER);
    p.fill(220);
    let startText = `Circle Clicker
Click the circle before it gets too small
Score: ${score}
High score: ${highScore}
Click to play`;
    p.text(startText, 0, 0, p.width, p.height);
    p.describeElement('Start text', `Text reading, "${startText}"`);
  }

  function resetCircle() {
    // Start with the circle's radius at its maximum value
    circleRadius = circleMaximumRadius;
    circleX = p.random(circleRadius, p.width - circleRadius);
    circleY = p.random(circleRadius, p.height - circleRadius);
    circleColor = p.color(p.random(240, 360), p.random(40, 80), p.random(50, 90));
  }

  p.mousePressed = function() {
    // If the game is unpaused
    if (p.isLooping() === true) {
      // Check how far the mouse is from the circle
      let distanceToCircle = p.dist(p.mouseX, p.mouseY, circleX, circleY);

      // If the mouse is on the circle
      if (distanceToCircle < circleRadius) {
        // Decrease the maximum radius, but not below 15
        circleMaximumRadius = p.max(circleMaximumRadius - 1, 15);
        resetCircle();

        // Give the player a point
        score += 1;
      }
    } else {
      // Start and unpause the game
      startGame();
      p.loop();
    }
  }
  p.windowResized = function() {
    // Redimensionne le canvas
    p.resizeCanvas(p.windowWidth / 3, p.windowHeight / 3);
    // Redessine l'arrière-plan pour s'assurer que le canvas n'apparaît pas vide
  
  };
};

new p5(sketch4);
