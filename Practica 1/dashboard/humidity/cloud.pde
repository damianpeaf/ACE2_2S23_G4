class Cloud {
  float x, y;    // Position
  float size;    // Cloud size
  color cloudColor; // Color of the cloud

  Cloud(float x, float y, float size) {
    this.x = x;
    this.y = y;
    this.size = size;
    cloudColor = color(255); // Start with a white cloud (default color)
  }

  void updateColor(float co2Level) {
    // Modify cloud color based on CO2 level
    float maxCO2Level = 1000; // Set the maximum CO2 level that makes the cloud fully black
    float ratio = co2Level / maxCO2Level;
    int r = 255 - (int) (ratio * 255);
    cloudColor = color(r);
  }

  void display() {
    noStroke();
    fill(cloudColor);
    ellipse(x, y, size, size);
    ellipse(x + size * 0.4, y - size * 0.3, size * 1.2, size);
    ellipse(x + size * 0.8, y, size, size);
    ellipse(x + size * 0.4, y + size * 0.3, size * 1.2, size);
  }
}


Cloud cloud ;

void setup() {
  size(800, 600);

  // Initialize clouds
  cloud = new Cloud(400, 300, 150);
  

}

void draw() {
  background(255);
  

  // Simulate CO2 level (replace this with real CO2 data from a sensor)
  // Change the range of the mouse from 250 to 300
  float co2Level = map(map(mouseY, 0, height, 0, 1), 0, 1, 100, 1000);

  // Update cloud color based on CO2 level
  cloud.updateColor(co2Level);

  cloud.display();

  // Display CO2 level text
  fill(0);
  textSize(30);
  text("CO2 Level: " + nf(co2Level, 0, 0) + " ppm", 50, 50);
  // display C20 text in the middle of the cloud
  fill(255);
  textSize(30);
  text("CO2", 430, 300);
}
