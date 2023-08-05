import processing.serial.*;

int x0, y0, squareSize, squareGap;

// intialize variables
int numDrops = 60; // Number of drops in the animation
CircleDrop[] drops = new CircleDrop[numDrops];

// Initialize circles (similar to previous squares)
Circle circle;

// Initialiize cloud
Cloud cloud ;

// Initialize port
processing.serial.Serial arduinoPort;

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
  
  // Change the port name to match your Arduino board's serial port
  String portName = "COM4"; // On Windows, it will be something like "COM3" or "COM4"
  // For Mac or Linux, it will look like "/dev/tty.usbmodemXXXX"
  
  arduinoPort = new processing.serial.Serial(this, portName, 9600);
}

void draw() {
  String data;
  String[] splitValues; 
  float[] floatValues = new float[4];
  // read from serial port
  if (arduinoPort.available() > 0) {
    data = arduinoPort.readStringUntil('\n');
    if (data != null) {
      // Convert the received data to a usable format (e.g., int)
      // int sensorValue = Integer.parseInt(data.trim());
      
      // print data
      println(data); // 25.30;70.00;345;823
      splitValues = split(data, ';');
      // parse data
      for (int i = 0; i < splitValues.length; i++) {
        floatValues[i] = Float.parseFloat(splitValues[i]);
      }
    }
  }
  
  background(220);
  setupFigures();

  drawTemperature( floatValues[0] );
  drawHumidity( numDrops, drops, circle, floatValues[1]  );
  drawCloud(cloud, floatValues[2]);
  drawSun( floatValues[3] );
  // drawWind();
}


void drawSquare(int x, int y, int size) {
  fill(255);
  rect(x, y, size, size);
}
