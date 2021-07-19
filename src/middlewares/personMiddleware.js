import {body, param, query, validationResult} from 'express-validator';
import {Person} from '../models/person.js';

class PersonMiddleware {
  constructor() {
    this.idRules = [
      param('id')
        .notEmpty()
        .isMongoId()
        .withMessage('Wrong format')
        .custom(id => Person.findById(id)
          .then(person => {
            if (!person) {
              return Promise.reject();
            }
          })
        )
        .withMessage(404),
    ];

    this.findRules = [
      query('first_name')
        .if(first_name => typeof first_name !== 'undefined')
        .notEmpty()
        .trim()
        .escape(),
      query('last_name')
        .if(last_name => typeof last_name !== 'undefined')
        .notEmpty()
        .trim()
        .escape(),
      query('email')
        .if(email => typeof email !== 'undefined')
        .notEmpty()
        .trim()
        .escape()
        .isEmail()
        .withMessage('Wrong format'),
      query('page')
        .if(page => typeof page !== 'undefined')
        .notEmpty()
        .trim()
        .escape()
        .isNumeric(),
      query('limit')
        .if(limit => typeof limit !== 'undefined')
        .notEmpty()
        .trim()
        .escape()
        .isNumeric(),
    ];

    this.createRules = [
      body('first_name')
        .notEmpty()
        .trim()
        .escape(),
      body('last_name')
        .notEmpty()
        .trim()
        .escape(),
      body('email')
        .notEmpty()
        .trim()
        .escape()
        .isEmail()
        .withMessage('Wrong format')
        .custom(email => Person.findOne({email})
          .then(person => {
            if (person) {
              return Promise.reject();
            }
          })
        )
        .withMessage({
          message: 'Email already registered',
          statusCode: 409
        }),
    ];

    this.updateRules = [
      body()
        .custom(body => Object.keys(body).length > 0),
      body('first_name')
        .if(first_name => typeof first_name !== 'undefined')
        .notEmpty()
        .trim()
        .escape(),
      body('last_name')
        .if(last_name => typeof last_name !== 'undefined')
        .notEmpty()
        .trim()
        .escape(),
      body('email')
        .if(email => typeof email !== 'undefined')
        .notEmpty()
        .trim()
        .escape()
        .isEmail()
        .withMessage('Wrong format')
        .custom(email => Person.findOne({email})
          .then(person => {
            if (person) {
              return Promise.reject();
            }
          })
        )
        .withMessage({
          message: 'Email already registered',
          statusCode: 409
        }),
    ];
  }

  async validate(req, res, next) {
    try {
      let errors = validationResult(req);
      let errorMessage = '';
      let statusCode = 400;

      if (!errors.isEmpty()) {
        errors = errors.array();

        let notFound = errors.filter(error => error.msg === 404);

        if (notFound.length > 0) {
          errorMessage = 'Not found';
          statusCode = 404;
        } else {
          for (let error of errors) {
            if (error.msg.statusCode === 409) {
              statusCode = 409;
            }

            errorMessage += `${error.param}: ${typeof error.msg === 'string' ? error.msg : error.msg.message}. `; // eslint-disable-line max-len
          }
        }

        let err = new Error(errorMessage.trim());

        err.statusCode = statusCode;

        next(err);

        return;
      }

      next();
    } catch(err) {
      next(err);
    }
  }

  async paginate(req, res, next) {
    try {
      let {page = 0, limit = 10} = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      req.limit = limit;
      req.skip = page * limit;

      delete req.query.page;
      delete req.query.limit;

      const total = await Person.countDocuments(req.query);

      const data = {
        page: page,
        pages: Math.ceil(total / limit),
        limit: limit,
        total: total
      };

      req.data = data;

      next();
    } catch(err) {
      next(err);
    }
  }
}

const personMiddleware = new PersonMiddleware();

export {personMiddleware};