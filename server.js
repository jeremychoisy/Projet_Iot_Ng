const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(path.join(__dirname,'dist/projet-iot-app/')));
const port = 80;

app.listen(port);
console.log('server started '+ port);
