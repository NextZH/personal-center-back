const mongoose = require('mongoose');
const schemaMenu = mongoose.Schema({
  path: String,
  name: String,
  title: String,
  iconPath: String,
  icon:Node,
  meta:{
    important:Boolean,
    isGame:Boolean,
  },
  children:[schemaMenu]
}, {
    versionKey: false
});

mongoose.model("menuModel", schemaMenu, "menu");