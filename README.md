# persons

LDS backend challenge


#### Docker

If you haver Docker configured in your local machine, use the following command to build the container:
```
docker-compose up -d
```


#### Shell

Otherwise, to build the app in your local machine, you may run the following commands:
(* Remember to configure .env file using .env-example located in the app's root)
```
npm install
npm run dev
```


#### Documentation

With the app running, you may access the documentation route
```
http:/localhost:8080/docs
```


#### Technologies used:

NodeJS

* [express](https://github.com/expressjs/express) - Web framework for Node.js
* [nodemon](https://github.com/remy/nodemon) - Monitor for changes in Node.js applications and automatically restart the server
* [express-validator](https://github.com/express-validator/express-validator) - An express.js middleware for validator.js
* [body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
* [mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling for Node.js
* [eslint](https://github.com/eslint/eslint) - Find and fix problems in your JavaScript code
* [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for Node.js projects
* [express-openapi](https://github.com/kogosoftwarellc/open-api/tree/master/packages/express-openapi) - An OpenAPI framework for express.js
* [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - Middleware to serve the Swagger UI bound to your Swagger document
* [js-yaml](https://github.com/nodeca/js-yaml) - JavaScript YAML parser and dumper