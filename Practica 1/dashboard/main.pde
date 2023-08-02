import java.net.*;
import java.io.*;

String url = "https://pokeapi.co/api/v2/pokemon/ditto";

void setup() {
  size(400, 400);
  getDataFromAPI();
}

void getDataFromAPI() {
  try {
    URL apiUrl = new URL(url);
    URLConnection conn = apiUrl.openConnection();
    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String inputLine;
    StringBuilder response = new StringBuilder();

    while ((inputLine = in.readLine()) != null) {
      response.append(inputLine);
    }

    in.close();

    // Parse response as JSON
    JSONObject data = parseJSONObject(response.toString());
    println(data);
  } catch (IOException e) {
    e.printStackTrace();
  }
}
