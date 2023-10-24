
import { Toast } from 'react-native-toast-message/lib/src/Toast'

interface Body {
  path: string;
}


async function sendRequest(body: Body) {
  try {

    const response = await fetch(`https://ace2-g4-server-production.up.railway.app/${body.path}`, {
      method: 'GET'
    });

    if (response.status == 400) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    // const data = await response.json();
    // console.log(data);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Exito',
      text2: 'Se ha enviado la solicitud',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });

  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: 'Hubo un problema: \n' + error,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
}


// Fan function
export async function FanRequest(status: string) {

  if (status == "off") {
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
export async function LightRequest(status: boolean) {

  if (status) {
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
export async function DoorRequest(status: boolean) {

  if (status) {
    await sendRequest({
      path: 'servoOpen'
    })
  } else {
    await sendRequest({
      path: 'servoClose'
    })
  }

}