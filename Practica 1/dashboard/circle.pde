class CircleDrop {
  float x, y;    // Position
  float size;    // CircleDrop size
  float speed;   // Speed of the drop falling
  Circle circle; // Reference to the circle containing the drop

  CircleDrop(Circle circle) {
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