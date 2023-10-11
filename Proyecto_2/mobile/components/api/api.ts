
interface Body {
  path : string;
}


async function sendRequest(body:Body) {
  try {

    const response = await fetch(`https://ace2-g4-server-production.up.railway.app/${body.path}`, {
      method: 'GET'
    });

    const data = await response.json();
    console.log(data);

  } catch (error) { 
    console.log(error);
  }
}


// Fan function
export async function FanRequest( status: string) {

  if (status == "off" ){
    await sendRequest({
      path: 'fanOff'
    })
  } else if (status == "vel_1") {
    await sendRequest({
      path: 'fanLow'
    })
  } else if (status == "vel_2") {
    await sendRequest({
      path: 'fanHigh'
    })
  }

}


// Light function
export async function LightRequest( status: boolean) {

  if (status){
    await sendRequest({
      path: 'ledOn'
    })
  } else {
    await sendRequest({
      path: 'ledOff'
    })
  }

}

// Door function
export async function DoorRequest( status: boolean) {

  if (status){
    await sendRequest({
      path: 'servoOpen'
    })
  } else {
    await sendRequest({
      path: 'servoClose'
    })
  }

}