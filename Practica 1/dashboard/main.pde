int x0, y0, squareSize, squareGap;

void setup() {
  size(700, 700);
  surface.setTitle("Análisis metereológico");
  
  // Calculate the position of the first square to center the 4 squares
  squareSize = 320;
  squareGap = 20;

  x0 = (width - (squareSize * 2 + squareGap)) / 2;
  y0 = (height - (squareSize * 2 + squareGap)) / 2;
  
  setupApi();
}

void draw() {
  background(220);
  setupFigures();

  drawSun();
  drawHumidity();
  drawTemperature();
  drawWind();
}


void drawSquare(int x, int y, int size) {
  fill(255);
  rect(x, y, size, size);
}
