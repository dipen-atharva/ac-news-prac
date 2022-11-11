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

    // const blogSchema = new Schema({
    //     title: String, // String is shorthand for {type: String}
    //     author: String,
    //     body: String,
    //     comments: [{ body: String, date: Date }],
    //     date: { type: Date, default: Date.now },
    //     hidden: Boolean,
    //     meta: {
    //         votes: Number,
    //         favs: Number
    //     }
    // });

    // const Blog = mongoose.model('Blog', blogSchema);

    // const schema = new Schema({ _id: Number });
    // schema.path('_id')

    // const Model = mongoose.model('Test',schema);

    // const doc = new Model();
    // doc._id = 1;
    // doc._id instanceof mongoose.Types.ObjectId;
    // await doc.save();

    const animalSchema = new Schema({ name: String, type: String })
    animalSchema.methods.findSimilarTypes = function (cb) {
        return mongoose.model('Animal').find({ type: this.type }, cb);
    };

    const Animal = mongoose.model('Animal', animalSchema);
    const dog = new Animal({ type: 'dog' });
    dog.findSimilarTypes((err, dogs) => {
        console.log(dogs); // woof
    });
    // await dog.save();

}

module.exports = app;
