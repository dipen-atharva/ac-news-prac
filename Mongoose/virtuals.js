const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongoose');
    const fullnameSchema = new Schema({
        name: {
            first: String,
            last: String
        },
    }, {
        virtuals: {
            fullname: {
                get() {
                    return this.name.first + " " + this.name.last;
                },
                set(v) {
                    this.name.first = v.substr(0, v.indexOf(' '));
                    this.name.last = v.substr(v.indexOf(' ') + 1);
                }
            }
        }
    });

    const Person = mongoose.model('Person', fullnameSchema);
    const data = new Person({
        name: {
            first: "Dipen",
            last: "Patel"
        }
    })

    fullnameSchema.virtual('fullName').
        get(function () {
            return this.name.first + ' ' + this.name.last;
        }).
        set(function (v) {
            this.name.first = v.substr(0, v.indexOf(' '));
            this.name.last = v.substr(v.indexOf(' ') + 1);
        })
    const data2 = new Person({
        fullName: 'William Rose'
    })
    console.log(data2.name.first);


}
