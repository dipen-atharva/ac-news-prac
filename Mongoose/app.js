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

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongoose_prac');
    const kittySchema = new mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function speak() {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    };

    const Kitten = mongoose.model('Kitten', kittySchema);
    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak();
    await fluffy.save();

    const silence = new Kitten({ name: 'Silence' });
    silence.speak();
    await silence.save();
    console.log(silence.name);
    const kittens = await Kitten.find();
    console.log(kittens);

}

module.exports = app;
