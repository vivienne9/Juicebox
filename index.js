require('dotenv').config();
//console.log(process.env.JWT_SECRET);

//Added bodyParser to apiroute, not in workshop directions
var bodyParser = require('body-parser')

const PORT = 3000;
const express = require('express');
const server = express();

const apiRouter = require('./api');
server.use('/api', apiRouter);

apiRouter.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
      console.log('The server is up on port', PORT)
});


server.use((req, res, next) => {
      console.log("<____Body Logger START____>");
      console.log(req.body);
      console.log("<_____Body Logger END_____>");

      next();
});

server.use(express.json())

// server.get('/background/:color', (req, res, next) => {
//       res.send(`
//         <body style="background: ${ req.params.color };">
//           <h1>Hello World</h1>
//         </body>
//       `);
//     });

server.get('/add/:first/to/:second', (req, res, next) => {
      res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
        Number(req.params.first) + Number(req.params.second)
       }</h1>`);
    });