// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Función auxiliar para obtener la fecha en formato UTC y Unix
function formatDate(date) {
  return { unix: date.getTime(), utc: date.toUTCString() };
}

// Manejar solicitud con parámetro de fecha
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;

  // Determinar si dateString es un número (milisegundos Unix) o una fecha
  let date;
  if (!isNaN(parseInt(dateString))) {
    // Es un número, asumir milisegundos Unix
    date = new Date(parseInt(dateString));
  } else {
    // Tratar como cadena de fecha
    date = new Date(dateString);
  }

  // Verificar si la fecha es válida
  if (!isNaN(date.getTime())) {
    res.json(formatDate(date));
  } else {
    res.json({ error: "Fecha no válida" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
