import {mongoose} from '../database/db.js';

const PersonSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Missing attribute!'],
  },
  last_name: {
    type: String,
    required: [true, 'Missing attribute!'],
  },
  email: {
    type: String,
    required: [true, 'Missing attribute!'],
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, // eslint-disable-line max-len
      'Wrong format!'
    ],
  },
  createdAt: {
    type: Date,
    required: [true, 'Missing attribute!'],
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Person = mongoose.model('Person', PersonSchema);

export {Person};