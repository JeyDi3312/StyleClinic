const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Conectado...');
  } catch (err) {
    console.error(err.message);
    // Salir del proceso con fallo
    process.exit(1);
  }
};

module.exports = connectDB;
