const mongoose = require('mongoose');
const { Schema } = mongoose;
const  assert = require('assert');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mongoose');
  const breakfastSchema = new Schema({
    eggs: {
      type: Number,
      min: [6, 'Too few eggs'],
      max: 12
    },
    bacon: {
      type: Number,
      required: [true, 'Why no bacon?']
    },
    drink: {
      type: String,
      enum: ['Coffee', 'Tea'],
      required: function() {
        return this.bacon > 3;
      }
    }
  });
  const Breakfast = mongoose.model('Breakfast', breakfastSchema);

  const badBreakfast = new Breakfast({
    eggs: 2,
    bacon: 0,
    drink: 'Milk'
  });
  let error = badBreakfast.validateSync();
  assert.equal(error.errors['eggs'].message,
    'Too few eggs');
  assert.ok(!error.errors['bacon']);
  assert.equal(error.errors['drink'].message,
    '`Milk` is not a valid enum value for path `drink`.');

  badBreakfast.bacon = 5;
  badBreakfast.drink = null;

  error = badBreakfast.validateSync();
  assert.equal(error.errors['drink'].message, 'Path `drink` is required.');

  badBreakfast.bacon = null;
  error = badBreakfast.validateSync();
  assert.equal(error.errors['bacon'].message, 'Why no bacon?');
}