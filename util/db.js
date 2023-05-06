const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/personal-center';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', function() {  
	console.log('Mongoose 已连接到 ' + dbURI);
});