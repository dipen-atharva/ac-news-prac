var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const mongoose = require('mongoose');
const { Schema } = mongoose;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mongoose');

  // const numberSchema = new Schema({
  //   integerOnly: {
  //     type : Number,
  //     get: v => Math.round(v),
  //     set: v => Math.round(v),
  //     alias: 'i'
  //   }
  // });

  // const Number1 = mongoose.model('Number',numberSchema);
  // const doc = new Number1;
  // doc.integerOnly = 2.001 ;
  // console.log(doc.i)
  const schema1 = new Schema({ name: String });
  const schema2 = new Schema({ name: 'String' });

  const Person = mongoose.model('Person', schema2);
  const doc = new Person({ name: 42 });
  doc.save();
}

module.exports = app;
