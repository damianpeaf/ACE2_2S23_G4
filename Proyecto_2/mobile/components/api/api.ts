
interface Body {
  path : string;
  status: string;
}


async function sendRequest(body:Body) {
  try {

    const response = await fetch(`https://ace2-g4-server-production.up.railway.app/${body.path}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: body.status})
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
      path: 'fanOff',
      status:"0"
    })
  } else if (status == "vel_1") {
    await sendRequest({
      path: 'fanLow',
      status: "1"
    })
  } else if (status == "vel_2") {
    await sendRequest({
      path: 'fanHigh',
      status: "2  "
    })
  }

}