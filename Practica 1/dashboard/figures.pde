void drawSun(float x, float y, float radius, int numRays) {
  float angleIncrement = TWO_PI / numRays;
  float rayLength = radius * 1.5;
  
  noFill();
  stroke(255, 204, 0);
  strokeWeight(3);

  beginShape();
  for (int i = 0; i < numRays; i++) {
    float angle = angleIncrement * i;
    float x1 = x + cos(angle) * radius;
    float y1 = y + sin(angle) * radius;
    float x2 = x + cos(angle) * rayLength;
    float y2 = y + sin(angle) * rayLength;
    vertex(x1, y1);
    vertex(x2, y2);
  }
  endShape(CLOSE);

  fill(255, 204, 0);
  noStroke();
  ellipse(x, y, radius * 2, radius * 2);
}


void setupFigures(){
  // Define the size of squares and the space between them
  int squareSize = 225;
  int squareGap = 20;
  
  // Calculate the position of the first square to center the 4 squares
  int x0 = (width - (squareSize * 2 + squareGap)) / 2;
  int y0 = (height - (squareSize * 2 + squareGap)) / 2;

  // Draw the 4 squares with the labels
  for (int row = 0; row < 2; row++) {
    for (int col = 0; col < 2; col++) {
      int x = x0 + col * (squareSize + squareGap);
      int y = y0 + row * (squareSize + squareGap);
      drawSquare(x, y, squareSize, items[row * 2 + col]);
    }
  }
}