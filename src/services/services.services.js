//const fetch = require("node-fetch");

const clima = async () => {
  //console.log("Entra al Servicio del Clima");
  try {
    //console.log("hace la peticion a la URL");

    //  const url = 'https://api.open-meteo.com/v1/forecast?latitude=-26.8241&longitude=-65.2226&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=auto';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=-26.8241&longitude=-65.2226&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=auto`;
    const datosClima = await fetch(url);
    const data = await datosClima.json();
    //console.log("Datos devueltos: ", data);
    //  );
    //  const data = await response.json();
    //"https://api.open-meteo.com/v1/forecast?latitude=-26.8241&longitude=-65.2226&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=auto";

    return {
      data,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

//https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
const nasa = async () => {
  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`;
    const datosNasa = await fetch(url);
    const data = await datosNasa.json();

    return {
      data,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }

}

module.exports = { clima, nasa };