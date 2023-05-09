const mongoose = require('mongoose');

const schemaMusic = mongoose.Schema({
    name: String,
    url: String,
}, {
    versionKey: false
});

const musicModel= mongoose.model("musicModel", schemaMusic, "music");

module.exports={
  musicModel
}