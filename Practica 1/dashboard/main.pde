import java.net.*;
import java.io.*;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisShardInfo;

String url = "https://pokeapi.co/api/v2/pokemon/ditto";

void setup() {
  // connect to redis
  JedisShardInfo shardInfo = new JedisShardInfo("redis-12048.c1.us-east1-2.gce.cloud.redislabs.com", 12048);
  shardInfo.setPassword("7A82y2At236JpCJoLb6nUNmeUJAp15On");

  size(400, 400);
  getDataFromAPI();
  getDataFromRedis(shardInfo);
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
void getDataFromRedis( JedisShardInfo shardInfo ) {
  // write and get 
  Jedis jedis = new Jedis(shardInfo);
  jedis.set("mykey", "myvalue");
  String value = jedis.get("mykey");
  println(value);
}