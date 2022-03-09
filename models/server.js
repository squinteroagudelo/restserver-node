const express = require("express");
const cors = require('cors');
const { json } = require("express/lib/response");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // READING AND BODY PARSING
        this.app.use(express.json());

        // PUBLIC DIRECTORY
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }

}

module.exports = Server;