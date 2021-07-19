import {Person} from '../models/person.js';

class PersonController {
  async create(req, res, next) {
    try {
      const person = await Person.create(req.body);

      const {_id, first_name, last_name, email} = person;

      res.status(201).send({_id, first_name, last_name, email});
    } catch(err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      const persons = await Person
        .find(req.query, '_id first_name last_name email')
        .skip(req.skip)
        .limit(req.limit);

      if (persons.length <= 0) {
        let err = new Error('Not found');

        err.statusCode = 404;

        next(err);

        return;
      }

      req.data.items = persons;

      res.status(200).send(req.data);
    } catch(err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      const person = await Person
        .findById(req.params.id, '_id first_name last_name email');

      res.status(200).send(person);
    } catch(err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      req.body.updatedAt = Date.now();

      const person = await Person
        .findByIdAndUpdate(
          req.params.id, req.body, {select: '_id first_name last_name email'}
        );

      res.status(200).send(person);
    } catch(err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await Person.findByIdAndDelete(req.params.id);

      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }
}

const personController = new PersonController();

export {personController};