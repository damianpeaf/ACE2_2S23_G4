void drawSun() {

  float x = x0;
  float y = y0;

  pushMatrix();
  translate((x + squareSize / 2), (y + squareSize / 2));
  rotate(frameCount / 200.0);
  star(x, y, 60, 80, 20); 
  popMatrix();

  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text("Luz:" + frameCount, x + 10, y + 10);
}

void star(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;

  float colorValue = map(frameCount, 0, 100, 100, 255);
  fill(255, colorValue, 0); 
  stroke(0);

  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

void drawHumidity(){
  //  // intialize variables
  // int numDrops = 40; // Number of drops in the animation
  // CircleDrop[] drops = new CircleDrop[numDrops];

  // int numCircles = 1; // Number of circles in the animation
  // Circle[] circles = new Circle[numCircles];

  // // Initialize circles (similar to previous squares)
  // circles[0] = new Circle(x, y, diameter);

  // // Initialize drops (similar to previous squares)
  // for (int i = 0; i < numDrops; i++) {
  //   drops[i] = new CircleDrop(circles[i % numCircles]);
  // }

  // // Simulate humidity level
  // float humidity = map(mouseY, 0, height, 0, 100);

  // // evaluate the percentage of humidity to change the number of drops range of 5
  // if (humidity == 0) {
  //   numDrops = 0;
  // } else if (humidity > 0 && humidity <= 5) {
  //   numDrops = 2;
  // } else if (humidity > 5 && humidity <= 10) {
  //   numDrops = 4;
  // } else if (humidity > 10 && humidity <= 15) {
  //   numDrops = 6;
  // } else if (humidity > 15 && humidity <= 20) {
  //   numDrops = 8;
  // } else if (humidity > 20 && humidity <= 25) {
  //   numDrops = 10;
  // } else if (humidity > 25 && humidity <= 30) {
  //   numDrops = 11;
  // } else if (humidity > 30 && humidity <= 35) {
  //   numDrops = 12;
  // } else if (humidity > 35 && humidity <= 40) {
  //   numDrops = 13;
  // } else if (humidity > 40 && humidity <= 45) {
  //   numDrops = 14;
  // } else if (humidity > 45 && humidity <= 50) {
  //   numDrops = 15;
  // } else if (humidity > 50 && humidity <= 55) {
  //   numDrops = 17;
  // } else if (humidity > 55 && humidity <= 60) {
  //   numDrops = 19;
  // } else if (humidity > 60 && humidity <= 65) {
  //   numDrops = 21;
  // } else if (humidity > 65 && humidity <= 70) {
  //   numDrops = 25;
  // } else if (humidity > 70 && humidity <= 75) {
  //   numDrops = 29;
  // } else if (humidity > 75 && humidity <= 80) {
  //   numDrops = 30;
  // } else if (humidity > 80 && humidity <= 85) {
  //   numDrops = 32;
  // } else if (humidity > 85 && humidity <= 90) {
  //   numDrops = 35;
  // } else if (humidity > 90 && humidity <= 95) {
  //   numDrops = 38;
  // } else if (humidity > 95 && humidity <= 100) {
  //   numDrops = 40;
  // }

  // // Display squares
  // for (int i = 0; i < numCircles; i++) {
  //   circles[i].display();
  // }

  // // Display drops
  // for (int i = 0; i < numDrops; i++) {
  //   drops[i].fall();
  //   drops[i].display();
  // }
}

void drawTemperature(){
}

void drawWind(){

}


void setupFigures(){
  // Draw the 4 squares with the labels
  for (int row = 0; row < 2; row++) {
    for (int col = 0; col < 2; col++) {
      int x = x0 + col * (squareSize + squareGap);
      int y = y0 + row * (squareSize + squareGap);
      drawSquare(x, y, squareSize);
    }
  }
}