void drawSun( float lightValue ) {

  float x = x0;
  float y = y0;

  pushMatrix();
  translate((x + squareSize / 2), (y + squareSize / 2));
  rotate(lightValue / 200.0);
  star(x, y, 60, 80, 20, lightValue); 
  popMatrix();

  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text("Luz:" + lightValue, x + 10, y + 10);
}

void star(float x, float y, float radius1, float radius2, int npoints, float lightValue) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;

  float colorValue = map(lightValue, 0, 100, 100, 255);
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


void drawCloud(Cloud cloud, float co2Value ) {
  // Simulate CO2 level (replace this with real CO2 data from a sensor)
  // float co2Level = map(map(mouseY, 0, height, 0, 1), 0, 1, 100, 1000);
  // The range of the co2Value is 250 to 300
  float co2Level = map(co2Value, 250, 300, 100, 1000);

  // Update cloud color based on CO2 level
  cloud.updateColor(co2Level);

  cloud.display();

  // Display CO2 level text
  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text("CO2 Level: " + nf(co2Level, 0, 0) + " ppm", 370, 370);
  // display C20 text in the middle of the cloud
  fill(255);
  textSize(30);
  text("CO2", 500, 530);
}


void drawHumidity( int numDrops, CircleDrop[] drops, Circle circle, float humidity ){


  // Simulate humidity level
  // float humidity = map(mouseY, 0, height, 0, 100);

  // evaluate the percentage of humidity to change the number of drops range of 5
  numDrops = (int) map(humidity, 0, 100, 0, 60);
  numDrops = constrain(numDrops, 0, 60);


  // Display squares
  circle.display();

  // Display drops
  for (int i = 0; i < numDrops; i++) {
    drops[i].fall();
    drops[i].display();
  }

  // Display humidity level text
  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text("Humedad: " + nf(humidity, 0, 1) + "%", 30, 370);
}

void drawTemperature( float temperature ){
  // Set thermometer dimensions
  float width = 30; 
  float height = 150;
  
  // Set thermometer coordinates
  float x = x0 + squareSize + squareGap;
  float y = y0;

  // float temperature = 0;

  float squareMid = (squareSize / 2);

  // float temperature = 0;

  // if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
  //   temperature = map(mouseY, y, y + height, -10, 40);
  // }

  color yellow = color(255, 255, 0);
  color red = color(255, 0, 0);

  // Draw thermometer
  fill(255);
  rect(x + squareMid - (width/2), y + squareMid, width, height);

  float temperatureHeight = map(temperature, -10, 40, 0, height);
  color temperatureColor = lerpColor(yellow, red, map(temperature, -10, 40, 0, 1));
  fill(temperatureColor);

  rect(x + squareMid - (width/2), y + squareMid + (height - temperatureHeight), width, temperatureHeight);

  // Draw the tube of the thermometer
  fill(150);
  float tubeWidth = 10.0;
  rect(x + squareMid - (tubeWidth/2), y + squareMid, tubeWidth, height);

  // Draw the temperature scale
  fill(0);
  textSize(12);
  textAlign(CENTER, BOTTOM);

  for (int i = -10; i <= 40; i += 10) {
    float tickHeight = map(i, -10, 40, 0, height);
    line(x + squareMid - (width/2) - 10, y + squareMid + (height - tickHeight), x + squareMid - (width/2), y + squareMid + (height - tickHeight));
    text(i, x + squareMid - (width/2) - 20, y + squareMid + (height - tickHeight));
  }

  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(temperature + "°C", x + 10, y + 10);
}

// void drawWind(){

// }


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