int x0, y0, squareSize, squareGap;

// intialize variables
int numDrops = 60; // Number of drops in the animation
CircleDrop[] drops = new CircleDrop[numDrops];

// Initialize circles (similar to previous squares)
Circle circle;

// Initialiize cloud
Cloud cloud ;


void setup() {
  size(700, 700);
  surface.setTitle("Análisis metereológico");
  
  // Calculate the position of the first square to center the 4 squares
  squareSize = 320;
  squareGap = 20;

  x0 = (width - (squareSize * 2 + squareGap)) / 2;
  y0 = (height - (squareSize * 2 + squareGap)) / 2;
  
  setupApi();

  // setup humidity
  circle= new Circle(185, 530, 200);
  // Initialize clouds
  cloud = new Cloud(470, 530, 130);

  // Initialize drops (similar to previous squares)
  for (int i = 0; i < numDrops; i++) {
    drops[i] = new CircleDrop(circle);
  }
}

void draw() {
  background(220);
  setupFigures();

  drawSun();
  drawHumidity( numDrops, drops, circle  );
  drawTemperature();
  drawWind();
  drawCloud(cloud);
}


void drawSquare(int x, int y, int size) {
  fill(255);
  rect(x, y, size, size);
}
