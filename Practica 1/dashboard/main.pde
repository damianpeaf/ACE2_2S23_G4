String[] items = {
  "Temperatura",
  "Luz",
  "Aire",
  "Humedad",
};

void setup() {
  size(500, 500);
  background(220);

  setupFigures();
  setupApi();
}

void drawSquare(int x, int y, int size, String label) {
  // Fill the square with white color
  fill(255);
  rect(x, y, size, size);

  // Draw the figure in the center of the square
  fill(0);
  ellipse(x + size / 2, y + size / 2, size * 0.8, size * 0.8);

  // Draw the label
  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(label + ":", x + 10, y + 10);
}
