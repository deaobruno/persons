import express from 'express';
import {errorMiddleware} from '../middlewares/errorMiddleware.js';
import {personMiddleware} from '../middlewares/personMiddleware.js';
import {personController} from '../controllers/personController.js';

const app = express();

app.route('/persons')
  .post(
    personMiddleware.createRules,
    personMiddleware.validate,
    personController.create
  )
  .get(
    personMiddleware.findRules,
    personMiddleware.validate,
    personMiddleware.paginate,
    personController.find
  );

app.route('/persons/:id')
  .get(
    personMiddleware.idRules,
    personMiddleware.validate,
    personController.findOne
  )
  .put(
    personMiddleware.idRules,
    personMiddleware.updateRules,
    personMiddleware.validate,
    personController.update
  )
  .delete(
    personMiddleware.idRules,
    personMiddleware.validate,
    personController.delete
  );

app.use((req, res) => {
  res.status(404).send({error: 'Not found'});
});

app.use(errorMiddleware.sendError);

export {app};