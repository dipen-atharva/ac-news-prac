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

  const userSchema = new Schema({
    name: String,
    email: String,
    roles: [String]
  }, { autoCreate: false, autoIndex: false });

  const User = mongoose.model('User', userSchema);
  const RedactedUser = mongoose.model('RedactedUser', userSchema);

  await User.createCollection();
  await RedactedUser.createCollection({
    viewOn: 'users',
    pipeline: [
      {
        $set: {
          name: { $concat: [{ $substr: ['$name', 0, 3] }, '...'] },
          email: { $concat: [{ $substr: ['$email', 0, 3] }, '...'] }
        }
      }
    ]
  });

  await User.create([
    { name: 'John Smith', email: 'john.smith@gmail.com', roles: ['user'] },
    { name: 'Bill James', email: 'bill@acme.co', roles: ['admin'] }
  ]);

  console.log(await RedactedUser.find({ roles: 'user' }));


}

module.exports = app;
