const express = require('express')
const app = express()
const port = 3001

// métodos tienen Rutas y Controladores
app.get("/", (req, res)=> {
  res.send('Hola desde el back por la solicitud GET')
})

app.post('/crear', (req, res) => {
  app.send("Hola desde el POST")
})

app.put('/actualizar', (req, res) => {
  res.send('Hola desde el back por la solicitud PUT')
})

app.listen(port, (req, res) => {
  console.log("Servidor prendido en el puerto: ", port);
});
