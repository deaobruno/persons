class ErrorMiddleware {
  sendError(err, req, res, next) { // eslint-disable-line no-unused-vars
    console.log(err.stack);

    if (err) {
      res.status(err.statusCode || 500)
        .send({error: err.message || 'Internal server error'});
    }
  }
}

const errorMiddleware = new ErrorMiddleware();

export {errorMiddleware};