class Drop {
  float x, y;    // Position
  float size;    // Drop size
  float speed;   // Speed of the drop falling
  Square square; // Reference to the square containing the drop

  Drop(Square square) {
    this.square = square;
    x = random(square.x, square.x + square.size);
    y = random(square.y, square.y + square.size); // any position inside the square
    // y = square.y; // top of the square
    size = random(5, 15);
    speed = random(1, 3);
  }

  void fall() { // Move the drop down
    y += speed;
    if (y > square.y + square.size) { // If the drop is below the square
      // y = square.y; // Reset the drop to the top of the square
      y = random(square.y, square.y + square.size); 
    }
  }

  void display() { // Display the drop
    fill(0, 0, 255);
    ellipse(x, y, size, size);
  }
}



class Square {
  float x, y;    // Position
  float size;    // Square size

  Square(float x, float y, float size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  void display() {
    noFill();
    stroke(0);
    rect(x, y, size, size);
  }
}

// intialize variables
int numDrops = 40; // Number of drops in the animation
Drop[] drops = new Drop[numDrops];

int numSquares = 1; // Number of squares in the animation
Square[] squares = new Square[numSquares];

void setup() {
  size(800, 600);

  // Initialize squares
  squares[0] = new Square(50, 50, 150);


  // Initialize drops
  for (int i = 0; i < numDrops; i++) {
    drops[i] = new Drop(squares[i % numSquares]);
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
  for (int i = 0; i < numSquares; i++) {
    squares[i].display();
  }

  // Display drops
  for (int i = 0; i < numDrops; i++) {
    drops[i].fall();
    drops[i].display();
  }

  // Display humidity level text
  fill(0);
  textSize(30);
  text("Humedad: " + nf(humidity, 0, 1) + "%", 50, 230);
}