const http = require('http');
const axios = require('axios');
const _lodash = require('lodash');
const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk');
const moment = require('moment');
const port = 8080;
const urlApi = 'https://randomuser.me/api/';
let usuarios = [];
let usuarios_consola = [];

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    if (req.url.includes('/usuarios')) {

        axios.get(urlApi)
            .then((data) => {
                let indice = 0;
                let results = data.data.results;
                let tiempo = moment().format("MMMM Do YYYY, h:mm:ss a");
                let id = uuidv4().slice(0, 6);
                let nombre = results[0].name.first;
                let apellido = results[0].name.last;
                let usuario = `Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${tiempo}`;
                usuarios.push(usuario);
                usuarios_consola.push(usuario)

                _lodash.forEach(usuarios, (e, i) => {
                    res.write(`${i + 1}. ${usuarios[i]}<br>`);
                    indice++;
                });
                console.log(chalk.blue.bgWhite(`${indice}. ${usuarios_consola.pop()}`));
                res.end();
            }).catch((err) => console.log(err));
    }
}).listen(port, () => console.log('escuchando el puerto 8080'));

//EJECUTAR DESDE LA TERMINAL CON NODEMON INDEX.JS