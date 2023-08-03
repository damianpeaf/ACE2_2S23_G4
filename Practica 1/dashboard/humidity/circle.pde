class Drop {
  float x, y;    // Position
  float size;    // Drop size
  float speed;   // Speed of the drop falling
  Circle circle; // Reference to the circle containing the drop

  Drop(Circle circle) {
    this.circle = circle;
    float angle = random(TWO_PI); // Random angle within the circle
    float radius = sqrt(random(1)) * (circle.diameter / 2); // Random radius within the circle
    x = circle.x + cos(angle) * radius;
    y = circle.y + sin(angle) * radius;
    size = random(5, 15);
    speed = random(1, 3);
  }

  void fall() {
    float angle = atan2(y - circle.y, x - circle.x); // Angle between drop and circle center
    float radius = dist(x, y, circle.x, circle.y); // Distance between drop and circle center
    float targetRadius = circle.diameter / 2; // Maximum distance (radius) to stay within the circle

    // Move the drop towards the circle center
    if (radius > targetRadius) {
      radius -= speed;
      x = circle.x + cos(angle) * radius;
      y = circle.y + sin(angle) * radius;
    }

    // If the drop goes outside the circle, reset its position to a random point inside the circle
    if (radius <= 0) {
      float newAngle = random(TWO_PI);
      float newRadius = sqrt(random(1)) * targetRadius;
      x = circle.x + cos(newAngle) * newRadius;
      y = circle.y + sin(newAngle) * newRadius;
    }
  }

  void display() {
    fill(0, 0, 255);
    ellipse(x, y, size, size);
  }
}


class Circle {
  float x, y;    // Position
  float diameter; // Circle diameter

  Circle(float x, float y, float diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
  }

  void display() {
    noFill();
    stroke(0);
    ellipse(x, y, diameter, diameter);
  }
}


// intialize variables
int numDrops = 40; // Number of drops in the animation
Drop[] drops = new Drop[numDrops];

int numCircles = 1; // Number of circles in the animation
Circle[] circles = new Circle[numCircles];

void setup() {
  size(800, 600);

  // Initialize circles (similar to previous squares)
  circles[0] = new Circle(200, 200, 150);

  // Initialize drops (similar to previous squares)
  for (int i = 0; i < numDrops; i++) {
    drops[i] = new Drop(circles[i % numCircles]);
  }
}

void draw() {
  background(255);

  // Simulate humidity level
  float humidity = map(mouseY, 0, height, 0, 100);

  // evaluate the percentage of humidity to change the number of drops range of 5
  if (humidity == 0) {
    numDrops = 0;
  } else if (humidity > 0 && humidity <= 5) {
    numDrops = 2;
  } else if (humidity > 5 && humidity <= 10) {
    numDrops = 4;
  } else if (humidity > 10 && humidity <= 15) {
    numDrops = 6;
  } else if (humidity > 15 && humidity <= 20) {
    numDrops = 8;
  } else if (humidity > 20 && humidity <= 25) {
    numDrops = 10;
  } else if (humidity > 25 && humidity <= 30) {
    numDrops = 11;
  } else if (humidity > 30 && humidity <= 35) {
    numDrops = 12;
  } else if (humidity > 35 && humidity <= 40) {
    numDrops = 13;
  } else if (humidity > 40 && humidity <= 45) {
    numDrops = 14;
  } else if (humidity > 45 && humidity <= 50) {
    numDrops = 15;
  } else if (humidity > 50 && humidity <= 55) {
    numDrops = 17;
  } else if (humidity > 55 && humidity <= 60) {
    numDrops = 19;
  } else if (humidity > 60 && humidity <= 65) {
    numDrops = 21;
  } else if (humidity > 65 && humidity <= 70) {
    numDrops = 25;
  } else if (humidity > 70 && humidity <= 75) {
    numDrops = 29;
  } else if (humidity > 75 && humidity <= 80) {
    numDrops = 30;
  } else if (humidity > 80 && humidity <= 85) {
    numDrops = 32;
  } else if (humidity > 85 && humidity <= 90) {
    numDrops = 35;
  } else if (humidity > 90 && humidity <= 95) {
    numDrops = 38;
  } else if (humidity > 95 && humidity <= 100) {
    numDrops = 40;
  }

  // Display squares
  for (int i = 0; i < numCircles; i++) {
    circles[i].display();
  }

  // Display drops
  for (int i = 0; i < numDrops; i++) {
    drops[i].fall();
    drops[i].display();
  }

  // Display humidity level text
  fill(0);
  textSize(30);
  text("Humedad: " + nf(humidity, 0, 1) + "%", 50, 260);
}
