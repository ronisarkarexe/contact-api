const mongoose = require('mongoose');

const connectDb = async () => {
   try {
      const connect = await mongoose.connect(process.env.CONNECTION);
      console.log('Connected', connect.connection.host, connect.connection.port, connect.connection.name);
   } catch(err){
      console.log(err);
      process.exit(1);
   }
}
module.exports = connectDb;