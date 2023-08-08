public class WindowGraph extends PApplet {

  // float of values
  JSONArray data;

  String[] dates;
  float[] lightValues;
  float[] tempValues;
  float[] humidityValues;
  float[] air_quality;

  // classes of the gicentre
  Charts LightChart;
  Charts TempChart;
  Charts HumidityChart;
  Charts AirQualityChart;

  public void settings() {
    size(1800, 950);
  }

  public void setup() {
    
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
    LightChart = new Charts(this, lightValues, color(196, 203, 58), dates, 100);
    TempChart = new Charts(this, tempValues, color(75, 220, 209), dates, 40);
    HumidityChart = new Charts(this, humidityValues, color(75, 104, 249), dates, 100);
    AirQualityChart = new Charts(this, air_quality, color(143, 240, 245), dates, 400);
  }

  public void draw() {
    background(225);
    // draw charts
    fill(0);
    textSize(18);
    // put the titles in 4 corners
    text("Luz Solar", 50, 50);
    text("Temperatura", width/2 + 100, 50);
    text("Humedad", 50, height/2 + 100);
    text("Calidad del aire", width/2 + 100, height/2 + 100);
    // draw the charts
    LightChart.barChart.draw(10, 10, width/2 -10, height/2 -10);
    TempChart.barChart.draw(width/2 - 10, 10, width/2 -10, height/2- 10);
    HumidityChart.barChart.draw(10, height/2 -15, width/2 -15, height/2 - 15);
    AirQualityChart.barChart.draw(width/2 -15, height/2 - 15, width/2 -15, height/2 -15);

    // LightChart.barChart.draw(0,0, width/2, height/2);


    
  }

  public void createListOfDates() {
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

  public void createListOfLightValues() {
    lightValues = new float[data.size()];
    for (int i = 0; i < data.size(); i++) {
      JSONObject row = data.getJSONObject(i);
      lightValues[i] = row.getFloat("light");
    }
  }

  public void createListOfTempValues() {
    tempValues = new float[data.size()];
    for (int i = 0; i < data.size(); i++) {
      JSONObject row = data.getJSONObject(i);
      tempValues[i] = row.getFloat("temperature");
    }
  }

  public void createListOfHumidityValues() {
    humidityValues = new float[data.size()];
    for (int i = 0; i < data.size(); i++) {
      JSONObject row = data.getJSONObject(i);
      humidityValues[i] = row.getFloat("humidity");
    }
  }

  public void createListOfAirQualityValues() {
    air_quality = new float[data.size()];
    for (int i = 0; i < data.size(); i++) {
      JSONObject row = data.getJSONObject(i);
      air_quality[i] = row.getFloat("air_quality");
    }
  }
}