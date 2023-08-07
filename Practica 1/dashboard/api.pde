import java.net.*;
import java.io.*;

String apiUrl = "http://localhost:3000/weather";


JSONObject getDataFromAPI() {
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
    JSONObject data = parseJSONObject(response.toString());
    println(data);

    return data;
  } catch (IOException e) {
    e.printStackTrace();
    return null;
  }
}


void postDataToApi(float[] values){
  // format float[4] as JSON

  JSONObject data = new JSONObject();

  data.setFloat("temperature", values[0]);
  data.setFloat("humidity", values[1]);
  data.setFloat("air_quality", values[2]);
  data.setFloat("light", values[3]);

  // send data to API
  try {
    // Establecer la conexión HTTP
    URL url = new URL(apiUrl);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("POST");
    connection.setRequestProperty("Content-Type", "application/json");
    connection.setDoOutput(true);

    // Enviar el cuerpo JSON a la solicitud
    try(OutputStream os = connection.getOutputStream()) {
        byte[] input = data.toString().getBytes("utf-8");
        os.write(input, 0, input.length);
    }

     // Obtener la respuesta
    try(BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"))) {
        StringBuilder response = new StringBuilder();
        String responseLine;
        while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
        }
        println("Response Code: " + connection.getResponseCode());
        println("Response Data: " + response.toString());
    }
  } catch (Exception e) {
    e.printStackTrace();
  }  
  
}