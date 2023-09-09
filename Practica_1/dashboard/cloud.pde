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