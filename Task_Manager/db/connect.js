const mongoose = require('mongoose')

//const connectionString = 'mongodb+srv://Samreen:Stallone27mongo@nodeexpressprojects.auiixpi.mongodb.net/TASK-MANAGER' //Stallone27mongo is the password, TASK-MANAGER is the db name

// mongoose.connect(connectionString,  {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// .then(()=>console.log('Connected to the DB'))
// .catch((err)=>console.log(err))

const connectDB = (url) => {
   
    return mongoose.connect(url,  {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
          })
}

module.exports = connectDB