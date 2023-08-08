import java.net.*;
import java.io.*;
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
    barChart.setBarGap(2);
    barChart.transposeAxes(true);

    // show
    barChart.showValueAxis(true);
    barChart.showCategoryAxis(true);

    // text
    textFont(createFont("Serif",14),14);
    // change color text
  }
}


String apiUrl = "http://localhost:3000/weather";
String[] dates;
JSONArray data;

// float of values
float[] lightValues;
float[] tempValues;
float[] humidityValues;
float[] air_quality;

// classes of the gicentre
Charts LightChart;
Charts TempChart;
Charts HumidityChart;
Charts AirQualityChart;


JSONArray getDataFromAPI() {
  try {
    URL url = new URL(apiUrl);
    URLConnection conn = url.openConnection();
    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String inputLine;
    StringBuilder response = new StringBuilder();

    while ((inputLine = in.readLine()) != null) {
      response.append(inputLine);
    }

    in.close();

    // Parse response as JSON
    JSONObject jsonData = parseJSONObject(response.toString());
    // println(jsonData.getJSONArray("data"));
    return jsonData.getJSONArray("data");
    
  } catch (IOException e) {
    e.printStackTrace();
    return null;
  }
}

void setup() {
  size(1800, 850);
  data = getDataFromAPI();
  // create list of dates
  createListOfDates();
  // create list of light values
  createListOfLightValues();
  // create list of temp values
  createListOfTempValues();
  // create list of humidity values
  createListOfHumidityValues();
  // create list of air quality values
  createListOfAirQualityValues();

  // create charts
  LightChart = new Charts(this, lightValues, color(255, 255, 0), dates, 100);
  TempChart = new Charts(this, tempValues, color(255, 0, 0), dates, 40);
  HumidityChart = new Charts(this, humidityValues, color(0, 255, 0), dates, 100);
  AirQualityChart = new Charts(this, air_quality, color(0, 0, 255), dates, 400);
  

}


void draw() {
  background(225);
  // draw charts
  fill(0);
  textSize(20);
  LightChart.barChart.draw(0,0, width/2, height/2);
  TempChart.barChart.draw(width/2,0, width/2, height/2);
  HumidityChart.barChart.draw(0,height/2, width/2, height/2);
  AirQualityChart.barChart.draw(width/2,height/2, width/2, height/2);
}



void createListOfDates() {
  dates = new String[data.size()];
  for (int i = 0; i < data.size(); i++) {
    JSONObject row = data.getJSONObject(i);
    String value = row.getString("date");
    // evaluate if the value has a space in it, add \n
    if (value.indexOf(" ") != -1) {
      // add \n
      value = value.substring(0, value.indexOf(" ")) + "\n" + value.substring(value.indexOf(" ") + 1);
    }
    dates[i] = value;
  }
}

void createListOfLightValues() {
  lightValues = new float[data.size()];
  for (int i = 0; i < data.size(); i++) {
    JSONObject row = data.getJSONObject(i);
    lightValues[i] = row.getFloat("light");
  }
}

void createListOfTempValues() {
  tempValues = new float[data.size()];
  for (int i = 0; i < data.size(); i++) {
    JSONObject row = data.getJSONObject(i);
    tempValues[i] = row.getFloat("temperature");
  }
}

void createListOfHumidityValues() {
  humidityValues = new float[data.size()];
  for (int i = 0; i < data.size(); i++) {
    JSONObject row = data.getJSONObject(i);
    humidityValues[i] = row.getFloat("humidity");
  }
}

void createListOfAirQualityValues() {
  air_quality = new float[data.size()];
  for (int i = 0; i < data.size(); i++) {
    JSONObject row = data.getJSONObject(i);
    air_quality[i] = row.getFloat("air_quality");
  }
}