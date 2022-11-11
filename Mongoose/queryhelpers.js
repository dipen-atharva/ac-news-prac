const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mongoose');


  const animalSchema = new Schema({ name: String, type: String })

  animalSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') })
  };

  const Animal = mongoose.model('Animal', animalSchema);

  Animal.find().byName('fido').exec((err, animals) => {
    console.log(animals);
  });

  Animal.findOne().byName('fido').exec((err, animal) => {
    console.log(animal);
  });
}