// create a class that implements different types of barcharts
import org.gicentre.utils.stat.*; // For chart classes.

class Charts {
  BarChart barChart;
  float[] data;
  String[] xLabels;
  color barColor;
  int maxValue;

  Charts(PApplet parent, float[] data, color barColor, String[] xLabels, int maxValue) {
    this.barChart = new BarChart(parent);
    this.data = data;
    this.barColor = barColor;
    this.xLabels = xLabels;
    this.maxValue = maxValue;
    
    fill(0);

    // set data
    barChart.setData(data);
    barChart.setBarLabels(xLabels);

    // scaling
    barChart.setMinValue(0);
    barChart.setMaxValue(this.maxValue);
    barChart.setValueFormat("#.##");
    barChart.setBarColour(this.barColor);

    // show
    barChart.showValueAxis(true);
    barChart.showCategoryAxis(true);
  }
}