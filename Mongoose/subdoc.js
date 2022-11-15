const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mongoose');

  const moveSchema = new Schema({
    name: String,
    keys: String
  })

  const characterSchema = new Schema({
    name: { type: String, unique: true },
    specials: [moveSchema],
    ultimate: [moveSchema]
  })
  const Character = mongoose.model('Character', characterSchema)

  const ryu = await Character.findOne({ name: 'Ryu' })
  ryu.specials.push({
    name: 'Jodan Sokutou Geri123',
    keys: 'â†“ â†˜ â†’ K'
  })

  await ryu.save()

}