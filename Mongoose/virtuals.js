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
                }
            }
        }
    });

    const Person = mongoose.model('Persom', fullnameSchema);
    const data = new Person({
        name: {
            first: "Dipen",
            last: "Patel"
        }
    })
    await data.save();

    fullnameSchema.virtual('fullName').get(function () {
        return this.name.first + ' ' + this.name.last;
    });
    console.log(data.fullname);
}
