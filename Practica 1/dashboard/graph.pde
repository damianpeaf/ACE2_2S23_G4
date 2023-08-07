public class WindowGraph extends PApplet {
    public void settings() {
    size(400, 400);
  }

  public void setup() {
    background(220);
  }

  public void draw() {
    fill(0, 255, 0);
    ellipse(width / 2, height / 2, 100, 100);
  }
}