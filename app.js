import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import {initialize} from 'express-openapi';
import jsYaml from 'js-yaml';
import swaggerUI from 'swagger-ui-express';

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

fs.readFile('./docs/openapi/openapi.yaml', 'utf8', async (err, yamlFile) => {
  if (err) {
    console.log(err.message);
  }

  const apiDoc = await jsYaml.load(yamlFile);

  initialize({
    app,
    apiDoc: apiDoc,
    paths: './docs/openapi/paths'
  });

  app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDoc));
});

app.listen(port, err => {
  if (err) {
    console.log(err.message);
  }

  console.log(`Server running on port ${port}`);
});